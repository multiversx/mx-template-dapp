import BigNumber from 'bignumber.js';
import {
  Address,
  Transaction,
  TransactionsFactoryConfig,
  TransferTransactionsFactory
} from 'lib';
import { GUARDED_TX_EXTRA_GAS_LIMIT } from 'localConstants/gas';
import { TransactionProps } from 'types';

const NUMBER_OF_TRANSACTIONS = 5;

export const getBatchTransactions = async ({
  address,
  chainID,
  isGuarded
}: TransactionProps): Promise<Transaction[]> => {
  const transactions = Array.from(Array(NUMBER_OF_TRANSACTIONS).keys());

  const factoryConfig = new TransactionsFactoryConfig({ chainID });
  const factory = new TransferTransactionsFactory({ config: factoryConfig });

  return Promise.all(
    transactions.map(async (id) => {
      const nativeAmount = new BigNumber(id)
        .plus(1)
        .dividedBy(10)
        .shiftedBy(18)
        .toFixed();

      const tokenTransfer =
        await factory.createTransactionForNativeTokenTransfer(
          Address.newFromBech32(address),
          {
            receiver: Address.newFromBech32(address),
            nativeAmount: BigInt(nativeAmount)
          }
        );

      if (isGuarded) {
        tokenTransfer.gasLimit =
          tokenTransfer.gasLimit + BigInt(GUARDED_TX_EXTRA_GAS_LIMIT);
      }

      return tokenTransfer;
    })
  );
};
