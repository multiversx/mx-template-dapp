import { test } from '@playwright/test';
import { accessDapp, login, pingPongHandler } from '../utils/actions';
import {
  GlobalSelectorEnum,
  GlobalDataEnum,
  WalletAdressEnum
} from '../utils/enums';

test.describe('Ping & Pong service test with pem', () => {
  test.beforeEach(async ({ page }) => {
    await accessDapp(page);
  });

  test('sign with pem', async ({ page }) => {
    const loginData = {
      selector: GlobalSelectorEnum.pemBtn,
      file: GlobalDataEnum.pemFile,
      address: WalletAdressEnum.adress3
    };
    await login(page, loginData);
    await pingPongHandler(page, GlobalSelectorEnum.serviceType, 'pem');
    await page.close();
  });
});
