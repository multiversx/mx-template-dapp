import { test, expect } from '@playwright/test';

import * as TestActions from '../support';
import {
  TestDataEnums,
  SelectorsEnum,
  OriginPageEnum
} from '../support/testdata';
import { TEST_CONSTANTS } from '../support/constants';

const keystoreConfig = {
  keystore: TestDataEnums.keystoreFilePath,
  password: TestDataEnums.keystoreFilePassword
};

test.describe('Batch Transactions', () => {
  test.beforeEach(async ({ page }) => {
    await TestActions.navigateToConnectWallet(page);
    await TestActions.connectWebWallet({ page, loginMethod: keystoreConfig });
    await TestActions.checkConnectionToWallet(
      page,
      TestDataEnums.keystoreWalletAddress
    );
  });

  test('should be able to sign and send batch transactions with the Web Wallet', async ({
    page
  }) => {
    const numberOfTransactions = 5; // 5 transactions are being sent to the contract

    // Get initial balance before any actions
    const initialBalance = await TestActions.getCurrentBalance(page);

    // Check that initial balance is greater than 5
    expect(initialBalance).toBeGreaterThan(
      TEST_CONSTANTS.MIN_BALANCE_FOR_BATCH_TX
    );

    // Click LeftPanel - Batch Transactions
    await page.getByText('Batch Transactions').first().click();

    // Click on Sign & send batch button
    await page.getByTestId(SelectorsEnum.signAndBatchButton).click();

    // Wait for the web wallet page to be loaded which is the new tab
    const walletPage = await TestActions.waitForPageByUrlSubstring({
      page,
      urlSubstring: OriginPageEnum.multiversxWallet
    });

    // If the web wallet page is not loaded, throw an error
    if (!walletPage) {
      throw new Error(
        `Web wallet page containing ${OriginPageEnum.multiversxWallet} is not loaded.`
      );
    }

    // Sign transaction by confirming with keystore in the web wallet
    await TestActions.confirmWalletTransaction(walletPage, keystoreConfig);

    // Sign batch transactions in the web wallet
    await TestActions.signBatchTransactions({
      walletPage,
      buttonSelector: SelectorsEnum.signAndBatchButton,
      numberOfTransactions
    });

    // Wait for transaction toast to be displayed
    await TestActions.waitForToastToBeDisplayed(page);

    // Check that the transaction toast shows that all transactions are signed
    await TestActions.checkToastShowsTransactionsSigned(
      page,
      numberOfTransactions
    );
  });
});
