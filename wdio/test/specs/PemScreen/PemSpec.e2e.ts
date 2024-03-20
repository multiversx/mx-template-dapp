import {
  GlobalDataEnum,
  GlobalSelectorEnum,
  WalletAdressEnum
} from '../../utils/enums.ts';
import { login } from '../../utils/actions.ts';
import { closeTransaction, closeTemplateModal } from './actions.ts';

describe('Sign transactions with PEM', () => {
  beforeEach(async () => {
    await browser.url('https://integration.template-dapp.multiversx.com/');
    await $(GlobalSelectorEnum.connectBtn).click();
  });
  it('should cancel transaction from wallet', async () => {
    const loginData = {
      selector: GlobalSelectorEnum.pemBtn,
      file: GlobalDataEnum.pemFile,
      adress: WalletAdressEnum.adress1
    };
    await login(loginData);
    await closeTransaction();
  });

  it.only('should close the template modal', async () => {
    const loginData = {
      selector: GlobalSelectorEnum.pemBtn,
      file: GlobalDataEnum.pemFile,
      adress: WalletAdressEnum.adress1
    };

    await login(loginData);
    await closeTemplateModal();
  });
});
