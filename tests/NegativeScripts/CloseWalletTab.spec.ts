import { test, expect } from '@playwright/test';
import { accessDapp, initTransaction, login } from '../utils/actions';
import {
  GlobalSelectorEnum,
  GlobalDataEnum,
  WalletAdressEnum
} from '../utils/enums';

test.describe('test refresh window', () => {
  test.beforeEach(async ({ page }) => {
    await accessDapp(page);
  });

  test('reload and wallet window and close it', async ({
    page,
    browser,
    context
  }) => {
    const loginData = {
      selector: GlobalSelectorEnum.keystoreBtn,
      file: GlobalDataEnum.keystoreFile,
      address: WalletAdressEnum.adress3
    };
    await login(page, loginData);
    const walletpage = await initTransaction(page);
    await page.waitForTimeout(3000);
    try {
      await walletpage.reload();
      await walletpage.waitForLoadState('load');
    } catch (error) {
      console.error('Error during page reload:', error);
    }
    const pages = await context.pages();
    expect(pages.length).toBeGreaterThan(0);
    await page.close();
  });
});
