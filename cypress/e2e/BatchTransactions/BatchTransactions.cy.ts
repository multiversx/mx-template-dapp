import { signTransactions } from './helpers';
import { walletIDEnum } from '../../constants/enums';

describe('Batch Transaction', () => {
  beforeEach(() => {
    cy.login(walletIDEnum.unguardedWallet1, 'Connect');
    cy.wait(5000);
  });
  it('should successfully sign 5 transactions for auto-send batch', () => {
    signTransactions('sign-auto-send');
  });

  it('should successfully sign 5 transactions for send-transactions', () => {
    signTransactions('send-transactions');
  });

  it('should successfully sign 4 transactions for swap-lock', () => {
    signTransactions('swap-lock');
  });
});
