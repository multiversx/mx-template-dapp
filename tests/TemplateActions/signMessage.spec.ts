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

  test('should display sign message container when clicked', async ({
    page
  }) => {
    // Click LeftPanel - Sign Message
    await page.getByText('Sign Message').first().click();

    // Wait for the sign message container to be visible
    await page
      .locator(SelectorsEnum.signMessageContainer)
      .waitFor({ state: 'visible' });

    // Verify sign message container is visible and in viewport
    const container = page.locator(SelectorsEnum.signMessageContainer);
    await expect(container).toBeVisible();
    await expect(container).toBeInViewport();
  });

  test('should be able to enter message in text input', async ({ page }) => {
    const message = 'mvx';

    // Navigate to sign message page
    await page.getByText('Sign Message').first().click();
    await page
      .locator(SelectorsEnum.signMessageContainer)
      .waitFor({ state: 'visible' });

    // Write a message to be signed
    const messageInput = page.getByRole('textbox', {
      name: 'Write message here'
    });
    await messageInput.fill(message);

    // Verify message was entered correctly
    await expect(messageInput).toHaveValue(message);
  });

  test('should complete full message signing flow', async ({ page }) => {
    const message = 'mvx';

    // Navigate to sign message page and enter message
    await page.getByText('Sign Message').first().click();
    await page
      .locator(SelectorsEnum.signMessageContainer)
      .waitFor({ state: 'visible' });
    await page
      .getByRole('textbox', { name: 'Write message here' })
      .fill(message);

    // Click on Sign button
    await page.getByTestId(SelectorsEnum.signMsgButton).click();

    // Switch to web wallet page
    const walletPage = await TestActions.waitForPageByUrlSubstring({
      page,
      urlSubstring: OriginPageEnum.multiversxWallet
    });

    // Verify wallet page opened
    await expect(walletPage).toHaveURL(/devnet-wallet\.multiversx\.com/);

    // Sign transaction by confirming with keystore in the web wallet
    await TestActions.confirmWalletTransaction(walletPage, keystoreConfig);

    // Click on Sign button to confirm the sign message in the web wallet
    await walletPage.getByTestId(SelectorsEnum.signMsgWalletButton).click();

    // Switch to template dashboard page
    const templatePage = await TestActions.waitForPageByUrlSubstring({
      page,
      urlSubstring: OriginPageEnum.templateDashboard
    });

    // Verify the decoded message matches the original message
    const decodedMessage = templatePage.getByTestId(
      SelectorsEnum.decodedMessage
    );
    await expect(decodedMessage).toBeVisible();
    await expect(decodedMessage).toHaveValue(message);
  });
});
