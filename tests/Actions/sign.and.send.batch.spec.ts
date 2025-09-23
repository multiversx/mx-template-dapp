import { test, expect } from '@playwright/test';

import {
  checkConnectionToWallet,
  connectWebWallet,
  navigateToConnectWallet,
  confirmWalletTx,
  waitForPageByUrlSubstring,
  signBatchTransactions,
  waitForToastToBeDisplayed,
  getCurrentBalance,
  checkToastShowsTransactionsSigned
} from '../support/actions';
import {
  TestDataEnums,
  SelectorsEnum,
  OriginPageEnum
} from '../support/test.data';

const keystoreConfig = {
  keystore: TestDataEnums.keystoreFilePath,
  password: TestDataEnums.keystoreFilePassword
};

test.describe('Batch Transactions', () => {
  test.beforeEach(async ({ page }) => {
    await navigateToConnectWallet(page);
    await connectWebWallet(page, keystoreConfig);
    await checkConnectionToWallet(page, TestDataEnums.keystoreWalletAddress);
  });

  test('should be able to sign and send batch transactions with the Web Wallet', async ({
    page
  }) => {
    const numberOfTransactions = 5; // 5 transactions are being sent to the contract

    // Get initial balance before any actions
    const initialBalance = await getCurrentBalance(page);
    console.log(`Initial balance: ${initialBalance}`);

    // Check that initial balance is greater than 5
    expect(initialBalance).toBeGreaterThan(5); // 5 EGLD is being sent to the contract

    // Click LeftPanel - Batch Transactions
    await page.getByText('Batch Transactions').first().click();

    // Click on Sign & send batch button
    await page.getByTestId(SelectorsEnum.signAndBatchButton).click();

    // Wait for the web wallet page to be loaded which is the new tab
    const walletPage = await waitForPageByUrlSubstring(
      page,
      OriginPageEnum.multiversxWallet
    );

    // If the web wallet page is not loaded, throw an error
    if (!walletPage) {
      throw new Error(
        `Web wallet page containing ${OriginPageEnum.multiversxWallet} is not loaded.`
      );
    }

    // Sign transaction by confirming with keystore in the web wallet
    await confirmWalletTx(walletPage, keystoreConfig);

    // Sign batch transactions in the web wallet
    await signBatchTransactions(
      walletPage,
      SelectorsEnum.signAndBatchButton,
      numberOfTransactions
    );

    // Wait for transaction toast to be displayed
    await waitForToastToBeDisplayed(page);

    // Check that the transaction toast shows that all transactions are signed
    await checkToastShowsTransactionsSigned(page, numberOfTransactions);
  });
});
