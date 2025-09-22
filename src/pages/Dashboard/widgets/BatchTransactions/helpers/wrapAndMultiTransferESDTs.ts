import { getAccountProvider, TransactionsDisplayInfoType } from 'lib';
import { TransactionProps } from 'types';

import { sendAndTrackTransactions } from './sendAndTrackTransactions';
import { getWrapAndMultiTransferESDTsTransactions } from './getWrapAndMultiTransferESDTsTransactions';

export const wrapAndMultiTransferESDTs = async ({
  address,
  nonce,
  chainID,
  transactionsDisplayInfo = {
    processingMessage: 'Processing transactions',
    errorMessage: 'An error has occurred during transaction execution',
    successMessage: 'Wrap and multi-transfer transactions successful'
  }
}: TransactionProps & {
  transactionsDisplayInfo?: TransactionsDisplayInfoType;
}) => {
  const provider = getAccountProvider();

  const transactionsToSign = getWrapAndMultiTransferESDTsTransactions({
    address,
    chainID,
    nonce
  });

  const transactions = await provider.signTransactions(transactionsToSign);

  const groupedTransactions = [
    [transactions[0]],
    [transactions[1]],
    [transactions[2]]
  ];

  const sessionId = await sendAndTrackTransactions({
    transactions: groupedTransactions,
    options: {
      transactionsDisplayInfo
    }
  });

  return sessionId;
};
