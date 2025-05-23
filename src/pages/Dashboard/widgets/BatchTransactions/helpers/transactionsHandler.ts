import {
  Transaction,
  TransactionManager,
  TransactionsDisplayInfoType
} from 'lib';

type TransactionsHandlerType = {
  transactions: Transaction[] | Transaction[][];
  options?: {
    disableToasts?: boolean;
    transactionsDisplayInfo?: TransactionsDisplayInfoType;
  };
};

export const transactionsHandler = async ({
  transactions
}: TransactionsHandlerType) => {
  const txManager = TransactionManager.getInstance();

  const sentTransactions = await txManager.send(transactions);
  const sessionId = await txManager.track(sentTransactions);

  return { sentTransactions, sessionId };
};
