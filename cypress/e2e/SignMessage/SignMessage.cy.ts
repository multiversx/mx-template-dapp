import { userData } from '../../assets/globalData';
import { AssertionEnum, RoutesEnum, WalletIDEnum } from '../../constants/enums';
import { scSelectors } from '../SCTransactions/SCTransactionData';

describe('Sign Message', () => {
  beforeEach(() => {
    cy.login(WalletIDEnum.unguardedWallet1, 'Connect');
    cy.wait(5000);
  });
  afterEach(() => {
    cy.contains('Button', 'Close').click();
  });
  it('should sign', () => {
    const widgetInfo = ['Signature', 'Encoded message', 'Decoded message'];
    cy.getSelector('signMsgBtn').should('be.disabled');
    cy.get('textarea').first().type('Test');
    cy.getSelector('signMsgBtn').click();
    cy.getSelector(scSelectors.accesPass).type(userData.passsword);
    cy.getSelector(scSelectors.submitButton).click();
    cy.getSelector('message').should('have.value', 'Test');
    cy.getSelector('signButton').click();
    widgetInfo.forEach((element) => {
      cy.get('label').should(AssertionEnum.contain, element);
    });
    cy.getSelector('closeTransactionSuccessBtn').click();
    cy.getSelector('signMsgBtn').should('be.disabled');
  });

  it('should not sign', () => {
    cy.get('textarea').first().type('Test');
    cy.getSelector('signMsgBtn').click();
    cy.wait(2000);
    cy.getSelector(scSelectors.accesPass).type(userData.passsword);
    cy.getSelector(scSelectors.submitButton).click();
    cy.getSelector('closeBtn').click();
    cy.checkUrl(RoutesEnum.dashboard);
    cy.contains('Transaction canceled');
  });
});
