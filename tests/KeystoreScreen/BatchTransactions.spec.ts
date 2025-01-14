import { test } from '@playwright/test';
import {
  accessDapp,
  batchTransactions,
  handlePopup,
  login,
  pingPongHandler
} from '../utils/actions';
import {
  GlobalSelectorEnum,
  GlobalDataEnum,
  WalletAdressEnum
} from '../utils/enums';

test.describe('Batch transaction test', () => {
  test.beforeEach(async ({ page }) => {
    await accessDapp(page);
  });

  test('should sign swap & lock transactions', async ({ page }) => {
    const loginData = {
      selector: GlobalSelectorEnum.keystoreBtn,
      file: GlobalDataEnum.keystoreFile,
      address: WalletAdressEnum.adress4
    };
    await login(page, loginData);
    await batchTransactions(page, GlobalSelectorEnum.swapLockType);
    await page.waitForTimeout(8000);
    await handlePopup(page, () =>
      page.locator(GlobalSelectorEnum.lastBatchTransaction).click()
    );
    await page.close();
  });
});
