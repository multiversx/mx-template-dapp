import { userData } from '../../assets/globalData';
import { GlobalDataEnum, GlobalSelectorsEnum } from '../../constants/enums';
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
    cy.getSelector(GlobalSelectorsEnum.signBtn).click();
  }
  cy.contains(GlobalDataEnum.pendingToast);
  cy.checkWidgetMsg(widgetInfo);
};

export const cancelTransactions = (selector: string) => {
  cy.getSelector(selector).click();
  cy.getSelector(scSelectors.accesPass).type(userData.passsword);
  cy.getSelector(scSelectors.submitButton).click();
  cy.getSelector(GlobalSelectorsEnum.closeButton).click();
  cy.contains(GlobalDataEnum.cancelToast);
};
