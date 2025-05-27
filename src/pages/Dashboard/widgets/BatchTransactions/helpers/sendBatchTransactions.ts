import { getAccountProvider } from 'lib';
import { TransactionProps } from 'types';
import { getBatchTransactions } from './getBatchTransactions';
import { transactionsHandler } from './transactionsHandler';

export const sendBatchTransactions = async ({
  address,
  chainID,
  nonce
}: TransactionProps) => {
  const provider = getAccountProvider();

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

  const sessionId = await transactionsHandler({
    transactions: groupedTransactions
  });

  return sessionId;
};
