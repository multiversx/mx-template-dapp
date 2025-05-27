import { getAccountProvider, TransactionsDisplayInfoType } from 'lib';
import { TransactionProps } from 'types';
import { getBatchTransactions } from './getBatchTransactions';
import { transactionsHandler } from './transactionsHandler';

export const signAndAutoSendBatchTransactions = async ({
  address,
  nonce,
  chainID,
  transactionsDisplayInfo = {
    processingMessage: 'Processing transactions',
    errorMessage: 'An error has occurred during transaction execution',
    successMessage: 'Batch transactions successful'
  }
}: TransactionProps & {
  transactionsDisplayInfo?: TransactionsDisplayInfoType;
}) => {
  const provider = getAccountProvider();

  const transactions = getBatchTransactions({
    address,
    nonce,
    chainID
  });

  const signedTransactions = await provider.signTransactions(transactions);

  const groupedTransactions = [
    [signedTransactions[0]],
    [signedTransactions[1], signedTransactions[2]],
    [signedTransactions[3], signedTransactions[4]]
  ];

  const sessionId = await transactionsHandler({
    transactions: groupedTransactions,
    options: {
      transactionsDisplayInfo
    }
  });

  return sessionId;
};
