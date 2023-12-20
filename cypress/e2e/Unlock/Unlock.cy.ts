import { GlobalSelectorsEnum } from '../../constants/enums';

describe('Unlock', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should open the xPortal modal', () => {
    cy.contains('xPortal App').click();
    cy.contains('Scan the QR code using the xPortal App');
  });

  it('should open the ledger modal', () => {
    cy.getSelector(GlobalSelectorsEnum.ledgerLoginButton);
    cy.contains('Connect Ledger');
  });
});
