/// <reference types="cypress" />
import { scTransaction } from './SCActions';
import { SCTransactionData,scSelectors } from '../TemplateDapp/SCTransactionData';

describe('Smart Contract Transactions', () => {
  before(() => {
    cy.visit('/');
    cy.getSelector(scSelectors.loginBtn).click();
    cy.getSelector(scSelectors.webWalletLogin).click();
    cy.login();
  });
  it('Ping & Pong actions', () => {
    //The condtionals will check the actual status of the tranzaction and proceed with the properly actions.
    cy.get('.action-btn').then(($btn) => {
      // synchronously ask for the button's text
      // and do something based on whether it includes
      if ($btn.text().includes(SCTransactionData.ping)) {
        scTransaction(SCTransactionData.ping);
        cy.wait(180010);
        scTransaction(SCTransactionData.pong);
      } else {
        // in this case will finish the existing flow with the pong transcation , and after will proceed with the complete new flow ping- pong 
        scTransaction(SCTransactionData.pong);
        scTransaction(SCTransactionData.ping);
        //wainting 3 minutes for the pong 
        cy.wait(180010);
        scTransaction(SCTransactionData.pong);
      }
    })
  });
});
