import {
  GlobalDataEnum,
  GlobalSelectorEnum,
  TransactionIndexEnum
} from '../../utils/enums.ts';
import {
  confirmPass,
  validateToast,
  validateTransaction
} from '../../utils/actions.ts';

export const scTransaction = async (type: string) => {
  const btn = await $(`[data-testid="${type}"]`);
  await browser.pause(1500);
  if (await btn.getAttribute('disabled')) {
    return;
  } else {
    await browser.pause(1500);
    await $(btn).click();
    await browser.pause(3000);
    await browser.switchWindow(GlobalDataEnum.walletWindow);
    await confirmPass();
    await $(GlobalSelectorEnum.signBtn).click();
    await browser.pause(500);
    await browser.switchWindow(GlobalDataEnum.daapWindow);
    await validateToast(GlobalSelectorEnum.toastSelector);
    await validateTransaction(TransactionIndexEnum.ping);
  }
};

export const pingPongHandler = async (type: string) => {
  const btn = await $(`[data-testid="btnPing${type}"]`);
  await browser.pause(1500);
  if (await btn.getAttribute('disabled')) {
    await scTransaction(`btnPong${type}`);
  } else {
    await scTransaction(`btnPing${type}`);
  }
};
