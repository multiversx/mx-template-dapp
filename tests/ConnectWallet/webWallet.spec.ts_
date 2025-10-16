import { expect, test } from '@playwright/test';
import * as TestActions from '../support';
import { SelectorsEnum, TestDataEnums } from '../support/testdata';

const keystoreConfig = {
  keystore: TestDataEnums.keystoreFilePath1,
  password: TestDataEnums.keystorePassword1
};

const pemConfig = {
  pem: TestDataEnums.keystoreFilePath5
};

test.describe('Connect a wallet', () => {
  // Connect wallet tests verify wallet connection functionality

  test.beforeEach(async ({ page }) => {
    await TestActions.navigateToConnectWallet(page);
  });

  test.describe('Keystore Connection', () => {
    test('should successfully connect with keystore file', async ({ page }) => {
      await TestActions.connectWebWallet({ page, loginMethod: keystoreConfig });

      await TestActions.checkConnectionToWallet(
        page,
        TestDataEnums.keystoreWalletAddress1
      );
    });
  });

  test.describe('PEM Connection', () => {
    test('should successfully connect with PEM file', async ({ page }) => {
      await TestActions.connectWebWallet({ page, loginMethod: pemConfig });

      await TestActions.checkConnectionToWallet(
        page,
        TestDataEnums.keystoreWalletAddress5
      );
    });
  });

  test.describe('Connection Validation', () => {
    test('should handle missing password for keystore', async ({ page }) => {
      // Test with keystore but no password
      const invalidKeystoreConfig = {
        keystore: TestDataEnums.keystoreFilePath1,
        password: undefined
      };

      // This should throw an error for missing password
      await expect(
        TestActions.connectWebWallet({
          page,
          loginMethod: invalidKeystoreConfig
        })
      ).rejects.toThrow('Password is required when using a keystore');
    });
  });

  test.describe('Connected Account Details', () => {
    test('should display all connected account details correctly', async ({
      page
    }) => {
      // Connect with keystore
      await TestActions.navigateToConnectWallet(page);
      await TestActions.connectWebWallet({
        page,
        loginMethod: keystoreConfig
      });

      // Verify the topInfo container is visible
      const topInfoContainer = page.getByTestId(SelectorsEnum.topInfoContainer);
      await expect(topInfoContainer).toBeVisible();

      // Verify account address is displayed
      const addressElement = topInfoContainer.getByTestId(
        SelectorsEnum.accountAddress
      );
      await expect(addressElement).toBeVisible();
      await expect(addressElement).toContainText(
        TestDataEnums.keystoreWalletAddress1
      );

      // Verify herotag section is present and should be N/A
      const herotagElement = topInfoContainer.getByTestId(
        SelectorsEnum.heroTag
      );
      await expect(herotagElement).toBeVisible();
      await expect(herotagElement).toContainText('N/A');

      // Verify shard information is displayed
      const shardElement = topInfoContainer.getByTestId(SelectorsEnum.shard);
      await expect(shardElement).toBeVisible();
      // Shard should contain a number (0, 1, or 2)
      const shardText = await shardElement.textContent();
      expect(shardText).toMatch(/^[0-2]$/);

      // Verify balance is displayed and extract the value
      const balance = await TestActions.extractBalanceFromContainer({
        page,
        containerSelector: SelectorsEnum.topInfoContainer,
        selectorType: 'testId'
      });

      // Verify balance is a positive number
      expect(balance).toBeGreaterThan(0);
    });
  });
});
