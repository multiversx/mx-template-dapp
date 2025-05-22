import BigNumber from 'bignumber.js';
import { BATCH_TRANSACTIONS_SC } from 'config';
import {
  Address,
  GAS_PRICE,
  Transaction,
  TransactionsFactoryConfig,
  TransferTransactionsFactory,
  VERSION
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
    const tokenTransfer = factory.createTransactionForNativeTokenTransfer(
      Address.newFromBech32(address),
      {
        receiver: Address.newFromBech32(address),
        nativeAmount: BigInt(new BigNumber(id).plus(1).shiftedBy(18).toFixed())
      }
    );

    return tokenTransfer;
  });
};

export const getSwapAndLockTransactions = ({
  address,
  chainID,
  nonce
}: TransactionProps): Transaction[] => {
  return [
    new Transaction({
      chainID,
      gasLimit: BigInt(4200000),
      gasPrice: BigInt(GAS_PRICE),
      nonce: BigInt(nonce),
      receiver: Address.newFromBech32(
        BATCH_TRANSACTIONS_SC.egld_wEGLD.contract
      ),
      sender: Address.newFromBech32(address),
      value: BigInt('1000000000000000000'),
      version: VERSION,
      data: Buffer.from(BATCH_TRANSACTIONS_SC.egld_wEGLD.data)
    }),
    new Transaction({
      chainID,
      gasLimit: BigInt(25500000),
      gasPrice: BigInt(GAS_PRICE),
      nonce: BigInt(nonce),
      receiver: Address.newFromBech32(
        BATCH_TRANSACTIONS_SC.wEGLD_USDC.contract
      ),
      sender: Address.newFromBech32(address),
      value: BigInt('0'),
      version: VERSION,
      data: Buffer.from(BATCH_TRANSACTIONS_SC.wEGLD_USDC.data)
    }),
    new Transaction({
      chainID,
      gasLimit: BigInt(25500000),
      gasPrice: BigInt(GAS_PRICE),
      nonce: BigInt(nonce),
      receiver: Address.newFromBech32(BATCH_TRANSACTIONS_SC.wEGLD_MEX.contract),
      sender: Address.newFromBech32(address),
      value: BigInt('0'),
      version: VERSION,
      data: Buffer.from(BATCH_TRANSACTIONS_SC.wEGLD_MEX.data)
    }),
    new Transaction({
      chainID,
      gasLimit: BigInt(10000000),
      gasPrice: BigInt(GAS_PRICE),
      nonce: BigInt(nonce),
      receiver: Address.newFromBech32(BATCH_TRANSACTIONS_SC.lock_MEX.contract),
      sender: Address.newFromBech32(address),
      value: BigInt('0'),
      version: VERSION,
      data: Buffer.from(BATCH_TRANSACTIONS_SC.lock_MEX.data)
    })
  ];
};
