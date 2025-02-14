import { Transaction } from 'lib';
import {
  getAccountProvider,
  TransactionManager
} from 'lib/sdkDapp/sdkDappCore';
import { TransactionsDisplayInfoType } from 'lib/sdkDapp/sdkDappCore.types';

type SignAndSendTransactionsProps = {
  transactions: Transaction[];
  transactionsDisplayInfo?: TransactionsDisplayInfoType;
};

export const signAndSendTransactions = async ({
  transactions
}: SignAndSendTransactionsProps) => {
  const provider = getAccountProvider();
  const txManager = TransactionManager.getInstance();

  const signedTransactions = await provider.signTransactions(transactions);
  const sentTransactions = await txManager.send(signedTransactions);
  await txManager.track(sentTransactions);
};
