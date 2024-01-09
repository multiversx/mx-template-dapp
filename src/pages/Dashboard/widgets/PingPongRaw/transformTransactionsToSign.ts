import { Transaction } from '@multiversx/sdk-core';
import { transformAndSignTransactions } from './transformAndSignTransactions';
import { SimpleTransactionType } from '@multiversx/sdk-dapp/types';

export const transformTransactionsToSign = async ({
  transactions,
  minGasLimit
}: {
  transactions: (SimpleTransactionType | Transaction)[];
  minGasLimit?: number;
}) => {
  const areComplexTransactions = transactions.every(
    (tx) => Object.getPrototypeOf(tx).toPlainObject != null
  );

  let transactionsToSign = transactions;

  if (!areComplexTransactions) {
    transactionsToSign = (await transformAndSignTransactions({
      transactions: transactions as SimpleTransactionType[],
      minGasLimit
    })) as unknown as Transaction[];
  }

  return transactionsToSign;
};
