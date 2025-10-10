import { expect, test } from '@playwright/test';
import * as TestActions from '../support';
import {
  OriginPageEnum,
  SelectorsEnum,
  TestDataEnums
} from '../support/testdata';

const keystoreConfig = {
  keystore: TestDataEnums.keystoreFilePath3,
  password: TestDataEnums.keystorePassword3
};

test.describe('cancel transaction from wallet window', () => {
  test.beforeEach(async ({ page }) => {
    await TestActions.navigateToConnectWallet(page);
    await TestActions.connectWebWallet({ page, loginMethod: keystoreConfig });
    await TestActions.checkConnectionToWallet(
      page,
      TestDataEnums.keystoreWalletAddress3
    );
  });

  test('should cancel transaction', async ({ page }) => {
    // Open Batch Transactions and initiate signing
    await page.getByText('Batch Transactions').first().click();
    await page
      .locator(SelectorsEnum.batchTransactionsContainer)
      .waitFor({ state: 'visible' });
    await page.getByTestId(SelectorsEnum.signAndBatchButton).click();

    // Switch to web wallet page
    const walletPage = await TestActions.waitForPageByUrlSubstring({
      page,
      urlSubstring: OriginPageEnum.multiversxWallet
    });
    await expect(walletPage).toHaveURL(/devnet-wallet\.multiversx\.com/);

    // Cancel the transaction from the wallet window
    await walletPage
      .getByTestId(SelectorsEnum.keystoreCloseModalButton)
      .click();

    // Switch back to template dashboard and verify a toast is shown
    const templatePage = await TestActions.waitForPageByUrlSubstring({
      page,
      urlSubstring: OriginPageEnum.templateDashboard
    });

    // Wait for toast to be displayed
    await TestActions.waitForToastToBeDisplayed(templatePage);

    // Check that the transaction toast shows that the transaction was cancelled
    await TestActions.waitForTransactionToastToContain({
      page: templatePage,
      toastTitle: 'Signing canceled'
    });
  });
});
