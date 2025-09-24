import { test, expect } from '@playwright/test';

import * as TestActions from '../support';
import { TestDataEnums, SelectorsEnum } from '../support/testdata';

const keystoreConfig = {
  keystore: TestDataEnums.keystoreFilePath,
  password: TestDataEnums.keystoreFilePassword
};

test.describe('Native auth', () => {
  test.beforeEach(async ({ page }) => {
    await TestActions.navigateToConnectWallet(page);
    await TestActions.connectWebWallet({ page, loginMethod: keystoreConfig });
    await TestActions.checkConnectionToWallet(
      page,
      TestDataEnums.keystoreWalletAddress
    );
  });

  test('should be able to use secure authentication token to interact with the backend', async ({
    page
  }) => {
    // Get balance before any actions
    const balance = await TestActions.getCurrentBalance(page);

    // Check that balance is > 0
    expect(balance).toBeGreaterThan(0);

    // Click LeftPanel - Native auth
    await page.getByText('Native auth').first().click();

    // Check that the address is displayed
    const trimFullAddress = page
      .locator(SelectorsEnum.nativeAuthId)
      .getByTestId(SelectorsEnum.nativeAuthTrimFullAddress);
    await expect(trimFullAddress).toHaveText(
      TestDataEnums.keystoreWalletAddress
    );
  });
});
