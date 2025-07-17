import { test } from '@playwright/test';
import {
  accessDapp,
  batchTransactions,
  handlePopup,
  login
} from '../utils/actions';
import {
  GlobalDataEnum,
  GlobalSelectorEnum,
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
    await handlePopup(page);
    await page.close();
  });
});
