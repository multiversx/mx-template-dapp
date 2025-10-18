// Import necessary Synpress modules and setup
import { testWithSynpress } from '@synthetixio/synpress';
import { MetaMask, metaMaskFixtures } from '@synthetixio/synpress/playwright';
import * as TestActions from '../support';
import { getNotificationPageAndWaitForLoad } from '../support/getNotificationPageAndWaitForLoad';
import { OriginPageEnum, SelectorsEnum } from '../support/testdata';
import walletSetup from '../test/wallet-setup/basic.setup';

// Get password and mnemonic from environment variables
const METAMASK_ADDRESS = process.env.METAMASK_ADDRESS;
const METAMASK_PASSWORD = process.env.METAMASK_PASSWORD;

// Validate that required environment variables are present
if (!METAMASK_PASSWORD || !METAMASK_ADDRESS) {
  throw new Error(
    'METAMASK_PASSWORD, and METAMASK_ADDRESS environment variables are missing. Please set them in .env.test.local for local development or as a GitHub Secret for CI.'
  );
}

// Create a test instance with Synpress and MetaMask fixtures
const test = testWithSynpress(metaMaskFixtures(walletSetup));

// Extract expect function from test
const { expect } = test;

// This is to ensure that the MetaMask tests run sequentially
// which is required for the MetaMask tests to work correctly
test.describe.configure({ mode: 'serial' });

test.describe('Connect a wallet', () => {
  // Connect wallet tests verify wallet connection functionality

  test.beforeEach(async ({ page }) => {
    await TestActions.navigateToConnectWallet(page);
  });

  test.describe('MetaMask Connection', () => {
    test('should successfully connect with MetaMask', async ({
      context,
      page,
      metamaskPage,
      extensionId
    }) => {
      // Create a new MetaMask instance
      new MetaMask(context, metamaskPage, METAMASK_PASSWORD, extensionId);

      // Click the connect MetaMask button
      await page.getByTestId('metamask').click();

      // Get the notification page and wait for it to load
      const notificationPage = await getNotificationPageAndWaitForLoad(
        context,
        extensionId
      );

      if (!notificationPage) {
        throw new Error(
          'Notification page not found after clicking connect MetaMask button'
        );
      }

      // Handle MetaMask Snap privacy warning
      await TestActions.handleMetaMaskSnapApproval(notificationPage);

      // Switch to template page
      const templatePage = await TestActions.waitForPageByUrlSubstring({
        page,
        urlSubstring: OriginPageEnum.templateDashboard
      });

      // Verify template page opened
      await expect(templatePage).toHaveURL(OriginPageEnum.templateDashboard);

      // Verify connection using TestActions helper
      await TestActions.checkConnectionToWallet(page, METAMASK_ADDRESS);
    });
  });

  test.describe('MetaMask Connection', () => {
    test('should display all connected account details correctly', async ({
      context,
      page,
      metamaskPage,
      extensionId
    }) => {
      // Create a new MetaMask instance
      new MetaMask(context, metamaskPage, METAMASK_PASSWORD, extensionId);

      // Click the connect MetaMask button
      await page.getByTestId('metamask').click();

      // Get the notification page and wait for it to load
      const notificationPage = await getNotificationPageAndWaitForLoad(
        context,
        extensionId
      );

      // Handle MetaMask Snap privacy warning
      await TestActions.handleMetaMaskSnapApproval(notificationPage);

      // Switch to template page
      const templatePage = await TestActions.waitForPageByUrlSubstring({
        page,
        urlSubstring: OriginPageEnum.templateDashboard
      });

      // Verify template page opened
      await expect(templatePage).toHaveURL(OriginPageEnum.templateDashboard);

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
