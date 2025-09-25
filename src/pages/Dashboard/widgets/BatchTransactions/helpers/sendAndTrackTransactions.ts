import { TransactionManagerTrackOptionsType } from '@multiversx/sdk-dapp/out/managers/TransactionManager/TransactionManager.types';

import { Transaction, TransactionManager } from 'lib';

type SendAndTrackTransactionsType = {
  transactions: Transaction[] | Transaction[][];
  options?: TransactionManagerTrackOptionsType;
};

export const sendAndTrackTransactions = async ({
  transactions,
  options
}: SendAndTrackTransactionsType) => {
  const txManager = TransactionManager.getInstance();

  const sentTransactions = await txManager.send(transactions);
  const sessionId = await txManager.track(sentTransactions, options);

  return sessionId;
};
