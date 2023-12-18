import { parseAmount } from 'utils';
import { newTransaction } from 'helpers/sdkDappHelpers';
import {
  EXTRA_GAS_LIMIT_GUARDED_TX,
  GAS_LIMIT,
  GAS_PRICE,
  VERSION
} from 'localConstants/sdkDapConstants';
import { TransactionProps } from 'types/transaction.types';
import { Transaction } from 'types/sdkCoreTypes';

const NUMBER_OF_TRANSACTIONS = 5;

export const getBatchTransactions = ({
  address,
  nonce,
  chainID
}: TransactionProps): Transaction[] => {
  return Array.from(Array(NUMBER_OF_TRANSACTIONS).keys()).map((id) => {
    return newTransaction({
      sender: address,
      receiver: address,
      data: `batch-tx-${id + 1}`,
      value: parseAmount(String(id + 1)),
      chainID,
      gasLimit: GAS_LIMIT + EXTRA_GAS_LIMIT_GUARDED_TX,
      gasPrice: GAS_PRICE,
      nonce,
      version: VERSION
    });
  });
};
