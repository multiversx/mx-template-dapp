import { Routes } from 'react-router-dom';
import { userData } from '../../assets/globalData';
import { RoutesEnum, walletIDEnum } from '../../constants/enums';
import { scSelectors } from '../SCTransactions/SCTransactionData';

describe('Sign Message', () => {
  beforeEach(() => {
    cy.login(walletIDEnum.unguardedWallet1, 'Connect');
    cy.wait(5000);
  });
  it('should sign', () => {
    const widgetInfo = ['Signature', 'Encoded message', 'Decoded message'];
    cy.getSelector('signMsgBtn').should('be.disabled');
    cy.get('textarea').type('Test');
    cy.getSelector('signMsgBtn').click();
    cy.getSelector(scSelectors.accesPass).type(userData.passsword);
    cy.getSelector(scSelectors.submitButton).click();
    cy.getSelector('message').should('have.value', 'Test');
    cy.getSelector('signButton').click();
    cy.checkWidgetMsg(widgetInfo);
    cy.getSelector('closeTransactionSuccessBtn').click();
    cy.getSelector('signMsgBtn').should('be.disabled');
  });

  it('should not sign', () => {
    cy.get('textarea').type('Test');
    cy.getSelector('signMsgBtn').click();
    cy.wait(2000);
    cy.getSelector(scSelectors.accesPass).type(userData.passsword);
    cy.getSelector(scSelectors.submitButton).click();
    cy.getSelector('closeBtn').click();
    cy.checkUrl(RoutesEnum.dashboard);
  });
});
