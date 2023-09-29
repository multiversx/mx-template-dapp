/// <reference types="cypress" />
import { userData } from '../assets/globalData';
import { AssertionEnum } from '../constants/enums';
import { DEVNET_API } from '../constants/globalLinks';

// Check the url global function
Cypress.Commands.add('checkUrl', (url) => {
  cy.url().should(AssertionEnum.include, url);
});

//Login with keystore global function
Cypress.Commands.add('login', (walletID, selector) => {
  cy.session(walletID, () => {
    cy.visit('/');
    cy.contains(selector).click();
    if (selector === 'Connect') {
      cy.getSelector('webWalletLoginBtn').click();
    }
    cy.getSelector('keystoreBtn').click();
    cy.checkUrl('/unlock/keystore');
    cy.getSelector('submitButton').click();
    cy.checkUrl('/unlock/keystore');

    cy.get('input[type=file]').selectFile(
      './cypress/assets/testKeystore.json',
      {
        force: true
      }
    );
    cy.getSelector('accessPass').type(userData.passsword);
    cy.getSelector('submitButton').click();

    cy.getSelector(walletID).click();
    cy.getSelector('confirmBtn').click();
  });
});

Cypress.Commands.add('getSelector', (selector, ...cypressAction) => {
  return cy.get(`[data-testid=${selector}]`, ...cypressAction);
});

// Add the custom command for api intercepts
Cypress.Commands.add('apiIntercept', (method, param) => {
  cy.intercept(method, `${DEVNET_API}${param}`).as(param);
});

Cypress.on('uncaught:exception', () => {
  // Do nothing or handle the exception as per your requirements
  // You can remove the comment and add your custom handling logic here
  // console.log('An uncaught exception occurred but will be ignored');
  return false; // Prevent Cypress from failing the test
});
Cypress.Commands.add('checkWidgetMsg', (msgArr) => {
  msgArr.forEach((element) => {
    cy.get('p').should(AssertionEnum.contain, element);
  });
});
