import {
  batchTransactions,
  checkOpenTabs,
  initTransaction,
  login,
  validateToast,
  validateTransaction
} from '../../utils/actions.ts';
import {
  GlobalDataEnum,
  GlobalSelectorEnum,
  TransactionIndexEnum,
  WalletAdressEnum
} from '../../utils/enums.ts';
import { pingPongHandler } from '../../utils/actions.ts';

describe('Sign with Keystore', () => {
  beforeEach(async () => {
    await browser.url('https://integration.template-dapp.multiversx.com/');
    await $(GlobalSelectorEnum.connectBtn).click();
  });
  afterEach(async () => {
    await browser.reloadSession();
  });

  it('should sign ping&pong manual transaction', async () => {
    const loginData = {
      selector: GlobalSelectorEnum.keystoreBtn,
      file: GlobalDataEnum.keystoreFile,
      adress: WalletAdressEnum.adress1
    };
    await login(loginData);
    await pingPongHandler(GlobalSelectorEnum.rawType);
  });

  it('should sign ping&pong ABI', async () => {
    const loginData = {
      selector: GlobalSelectorEnum.keystoreBtn,
      file: GlobalDataEnum.keystoreFile,
      adress: WalletAdressEnum.adress2
    };
    await login(loginData);
    await pingPongHandler(GlobalSelectorEnum.abiType);
  });

  it('should sign ping&pong Service', async () => {
    const loginData = {
      selector: GlobalSelectorEnum.keystoreBtn,
      file: GlobalDataEnum.keystoreFile,
      adress: WalletAdressEnum.adress3
    };
    await login(loginData);
    await pingPongHandler(GlobalSelectorEnum.serviceType);
  });

  it('should sign swap & lock transactions', async () => {
    const loginData = {
      selector: GlobalSelectorEnum.keystoreBtn,
      file: GlobalDataEnum.keystoreFile,
      adress: WalletAdressEnum.adress3
    };
    await login(loginData);
    await batchTransactions(GlobalSelectorEnum.swapLockType);
    await validateToast(GlobalSelectorEnum.toastSelector);
    await browser.pause(4500);
    await validateTransaction(TransactionIndexEnum.swapLock);
  });

  it('should sign sign & batch ', async () => {
    const loginData = {
      selector: GlobalSelectorEnum.keystoreBtn,
      file: GlobalDataEnum.keystoreFile,
      adress: WalletAdressEnum.adress3
    };
    await login(loginData);
    await batchTransactions(GlobalSelectorEnum.signAndBatchType);
    await validateToast(GlobalSelectorEnum.toastSelector);
    await browser.pause(4500);
    await validateTransaction(TransactionIndexEnum.signBatch);
  });

  it('should sign sign & batch controlled sending ', async () => {
    const loginData = {
      selector: GlobalSelectorEnum.keystoreBtn,
      file: GlobalDataEnum.keystoreFile,
      adress: WalletAdressEnum.adress3
    };
    await login(loginData);
    await batchTransactions(GlobalSelectorEnum.controlledSendingType);
    await validateToast(GlobalSelectorEnum.toastSelector);
    await browser.pause(4500);
    await validateTransaction(TransactionIndexEnum.signBatch);
  });

  it('should close the wallet',async () => {
    const loginData = {
      selector: GlobalSelectorEnum.keystoreBtn,
      file: GlobalDataEnum.keystoreFile,
      adress: WalletAdressEnum.adress3
    };
    await login(loginData);
    await $(GlobalSelectorEnum.batchBtn).click();
    await browser.pause(500)
    await browser.switchWindow(GlobalDataEnum.walletWindow);
    for(let i=0; i<3;i++) {
      await $(GlobalSelectorEnum.accesPass).setValue(`invalid+${i}`);
      await $(GlobalSelectorEnum.accesWalletBtn).click();
      await browser.pause(2000)
    }
    await checkOpenTabs()
  });
});
