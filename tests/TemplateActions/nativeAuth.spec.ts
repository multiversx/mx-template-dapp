import { expect, test } from '@playwright/test';
import * as TestActions from '../support/template';
import { extractBalanceFromContainer } from '../support/template';
import { SelectorsEnum, TestDataEnums } from '../support/template/testdata';

const keystoreConfig = {
  keystore: TestDataEnums.keystoreFilePath1,
  password: TestDataEnums.keystorePassword1,
  address: TestDataEnums.keystoreWalletAddress1
};

test.describe('Native auth', () => {
  test.beforeEach(async ({ page }) => {
    await TestActions.navigateToConnectWallet(page);
    await TestActions.connectWebWallet({ page, loginMethod: keystoreConfig });
    await TestActions.checkConnectionToWallet(page, keystoreConfig.address);
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

    const maxProfileAttempts = 4;
    for (let attempt = 1; attempt <= maxProfileAttempts; attempt++) {
      const addressVisible = await container
        .getByText(keystoreConfig.address, { exact: false })
        .first()
        .isVisible()
        .catch(() => false);

      if (addressVisible || attempt === maxProfileAttempts) {
        break;
      }

      await page.reload();
      await page.waitForLoadState('networkidle');
      await container.waitFor({ state: 'visible' });
      await container.scrollIntoViewIfNeeded();
    }

    await expect(container).toContainText(keystoreConfig.address);

    // Check that the balance is displayed and matches the account balance
    const nativeAuthBalance = await extractBalanceFromContainer({
      page,
      containerSelector: SelectorsEnum.nativeAuthContainer,
      selectorType: 'locator'
    });

    await expect(nativeAuthBalance).toBe(accountBalance);
  });
});
