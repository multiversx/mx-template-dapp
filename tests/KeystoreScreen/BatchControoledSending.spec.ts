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

test.describe('Batch controlled sending', () => {
  test.beforeEach(async ({ page }) => {
    await accessDapp(page);
  });

  test('should sign & batch controlled sending ', async ({ page }) => {
    const loginData = {
      selector: GlobalSelectorEnum.keystoreBtn,
      file: GlobalDataEnum.keystoreFile,
      address: WalletAdressEnum.adress5
    };
    await login(page, loginData);
    await batchTransactions(page, GlobalSelectorEnum.controlledSendingType);
    await page.waitForTimeout(8000);
    await handlePopup(page);
    await page.close();
  });
});
