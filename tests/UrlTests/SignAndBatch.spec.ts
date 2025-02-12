import { test } from '@playwright/test';
import { accessDapp, confirmPass, handlePopup, login } from '../utils/actions';
import {
  GlobalSelectorEnum,
  GlobalDataEnum,
  WalletAdressEnum
} from '../utils/enums';

test.describe('Batch controlled sending via url', () => {
  test.beforeEach(async ({ page }) => {
    await accessDapp(page);
  });

  test('should sign sign & batch controlled sending via url ', async ({
    page
  }) => {
    const loginData = {
      selector: GlobalSelectorEnum.keystoreBtn,
      file: GlobalDataEnum.keystoreFile,
      address: WalletAdressEnum.adress7,
      urlConnect: true
    };
    await login(page, loginData);
    await page.getByTestId(GlobalSelectorEnum.controlledSendingType).click();
    await confirmPass(page);
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
