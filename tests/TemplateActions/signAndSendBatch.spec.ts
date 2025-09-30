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
  // Batch transactions tests verify multiple transaction signing functionality
  // Each test focuses on a specific aspect of the batch transaction process

  test.beforeEach(async ({ page }) => {
    await TestActions.navigateToConnectWallet(page);
    await TestActions.connectWebWallet({ page, loginMethod: keystoreConfig });
    await TestActions.checkConnectionToWallet(
      page,
      TestDataEnums.keystoreWalletAddress
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

    // Verify batch transactions container is visible and in viewport
    const container = page.locator(SelectorsEnum.batchTransactionsContainer);
    await expect(container).toBeVisible();
    await expect(container).toBeInViewport();
  });

  test('should complete full batch transaction flow', async ({ page }) => {
    const numberOfTransactions = 5;

    // Navigate to batch transactions page and initiate signing
    await page.getByText('Batch Transactions').first().click();
    await page
      .locator(SelectorsEnum.nativeAuthContainer)
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

    // Verify we're back on the template page
    await expect(templatePage).toHaveURL(/localhost:3000/);

    // Wait for transaction toast to be displayed
    await TestActions.waitForToastToBeDisplayed(templatePage);

    // Check that the transaction toast shows that all transactions are signed
    await TestActions.checkToastShowsTransactionsSigned(
      templatePage,
      numberOfTransactions
    );
  });
});
