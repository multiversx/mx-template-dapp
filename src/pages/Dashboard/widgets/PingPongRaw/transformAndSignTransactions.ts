import { Address, Transaction } from '@multiversx/sdk-core';
import BigNumber from 'bignumber.js';

import {
  EXTRA_GAS_LIMIT_GUARDED_TX,
  GAS_LIMIT,
  GAS_PER_DATA_BYTE,
  GAS_PRICE
} from '@multiversx/sdk-dapp/constants/index';
import { newTransaction } from '@multiversx/sdk-dapp/models/newTransaction';
import {
  accountSelector,
  addressSelector,
  chainIDSelector
} from '@multiversx/sdk-dapp/reduxStore/selectors';
import { store } from '@multiversx/sdk-dapp/reduxStore/store';

import { getAccount } from '@multiversx/sdk-dapp/utils/account/getAccount';
import { getLatestNonce } from '@multiversx/sdk-dapp/utils/account/getLatestNonce';
import { computeTransactionNonce } from '@multiversx/sdk-dapp/services/transactions/computeTransactionNonce';
import { SendSimpleTransactionPropsType } from '@multiversx/sdk-dapp/types';
import axios from 'axios';

const axiosInstance = axios.create();

enum ErrorCodesEnum {
  'invalidReceiver' = 'Invalid Receiver address',
  'unknownError' = 'Unknown Error. Please check the transactions and try again'
}

function calculateGasLimit({
  data,
  isGuarded
}: {
  data?: string;
  isGuarded?: boolean;
}) {
  const guardedAccountGasLimit = isGuarded ? EXTRA_GAS_LIMIT_GUARDED_TX : 0;
  const bNconfigGasLimit = new BigNumber(GAS_LIMIT).plus(
    guardedAccountGasLimit
  );
  const bNgasPerDataByte = new BigNumber(GAS_PER_DATA_BYTE);
  const bNgasValue = data
    ? bNgasPerDataByte.times(Buffer.from(data).length)
    : 0;
  const bNgasLimit = bNconfigGasLimit.plus(bNgasValue);
  const gasLimit = bNgasLimit.toString(10);
  return gasLimit;
}

export async function transformAndSignTransactions({
  transactions
}: SendSimpleTransactionPropsType) {
  const address = addressSelector(store.getState());

  const url =
    'https://devnet-api.multiversx.com/accounts/erd1c26jzneqwlfcddqre05jh53lnmyj5n8925k0r7gcqkaphr23nnpss0j540?withGuardianInfo=true';

  //   const accountData = await fetch(url);
  //   const account: any = await accountData.json();
  //   console.log(account);

  //   const account: any = (await axiosInstance.get(url)).data;
  //   console.log(account);
  const account = accountSelector(store.getState());

  //   const account = await getAccount(address);
  //   const account = {
  //     address: 'erd1c26jzneqwlfcddqre05jh53lnmyj5n8925k0r7gcqkaphr23nnpss0j540',
  //     balance: '998787309396210000000',
  //     nonce: 157,
  //     timestamp: 1704789602,
  //     shard: 1,
  //     rootHash: 'jvHtb3DX0YT5+pSowsqUPWT+Y11g3R8/3anfL+SWvCc=',
  //     txCount: 158,
  //     scrCount: 6,
  //     developerReward: '0',
  //     isGuarded: false,
  //     activeGuardianActivationEpoch: 458,
  //     activeGuardianAddress:
  //       'erd19r2ljsdzztxenqtq4wjpdpz96h555wdg059rx6unyqt74vllyudq8zh22x',
  //     activeGuardianServiceUid: 'MultiversXTCSService'
  //   };

  const accountNonce = getLatestNonce(account);
  return transactions.map((tx) => {
    const {
      value,
      receiver,
      data = '',
      chainID,
      version = 1,
      options,
      gasPrice = GAS_PRICE,
      gasLimit = calculateGasLimit({
        data: tx.data,
        isGuarded: account?.isGuarded
      }),
      guardian,
      guardianSignature,
      nonce: transactionNonce = 0
    } = tx;
    let validatedReceiver = receiver;

    try {
      const addr = new Address(receiver);
      validatedReceiver = addr.hex();
    } catch (err) {
      throw ErrorCodesEnum.invalidReceiver;
    }

    const computedNonce = computeTransactionNonce({
      accountNonce,
      transactionNonce
    });

    const storeChainId = chainIDSelector(store.getState()).valueOf().toString();
    const transactionsChainId = chainID || storeChainId;
    return newTransaction({
      value,
      receiver: validatedReceiver,
      data,
      gasPrice,
      gasLimit: Number(gasLimit),
      nonce: Number(computedNonce.valueOf().toString()),
      sender: new Address(address).hex(),
      chainID: transactionsChainId,
      version,
      options,
      guardian,
      guardianSignature
    });
  });
}
