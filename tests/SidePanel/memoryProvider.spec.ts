import { expect, test } from '@playwright/test';
import * as TestActions from '../support';
import { readValueFromFile } from '../support';
import {
  PingPongEnum,
  SelectorsEnum,
  TestDataEnums
} from '../support/testdata';

const privateKeyConfig = {
  address: TestDataEnums.keystoreWalletAddress6,
  privateKey: readValueFromFile(TestDataEnums.keystoreFilePath6, 'utf8').trim()
};

test.describe('Confirm Transaction With Private Key', () => {
  // Connect wallet tests verify wallet connection functionality

  test.beforeEach(async ({ page }) => {
    await TestActions.navigateToConnectWallet(page);
    await TestActions.connectInMemoryProvider({
      page,
      loginMethod: privateKeyConfig
    });
    await TestActions.checkConnectionToWallet(page, privateKeyConfig.address);
  });

  test.describe('In Memory Provider Connection', () => {
    test('should successfully confirm transaction with Private Key', async ({
      page
    }) => {
      // Initialize ping & pong transaction
      await page.getByText('Ping & Pong (Manual)').first().click();
      await page
        .locator(SelectorsEnum.pingPongAbiContainer)
        .waitFor({ state: 'visible' });

      // Perform Ping or Pong action based on which button is enabled
      const clickedButton = await TestActions.handlePingPong({
        page,
        type: PingPongEnum.raw
      });

      // Wait for side panel to be visible
      await page.locator(SelectorsEnum.sidePanel).waitFor({ state: 'visible' });

      // Define expected value based on the clicked button (ping = 1, pong = 0)
      const expectedValue = Number(clickedButton === 'ping');

      // Check sent amount is as expected
      await expect(
        page.getByTestId('signTransactionsOverviewAmountValue')
      ).toHaveText(`${expectedValue} xEGLD`);

      // Confirm transaction
      await page.getByTestId('signNextTransactionBtn').click();

      // Wait for transaction toast to be displayed
      await TestActions.waitForToastToBeDisplayed(page);

      // Check that the transaction was sent successfully
      await TestActions.waitForTransactionToastToContain({
        page,
        toastContent: `${clickedButton
          .charAt(0)
          .toUpperCase()}${clickedButton.slice(1)} transaction successful`
      });
    });
  });
});
