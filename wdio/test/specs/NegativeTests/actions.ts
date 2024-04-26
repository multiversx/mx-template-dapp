import {
  checkOpenTabs,
  checkUrl,
  initTransaction,
  uploadFile,
  confimPem,
  confirmPass
} from '../../utils/actions.ts';
import { GlobalDataEnum, GlobalSelectorEnum } from '../../utils/enums.ts';

export async function closeTransaction() {
  const transactionCanceledModal = 'body*=Transaction canceled';
  await initTransaction();
  await browser.pause(3000);
  const closeSelectors = await $(GlobalSelectorEnum.keystoreCloseModalBtn);
  await $(closeSelectors).click();
  const allHandles = await browser.getWindowHandles();
  expect(allHandles.length).toEqual(1);
  await browser.switchWindow(GlobalDataEnum.daapWindow);
  await expect($(transactionCanceledModal)).toBeDisplayed();
  await initTransaction();
  await confirmPass();
  await expect($(GlobalSelectorEnum.signBtn)).toBeDisplayed();
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
  await expect($(GlobalSelectorEnum.accesWalletBtn)).toBeDisplayed();
}

export async function closeWalletTab() {
  await initTransaction();
  await browser.closeWindow();
  await browser.switchWindow(GlobalDataEnum.daapWindow);
  const btn = await $$(GlobalSelectorEnum.closeTemplateModal);
  await btn[1].click();
  await browser.pause(1500);
  await initTransaction();
  await browser.switchWindow(GlobalDataEnum.walletWindow);
  await $(GlobalSelectorEnum.accesWalletBtn).waitForDisplayed();
}

export async function reloadWalletWindow() {
  await initTransaction();
  await browser.refresh();
  await browser.pause(500);
  const allHandles = await browser.getWindowHandles();
  expect(allHandles.length).toEqual(1);
}

export async function cancelTrasaction() {
  await initTransaction();
  await confirmPass();
  await $(GlobalSelectorEnum.closeBtn).click();
  await checkOpenTabs();
}

export async function notConfirmPass() {
  await initTransaction();
  for (let i = 0; i < 3; i++) {
    await $(GlobalSelectorEnum.accesPass).setValue('test');
    await $(GlobalSelectorEnum.accesWalletBtn).click();
  }
  await browser.pause(1000);
  await checkOpenTabs();
}

export async function signMsg() {
  await $(GlobalSelectorEnum.textArea).setValue('Test');
  await $(GlobalSelectorEnum.signMsgBtn).click();
  await browser.pause(1000);
  await browser.switchWindow(GlobalDataEnum.walletWindow);
  await confirmPass();
  await $(GlobalSelectorEnum.signMsgWalletBtn).click();
  await browser.pause(1000);
  await browser.switchWindow(GlobalDataEnum.daapWindow);
  await $(GlobalSelectorEnum.clearBtn).click();
}
