import { getAccountProvider, TransactionsDisplayInfoType } from 'lib';
import { TransactionProps } from 'types';
import { getSwapAndLockTransactions } from './getSwapAndLockTransactions';
import { transactionsHandler } from './transactionsHandler';

export const swapAndLockTokens = async ({
  address,
  nonce,
  chainID,
  transactionsDisplayInfo = {
    processingMessage: 'Processing transactions',
    errorMessage: 'An error has occurred during transaction execution',
    successMessage: 'Swap and lock transactions successful'
  }
}: TransactionProps & {
  transactionsDisplayInfo?: TransactionsDisplayInfoType;
}) => {
  const provider = getAccountProvider();

  const transactionsToSign = getSwapAndLockTransactions({
    address,
    chainID,
    nonce
  });

  const transactions = await provider.signTransactions(transactionsToSign);

  const groupedTransactions = [
    [transactions[0]],
    [transactions[1], transactions[2]],
    [transactions[3]]
  ];

  const { sentTransactions, sessionId } = await transactionsHandler({
    transactions: groupedTransactions,
    options: {
      transactionsDisplayInfo
    }
  });

  return { sentTransactions, sessionId };
};
