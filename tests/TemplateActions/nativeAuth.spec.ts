import { test, expect } from '@playwright/test';

import * as TestActions from '../support';
import { TestDataEnums, SelectorsEnum } from '../support/testdata';
import { extractBalanceFromContainer } from '../support';

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

  test('should display native auth container when clicked', async ({
    page
  }) => {
    // Click LeftPanel - Native auth
    await page.getByText('Native auth').first().click();

    // Wait for the native auth container to be visible
    await page
      .locator(SelectorsEnum.nativeAuthContainer)
      .waitFor({ state: 'visible' });

    // Verify native auth container is visible and in viewport
    const container = page.locator(SelectorsEnum.nativeAuthContainer);
    await expect(container).toBeVisible();
    await expect(container).toBeInViewport();
  });

  test('should display correct wallet address and balance in native auth', async ({
    page
  }) => {
    // Get account balance before any actions
    const accountBalance = await TestActions.extractBalanceFromContainer({
      page,
      containerSelector: SelectorsEnum.topInfoContainer,
      selectorType: 'testId'
    });

    // Navigate to native auth page
    await page.getByText('Native auth').first().click();
    await page.waitForLoadState('networkidle');
    await page
      .locator(SelectorsEnum.nativeAuthContainer)
      .waitFor({ state: 'visible' });

    // Verify container is in viewport
    const container = page.locator(SelectorsEnum.nativeAuthContainer);
    await expect(container).toBeInViewport();

    // Check that the address is displayed and matches the account address
    const nativeAuthAddress = page
      .locator(SelectorsEnum.nativeAuthContainer)
      .getByTestId(SelectorsEnum.trimFullAddress);

    await expect(nativeAuthAddress).toHaveText(
      TestDataEnums.keystoreWalletAddress
    );

    // Check that the balance is displayed and matches the account balance
    const nativeAuthBalance = await extractBalanceFromContainer({
      page,
      containerSelector: SelectorsEnum.nativeAuthContainer,
      selectorType: 'locator'
    });

    await expect(nativeAuthBalance).toBe(accountBalance);
  });
});
