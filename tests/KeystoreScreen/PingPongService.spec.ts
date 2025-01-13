import { test } from '@playwright/test';
import { accessDaap, login, pingPongHandler } from '../utils/actions';
import {
  GlobalSelectorEnum,
  GlobalDataEnum,
  WalletAdressEnum
} from '../utils/enums';

test.describe('Ping & Pong service test', () => {
  test.beforeEach(async ({ page }) => {
    await accessDaap(page);
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
