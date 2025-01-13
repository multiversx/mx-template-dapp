import { test } from '@playwright/test';
import {
  accessDaap,
  batchTransactions,
  handlePopup,
  login
} from '../utils/actions';
import {
  GlobalSelectorEnum,
  GlobalDataEnum,
  WalletAdressEnum
} from '../utils/enums';

test.describe('sign and batch', () => {
  test.beforeEach(async ({ page }) => {
    await accessDaap(page);
  });

  test('should sign sign & batch ', async ({ page }) => {
    const loginData = {
      selector: GlobalSelectorEnum.keystoreBtn,
      file: GlobalDataEnum.keystoreFile,
      address: WalletAdressEnum.adress6
    };
    await login(page, loginData);
    await batchTransactions(page, GlobalSelectorEnum.signAndBatchType);
    await page.waitForTimeout(8000);
    await handlePopup(page, () =>
      page.locator(GlobalSelectorEnum.lastBatchControlledTransaction).click()
    );
    await page.close();
  });
});
