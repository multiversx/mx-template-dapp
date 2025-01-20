import { Transaction } from 'types';
import {
  getAccountProvider,
  refreshAccount,
  TransactionManager,
  useGetAccount,
  useGetNetworkConfig
} from 'lib/sdkDappCore';

type TransactionsDisplayInfoType = any; // TODO: fill in @DanutIlie

type SignAndSendTransactionsProps = {
  transactions: Transaction[];
  transactionsDisplayInfo?: TransactionsDisplayInfoType;
};

export const signAndSendTransactions = async ({
  transactions
}: SignAndSendTransactionsProps) => {
  const { network } = useGetNetworkConfig();
  const { address, nonce } = useGetAccount();
  const provider = getAccountProvider();
  const txManager = TransactionManager.getInstance();

  await refreshAccount();

  const signedTransactions = await provider.signTransactions(transactions);

  await txManager.send(signedTransactions);
  await txManager.track(signedTransactions);
};
