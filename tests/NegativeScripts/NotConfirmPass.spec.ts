import { test, expect } from '@playwright/test';
import { accessDapp, initTransaction, login } from '../utils/actions';
import {
  GlobalSelectorEnum,
  GlobalDataEnum,
  WalletAdressEnum
} from '../utils/enums';

test.describe('test invalid password', () => {
  test.beforeEach(async ({ page }) => {
    await accessDapp(page);
  });

  test('3 invalid password', async ({ page, browser, context }) => {
    const loginData = {
      selector: GlobalSelectorEnum.keystoreBtn,
      file: GlobalDataEnum.keystoreFile,
      address: WalletAdressEnum.adress3
    };
    await login(page, loginData);
    const walletpage = await initTransaction(page);
    for (let i = 0; i < 3; i++) {
      await walletpage.getByTestId(GlobalSelectorEnum.accesPass).fill('test');
      await walletpage.locator(GlobalSelectorEnum.accesWalletBtn).click();
    }
    await expect(
      page.getByText(GlobalDataEnum.transactionCanceled)
    ).toBeVisible();
    await page.close();
  });
});
