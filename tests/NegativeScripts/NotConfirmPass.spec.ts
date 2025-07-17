import { expect, test } from '@playwright/test';
import { accessDapp, findPageByUrlSubstring, login } from '../utils/actions';
import {
  GlobalDataEnum,
  GlobalSelectorEnum,
  OriginPageEnum,
  WalletAdressEnum
} from '../utils/enums';

test.describe('test invalid password', () => {
  test.beforeEach(async ({ page }) => {
    await accessDapp(page);
  });

  test('3 invalid password', async ({ page }) => {
    const loginData = {
      selector: GlobalSelectorEnum.keystoreBtn,
      file: GlobalDataEnum.keystoreFile,
      address: WalletAdressEnum.adress3
    };
    await login(page, loginData);
    await page.getByTestId(GlobalSelectorEnum.signAndBatchType).click();
    const walletPage = await findPageByUrlSubstring(
      page,
      OriginPageEnum.multiversxWallet
    );

    for (let i = 0; i < 3; i++) {
      await walletPage.getByTestId(GlobalSelectorEnum.accesPass).fill('test');
      await walletPage.locator(GlobalSelectorEnum.accesWalletBtn).click();
    }
    await expect(
      page.getByText(GlobalDataEnum.transactionCanceled)
    ).toBeVisible();
    await page.close();
  });
});
