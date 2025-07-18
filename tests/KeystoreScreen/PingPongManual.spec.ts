import { test } from '@playwright/test';
import { accessDapp, login, pingPongHandler } from '../utils/actions';
import {
  GlobalDataEnum,
  GlobalSelectorEnum,
  WalletAdressEnum
} from '../utils/enums';

test.describe('Ping & Pong manual test', () => {
  test.beforeEach(async ({ page }) => {
    await accessDapp(page);
  });

  test('should sign ping&pong ABI', async ({ page }) => {
    const loginData = {
      selector: GlobalSelectorEnum.keystoreBtn,
      file: GlobalDataEnum.keystoreFile,
      address: WalletAdressEnum.adress1
    };
    await login(page, loginData);
    await pingPongHandler(page, GlobalSelectorEnum.rawType);
    await page.close();
  });
});
