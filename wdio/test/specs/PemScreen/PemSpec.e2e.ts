import {
  GlobalDataEnum,
  GlobalSelectorEnum,
  WalletAdressEnum
} from '../../utils/enums.ts';
import { login, pingPongHandler } from '../../utils/actions.ts';
import {
  closeTransaction,
  closeTemplateModal,
  closeWalletTab,
  reloadWalletWindow,
  cancelTrasaction,
  notConfirmPem,
  signMsg
} from './actions.ts';

describe('Sign transactions with PEM', () => {
  beforeEach(async () => {
    const loginData = {
      selector: GlobalSelectorEnum.pemBtn,
      file: GlobalDataEnum.pemFile,
      adress: WalletAdressEnum.adress1
    };
    await browser.url('https://integration.template-dapp.multiversx.com/');
    await $(GlobalSelectorEnum.connectBtn).click();
    await login(loginData);
  });

  afterEach(async () => {
    await browser.reloadSession();
  });

  it('should cancel transaction from wallet', async () => {
    await closeTransaction();
  });

  it('should close the template modal', async () => {
    await closeTemplateModal();
  });

  it('should close the wallet window', async () => {
    await closeWalletTab();
    await browser.pause(60000);
  });

  it('should close the wallet window after refresh', async () => {
    await reloadWalletWindow();
  });

  it('should cancel transaction', async () => {
    await cancelTrasaction();
  });

  it.only('should return error for invalid confirmation PEM', async () => {
    await notConfirmPem();
  });

  it('should sign transaction with PEM', async () => {
    await pingPongHandler(GlobalSelectorEnum.abiType);
  });

  it('should sign msg with PEM', async () => {
    await signMsg();
  });
});
