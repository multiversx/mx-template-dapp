import { BrowserContext, expect, Page, test } from '@playwright/test';
import { setupMetaMaskWallet } from '../support/metaMask/setupMetaMaskWallet';
import * as TestActions from '../support/template';
import { getPageAndWaitForLoad } from '../support/template/getPageAndWaitForLoad';
import {
  OriginPageEnum,
  SelectorsEnum,
  UrlRegex
} from '../support/template/testdata';

// TODO: Load variables from .env.test.local when running locally
// Get password and address from environment variables
const METAMASK_MNEMONIC = process.env.METAMASK_MNEMONIC || '';
const METAMASK_ADDRESS = process.env.METAMASK_ADDRESS || '';
const METAMASK_PASSWORD = process.env.METAMASK_PASSWORD || '';

// Validate that required environment variables are present
if (!METAMASK_PASSWORD || !METAMASK_ADDRESS || !METAMASK_MNEMONIC) {
  throw new Error(
    'METAMASK_PASSWORD, METAMASK_MNEMONIC, and METAMASK_ADDRESS environment variables are missing. Please set them in .env.test.local for local development or as a GitHub Secret for CI.'
  );
}

test.describe('Connect a wallet', () => {
  let metamaskContext: BrowserContext;
  let extensionId: string;
  let dAppPage: Page;

  test.beforeEach(async () => {
    // Setup MetaMask for each test
    const result = await setupMetaMaskWallet(
      METAMASK_MNEMONIC,
      METAMASK_PASSWORD
    );
    metamaskContext = result.context;
    extensionId = result.extensionId;

    // Create a page in the MetaMask context for the dApp
    dAppPage = await metamaskContext.newPage();
    await TestActions.navigateToConnectWallet(dAppPage);
  });

  test.afterEach(async () => {
    // Close the browser context to free up resources
    if (metamaskContext) {
      try {
        await metamaskContext.close();
        // Wait a moment to ensure the context is fully closed
        // Persistent contexts need a bit more time to release the userDataDir lock
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (error) {
        // Context might already be closed, ignore the error
      }
    }
  });

  test.describe('MetaMask Connection', () => {
    test('should successfully connect with MetaMask', async () => {
      // Use the MetaMask context and dApp page from beforeEach
      const context = metamaskContext;
      const page = dAppPage;

      // Click the connect MetaMask button
      await page.getByTestId('metamask').click();

      // Get the notification page and wait for it to load in the MetaMask context
      const notificationPage = await getPageAndWaitForLoad(
        context,
        `chrome-extension://${extensionId}/notification.html`,
        {
          viewport: { width: 360, height: 592 }
        }
      );

      // Handle MetaMask Snap privacy warning
      await TestActions.handleMetaMaskSnap(
        context,
        extensionId,
        notificationPage
      );

      // Switch to template page
      const templatePage = await getPageAndWaitForLoad(
        context,
        OriginPageEnum.templateDashboard
      );

      // Verify template page opened
      await expect(templatePage).toHaveURL(UrlRegex.templateDashboard);

      // Verify connection using TestActions helper
      await TestActions.checkConnectionToWallet(page, METAMASK_ADDRESS);
    });

    test('should display all connected account details correctly', async () => {
      // Use the MetaMask context and dApp page from beforeEach
      const context = metamaskContext;
      const page = dAppPage;

      // Click the connect MetaMask button
      await page.getByTestId('metamask').click();

      // Get the notification page and wait for it to load in the MetaMask context
      const notificationPage = await getPageAndWaitForLoad(
        context,
        `chrome-extension://${extensionId}/notification.html`,
        {
          viewport: { width: 360, height: 592 }
        }
      );

      // Handle MetaMask Snap privacy warning
      await TestActions.handleMetaMaskSnap(
        context,
        extensionId,
        notificationPage
      );

      // Switch to template page
      const templatePage = await getPageAndWaitForLoad(
        context,
        OriginPageEnum.templateDashboard
      );

      // Verify template page opened
      await expect(templatePage).toHaveURL(UrlRegex.templateDashboard);

      // Verify connection using TestActions helper
      await TestActions.checkConnectionToWallet(page, METAMASK_ADDRESS);

      // Verify the topInfo container is visible
      const topInfoContainer = page.getByTestId(SelectorsEnum.topInfoContainer);
      await expect(topInfoContainer).toBeVisible();

      // Verify account address is displayed
      const addressElement = topInfoContainer
        .getByTestId(SelectorsEnum.accountAddress)
        .getByTestId(SelectorsEnum.trimFullAddress);
      await expect(addressElement).toBeVisible();
      await expect(addressElement).toContainText(METAMASK_ADDRESS);

      // Verify herotag section is present and should be N/A
      const herotagElement = topInfoContainer.getByTestId(
        SelectorsEnum.heroTag
      );
      await expect(herotagElement).toBeVisible();
      await expect(herotagElement).toContainText('N/A');

      // Verify shard information is displayed
      const shardElement = topInfoContainer.getByTestId(SelectorsEnum.shard);
      await expect(shardElement).toBeVisible();
      // Shard should contain a number (0, 1, or 2)
      const shardText = await shardElement.textContent();
      expect(shardText).toMatch(/^[0-2]$/);

      // Verify balance is displayed and extract the value
      const balance = await TestActions.extractBalanceFromContainer({
        page,
        containerSelector: SelectorsEnum.topInfoContainer,
        selectorType: 'testId'
      });

      // Verify balance is a positive number
      expect(balance).toBeGreaterThan(0);
    });
  });
});
