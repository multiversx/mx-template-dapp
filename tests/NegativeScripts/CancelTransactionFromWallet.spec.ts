import { expect, test } from '@playwright/test';
import { accessDapp, login } from '../utils/actions';
import {
  GlobalDataEnum,
  GlobalSelectorEnum,
  WalletAdressEnum
} from '../utils/enums';
import { closeTransaction } from './actions';

test.describe('cancel transaction from wallet window', () => {
  test.beforeEach(async ({ page }) => {
    await accessDapp(page);
  });

  test('should cancel transaction', async ({ page }) => {
    const loginData = {
      selector: GlobalSelectorEnum.keystoreBtn,
      file: GlobalDataEnum.keystoreFile,
      address: WalletAdressEnum.adress3
    };
    await login(page, loginData);
    await closeTransaction(page);
    await expect(
      page.getByText(GlobalDataEnum.transactionCanceled)
    ).toBeVisible();
    await page.close();
  });
});
