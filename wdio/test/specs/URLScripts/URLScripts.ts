import {
  accesDaap,
  batchTransactions,
  login,
  pingPongHandler,
  validateToast,
  validateTransaction
} from '../../utils/actions.ts';
import {
  GlobalSelectorEnum,
  GlobalDataEnum,
  WalletAdressEnum,
  TransactionIndexEnum
} from '../../utils/enums.ts';
import { closeTransaction } from '../NegativeTests/actions.ts';

describe('Connect via URL  - Ping & Pong ABI Test', () => {
  beforeEach(async () => {
    await accesDaap();
  });

  it('should connect via URL and sign ping&pong ABI', async () => {
    const loginData = {
      selector: GlobalSelectorEnum.keystoreBtn,
      file: GlobalDataEnum.keystoreFile,
      adress: WalletAdressEnum.adress2,
      urlConnect: true
    };
    await login(loginData);
    await pingPongHandler(GlobalSelectorEnum.abiType);
  });
});

describe('Connect via URL with PEM', () => {
  beforeEach(async () => {
    await accesDaap();
  });

  it('connect via URL  and sign transaction with PEM', async () => {
    const loginData = {
      selector: GlobalSelectorEnum.pemBtn,
      file: GlobalDataEnum.pemFile,
      adress: WalletAdressEnum.adress3,
      urlConnect: true
    };
    await login(loginData);
    await pingPongHandler(GlobalSelectorEnum.abiType);
  });
});

describe('Connect via URL and Sign & Batch', () => {
  beforeEach(async () => {
    await accesDaap();
  });
  it('connecg via URL sign sign & batch ', async () => {
    const loginData = {
      selector: GlobalSelectorEnum.keystoreBtn,
      file: GlobalDataEnum.keystoreFile,
      adress: WalletAdressEnum.adress3,
      urlConnect: true
    };
    await login(loginData);
    await batchTransactions(GlobalSelectorEnum.signAndBatchType);
    await validateToast(GlobalSelectorEnum.toastSelector);
    await browser.pause(4500);
    await validateTransaction(TransactionIndexEnum.signBatch);
  });
});

describe('Connect via URL and close transaction', () => {
  beforeEach(async () => {
    const loginData = {
      selector: GlobalSelectorEnum.keystoreBtn,
      file: GlobalDataEnum.keystoreFile,
      adress: WalletAdressEnum.adress4,
      urlConnect: true
    };
    await accesDaap();
    await login(loginData);
  });
  it('should connect via URL and  cancel transaction from wallet', async () => {
    await closeTransaction();
  });
});
