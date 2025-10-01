import BigNumber from 'bignumber.js';

import {
  Address,
  Transaction,
  TransactionsFactoryConfig,
  TransferTransactionsFactory
} from 'lib';
import { TransactionProps } from 'types';

const NUMBER_OF_TRANSACTIONS = 5;

export const getBatchTransactions = async ({
  address,
  chainID
}: TransactionProps): Promise<Transaction[]> => {
  const totalTransactions = Array.from(Array(NUMBER_OF_TRANSACTIONS).keys());

  const factoryConfig = new TransactionsFactoryConfig({ chainID });
  const factory = new TransferTransactionsFactory({ config: factoryConfig });

  const transactions = await Promise.all(
    totalTransactions.map((id) => {
      return factory.createTransactionForNativeTokenTransfer(
        Address.newFromBech32(address),
        {
          receiver: Address.newFromBech32(address),
          nativeAmount: BigInt(
            new BigNumber(id).plus(1).shiftedBy(18).toFixed()
          )
        }
      );
    })
  );

  return transactions;
};
