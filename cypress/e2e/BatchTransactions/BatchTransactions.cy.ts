import { signTransactions } from './helpers';
import { WalletIDEnum, GlobalSelectorsEnum } from '../../constants/enums';

describe('Batch Transaction', () => {
  beforeEach(() => {
    cy.login(WalletIDEnum.unguardedWallet1, 'Connect');
    cy.wait(5000);
  });
  afterEach(() => {
    cy.checkToast();
    cy.contains('Button', 'Close').click();
  });
  it('should successfully sign 5 transactions for auto-send batch', () => {
    signTransactions(GlobalSelectorsEnum.signAutoSend);
  });

  it('should successfully sign 5 transactions for send-transactions', () => {
    signTransactions(GlobalSelectorsEnum.sendTransactions);
  });

  it('should successfully sign 4 transactions for swap-lock', () => {
    cy.wait(3000);
    signTransactions(GlobalSelectorsEnum.swapLock);
  });
});
