import {
  GlobalDataEnum,
  GlobalSelectorEnum,
  TransactionIndexEnum
} from './enums.ts';
import { Selector } from 'webdriverio';

export async function confimPem(pemFile: string) {
  await uploadFile(pemFile);
  await $(GlobalSelectorEnum.accesWalletBtn).click();
}

export async function getSelector(selector: string) {
  const element = await $(`[data-testid="${selector}"]`);
  if (!element.isExisting()) {
    throw new Error(`Element with data-testid "${selector}" not found.`);
  }
  return element;
}

export async function uploadFile(fileName: string) {
  await browser.pause(2500);
  const file = await $('input[type="file"]');
  const filePath = `./wdio/test/utils/${fileName}`;
  const remoteFilePath = await browser.uploadFile(filePath);
  await browser.pause(1500);
  await browser.execute((el) => ((el as any).style.display = 'block'), file);
  file.waitForDisplayed();
  await file.setValue(remoteFilePath);
}

export async function login(payload: {
  selector: string;
  file: string;
  adress: string;
}) {
  const wallet = await $(`[data-testid*=${payload.adress}]`);

  await $(GlobalSelectorEnum.crossWindowLoginBtn).click();
  await browser.pause(4500);
  await browser.switchWindow(GlobalDataEnum.walletWindow);
  await $(payload.selector).click();
  await browser.pause(3600);
  await uploadFile(payload.file);
  if (payload.selector === GlobalSelectorEnum.keystoreBtn) {
    await confirmPass();
    await wallet.click();
    await $(GlobalSelectorEnum.confirmBtn).click();
  } else {
    await $(GlobalSelectorEnum.accesWalletBtn).click();
  }
  await browser.pause(1000);
  await browser.switchWindow(GlobalDataEnum.daapWindow);
}

export async function validateToast(selector: string) {
  const element = await $(`[data-testid*=${selector}]`);
  const text = await element.getText();
  expect(text).toContain('Processing');
}

export async function checkUrl(path: string) {
  const url = await browser.getUrl();
  expect(url).toMatch(path);
}

export async function initTransaction() {
  const element = await $(`[data-testid*=${GlobalSelectorEnum.abiType}]`);
  await element.click();
  await browser.pause(6000);
  await browser.switchWindow(GlobalDataEnum.walletWindow);
  await browser.pause(1500);
}

export async function confirmPass() {
  await $(GlobalSelectorEnum.accesPass).setValue(GlobalDataEnum.globalPassword);
  await $(GlobalSelectorEnum.accesWalletBtn).click();
}

export async function confirmTransaction() {
  await $(GlobalSelectorEnum.signBtn).click();
  await browser.switchWindow(GlobalDataEnum.daapWindow);
}

export async function logout() {
  await browser.switchWindow(GlobalDataEnum.daapWindow);
  await $(GlobalSelectorEnum.logoutBtn).click();
  await expect($(GlobalSelectorEnum.unlockPage)).toBeExisting();
}

export async function openProviderModal(payload: {
  selector: Selector;
  route: string;
}) {
  await $(GlobalSelectorEnum.crossWindowLoginBtn).click();
  await browser.pause(3500);
  await browser.switchWindow(GlobalDataEnum.walletWindow);
  await $(payload.selector).click();
  await browser.pause(1000);
  await checkUrl(payload.route);
}

export async function checkOpenTabs() {
  const allHandles = await browser.getWindowHandles();
  expect(allHandles.length).toEqual(1);
}

export async function doubleProviderClick() {
  await $(GlobalSelectorEnum.crossWindowLoginBtn).click();
  await browser.switchWindow(GlobalDataEnum.daapWindow);
  await browser.pause(1500);
  await expect($(GlobalSelectorEnum.crossWindowLoginBtn)).toBeDisabled();
}

export async function validateTransaction(svgIndex: number) {
  const svgElement = await $$('svg[data-icon="arrow-up-right-from-square"]');
  await browser.pause(8000);
  await svgElement[svgIndex].click();
  await browser.switchWindow(GlobalDataEnum.explorerWindow);
  const succesMsg = await $('span*=Succes');
  await succesMsg.waitForDisplayed({ timeout: 85000 });
}

export const checkWidgetMsg = async (msgArr: string[]) => {
  for (const element of msgArr) {
    await expect($('p')).toHaveTextContaining(element);
  }
};

export async function batchTransactions(transactionType: string) {
  const selector = await $(`[data-testid="${transactionType}"]`);
  let i = transactionType === 'swap-lock' ? 1 : 0;

  await selector.click();
  await browser.pause(2500);
  await browser.switchWindow(GlobalDataEnum.walletWindow);
  await confirmPass();
  for (i; i < 5; i++) {
    await $(GlobalSelectorEnum.signBtn).click();
    await browser.pause(1000);
  }
  await browser.pause(1500);
  await browser.switchWindow(GlobalDataEnum.daapWindow);
}

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
    if (!(await $(GlobalSelectorEnum.accesPass).isDisplayed())) {
      await confimPem(GlobalDataEnum.pemFile);
      await $(GlobalSelectorEnum.signBtn).click();
    } else {
      await confirmPass();
      await $(GlobalSelectorEnum.signBtn).click();
    }
    await browser.pause(1500);
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

export const accesDaap = async () => {
  await browser.reloadSession();
  await browser.url('https://integration.template-dapp.multiversx.com/');
  await $(GlobalSelectorEnum.connectBtn).click();
};
