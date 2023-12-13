import {
  Transaction,
  SimpleTransactionType,
  TransactionsDisplayInfoType
} from 'types';

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
