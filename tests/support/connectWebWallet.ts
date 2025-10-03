import { expect } from '@playwright/test';
import { TEST_CONSTANTS } from './constants';
import { OriginPageEnum, SelectorsEnum } from './testdata';
import { getTestIdSelector } from './testIdSelector';
import {
  AuthenticateWithKeystoreType,
  AuthenticateWithPemType,
  ConnectWebWalletType
} from './types';
import { waitForPageByUrlSubstring } from './waitForPageByUrlSubstring';

const authenticateWithKeystore = async ({
  walletPage,
  keystorePath,
  keystorePassword
}: AuthenticateWithKeystoreType) => {
  await walletPage.getByTestId(SelectorsEnum.keystoreButton).click();
  await walletPage.setInputFiles(
    getTestIdSelector(SelectorsEnum.walletFile),
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
}: AuthenticateWithPemType) => {
  await walletPage.getByTestId(SelectorsEnum.pemButton).click();
  await walletPage.setInputFiles(
    getTestIdSelector(SelectorsEnum.walletFile),
    pemPath
  );
  await walletPage.getByTestId(SelectorsEnum.submitButton).click();
};

export const connectWebWallet = async ({
  page,
  loginMethod
}: ConnectWebWalletType) => {
  // Click the cross-window button to open wallet
  await page.getByTestId(SelectorsEnum.crossWindow).click();

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

  // Authenticate with keystore
  if (loginMethod.keystore) {
    if (!loginMethod.password) {
      throw new Error('Password is required when using a keystore.');
    }
    await authenticateWithKeystore({
      walletPage,
      keystorePath: loginMethod.keystore,
      keystorePassword: loginMethod.password
    });

    try {
      await walletPage.waitForEvent('close', {
        timeout: TEST_CONSTANTS.PAGE_CLOSE_TIMEOUT
      });
    } catch (error) {
      // do nothing
    }
    return;
  }

  // Authenticate with PEM
  if (loginMethod.pem) {
    await authenticateWithPem({
      walletPage,
      pemPath: loginMethod.pem
    });

    try {
      await walletPage.waitForEvent('close', {
        timeout: TEST_CONSTANTS.PAGE_CLOSE_TIMEOUT
      });
    } catch (error) {
      // do nothing
    }
    return;
  }
};
