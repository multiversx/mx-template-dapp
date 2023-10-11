import { cancelTransactions } from './helpers';
import { WalletIDEnum } from '../../constants/enums';

describe('cancelTransactions', () => {
  beforeEach(() => {
    cy.login(WalletIDEnum.unguardedWallet1, 'Connect');
    cy.wait(5000);
  });
  it('should return transaction canceled for auto-send batch ', () => {
    cancelTransactions('sign-auto-send');
  });

  it('should return transaction canceled for swap-lock', () => {
    cancelTransactions('swap-lock');
  });

  it('should return transaction canceled for send-transactions ', () => {
    cancelTransactions('send-transactions');
  });
});
