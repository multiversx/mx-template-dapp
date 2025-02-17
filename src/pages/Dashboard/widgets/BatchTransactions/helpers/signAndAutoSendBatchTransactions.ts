import {
  getAccountProvider,
  TransactionManager,
  TransactionsDisplayInfoType
} from 'lib';
import { TransactionProps } from 'types';
import { getBatchTransactions } from './getBatchTransactions';

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
  const txManager = TransactionManager.getInstance();

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

  const sentTransactions = await txManager.send(groupedTransactions);
  const sessionId = await txManager.track(sentTransactions, {
    transactionsDisplayInfo
  });

  return { sentTransactions, sessionId };
};
