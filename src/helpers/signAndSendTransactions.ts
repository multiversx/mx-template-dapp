import {
  getAccountProvider,
  Transaction,
  TransactionManager,
  TransactionsDisplayInfoType
} from 'lib';

type SignAndSendTransactionsProps = {
  transactions: Transaction[];
  transactionsDisplayInfo?: TransactionsDisplayInfoType;
};

export const signAndSendTransactions = async ({
  transactions,
  transactionsDisplayInfo
}: SignAndSendTransactionsProps) => {
  const provider = getAccountProvider();
  const txManager = TransactionManager.getInstance();

  const signedTransactions = await provider.signTransactions(transactions);
  const sentTransactions = await txManager.send(signedTransactions);
  const sessionId = await txManager.track(sentTransactions, {
    transactionsDisplayInfo
  });

  return sessionId;
};
