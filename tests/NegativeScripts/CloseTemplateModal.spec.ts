import { expect, test } from '@playwright/test';
import { accessDapp, initTransaction, login } from '../utils/actions';
import {
  GlobalDataEnum,
  GlobalSelectorEnum,
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
    await page.waitForTimeout(5000);
    await page
      .locator(GlobalSelectorEnum.closePoupBtn)
      .getByRole('button', { name: 'Close' })
      .click();
    await expect(
      page.getByText(GlobalDataEnum.transactionCanceled)
    ).toBeVisible();
    await page.close();
  });
});
