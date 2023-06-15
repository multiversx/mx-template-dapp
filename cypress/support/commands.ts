/// <reference types="cypress" />
import { userData } from '../assets/globalData';
import { AssertionEnum } from '../constants/enums';
import { DEVNET_API } from '../constants/globalLinks';

// Check the url global function
Cypress.Commands.add('checkUrl', (url) => {
  cy.url().should(AssertionEnum.include, url);
});

//Login with keystore global function
Cypress.Commands.add('login', () => {
  cy.getSelector('keystoreBtn').click();
  cy.checkUrl('/unlock/keystore');
  cy.getSelector('submitButton').click();
  cy.checkUrl('/unlock/keystore');

  cy.get('input[type=file]').selectFile('./cypress/assets/testKeystore.json', {
    force: true
  });
  cy.getSelector('accessPass').type(userData.passsword);
  cy.getSelector('submitButton').click();

  cy.getSelector('check_1').click().should(AssertionEnum.beChecked);
  cy.getSelector('confirmBtn').click();
  cy.checkUrl('/dashboard');
});

Cypress.Commands.add('getSelector', (selector, ...cypressAction) => {
  return cy.get(`[data-testid=${selector}]`, ...cypressAction);
});

// Add the custom command for api intercepts
Cypress.Commands.add('apiIntercept', (method, param) => {
  cy.intercept(method, `${DEVNET_API}${param}`).as(param);
});
