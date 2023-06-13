/// <reference types="cypress" />
import { scTransaction } from './SCActions';
import { SCTransactionData,scSelectors } from './SCTransactionData';

describe('Smart Contract Transactions', () => {
  before(() => {
    cy.visit('/');
    cy.getSelector(scSelectors.loginBtn).click();
    cy.getSelector(scSelectors.webWalletLogin).click();
    cy.login();
  });
  it('Ping & Pong actions', () => {
    // The condtionals will check the actual status of the transaction
    // cy.get('.action-btn').then(($btn) => {
    //   // Synchronously ask for the button's text
    //   if ($btn.text().includes(SCTransactionData.ping)) {
    //     scTransaction(SCTransactionData.ping);
    //     cy.wait(180010);
    //     scTransaction(SCTransactionData.pong);
    //   } else {
    //     scTransaction(SCTransactionData.pong);
    //     scTransaction(SCTransactionData.ping);
    //     // Wait 3 minutes for the pong
    //     cy.wait(180010);
    //     scTransaction(SCTransactionData.pong);
    //   }
    // })
  });
});
