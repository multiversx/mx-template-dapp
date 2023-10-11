/// <reference types="cypress" />
import { pingPongHandler } from './SCActions';
import { scSelectors } from './SCTransactionData';
import { userData } from '../../assets/globalData';
import { RoutesEnum, WalletIDEnum } from '../../constants/enums';

describe('Smart Contract Transactions', () => {
  afterEach(() => {
    cy.clearCookies();
  });

  it('should successfully execute the Ping & Pong ABI', () => {
    cy.login(WalletIDEnum.unguardedWallet1, 'Connect');
    cy.wait(5000);
    pingPongHandler('Abi');
  });

  it('should successfully execute the Ping & Pong RAW ', () => {
    cy.login(WalletIDEnum.unguardedWallet2, 'Connect');
    cy.wait(5000);
    pingPongHandler('Raw');
  });

  it('should successfully execute the Ping & Pong Service', () => {
    cy.login(WalletIDEnum.unguardedWallet3, 'Connect');
    cy.wait(5000);
    pingPongHandler('Raw');
  });

  it('should not execute ping&pong aciton', () => {
    cy.login(WalletIDEnum.unguardedWallet4, 'Connect');
    cy.wait(5000);
    cy.getSelector('btnPongAbi').click();
    cy.getSelector(scSelectors.accesPass).type(userData.passsword);
    cy.getSelector(scSelectors.submitButton).click();
    cy.getSelector('closeButton').click();
    cy.contains('Transaction canceled');
  });
});
