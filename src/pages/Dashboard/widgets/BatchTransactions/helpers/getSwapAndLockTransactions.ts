import { GAS_PRICE, VERSION } from 'localConstants/sdkDapConstants';
import { newTransaction } from 'helpers/sdkDappHelpers';
import { TransactionProps } from 'types/transaction.types';
import { Transaction } from 'types/sdkCoreTypes';
import { BATCH_TRANSACTIONS_SC } from 'config';

export const getSwapAndLockTransactions = ({
  address,
  chainID,
  nonce
}: TransactionProps): Transaction[] => {
  return [
    newTransaction({
      chainID,
      gasLimit: 4200000,
      gasPrice: GAS_PRICE,
      nonce,
      receiver: BATCH_TRANSACTIONS_SC.egld_wEGLD.contract,
      sender: address,
      value: '1000000000000000000',
      version: VERSION,
      data: BATCH_TRANSACTIONS_SC.egld_wEGLD.data
    }),
    newTransaction({
      chainID,
      gasLimit: 25500000,
      gasPrice: GAS_PRICE,
      nonce,
      receiver: BATCH_TRANSACTIONS_SC.wEGLD_USDC.contract,
      sender: address,
      value: '0',
      version: VERSION,
      data: BATCH_TRANSACTIONS_SC.wEGLD_USDC.data
    }),
    newTransaction({
      chainID,
      gasLimit: 25500000,
      gasPrice: GAS_PRICE,
      nonce,
      receiver: BATCH_TRANSACTIONS_SC.wEGLD_MEX.contract,
      sender: address,
      value: '0',
      version: VERSION,
      data: BATCH_TRANSACTIONS_SC.wEGLD_MEX.data
    }),
    newTransaction({
      chainID,
      gasLimit: 10000000,
      gasPrice: GAS_PRICE,
      nonce,
      receiver: BATCH_TRANSACTIONS_SC.lock_MEX.contract,
      sender: address,
      value: '0',
      version: VERSION,
      data: BATCH_TRANSACTIONS_SC.lock_MEX.data
    })
  ];
};
