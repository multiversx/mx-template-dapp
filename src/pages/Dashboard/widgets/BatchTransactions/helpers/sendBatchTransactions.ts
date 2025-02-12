import { TransactionProps } from 'types/transaction.types';
import { getAccountProvider, TransactionManager } from 'utils';
import { getBatchTransactions } from './getBatchTransactions';

export const sendBatchTransactions = async ({
  address,
  chainID,
  nonce
}: TransactionProps) => {
  const provider = getAccountProvider();
  const txManager = TransactionManager.getInstance();

  const transactions = getBatchTransactions({
    address,
    chainID,
    nonce
  });

  const signedTransactions = await provider.signTransactions(transactions);

  const groupedTransactions = [
    [signedTransactions[0]],
    [signedTransactions[1], signedTransactions[2]],
    [signedTransactions[3], signedTransactions[4]]
  ];

  const sentTransactions = await txManager.send(groupedTransactions);
  await txManager.track(sentTransactions);

  return { sentTransactions };
};
