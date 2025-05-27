import { test } from '@playwright/test';
import {
  accessDapp,
  confirmPem,
  handlePopup,
  login,
  pingPongHandler
} from '../utils/actions';
import {
  GlobalSelectorEnum,
  GlobalDataEnum,
  WalletAdressEnum
} from '../utils/enums';

test.describe('Ping & Pong service test with pem via url', () => {
  test.beforeEach(async ({ page }) => {
    await accessDapp(page);
  });

  test('sign with pem', async ({ page }) => {
    const loginData = {
      selector: GlobalSelectorEnum.pemBtn,
      file: GlobalDataEnum.pemFile,
      address: WalletAdressEnum.adress3,
      urlConnect: true
    };
    await login(page, loginData);
    await page.getByTestId(GlobalSelectorEnum.controlledSendingType).click();
    await confirmPem(page, GlobalDataEnum.pemFile);
    for (let i = 0; i < 5; i++) {
      await page.waitForTimeout(500);
      await page.click(GlobalSelectorEnum.signBtn);
    }
    await handlePopup(page, () =>
      page.locator(GlobalSelectorEnum.lastBatchControlledTransaction).click()
    );
    await page.close();
  });
});
