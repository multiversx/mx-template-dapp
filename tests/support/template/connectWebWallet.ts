import { TEST_CONSTANTS } from './constants';
import { getPageAndWaitForLoad } from './getPageAndWaitForLoad';
import { OriginPageEnum, SelectorsEnum } from './testdata';
import { getTestIdSelector } from './testIdSelector';
import {
  AuthenticateWithKeystoreType,
  AuthenticateWithPemType,
  ConnectWebWalletType
} from './types';

const authenticateWithKeystore = async ({
  walletPage,
  keystorePath,
  keystorePassword
}: AuthenticateWithKeystoreType) => {
  // Click the keystore button
  await walletPage.getByTestId(SelectorsEnum.keystoreButton).click();

  // Upload the keystore file
  await walletPage.setInputFiles(
    getTestIdSelector(SelectorsEnum.walletFile),
    keystorePath
  );

  // Wait for file processing to complete
  await walletPage.waitForLoadState();

  // Fill the password input
  const passwordInput = walletPage.getByTestId(SelectorsEnum.passwordInput);
  await passwordInput.fill(keystorePassword);

  // Wait for file processing to complete
  await walletPage.waitForLoadState();

  // Click the submit button
  await walletPage.getByTestId(SelectorsEnum.submitButton).click();

  // Click the confirm button
  await walletPage.getByTestId(SelectorsEnum.confirmButton).click();
};

const authenticateWithPem = async ({
  walletPage,
  pemPath
}: AuthenticateWithPemType) => {
  // Click the PEM button
  await walletPage.getByTestId(SelectorsEnum.pemButton).click();

  // Upload the PEM file
  await walletPage.setInputFiles(
    getTestIdSelector(SelectorsEnum.walletFile),
    pemPath
  );

  // Wait for file processing to complete
  await walletPage.waitForLoadState();

  // Click the submit button
  await walletPage.getByTestId(SelectorsEnum.submitButton).click();
};

export const connectWebWallet = async ({
  page,
  loginMethod
}: ConnectWebWalletType) => {
  // Click the cross-window button to open wallet
  await page.getByTestId(SelectorsEnum.crossWindow).click();

  // Wait for the web wallet page to be loaded which is the new tab
  const walletPage = await getPageAndWaitForLoad(
    page.context(),
    OriginPageEnum.multiversxWallet
  );

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
