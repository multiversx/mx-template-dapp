import { sendTransactions } from 'lib/sdkDapp/sdkDapp.helpers';
import { isSafari, SessionEnum } from 'localConstants/session';
import { getBatchTransactions } from '../helpers';
import { SendTransactionProps } from '../types';

export const sendBatchTransactions = async ({
  address,
  chainID,
  nonce,
  callbackRoute
}: SendTransactionProps) => {
  const transactions = getBatchTransactions({
    address,
    chainID,
    nonce
  });

  const { sessionId, error } = await sendTransactions({
    transactions,
    signWithoutSending: true,
    customTransactionInformation: { redirectAfterSign: true },
    callbackRoute,
    hasConsentPopup: isSafari
  });

  if (error) {
    console.error('Could not execute transactions', error);
    return {};
  }

  const newBatchSessionId = Date.now().toString();
  // sdk-dapp by default takes the last session id from sdk-dapp’s redux store on page refresh
  // in order to differentiate the transactions between widgets, a persistence of sessionId is needed
  sessionStorage.setItem(SessionEnum.batchSessionId, newBatchSessionId);
  sessionStorage.setItem(SessionEnum.signedSessionId, sessionId);

  return { newBatchSessionId, sessionId };
};
