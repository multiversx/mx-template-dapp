import { expect, test } from '@playwright/test';
import * as TestActions from '../support';
import { readValueFromFile } from '../support';
import { SelectorsEnum, TestDataEnums } from '../support/testdata';

const privateKeyConfig = {
  address: TestDataEnums.keystoreWalletAddress6,
  privateKey: readValueFromFile(TestDataEnums.keystoreFilePath6, 'utf8').trim()
};

test.describe('Connect a wallet', () => {
  // Connect wallet tests verify wallet connection functionality

  test.beforeEach(async ({ page }) => {
    await TestActions.navigateToConnectWallet(page);
  });

  test.describe('In Memory Provider Connection', () => {
    test('should successfully connect with Address and Private Key', async ({
      page
    }) => {
      await TestActions.connectInMemoryProvider({
        page,
        loginMethod: privateKeyConfig
      });

      await TestActions.checkConnectionToWallet(page, privateKeyConfig.address);
    });
  });

  test.describe('Connection Validation', () => {
    test('should handle invalid address', async ({ page }) => {
      const invalidPrivateKeyConfig = {
        address: 'invalid',
        privateKey: privateKeyConfig.privateKey
      };

      // Attempt connection with invalid address
      await TestActions.connectInMemoryProvider({
        page,
        loginMethod: invalidPrivateKeyConfig
      });

      // Expect the address input to show the validation message
      await expect(page.getByTestId('addressInput')).toHaveAttribute(
        'title',
        /valid address/i
      );
    });

    test('should handle invalid private key', async ({ page }) => {
      const invalidPrivateKeyConfig = {
        address: privateKeyConfig.address,
        privateKey: 'invalid'
      };

      // Attempt connection with invalid private key
      await TestActions.connectInMemoryProvider({
        page,
        loginMethod: invalidPrivateKeyConfig
      });

      // Expect the private key input to show the validation message
      await expect(page.getByTestId('privateKeyInput')).toHaveAttribute(
        'title',
        /valid private key/i
      );
    });
  });

  test.describe('Connected Account Details (Optional)', () => {
    test('should display all connected account details correctly', async ({
      page
    }) => {
      // Connect with keystore
      await TestActions.navigateToConnectWallet(page);
      await TestActions.connectInMemoryProvider({
        page,
        loginMethod: privateKeyConfig
      });

      // Verify the topInfo container is visible
      const topInfoContainer = page.getByTestId(SelectorsEnum.topInfoContainer);
      await expect(topInfoContainer).toBeVisible();

      // Verify account address is displayed
      const addressElement = topInfoContainer.getByTestId(
        SelectorsEnum.accountAddress
      );
      await expect(addressElement).toBeVisible();
      await expect(addressElement).toContainText(privateKeyConfig.address);

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
