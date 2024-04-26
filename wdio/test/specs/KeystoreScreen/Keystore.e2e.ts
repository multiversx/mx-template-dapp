import {
  batchTransactions,
  checkOpenTabs,
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
import { pingPongHandler, accesDaap } from '../../utils/actions.ts';

describe('Ping & Pong ABI test', () => {
  beforeEach(async () => {
    await accesDaap();
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
});

describe('batch transactions', () => {
  beforeEach(async () => {
    await accesDaap();
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
    await browser.pause(120000);
    await validateTransaction(TransactionIndexEnum.swapLock);
  });
});

describe('Ping and Pong manual transaciton', () => {
  before(async () => {
    await accesDaap();
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
});

describe('PEM', () => {
  beforeEach(async () => {
    await accesDaap();
  });

  it('should sign transaction with PEM', async () => {
    const loginData = {
      selector: GlobalSelectorEnum.pemBtn,
      file: GlobalDataEnum.pemFile,
      adress: WalletAdressEnum.adress3
    };
    await login(loginData);
    await pingPongHandler(GlobalSelectorEnum.abiType);
  });
});

describe('Batch controoled sending', () => {
  beforeEach(async () => {
    await accesDaap();
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
});

describe('Sign & Batch', () => {
  beforeEach(async () => {
    await accesDaap();
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
});

describe('Ping&Pong Service test', () => {
  beforeEach(async () => {
    await accesDaap();
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
});
