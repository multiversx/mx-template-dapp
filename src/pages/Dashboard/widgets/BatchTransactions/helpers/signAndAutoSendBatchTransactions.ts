import { SessionEnum, isSafari } from 'localConstants/session';
import { getBatchTransactions } from '../helpers';
import { refreshAccount } from 'utils/sdkDappUtils';
import { sendBatchTransactions } from 'services/sdkDappServices';
import { SendTransactionProps } from '../types';

// this process will not go through useSendSignedTransactions
// it will automatically sign and send transactions
export const signAndAutoSendBatchTransactions = async ({
  address,
  nonce,
  chainID,
  callbackRoute
}: SendTransactionProps) => {
  const transactions = getBatchTransactions({
    address,
    nonce,
    chainID
  });

  const groupedTransactions = [
    [transactions[0]],
    [transactions[1], transactions[2]],
    [transactions[3], transactions[4]]
  ];

  await refreshAccount();

  const { batchId, error } = await sendBatchTransactions({
    transactions: groupedTransactions,
    customTransactionInformation: { redirectAfterSign: true },
    transactionsDisplayInfo: {
      processingMessage: 'Processing transactions',
      errorMessage: 'An error has occurred during transaction execution',
      successMessage: 'Batch transactions successful'
    },
    callbackRoute,
    hasConsentPopup: isSafari
  });
  if (error) {
    console.error('Could not execute transactions', error);
    return {};
  }

  sessionStorage.setItem(SessionEnum.batchId, batchId);

  return { batchId };
};
