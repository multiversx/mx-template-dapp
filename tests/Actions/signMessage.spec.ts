import { test, expect } from '@playwright/test';

import * as TestActions from '../support';
import {
  TestDataEnums,
  SelectorsEnum,
  OriginPageEnum
} from '../support/testdata';

const keystoreConfig = {
  keystore: TestDataEnums.keystoreFilePath,
  password: TestDataEnums.keystoreFilePassword
};

test.describe('Sign Message', () => {
  test.beforeEach(async ({ page }) => {
    await TestActions.navigateToConnectWallet(page);
    await TestActions.connectWebWallet({ page, loginMethod: keystoreConfig });
    await TestActions.checkConnectionToWallet(
      page,
      TestDataEnums.keystoreWalletAddress
    );
  });

  test('should be able to sign Message with the Web Wallet', async ({
    page
  }) => {
    const message = 'mvx';

    // Click LeftPanel - Sign Message
    await page.getByText('Sign Message').first().click();

    // Write a message to be signed
    await page
      .getByRole('textbox', { name: 'Write message here' })
      .fill(message);

    // Click on Sign button
    await page.getByTestId(SelectorsEnum.signMsgBtn).click();

    // Wait for the web wallet page to be loaded which is the new tab
    const walletPage = await TestActions.waitForPageByUrlSubstring({
      page,
      urlSubstring: OriginPageEnum.multiversxWallet
    });

    // Sign transaction by confirming with keystore in the web wallet
    await TestActions.confirmWalletTransaction(walletPage, keystoreConfig);

    // Click on Sign button to confirm the sign message in the web wallet
    await walletPage.getByTestId(SelectorsEnum.signMsgWalletBtn).click();

    // Check that the decoded message is displayed which means the message was signed
    await expect(page.getByPlaceholder('Decoded message')).toHaveValue(message);
    // TODO: also check the encoded message and signature when testId are added
  });
});
