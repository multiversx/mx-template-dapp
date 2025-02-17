import { getAccountProvider, TransactionManager } from 'lib';
import { TransactionProps } from 'types';
import { getBatchTransactions } from './getBatchTransactions';

export const sendBatchTransactions = async ({
  address,
  chainID,
  nonce
}: TransactionProps) => {
  const provider = getAccountProvider();
  const txManager = TransactionManager.getInstance();

  const transactionsToSign = getBatchTransactions({
    address,
    chainID,
    nonce
  });

  const transactions = await provider.signTransactions(transactionsToSign);

  const groupedTransactions = [
    [transactions[0]],
    [transactions[1], transactions[2]],
    [transactions[3], transactions[4]]
  ];

  const sentTransactions = await txManager.send(groupedTransactions);
  const sessionId = await txManager.track(sentTransactions);

  return { sentTransactions, sessionId };
};
