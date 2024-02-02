/// <reference types="cypress" />
import { initTransaction, pingPongHandler } from './SCActions';
import { GlobalDataEnum, WalletIDEnum } from '../../constants/enums';

describe('Smart Contract Transactions', () => {
  before(() => {
    cy.login(WalletIDEnum.unguardedWallet1, 'Connect');
    cy.wait(5000);
  });
  after(() => {
    cy.logout();
  });

  it('should successfully execute the Ping & Pong ABI', () => {
    pingPongHandler('Abi');
    cy.checkToast(GlobalDataEnum.confirmedTransaction);
  });

  it('should successfully execute the Ping & Pong RAW ', () => {
    pingPongHandler('Raw');
    cy.checkToast(GlobalDataEnum.confirmedTransaction);
  });

  it('should successfully execute the Ping & Pong Service', () => {
    pingPongHandler('Service');
    cy.checkToast(GlobalDataEnum.confirmedTransaction);
  });

  it('should not execute ping&pong action', () => {
    initTransaction();
    cy.getSelector('closeButton').click();
    cy.contains('Transaction canceled');
  });

  it('should display the guardian modal', () => {
    //FIXME: LOGOUT does not work for some reason
    cy.login(WalletIDEnum.guardedWallet, 'Connect');
    cy.wait(5000);
    initTransaction();
    cy.contains('Verify Guardian');
  });
});
