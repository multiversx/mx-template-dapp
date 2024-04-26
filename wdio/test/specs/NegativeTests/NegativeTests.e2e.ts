import {
  GlobalDataEnum,
  GlobalSelectorEnum,
  WalletAdressEnum
} from '../../utils/enums.ts';
import { accesDaap, login } from '../../utils/actions.ts';
import {
  closeTransaction,
  closeTemplateModal,
  closeWalletTab,
  reloadWalletWindow,
  cancelTrasaction,
  signMsg,
  notConfirmPass
} from './actions.ts';

describe('Negative tests', () => {
  beforeEach(async () => {
    const loginData = {
      selector: GlobalSelectorEnum.keystoreBtn,
      file: GlobalDataEnum.keystoreFile,
      adress: WalletAdressEnum.adress4
    };
    await accesDaap();
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
  });

  it('should close the wallet window after refresh', async () => {
    await reloadWalletWindow();
  });

  it('should cancel transaction', async () => {
    await cancelTrasaction();
  });

  it('should close window for 3 wrong passwords', async () => {
    await notConfirmPass();
  });

  it('should sign msg', async () => {
    await signMsg();
  });
});
