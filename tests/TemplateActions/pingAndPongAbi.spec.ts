import { expect, test } from '@playwright/test';
import * as TestActions from '../support';
import { TEST_CONSTANTS } from '../support/constants';
import {
  OriginPageEnum,
  PingPongEnum,
  SelectorsEnum,
  TestDataEnums
} from '../support/testdata';

const pemConfig = {
  pem: TestDataEnums.pemFilePath1
};

test.describe('Ping & Pong (ABI)', () => {
  // Note: Ping/Pong buttons have a 3-minute cooldown period after being clicked

  test.beforeEach(async ({ page }) => {
    await TestActions.navigateToConnectWallet(page);
    await TestActions.connectWebWallet({ page, loginMethod: pemConfig });
    await TestActions.checkConnectionToWallet(
      page,
      TestDataEnums.pemWalletAddress1
    );
  });

  test('should have sufficient balance for ping & pong operations', async ({
    page
  }) => {
    // Get account balance before any actions
    const accountBalance = await TestActions.extractBalanceFromContainer({
      page,
      containerSelector: SelectorsEnum.topInfoContainer,
      selectorType: 'testId'
    });

    // Check that account balance is greater than 1 required for ping & pong
    expect(accountBalance).toBeGreaterThan(
      TEST_CONSTANTS.MIN_BALANCE_FOR_PING_PONG
    );
  });

  test('should display ping & pong (ABI) container when clicked', async ({
    page
  }) => {
    // Click LeftPanel - Ping & Pong (ABI)
    await page.getByText('Ping & Pong (ABI)').first().click();

    // Wait for the ping & pong (ABI) container to be visible
    await page
      .locator(SelectorsEnum.pingPongAbiContainer)
      .waitFor({ state: 'visible' });

    // Verify ping & pong (ABI) container is visible and in viewport
    const container = page.locator(SelectorsEnum.pingPongAbiContainer);
    await expect(container).toBeVisible();
    await expect(container).toBeInViewport();
  });

  test('should be able to perform ping or pong action', async ({ page }) => {
    // Navigate to ping & pong page
    await page.getByText('Ping & Pong (ABI)').first().click();
    await page
      .locator(SelectorsEnum.pingPongAbiContainer)
      .waitFor({ state: 'visible' });

    // Perform Ping or Pong action based on which button is enabled
    const clickedButton = await TestActions.handlePingPong({
      page,
      type: PingPongEnum.abi
    });

    // Verify a button was clicked (either ping or pong)
    expect(['ping', 'pong']).toContain(clickedButton);

    // Note: After clicking, buttons have a 3-minute cooldown period
  });

  test('should complete full ping/pong transaction flow', async ({ page }) => {
    // Get account balance before any actions
    const accountBalance = await TestActions.extractBalanceFromContainer({
      page,
      containerSelector: SelectorsEnum.topInfoContainer,
      selectorType: 'testId'
    });

    // Navigate to ping & pong page and perform action
    await page.getByText('Ping & Pong (ABI)').first().click();
    await page
      .locator(SelectorsEnum.pingPongAbiContainer)
      .waitFor({ state: 'visible' });

    const clickedButton = await TestActions.handlePingPong({
      page,
      type: PingPongEnum.abi
    });

    // Switch to web wallet page
    const walletPage = await TestActions.waitForPageByUrlSubstring({
      page,
      urlSubstring: OriginPageEnum.multiversxWallet
    });

    // Verify wallet page opened
    await expect(walletPage).toHaveURL(/devnet-wallet\.multiversx\.com/);

    // Sign transaction by confirming with pem
    await TestActions.confirmWalletTransaction(walletPage, pemConfig);

    // Click on Sign button to confirm the transaction in the web wallet
    await walletPage.getByTestId(SelectorsEnum.signButton).click();

    // Switch to template dashboard page
    const templatePage = await TestActions.waitForPageByUrlSubstring({
      page,
      urlSubstring: OriginPageEnum.templateDashboard
    });

    // Wait for transaction toast to be displayed
    await TestActions.waitForToastToBeDisplayed(templatePage);

    // Check balance change based on the clicked button
    await TestActions.checkPingPongBalanceUpdate({
      page: templatePage,
      containerSelector: SelectorsEnum.topInfoContainer,
      initialBalance: accountBalance,
      isPing: clickedButton === 'ping'
    });

    // Check that the button status changed after the action
    await TestActions.checkButtonStatus({
      page,
      type: PingPongEnum.abi,
      lastClickedButton: clickedButton
    });

    // Parse ping/pong transactions table
    const allTransactions = await TestActions.parseTransactionsTable({
      page,
      tableType: 'ping-pong',
      maxRows: 5
    });

    // Define expected value based on the clicked button (ping = 1, pong = 0)
    const expectedValue = Number(clickedButton === 'ping');

    // Count ping/pong transactions with exact value and method and age in minutes
    const transactionCount = TestActions.countTransactions(allTransactions, {
      exactValue: expectedValue, // ping = 1, pong = 0
      methods: [clickedButton], // ping or pong
      maxAgeInMinutes: 3
    });

    // Verify we found exactly 1 matching transaction
    expect(
      transactionCount,
      `Expected 1 transaction with method="${clickedButton}" and value=${expectedValue}, but found ${transactionCount}. Total transactions: ${allTransactions.length}`
    ).toBe(1);
  });
});
