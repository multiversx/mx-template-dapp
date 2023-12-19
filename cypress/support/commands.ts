/// <reference types="cypress" />
import { userData } from '../assets/globalData';
import {
  AssertionEnum,
  GlobalSelectorsEnum,
  GlobalDataEnum,
  RoutesEnum
} from '../constants/enums';
import { DEVNET_API } from '../constants/globalLinks';

// Check the url global function
Cypress.Commands.add('checkUrl', (url) => {
  cy.url().should(AssertionEnum.include, url);
});

//Login with keystore global function
Cypress.Commands.add('login', (walletID, selector) => {
  // cy.session(walletID, () => {
  cy.visit('/');
  cy.contains(selector).click();
  if (selector === GlobalSelectorsEnum.connect) {
    cy.getSelector(GlobalSelectorsEnum.webWalletLoginBtn).click();
  }
  cy.getSelector(GlobalSelectorsEnum.keystoreBtn).click();
  cy.checkUrl(RoutesEnum.keystoreRoute);
  cy.getSelector(GlobalSelectorsEnum.submitButton)).click();

  cy.get('input[type=file]').selectFile('./cypress/assets/testKeystore.json', {
    force: true
  });
  cy.getSelector(GlobalSelectorsEnum.accessPass).type(userData.passsword);
  cy.getSelector(GlobalSelectorsEnum.submitButton).click();

  cy.getSelector(walletID).click();
  cy.getSelector(GlobalSelectorsEnum.confirmBtn).click();
});
// });

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

Cypress.Commands.add('checkToast', () => {
  cy.getSelector(GlobalSelectorsEnum.transactionToastTitle).should(
    AssertionEnum.contain,
    GlobalDataEnum.pendingToast
  );
  cy.wait(5000);
  cy.getSelector(GlobalSelectorsEnum.transactionToastTitle).should(
    AssertionEnum.contain,
    GlobalDataEnum.confirmedToast
  );
});
