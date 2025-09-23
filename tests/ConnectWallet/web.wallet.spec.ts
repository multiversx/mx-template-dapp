import { test } from '@playwright/test';

import {
  checkConnectionToWallet,
  connectWebWallet,
  navigateToConnectWallet
} from '../support/actions';
import { TestDataEnums } from '../support/test.data';

const keystoreConfig = {
  keystore: TestDataEnums.keystoreFilePath,
  password: TestDataEnums.keystoreFilePassword
};

const pemConfig = {
  pem: TestDataEnums.pemFilePath
};

test.describe('Connect a wallet', () => {
  test.beforeEach(async ({ page }) => {
    await navigateToConnectWallet(page);
  });

  test('should be able to connect to Web Wallet with Keystore file', async ({
    page
  }) => {
    await connectWebWallet(page, keystoreConfig);

    await checkConnectionToWallet(page, TestDataEnums.keystoreWalletAddress);
  });

  test('should be able to connect to Web Wallet with PEM file', async ({
    page
  }) => {
    await connectWebWallet(page, pemConfig);

    await checkConnectionToWallet(page, TestDataEnums.pemWalletAddress);
  });
});
