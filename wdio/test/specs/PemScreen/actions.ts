import { checkUrl, initTransaction } from '../../utils/actions.ts';
import {
  GlobalDataEnum,
  GlobalSelectorEnum,
  RoutesEnum
} from '../../utils/enums.ts';

export async function closeTransaction() {
  const transactionCanceledModal = 'body*=Transaction canceled';
  await initTransaction();
  const closeSelectors = await $$(GlobalSelectorEnum.modalCloseBtn);
  await $(closeSelectors[1]).click();
  const allHandles = await browser.getWindowHandles();
  expect(allHandles.length).toEqual(1);
  await browser.switchWindow(GlobalDataEnum.daapWindow);
  await expect($(transactionCanceledModal)).toBeDisplayed();
}

export async function closeTemplateModal() {
  await initTransaction();
  await browser.switchWindow(GlobalDataEnum.daapWindow);
  await browser.pause(1500);
  const btn = await $$(GlobalSelectorEnum.closeTemplateModal);
  await btn[1].click();
  await browser.pause(1500);
  const allHandles = await browser.getWindowHandles();
  expect(allHandles.length).toEqual(1);
  await initTransaction();
  await browser.switchWindow(GlobalDataEnum.walletWindow);
  await $(GlobalSelectorEnum.accesWalletBtn).waitForDisplayed();
}
