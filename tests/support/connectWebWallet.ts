import { expect, Page } from '@playwright/test';

import { OriginPageEnum, SelectorsEnum } from './testdata';
import { waitForPageByUrlSubstring } from './waitForPageByUrlSubstring';

const authenticateWithKeystore = async ({
  walletPage,
  keystorePath,
  keystorePassword
}: {
  walletPage: Page;
  keystorePath: string;
  keystorePassword: string;
}) => {
  await walletPage.getByTestId(SelectorsEnum.keystoreBtn).click();
  await walletPage.setInputFiles(
    `[data-testid="${SelectorsEnum.walletFile}"]`,
    keystorePath
  );

  const passwordInput = walletPage.getByTestId(SelectorsEnum.passwordInput);
  await expect(passwordInput).toBeVisible();
  await passwordInput.fill(keystorePassword);

  await walletPage.getByTestId(SelectorsEnum.submitButton).click();
  await walletPage.getByTestId(SelectorsEnum.confirmButton).click();
};

const authenticateWithPem = async ({
  walletPage,
  pemPath
}: {
  walletPage: Page;
  pemPath: string;
}) => {
  await walletPage.getByTestId(SelectorsEnum.pemBtn).click();
  await walletPage.setInputFiles(
    `[data-testid="${SelectorsEnum.walletFile}"]`,
    pemPath
  );
  await walletPage.getByTestId(SelectorsEnum.submitButton).click();
};

export const connectWebWallet = async ({
  page,
  loginMethod
}: {
  page: Page;
  loginMethod: {
    keystore?: string;
    pem?: string;
    password?: string;
  };
}) => {
  // Click the cross-window button to open wallet
  await page.getByTestId(SelectorsEnum.crossWindow).click();

  // Add a small delay to ensure the click is processed
  await page.waitForTimeout(1000);

  // Debug: Check what pages exist before waiting
  const pagesBefore = await page.context().pages();
  console.log(
    `Pages before waiting: ${pagesBefore.map((p) => p.url()).join(', ')}`
  );

  // Wait for the web wallet page to be loaded which is the new tab
  const walletPage = await waitForPageByUrlSubstring({
    page,
    urlSubstring: OriginPageEnum.multiversxWallet
  });

  // If the web wallet page is not loaded, throw an error
  if (!walletPage) {
    throw new Error(
      `Web wallet page containing ${OriginPageEnum.multiversxWallet} is not loaded.`
    );
  }

  if (loginMethod.keystore) {
    if (!loginMethod.password) {
      throw new Error('Password is required when using a keystore.');
    }
    await authenticateWithKeystore({
      walletPage,
      keystorePath: loginMethod.keystore,
      keystorePassword: loginMethod.password
    });
  } else if (loginMethod.pem) {
    await authenticateWithPem({
      walletPage,
      pemPath: loginMethod.pem
    });
  }

  await walletPage.waitForEvent('close');
};
