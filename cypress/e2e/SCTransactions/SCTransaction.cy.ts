/// <reference types="cypress" />
import { scTransaction } from './SCActions';
import { SCTransactionData, scSelectors } from './SCTransactionData';

describe('Smart Contract Transactions', () => {
  before(() => {
    cy.visit('/');
    cy.getSelector(scSelectors.loginBtn).click();
    cy.getSelector(scSelectors.webWalletLogin).click();
    cy.login();
    cy.apiIntercept('POST', SCTransactionData.transactions);
  });
  it('Ping & Pong actions', () => {
    cy.wait(3000);
    // The condtionals will check the actual status of the transaction
    cy.get(scSelectors.transactionBtn).then(($btn) => {
      const dataTestId = $btn.attr('data-testid');
      // Synchronously ask for the button's text
      if (dataTestId == scSelectors.btnPing) {
        scTransaction(SCTransactionData.ping);
      } else {
        scTransaction(SCTransactionData.pong);
      }
      cy.wait('@/transactions').then((xhr) => {
        expect(xhr?.response?.statusCode).to.eq(201);
        expect(xhr?.response?.statusMessage).to.eq('Created');
      });
    });
  });
});
