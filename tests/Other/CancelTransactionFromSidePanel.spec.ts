import { test } from '@playwright/test';
import * as TestActions from '../support';
import { readValueFromFile } from '../support';
import { SelectorsEnum, TestDataEnums } from '../support/testdata';

const privateKeyConfig = {
  address: TestDataEnums.keystoreWalletAddress6,
  privateKey: readValueFromFile(TestDataEnums.keystoreFilePath6, 'utf8').trim()
};

test.describe('cancel transaction from side panel', () => {
  test.beforeEach(async ({ page }) => {
    await TestActions.navigateToConnectWallet(page);
    await TestActions.connectInMemoryProvider({
      page,
      loginMethod: privateKeyConfig
    });
    await TestActions.checkConnectionToWallet(page, privateKeyConfig.address);
  });

  test('should cancel transaction via cancel button', async ({ page }) => {
    // Open Batch Transactions and initiate signing
    await page.getByText('Batch Transactions').first().click();
    await page
      .locator(SelectorsEnum.batchTransactionsContainer)
      .waitFor({ state: 'visible' });
    await page.getByTestId(SelectorsEnum.signAndBatchButton).click();

    // Wait for side panel to be visible
    await page.locator(SelectorsEnum.sidePanel).waitFor({ state: 'visible' });

    // Cancel the transaction from the side panel
    await page.getByTestId(SelectorsEnum.signCancelButton).click();

    // Wait for toast to be displayed
    await TestActions.waitForToastToBeDisplayed(page);

    // Check that the transaction toast shows that the transaction was cancelled
    await TestActions.waitForTransactionToastToContain({
      page: page,
      toastTitle: 'Signing canceled'
    });
  });

  test('should cancel transaction via modal close button', async ({ page }) => {
    // Open Batch Transactions and initiate signing
    await page.getByText('Batch Transactions').first().click();
    await page
      .locator(SelectorsEnum.batchTransactionsContainer)
      .waitFor({ state: 'visible' });
    await page.getByTestId(SelectorsEnum.signAndBatchButton).click();

    // Wait for side panel to be visible and fully loaded
    await page.locator(SelectorsEnum.sidePanel).waitFor({ state: 'visible' });

    // Wait a bit more for any dynamic content to load
    await page.waitForTimeout(1000);

    // Debug: Check what elements are actually present
    console.log(
      'Side panel visible:',
      await page.locator(SelectorsEnum.sidePanel).isVisible()
    );

    // Try multiple selectors for the close icon
    const closeSelectors = [
      SelectorsEnum.sidePanelCloseIcon, // 'mvx-close-icon'
      '.close-icon',
      '[data-testid="mvx-close-icon"]',
      'button[aria-label*="close"]',
      'button[aria-label*="Close"]',
      '[class*="close"]',
      'svg[class*="close"]',
      'i[class*="close"]'
    ];

    let closeIconFound = false;
    for (const selector of closeSelectors) {
      const element = page.locator(selector);
      const count = await element.count();
      console.log(`Selector "${selector}": found ${count} elements`);

      if (count > 0) {
        console.log(`Using selector: ${selector}`);
        await element.first().waitFor({ state: 'visible', timeout: 5000 });
        await element.first().click();
        closeIconFound = true;
        break;
      }
    }

    if (!closeIconFound) {
      // Take a screenshot for debugging
      await page.screenshot({ path: 'debug-side-panel.png' });
      throw new Error('Close icon not found with any selector');
    }

    // Wait for toast to be displayed
    await TestActions.waitForToastToBeDisplayed(page);

    // Check that the transaction toast shows that the transaction was cancelled
    await TestActions.waitForTransactionToastToContain({
      page: page,
      toastTitle: 'Signing canceled'
    });
  });
});
