import { expect, test } from '@playwright/test';
import {
  accessDapp,
  confirmPass,
  findPageByUrlSubstring,
  login
} from '../utils/actions';
import {
  GlobalDataEnum,
  GlobalSelectorEnum,
  OriginPageEnum,
  WalletAdressEnum
} from '../utils/enums';

test.describe('should sign message', () => {
  test.beforeEach(async ({ page }) => {
    await accessDapp(page);
  });

  test('should sign msg and logout', async ({ page }) => {
    const loginData = {
      selector: GlobalSelectorEnum.keystoreBtn,
      file: GlobalDataEnum.keystoreFile,
      address: WalletAdressEnum.adress3
    };
    await login(page, loginData);
    await page.getByPlaceholder('Write message here').fill('Test msg ###');
    await page.locator(GlobalSelectorEnum.signMsgBtn).click();
    const walletPage = await findPageByUrlSubstring(
      page,
      OriginPageEnum.multiversxWallet
    );
    await confirmPass(walletPage);
    await walletPage.getByTestId(GlobalSelectorEnum.signButton).click();
    await expect(page.getByText('Test msg ###')).toBeVisible();
    await page.getByRole('button', { name: 'Close' }).click();
    await expect(page.getByRole('button', { name: 'Connect' })).toBeVisible();
    await page.close();
  });
});
