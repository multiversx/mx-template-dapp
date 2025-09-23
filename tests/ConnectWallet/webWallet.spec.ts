import { test } from '@playwright/test';

import * as TestActions from '../support';
import { TestDataEnums } from '../support/testdata';

const keystoreConfig = {
  keystore: TestDataEnums.keystoreFilePath,
  password: TestDataEnums.keystoreFilePassword
};

const pemConfig = {
  pem: TestDataEnums.pemFilePath
};

test.describe('Connect a wallet', () => {
  test.beforeEach(async ({ page }) => {
    await TestActions.navigateToConnectWallet(page);
  });

  test('should be able to connect to Web Wallet with Keystore file', async ({
    page
  }) => {
    await TestActions.connectWebWallet({ page, loginMethod: keystoreConfig });

    await TestActions.checkConnectionToWallet(
      page,
      TestDataEnums.keystoreWalletAddress
    );
  });

  test('should be able to connect to Web Wallet with PEM file', async ({
    page
  }) => {
    await TestActions.connectWebWallet({ page, loginMethod: pemConfig });

    await TestActions.checkConnectionToWallet(
      page,
      TestDataEnums.pemWalletAddress
    );
  });
});
