import { BATCH_TRANSACTIONS_SC } from 'config';
import { Transaction, TransactionPayload, GAS_PRICE, VERSION } from 'lib';
import { TransactionProps } from 'types/transaction.types';

export const getSwapAndLockTransactions = ({
  address,
  chainID,
  nonce
}: TransactionProps): Transaction[] => {
  return [
    new Transaction({
      chainID,
      gasLimit: 4200000,
      gasPrice: GAS_PRICE,
      nonce,
      receiver: BATCH_TRANSACTIONS_SC.egld_wEGLD.contract,
      sender: address,
      value: '1000000000000000000',
      version: VERSION,
      data: new TransactionPayload(BATCH_TRANSACTIONS_SC.egld_wEGLD.data)
    }),
    new Transaction({
      chainID,
      gasLimit: 25500000,
      gasPrice: GAS_PRICE,
      nonce,
      receiver: BATCH_TRANSACTIONS_SC.wEGLD_USDC.contract,
      sender: address,
      value: '0',
      version: VERSION,
      data: new TransactionPayload(BATCH_TRANSACTIONS_SC.wEGLD_USDC.data)
    }),
    new Transaction({
      chainID,
      gasLimit: 25500000,
      gasPrice: GAS_PRICE,
      nonce,
      receiver: BATCH_TRANSACTIONS_SC.wEGLD_MEX.contract,
      sender: address,
      value: '0',
      version: VERSION,
      data: new TransactionPayload(BATCH_TRANSACTIONS_SC.wEGLD_MEX.data)
    }),
    new Transaction({
      chainID,
      gasLimit: 10000000,
      gasPrice: GAS_PRICE,
      nonce,
      receiver: BATCH_TRANSACTIONS_SC.lock_MEX.contract,
      sender: address,
      value: '0',
      version: VERSION,
      data: new TransactionPayload(BATCH_TRANSACTIONS_SC.lock_MEX.data)
    })
  ];
};
