import { parseAmount } from 'utils';
import { BatchTransactionsType } from '../types';

const NUMBER_OF_TRANSACTIONS = 5;

export const getBatchTransactions = (
  address: string
): BatchTransactionsType => {
  const transactions = Array.from(Array(NUMBER_OF_TRANSACTIONS).keys()).map(
    (id) => {
      return {
        value: parseAmount(String(id + 1)),
        data: `batch-tx-${id + 1}`,
        receiver: address,
        sender: address
      };
    }
  );

  return {
    transactions
  };
};
