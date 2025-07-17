import { expect, test } from '@playwright/test';
import {
  accessDapp,
  findPageByUrlSubstring,
  initTransaction,
  login
} from '../utils/actions';
import {
  GlobalDataEnum,
  GlobalSelectorEnum,
  OriginPageEnum,
  WalletAdressEnum
} from '../utils/enums';

test.describe('test refresh window', () => {
  test.beforeEach(async ({ page }) => {
    await accessDapp(page);
  });

  test('reload and wallet window and close it', async ({ page, context }) => {
    const loginData = {
      selector: GlobalSelectorEnum.keystoreBtn,
      file: GlobalDataEnum.keystoreFile,
      address: WalletAdressEnum.adress3
    };
    await login(page, loginData);
    await initTransaction(page);
    const wallePage = await findPageByUrlSubstring(
      page,
      OriginPageEnum.multiversxWallet
    );
    await page.waitForTimeout(3000);
    try {
      await wallePage.reload();
      await wallePage.waitForLoadState('load');
    } catch (error) {
      console.error('Error during page reload:', error);
    }
    const pages = await context.pages();
    expect(pages.length).toBeGreaterThan(0);
    await page.close();
  });
});
