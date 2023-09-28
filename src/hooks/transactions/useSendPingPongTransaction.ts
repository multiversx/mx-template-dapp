import { useState } from 'react';
import {
  deleteTransactionToast,
  removeAllSignedTransactions,
  removeAllTransactionsToSign
} from '@multiversx/sdk-dapp/services/transactions/clearTransactions';
import { contractAddress } from 'config';
import { refreshAccount, sendTransactions } from 'helpers';
import { useTrackTransactionStatus } from 'hooks/sdkDappHooks';
import { SessionEnum } from 'localConstants';
import { IPlainTransactionObject } from 'types/sdkCoreTypes';
import { getChainId } from 'utils/getChainId';
import { smartContract } from 'utils/smartContract';

export const useSendPingPongTransaction = (type: SessionEnum) => {
  // Needed in order to differentiate widgets between each other
  // By default sdk-dapp takes the last sessionId available which will display on every widget the same transaction
  // this usually appears on page refreshes
  const [pingPongSessionId, setPingPongSessionId] = useState(
    sessionStorage.getItem(type)
  );

  const transactionStatus = useTrackTransactionStatus({
    transactionId: pingPongSessionId ?? '0'
  });

  const clearAllTransactions = () => {
    removeAllSignedTransactions();
    removeAllTransactionsToSign();
    deleteTransactionToast(pingPongSessionId ?? '');
  };

  const sendPingTransaction = async (amount?: string) => {
    clearAllTransactions();

    const pingTransaction = {
      value: amount,
      data: 'ping',
      receiver: contractAddress,
      gasLimit: '60000000'
    };

    await refreshAccount();
    const { sessionId } = await sendTransactions({
      transactions: pingTransaction,
      transactionsDisplayInfo: {
        processingMessage: 'Processing Ping transaction',
        errorMessage: 'An error has occured during Ping',
        successMessage: 'Ping transaction successful'
      },
      redirectAfterSign: false
    });

    sessionStorage.setItem(type, sessionId);
    setPingPongSessionId(sessionId);
  };

  const sendPingTransactionFromAbi = async (amount?: string) => {
    clearAllTransactions();

    const pingTransaction = smartContract.methodsExplicit
      .ping()
      .withValue(amount ?? '0')
      .withGasLimit(60000000)
      .withChainID(getChainId())
      .buildTransaction()
      .toPlainObject();

    await refreshAccount();
    const { sessionId } = await sendTransactions({
      transactions: pingTransaction,
      transactionsDisplayInfo: {
        processingMessage: 'Processing Ping transaction',
        errorMessage: 'An error has occured during Ping',
        successMessage: 'Ping transaction successful'
      },
      redirectAfterSign: false
    });

    sessionStorage.setItem(type, sessionId);
    setPingPongSessionId(sessionId);
  };

  const sendPingTransactionFromService = async (
    transaction: IPlainTransactionObject
  ) => {
    clearAllTransactions();

    await refreshAccount();
    const { sessionId } = await sendTransactions({
      transactions: [transaction],
      transactionsDisplayInfo: {
        processingMessage: 'Processing Ping transaction',
        errorMessage: 'An error has occured during Ping',
        successMessage: 'Ping transaction successful'
      },
      redirectAfterSign: false
    });

    sessionStorage.setItem(type, sessionId);
    setPingPongSessionId(sessionId);
  };

  const sendPongTransaction = async () => {
    clearAllTransactions();

    const pongTransaction = {
      value: '0',
      data: 'pong',
      receiver: contractAddress,
      gasLimit: '60000000'
    };

    await refreshAccount();
    const { sessionId } = await sendTransactions({
      transactions: pongTransaction,
      transactionsDisplayInfo: {
        processingMessage: 'Processing Pong transaction',
        errorMessage: 'An error has occured during Pong',
        successMessage: 'Pong transaction successful'
      },
      redirectAfterSign: false
    });

    sessionStorage.setItem(type, sessionId);
    setPingPongSessionId(sessionId);
  };

  const sendPongTransactionFromAbi = async () => {
    clearAllTransactions();

    const pongTransaction = smartContract.methodsExplicit
      .pong()
      .withValue('0')
      .withGasLimit(60000000)
      .withChainID(getChainId())
      .buildTransaction()
      .toPlainObject();

    await refreshAccount();
    const { sessionId } = await sendTransactions({
      transactions: pongTransaction,
      transactionsDisplayInfo: {
        processingMessage: 'Processing Pong transaction',
        errorMessage: 'An error has occured during Pong',
        successMessage: 'Pong transaction successful'
      },
      redirectAfterSign: false
    });

    sessionStorage.setItem(type, sessionId);
    setPingPongSessionId(sessionId);
  };

  const sendPongTransactionFromService = async (
    transaction: IPlainTransactionObject
  ) => {
    clearAllTransactions();

    await refreshAccount();
    const { sessionId } = await sendTransactions({
      transactions: [transaction],
      transactionsDisplayInfo: {
        processingMessage: 'Processing Pong transaction',
        errorMessage: 'An error has occured during Pong',
        successMessage: 'Pong transaction successful'
      },
      redirectAfterSign: false
    });

    sessionStorage.setItem(type, sessionId);
    setPingPongSessionId(sessionId);
  };

  return {
    sendPingTransaction,
    sendPingTransactionFromAbi,
    sendPongTransaction,
    sendPongTransactionFromAbi,
    sendPingTransactionFromService,
    sendPongTransactionFromService,
    transactionStatus
  };
};
