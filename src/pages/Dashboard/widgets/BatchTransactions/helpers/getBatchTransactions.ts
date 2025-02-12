import { TransactionProps } from 'types/transaction.types';
import { Transaction, TransactionPayload, GAS_LIMIT, GAS_PRICE } from 'utils';

const NUMBER_OF_TRANSACTIONS = 5;

export const getBatchTransactions = ({
  address,
  nonce,
  chainID
}: TransactionProps): Transaction[] => {
  const transactions = Array.from(Array(NUMBER_OF_TRANSACTIONS).keys());

  return transactions.map((id) => {
    return new Transaction({
      value: '0',
      data: new TransactionPayload(`batch-tx-${id + 1}`),
      receiver: address,
      gasLimit: 10 * GAS_LIMIT,
      gasPrice: GAS_PRICE,
      chainID,
      sender: address,
      version: 1,
      nonce: nonce ? nonce + id : undefined
    });
  });
};
