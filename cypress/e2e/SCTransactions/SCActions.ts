import { SCTransactionData, scSelectors } from './SCTransactionData';
import { userData } from '../../assets/globalData';
import { AssertionEnum } from '../../constants/enums';
// Custom function to make Ping or Pong transactions
export const scTransaction = (type) => {
  cy.getSelector(type).then((btn) => {
    if (btn.prop('disabled')) {
      return;
    } else {
      cy.wait(1000);
      cy.getSelector(type).click();
      cy.getSelector(scSelectors.accesPass).type(userData.passsword);
      cy.getSelector(scSelectors.submitButton).click();
      cy.getSelector(scSelectors.signButton).click();
      checkPingDetails();
    }
  });
};

export const checkPingDetails = () => {
  cy.get('p')
    .should(AssertionEnum.contain, 'Contract')
    .should(AssertionEnum.contain, 'Hash')
    .should(AssertionEnum.contain, 'Receiver')
    .should(AssertionEnum.contain, 'Amount')
    .should(AssertionEnum.contain, 'Gas price')
    .should(AssertionEnum.contain, 'Gas limit')
    .should(AssertionEnum.contain, 'Data');
};

export const pingPongHandler = (type) => {
  cy.getSelector(`btnPing${type}`).then((btn) => {
    if (btn.prop('disabled')) {
      scTransaction(`btnPong${type}`);
    } else {
      scTransaction(`btnPing${type}`);
    }
  });
};
