import {
  DECIMALS,
  EXTRA_GAS_LIMIT_GUARDED_TX,
  GAS_LIMIT,
  GAS_PRICE,
  TokenTransfer,
  Transaction,
  TransactionPayload,
  VERSION
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
      version: VERSION,
      nonce: nonce ? nonce + id : undefined
    });
  });
};
