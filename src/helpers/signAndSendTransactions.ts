import {
  getAccountProvider,
  refreshAccount,
  TransactionManager
} from 'lib/sdkDappCore';
import { Transaction } from 'types';

type TransactionsDisplayInfoType = any; // TODO: fill in @DanutIlie

type SignAndSendTransactionsProps = {
  transactions: Transaction[];
  transactionsDisplayInfo?: TransactionsDisplayInfoType;
};

export const signAndSendTransactions = async ({
  transactions
}: SignAndSendTransactionsProps) => {
  const provider = getAccountProvider();
  const txManager = TransactionManager.getInstance();

  await refreshAccount();

  const signedTransactions = await provider.signTransactions(transactions);
  const sentTransactions = await txManager.send(signedTransactions);
  await txManager.track(sentTransactions);
};
