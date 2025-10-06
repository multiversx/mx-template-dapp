import { expect, test } from '@playwright/test';
import * as TestActions from '../support';
import { TEST_CONSTANTS } from '../support/constants';
import {
  OriginPageEnum,
  SelectorsEnum,
  TestDataEnums
} from '../support/testdata';

const keystoreConfig = {
  keystore: TestDataEnums.keystoreFilePath2,
  password: TestDataEnums.keystorePassword2
};

test.describe('Sign & send batch', () => {
  test.beforeEach(async ({ page }) => {
    await TestActions.navigateToConnectWallet(page);
    await TestActions.connectWebWallet({ page, loginMethod: keystoreConfig });
    await TestActions.checkConnectionToWallet(
      page,
      TestDataEnums.keystoreWalletAddress2
    );
  });

  test('should have sufficient balance for batch transactions', async ({
    page
  }) => {
    // Get account balance before any actions
    const accountBalance = await TestActions.extractBalanceFromContainer({
      page,
      containerSelector: SelectorsEnum.topInfoContainer,
      selectorType: 'testId'
    });

    // Check that account balance is greater than 5 required for batch transactions
    expect(accountBalance).toBeGreaterThan(
      TEST_CONSTANTS.MIN_BALANCE_FOR_BATCH_TX
    );
  });

  test('should display batch transactions container when clicked', async ({
    page
  }) => {
    // Click LeftPanel - Batch Transactions
    await page.getByText('Batch Transactions').first().click();

    // Wait for the batch transactions container to be visible
    await page
      .locator(SelectorsEnum.batchTransactionsContainer)
      .waitFor({ state: 'visible' });

    // Verify batch transactions container is in viewport
    const container = page.locator(SelectorsEnum.batchTransactionsContainer);
    await expect(container).toBeInViewport();
  });

  test('should complete full batch transaction flow', async ({ page }) => {
    const numberOfTransactions = 5;

    // Navigate to batch transactions page and initiate signing
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

    // Verify wallet page opened
    await expect(walletPage).toHaveURL(/devnet-wallet\.multiversx\.com/);

    // Sign transaction by confirming with keystore in the web wallet
    await TestActions.confirmWalletTransaction(walletPage, keystoreConfig);

    // Sign batch transactions in the web wallet
    await TestActions.signBatchTransactions({
      walletPage,
      buttonSelector: SelectorsEnum.signAndBatchButton,
      numberOfTransactions
    });

    // Switch to template page
    const templatePage = await TestActions.waitForPageByUrlSubstring({
      page,
      urlSubstring: OriginPageEnum.templateDashboard
    });

    // Wait for transaction toast to be displayed
    await TestActions.waitForToastToBeDisplayed(templatePage);

    // Check that the transaction toast shows that all transactions are signed
    await TestActions.waitForTransactionToastToContain({
      page: templatePage,
      toastStatus: '5 / 5 transactions processed'
    });

    // Wait for the transaction toast to be closed
    await TestActions.waitForToastToBeClosed(templatePage);

    // Parse ping/pong transactions table
    const allTransactions = await TestActions.parseTransactionsTable({
      page,
      tableType: 'all',
      maxRows: 10
    });

    // Count transactions with method and age in minutes
    const transactionCount = TestActions.countTransactions(allTransactions, {
      methods: ['transaction'],
      maxAgeInMinutes: 1
    });

    // Verify we found exactly 5 matching transaction
    expect(
      transactionCount,
      `Expected 5 transaction with method="transaction", but found ${transactionCount}. Total transactions: ${allTransactions.length}`
    ).toBe(5);
  });
});
