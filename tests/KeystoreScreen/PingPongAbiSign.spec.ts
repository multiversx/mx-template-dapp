import { test } from '@playwright/test';
import { accessDapp, login, pingPongHandler } from '../utils/actions';
import {
  GlobalSelectorEnum,
  GlobalDataEnum,
  WalletAdressEnum
} from '../utils/enums';

test.describe('Ping & Pong ABI test', () => {
  test.beforeEach(async ({ page }) => {
    await accessDapp(page);
  });

  test('should sign ping&pong ABI', async ({ page }) => {
    const loginData = {
      selector: GlobalSelectorEnum.keystoreBtn,
      file: GlobalDataEnum.keystoreFile,
      address: WalletAdressEnum.adress2
    };
    await login(page, loginData);
    await pingPongHandler(page, GlobalSelectorEnum.abiType);
    await page.close();
  });
});
