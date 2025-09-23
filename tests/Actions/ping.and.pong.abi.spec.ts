import { test, expect } from '@playwright/test';

import {
  checkConnectionToWallet,
  connectWebWallet,
  handlePingPong,
  navigateToConnectWallet,
  confirmWalletTx,
  checkButtonStatus,
  getCurrentBalance,
  verifyBalanceChange,
  waitForToastToBeDisplayed,
  waitForPageByUrlSubstring
} from '../support/actions';
import {
  TestDataEnums,
  PingPongEnum,
  OriginPageEnum,
  SelectorsEnum
} from '../support/test.data';
import { TEST_CONSTANTS } from '../support/constants';

const keystoreConfig = {
  keystore: TestDataEnums.keystoreFilePath,
  password: TestDataEnums.keystoreFilePassword
};

test.describe('Ping & Pong', () => {
  test.beforeEach(async ({ page }) => {
    await navigateToConnectWallet(page);
    await connectWebWallet(page, keystoreConfig);
    await checkConnectionToWallet(page, TestDataEnums.keystoreWalletAddress);
  });

  test('should be able to sign Ping & Pong (ABI) with the Web Wallet', async ({
    page
  }) => {
    // Get initial balance before any actions
    const initialBalance = await getCurrentBalance(page);

    // Check that initial balance is greater than the minimum required
    expect(initialBalance).toBeGreaterThan(
      TEST_CONSTANTS.MIN_BALANCE_FOR_PING_PONG
    );

    // Click LeftPanel - Ping & Pong (ABI)
    await page.getByText('Ping & Pong (ABI)').first().click();

    // Perform Ping or Pong action based on which button is enabled
    const clickedButton = await handlePingPong(page, PingPongEnum.abi);

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

    // Sign transaction by confirming with keystore or pem
    await confirmWalletTx(walletPage, keystoreConfig);

    // Click on Sign button to confirm the transaction in the web wallet
    await walletPage.getByTestId(SelectorsEnum.signButton).click();

    // Wait for transaction toast to be displayed
    await waitForToastToBeDisplayed(page);

    // Check balance change based on the action performed
    await verifyBalanceChange(page, initialBalance, clickedButton);

    // Check that the button status changed after the action
    await checkButtonStatus(page, PingPongEnum.abi, clickedButton);
  });
});
