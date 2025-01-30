import { Transaction } from 'types';
import {
  getAccountProvider,
  refreshAccount,
  TransactionManager
} from 'lib/sdkDappCore';

type TransactionsDisplayInfoType = any; // TODO: fill in @DanutIlie

type SignAndSendTransactionsProps = {
  transactions: Transaction[];
  transactionsDisplayInfo?: TransactionsDisplayInfoType;
  skipSend?: boolean;
};

export const signAndSendTransactions = async ({
  transactions,
  skipSend
}: SignAndSendTransactionsProps) => {
  const provider = getAccountProvider();
  const txManager = TransactionManager.getInstance();

  await refreshAccount();

  const signedTransactions = await provider.signTransactions(transactions);

  if (skipSend) {
    return signedTransactions;
  }

  await txManager.send(signedTransactions);
  await txManager.track(signedTransactions);
};
