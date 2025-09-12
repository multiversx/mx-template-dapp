import { UserPublicKey } from '@multiversx/sdk-core/out';
import {
  getAccountProvider,
  Transaction,
  TransactionComputer,
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
  console.log('---------------', { signedTransactions });

  const computer = new TransactionComputer();
  const txBytes = computer.computeBytesForVerifying(transactions[0]);
  const userPublicKey = new UserPublicKey(
    new Uint8Array(transactions[0].sender.getPublicKey())
  );

  console.log('before signing', transactions[0].toPlainObject());

  const result = await userPublicKey.verify(
    txBytes,
    signedTransactions[0].signature
  );

  console.log({ txBytes, signedTx: signedTransactions[0].signature, result });

  console.log('after signing', signedTransactions[0].toPlainObject());
  const sentTransactions = await txManager.send(signedTransactions);
  const sessionId = await txManager.track(sentTransactions, {
    transactionsDisplayInfo
  });

  return sessionId;
};
