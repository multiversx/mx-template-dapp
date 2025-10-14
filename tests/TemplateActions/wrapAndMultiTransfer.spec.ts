import { expect, test } from '@playwright/test';
import * as TestActions from '../support';
import { TEST_CONSTANTS } from '../support/constants';
import {
  OriginPageEnum,
  SelectorsEnum,
  TestDataEnums
} from '../support/testdata';

const keystoreConfig = {
  keystore: TestDataEnums.keystoreFilePath4,
  password: TestDataEnums.keystorePassword4
};

test.describe('Wrap & Multi-Transfer', async () => {
  test.beforeEach(async ({ page }) => {
    await TestActions.navigateToConnectWallet(page);
    await TestActions.connectWebWallet({ page, loginMethod: keystoreConfig });
    await TestActions.checkConnectionToWallet(
      page,
      TestDataEnums.keystoreWalletAddress4
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

    // Check that account balance is greater than 4 required for wrap and multi-transfer
    expect(accountBalance).toBeGreaterThan(
      TEST_CONSTANTS.MIN_BALANCE_FOR_WRAP_AND_MULTI_TRANSFER
    );
  });

  test('should display batch transactions container when clicked', async ({
    page
  }) => {
    // Navigate to batch transactions page and initiate signing
    await page.getByText('Batch Transactions').first().click();

    // Wait for the batch transactions container to be visible
    await page
      .locator(SelectorsEnum.batchTransactionsContainer)
      .waitFor({ state: 'visible' });

    // Verify batch transactions container is visible
    const container = page.locator(SelectorsEnum.batchTransactionsContainer);
    await expect(container).toBeVisible();
  });

  test('should complete full batch transaction flow', async ({ page }) => {
    const numberOfTransactions = 4; // 2 transactions for wrap, 1 for swap, 1 for multi-transfer

    // Navigate to batch transactions page and initiate signing
    await page.getByText('Batch Transactions').first().click();
    await page
      .locator(SelectorsEnum.batchTransactionsContainer)
      .waitFor({ state: 'visible' });
    await page.getByTestId(SelectorsEnum.wrapAndMultiTransferButton).click();

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

    // Check that the first 2 transactions were signed
    // the third transaction is expected to fail
    await TestActions.waitForTransactionToastToContain({
      page: templatePage,
      toastContent: '0 / 3 transactions processed'
    });

    // Check that the third transaction failed
    await TestActions.waitForTransactionToastToContain({
      page: templatePage,
      toastTitle: 'Multi-Transfer Failed'
    });
  });
});
