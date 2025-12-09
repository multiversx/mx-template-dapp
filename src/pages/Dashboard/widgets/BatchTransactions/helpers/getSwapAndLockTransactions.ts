import { BATCH_TRANSACTIONS_SC } from 'config';
import { Address, GAS_PRICE, Transaction, VERSION } from 'lib';
import { GUARDED_TX_EXTRA_GAS_LIMIT } from 'localConstants/gas';
import { TransactionProps } from 'types';

export const getSwapAndLockTransactions = ({
  isGuarded,
  address,
  chainID,
  nonce
}: TransactionProps): Transaction[] => {
  const transactions = [
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
      data: Uint8Array.from(Buffer.from(BATCH_TRANSACTIONS_SC.egld_wEGLD.data))
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
      data: Uint8Array.from(Buffer.from(BATCH_TRANSACTIONS_SC.wEGLD_USDC.data))
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
      data: Uint8Array.from(Buffer.from(BATCH_TRANSACTIONS_SC.wEGLD_MEX.data))
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
      data: Uint8Array.from(Buffer.from(BATCH_TRANSACTIONS_SC.lock_MEX.data))
    })
  ];

  if (isGuarded) {
    transactions.forEach((tx) => {
      tx.gasLimit = tx.gasLimit + BigInt(GUARDED_TX_EXTRA_GAS_LIMIT);
    });
  }

  return transactions;
};
