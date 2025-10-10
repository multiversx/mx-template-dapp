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

    // Wait for side panel to be visible
    await page.locator(SelectorsEnum.sidePanel).waitFor({ state: 'visible' });

    // Cancel the transaction from the modal close button
    await page.locator(SelectorsEnum.sidePanelCloseIcon).click();

    // Wait for toast to be displayed
    await TestActions.waitForToastToBeDisplayed(page);

    // Check that the transaction toast shows that the transaction was cancelled
    await TestActions.waitForTransactionToastToContain({
      page: page,
      toastTitle: 'Signing canceled'
    });
  });
});
