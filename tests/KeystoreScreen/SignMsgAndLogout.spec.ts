import { test, expect } from '@playwright/test';
import {
  accessDaap,
  confirmPass,
  login,
  pingPongHandler
} from '../utils/actions';
import {
  GlobalSelectorEnum,
  GlobalDataEnum,
  WalletAdressEnum
} from '../utils/enums';

test.describe('sign msg test ', () => {
  test.beforeEach(async ({ page }) => {
    await accessDaap(page);
  });

  test('should sign msg and logout', async ({ page }) => {
    const loginData = {
      selector: GlobalSelectorEnum.keystoreBtn,
      file: GlobalDataEnum.keystoreFile,
      address: WalletAdressEnum.adress3
    };
    await login(page, loginData);
    await page.getByPlaceholder('Write message here').fill('Test msg ###');
    const [walletPage] = await Promise.all([
      page.waitForEvent('popup'),
      page.locator(GlobalSelectorEnum.signMsgBtn).click()
    ]);
    await confirmPass(walletPage);
    await walletPage.getByTestId(GlobalSelectorEnum.signButton).click();
    await expect(
      page.locator('#sign-message div').filter({ hasText: 'Signature:' }).nth(1)
    ).toBeVisible();
    await expect(page.getByText('Test msg ###')).toBeVisible();
    await page.getByRole('button', { name: 'Close' }).click();
    await expect(page.getByText('LoginChoose a login method')).toBeVisible();
    await page.close();
  });
});
