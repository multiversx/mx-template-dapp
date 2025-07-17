import { test } from '@playwright/test';
import { accessDapp, login, pingPongHandler } from '../utils/actions';
import {
  GlobalDataEnum,
  GlobalSelectorEnum,
  WalletAdressEnum
} from '../utils/enums';

test.describe('Ping & Pong service test', () => {
  test.beforeEach(async ({ page }) => {
    await accessDapp(page);
  });

  test('should sign ping&pong service', async ({ page }) => {
    const loginData = {
      selector: GlobalSelectorEnum.keystoreBtn,
      file: GlobalDataEnum.keystoreFile,
      address: WalletAdressEnum.adress3
    };
    await login(page, loginData);
    await pingPongHandler(page, GlobalSelectorEnum.serviceType);
    await page.close();
  });
});
