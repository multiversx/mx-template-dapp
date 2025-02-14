import { refreshAccount, sendBatchTransactions } from 'lib';
import { isSafari, SessionEnum } from 'localConstants/session';
import { getSwapAndLockTransactions } from '../helpers';
import { SendTransactionProps } from '../types';

export const swapAndLockTokens = async ({
  address,
  nonce,
  chainID,
  callbackRoute
}: SendTransactionProps) => {
  const transactions = getSwapAndLockTransactions({
    address,
    chainID,
    nonce
  });

  const groupedTransactions = [
    [transactions[0]],
    [transactions[1], transactions[2]],
    [transactions[3]]
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
