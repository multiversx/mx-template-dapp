import { Transaction } from 'lib';
import { TransactionsDisplayInfoType } from 'types/sdkDappCore.types';
import { getAccountProvider, TransactionManager } from 'utils/sdkDappCore';

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
