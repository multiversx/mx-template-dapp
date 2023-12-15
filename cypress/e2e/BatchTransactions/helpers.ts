import { userData } from '../../assets/globalData';
import { RoutesEnum } from '../../constants/enums';
import { scSelectors } from '../SCTransactions/SCTransactionData';

export const signTransactions = (selector: string) => {
  let i = selector === 'swap-lock' ? 1 : 0;

  const widgetInfo = [
    'Hash',
    'Receiver',
    'Amount',
    'Gas price',
    'Gas limit',
    'Data'
  ];

  cy.getSelector(selector).click();
  cy.getSelector(scSelectors.accesPass).type(userData.passsword);
  cy.getSelector(scSelectors.submitButton).click();
  for (i; i < 5; i++) {
    cy.getSelector('signBtn').click();
  }
  cy.contains('Processing transactions');
  cy.checkWidgetMsg(widgetInfo);
};

export const cancelTransactions = (selector: string) => {
  cy.getSelector(selector).click();
  cy.getSelector(scSelectors.accesPass).type(userData.passsword);
  cy.getSelector(scSelectors.submitButton).click();
  cy.getSelector('closeButton').click();
  cy.contains('Transaction canceled');
};
