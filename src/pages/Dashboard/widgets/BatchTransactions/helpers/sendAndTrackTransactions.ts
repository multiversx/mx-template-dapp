import {
  Transaction,
  TransactionManager,
  TransactionsDisplayInfoType
} from 'lib';

type SendAndTrackTransactionsType = {
  transactions: Transaction[] | Transaction[][];
  options?: {
    disableToasts?: boolean;
    transactionsDisplayInfo?: TransactionsDisplayInfoType;
    onFail?: (sessionId?: string) => Promise<void>;
    onSuccess?: (sessionId?: string) => Promise<void>;
  };
};

export const sendAndTrackTransactions = async ({
  transactions,
  options
}: SendAndTrackTransactionsType) => {
  const txManager = TransactionManager.getInstance();

  const sentTransactions = await txManager.send(transactions);
  const sessionId = await txManager.track(sentTransactions, options);

  return sessionId;
};
