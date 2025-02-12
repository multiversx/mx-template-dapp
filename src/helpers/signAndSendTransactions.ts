import { TransactionsDisplayInfoType } from '@multiversx/sdk-dapp-core/out/types/transactions.types';
import { getAccountProvider, TransactionManager } from 'lib/sdkDappCore';
import { Transaction } from 'types';

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
