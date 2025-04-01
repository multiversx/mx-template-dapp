import {
  Address,
  Token,
  TokenTransfer,
  Transaction,
  TransactionsFactoryConfig,
  TransferTransactionsFactory
} from 'lib';
import { TransactionProps } from 'types';

const NUMBER_OF_TRANSACTIONS = 5;

export const getBatchTransactions = ({
  address,
  chainID
}: TransactionProps): Transaction[] => {
  const transactions = Array.from(Array(NUMBER_OF_TRANSACTIONS).keys());

  const factoryConfig = new TransactionsFactoryConfig({ chainID });
  const factory = new TransferTransactionsFactory({ config: factoryConfig });

  return transactions.map((id) => {
    const tokenTransfer = new TokenTransfer({
      token: new Token({ identifier: 'WEGLD-d7c6bb' }),
      amount: BigInt(id + 1)
    });

    return factory.createTransactionForESDTTokenTransfer(
      Address.newFromBech32(address),
      {
        receiver: Address.newFromBech32(address),
        tokenTransfers: [tokenTransfer]
      }
    );
  });
};
