import { TransactionsDisplayInfoType } from 'types/sdkDappCoreTypes';
import { TransactionProps } from 'types/transaction.types';
import { getAccountProvider, TransactionManager } from 'utils';
import { getSwapAndLockTransactions } from './getSwapAndLockTransactions';

type SwapAndLockTokensProps = TransactionProps & {
  transactionsDisplayInfo?: TransactionsDisplayInfoType;
};

export const swapAndLockTokens = async ({
  address,
  nonce,
  chainID,
  transactionsDisplayInfo = {
    processingMessage: 'Processing transactions',
    errorMessage: 'An error has occurred during transaction execution',
    successMessage: 'Swap and lock transactions successful'
  }
}: SwapAndLockTokensProps) => {
  const provider = getAccountProvider();
  const txManager = TransactionManager.getInstance();

  const transactions = getSwapAndLockTransactions({
    address,
    nonce,
    chainID
  });

  const signedTransactions = await provider.signTransactions(transactions);

  const groupedTransactions = [
    [signedTransactions[0]],
    [signedTransactions[1], signedTransactions[2]],
    [signedTransactions[3]]
  ];

  const sentTransactions = await txManager.send(groupedTransactions);
  await txManager.track(sentTransactions, { transactionsDisplayInfo });

  return { sentTransactions };
};
