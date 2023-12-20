/// <reference types="cypress" />
import { initTransaction, pingPongHandler } from './SCActions';
import { WalletIDEnum } from '../../constants/enums';

describe('Smart Contract Transactions', () => {
  afterEach(() => {
    cy.contains('Button', 'Close').click();
  });

  it('should successfully execute the Ping & Pong ABI', () => {
    cy.login(WalletIDEnum.unguardedWallet1, 'Connect');
    cy.wait(5000);
    pingPongHandler('Abi');
    cy.checkToast();
  });

  it('should successfully execute the Ping & Pong RAW ', () => {
    cy.login(WalletIDEnum.unguardedWallet2, 'Connect');
    cy.wait(5000);
    pingPongHandler('Raw');
    cy.checkToast();
  });

  it('should successfully execute the Ping & Pong Service', () => {
    cy.login(WalletIDEnum.unguardedWallet3, 'Connect');
    cy.wait(5000);
    pingPongHandler('Service');
    cy.checkToast();
  });

  it('should not execute ping&pong aciton', () => {
    cy.login(WalletIDEnum.unguardedWallet4, 'Connect');
    cy.wait(5000);
    initTransaction();
    cy.getSelector('closeButton').click();
    cy.contains('Transaction canceled');
  });

  it('should display the guardian modal', () => {
    cy.login(WalletIDEnum.guardedWallet, 'Connect');
    cy.wait(2000);
    initTransaction();
    cy.contains('Verify Guardian');
  });
});
