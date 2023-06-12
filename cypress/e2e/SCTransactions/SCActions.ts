import { userData } from '../../assets/globalData';
import { AssertionEnum } from '../../constants/enums';
import { SCTransactionData,scSelectors } from './SCTransactionData';
// Custom function to make Ping or Pong transaction
export const scTransaction = (type) => {
  cy.getSelector(`btn${type}`).click();
  cy.getSelector(scSelectors.accesPass).type(userData.passsword);
  cy.getSelector(scSelectors.submitButton).click();
  cy.getSelector(scSelectors.signButton).click();
  cy.wait(3600);
  cy.getSelector(SCTransactionData.modalConfirmation).should(
    AssertionEnum.contain,
    `${type} ${SCTransactionData.confirmationMessage}`
  );
};
