import { Transaction } from '@multiversx/sdk-core/out';
import {
  SimpleTransactionType,
  TransactionsDisplayInfoType
} from '@multiversx/sdk-dapp/types';
import { refreshAccount, sendTransactions } from './sdkDappHelpers';

type SignAndSendTransactionsProps = {
  transactions:
    | Transaction
    | SimpleTransactionType
    | (Transaction | SimpleTransactionType)[];
  callbackRoute: string;
  transactionsDisplayInfo: TransactionsDisplayInfoType;
};

export const signAndSendTransactions = async ({
  transactions,
  callbackRoute,
  transactionsDisplayInfo
}: SignAndSendTransactionsProps) => {
  await refreshAccount();

  const { sessionId } = await sendTransactions({
    transactions,
    transactionsDisplayInfo,
    redirectAfterSign: false,
    callbackRoute
  });

  return sessionId;
};
