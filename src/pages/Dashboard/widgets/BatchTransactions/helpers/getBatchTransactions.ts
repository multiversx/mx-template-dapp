import {
  GAS_LIMIT,
  GAS_PRICE,
  DECIMALS,
  EXTRA_GAS_LIMIT_GUARDED_TX,
  Transaction,
  TransactionPayload,
  TokenTransfer
} from 'lib';
import { TransactionProps } from 'types';
const NUMBER_OF_TRANSACTIONS = 5;

export const getBatchTransactions = ({
  address,
  nonce,
  chainID
}: TransactionProps): Transaction[] => {
  const transactions = Array.from(Array(NUMBER_OF_TRANSACTIONS).keys());

  return transactions.map((id) => {
    const amount = TokenTransfer.fungibleFromAmount(
      '',
      id + 1,
      DECIMALS
    ).toString();

    return new Transaction({
      value: amount,
      data: new TransactionPayload(`batch-tx-${id + 1}`),
      receiver: address,
      gasLimit: GAS_LIMIT + EXTRA_GAS_LIMIT_GUARDED_TX,
      gasPrice: GAS_PRICE,
      chainID,
      sender: address,
      version: 1,
      nonce: nonce ? nonce + id : undefined
    });
  });
};
