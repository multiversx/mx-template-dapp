import { newTransaction } from 'helpers/sdkDappHelpers';
import {
  DECIMALS,
  EXTRA_GAS_LIMIT_GUARDED_TX,
  GAS_LIMIT,
  GAS_PRICE,
  VERSION
} from 'localConstants/sdkDapConstants';
import { Transaction } from 'types/sdkCoreTypes';
import { TransactionProps } from 'types/transaction.types';
import { TokenTransfer } from 'utils/sdkDappCore';

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

    return newTransaction({
      sender: address,
      receiver: address,
      data: `batch-tx-${id + 1}`,
      value: amount,
      chainID,
      gasLimit: GAS_LIMIT + EXTRA_GAS_LIMIT_GUARDED_TX,
      gasPrice: GAS_PRICE,
      nonce,
      version: VERSION
    });
  });
};
