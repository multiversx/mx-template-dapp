import { test, expect } from '@playwright/test';
import { accessDapp, initTransaction, login } from '../utils/actions';
import {
  GlobalSelectorEnum,
  GlobalDataEnum,
  WalletAdressEnum
} from '../utils/enums';

test.describe('cancel transaction from template window', () => {
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
    await initTransaction(page);
    await page.getByTestId(GlobalSelectorEnum.closeButton).click();
    await expect(
      page.getByText(GlobalDataEnum.transactionCanceled)
    ).toBeVisible();
    await page.close();
  });
});
