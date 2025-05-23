import {
  AbiRegistry,
  SmartContractTransactionsFactory,
  TransactionsFactoryConfig
} from '@multiversx/sdk-core/out';
import { useCallback, useState } from 'react';
import { contractAddress } from 'config';
import pingPongAbi from 'contracts/ping-pong.abi.json';
import { signAndSendTransactions } from 'helpers/signAndSendTransactions';
import {
  Address,
  deleteTransactionToast,
  GAS_PRICE,
  newTransaction,
  removeAllSignedTransactions,
  removeAllTransactionsToSign,
  useGetAccountInfo,
  useGetNetworkConfig,
  useTrackTransactionStatus,
  VERSION
} from 'lib';
import { SessionEnum } from 'localConstants';
import {
  PingPongServiceProps,
  PingRawProps,
  PongRawProps
} from 'types/pingPong.types';

type PingPongTransactionProps = {
  type: SessionEnum;
};

const PING_TRANSACTION_INFO = {
  processingMessage: 'Processing Ping transaction',
  errorMessage: 'An error has occured during Ping',
  successMessage: 'Ping transaction successful'
};

const PONG_TRANSACTION_INFO = {
  processingMessage: 'Processing Pong transaction',
  errorMessage: 'An error has occured during Pong',
  successMessage: 'Pong transaction successful'
};

export const useSendPingPongTransaction = ({
  type
}: PingPongTransactionProps) => {
  // Needed in order to differentiate widgets between each other
  // By default sdk-dapp takes the last sessionId available which will display on every widget the same transaction
  // this usually appears on page refreshes
  const [pingPongSessionId, setPingPongSessionId] = useState(
    sessionStorage.getItem(type)
  );

  const { network } = useGetNetworkConfig();
  const { address, account } = useGetAccountInfo();

  const transactionStatus = useTrackTransactionStatus({
    transactionId: pingPongSessionId ?? '0'
  });

  const clearAllTransactions = () => {
    removeAllSignedTransactions();
    removeAllTransactionsToSign();
    deleteTransactionToast(pingPongSessionId ?? '');
  };

  const sendPingTransaction = useCallback(
    async ({ amount, callbackRoute }: PingRawProps) => {
      clearAllTransactions();

      const pingTransaction = newTransaction({
        value: amount,
        data: 'ping',
        receiver: contractAddress,
        gasLimit: 60000000,
        gasPrice: GAS_PRICE,
        chainID: network.chainId,
        nonce: account.nonce,
        sender: address,
        version: VERSION
      });

      const sessionId = await signAndSendTransactions({
        transactions: [pingTransaction],
        callbackRoute,
        transactionsDisplayInfo: PING_TRANSACTION_INFO
      });

      sessionStorage.setItem(type, sessionId);
      setPingPongSessionId(sessionId);
    },
    []
  );

  const getSmartContractFactory = async () => {
    const abi = AbiRegistry.create(pingPongAbi);
    const scFactory = new SmartContractTransactionsFactory({
      config: new TransactionsFactoryConfig({
        chainID: network.chainId
      }),
      abi
    });

    return scFactory;
  };

  const sendPingTransactionFromAbi = useCallback(
    async ({ amount, callbackRoute }: PingRawProps) => {
      clearAllTransactions();

      const scFactory = await getSmartContractFactory();
      const pingTransaction = scFactory.createTransactionForExecute(
        new Address(address),
        {
          gasLimit: BigInt(60000000),
          function: 'ping',
          contract: new Address(contractAddress),
          nativeTransferAmount: BigInt(amount)
        }
      );

      const sessionId = await signAndSendTransactions({
        transactions: [pingTransaction],
        callbackRoute,
        transactionsDisplayInfo: PING_TRANSACTION_INFO
      });

      sessionStorage.setItem(type, sessionId);
      setPingPongSessionId(sessionId);
    },
    []
  );

  const sendPingTransactionFromService = useCallback(
    async ({ transactions, callbackRoute }: PingPongServiceProps) => {
      clearAllTransactions();

      const sessionId = await signAndSendTransactions({
        transactions,
        callbackRoute,
        transactionsDisplayInfo: PING_TRANSACTION_INFO
      });

      sessionStorage.setItem(type, sessionId);
      setPingPongSessionId(sessionId);
    },
    []
  );

  const sendPongTransaction = useCallback(
    async ({ callbackRoute }: PongRawProps) => {
      clearAllTransactions();

      const pongTransaction = newTransaction({
        value: '0',
        data: 'pong',
        receiver: contractAddress,
        gasLimit: 60000000,
        gasPrice: GAS_PRICE,
        chainID: network.chainId,
        nonce: account.nonce,
        sender: address,
        version: VERSION
      });

      const sessionId = await signAndSendTransactions({
        transactions: [pongTransaction],
        callbackRoute,
        transactionsDisplayInfo: PONG_TRANSACTION_INFO
      });

      sessionStorage.setItem(type, sessionId);
      setPingPongSessionId(sessionId);
    },
    []
  );

  const sendPongTransactionFromAbi = useCallback(
    async ({ callbackRoute }: PongRawProps) => {
      clearAllTransactions();

      const scFactory = await getSmartContractFactory();
      const pongTransaction = scFactory.createTransactionForExecute(
        new Address(address),
        {
          gasLimit: BigInt(60000000),
          function: 'pong',
          contract: new Address(contractAddress),
          nativeTransferAmount: BigInt(0)
        }
      );

      const sessionId = await signAndSendTransactions({
        transactions: [pongTransaction],
        callbackRoute,
        transactionsDisplayInfo: PONG_TRANSACTION_INFO
      });

      sessionStorage.setItem(type, sessionId);
      setPingPongSessionId(sessionId);
    },
    []
  );

  const sendPongTransactionFromService = useCallback(
    async ({ transactions, callbackRoute }: PingPongServiceProps) => {
      clearAllTransactions();

      const sessionId = await signAndSendTransactions({
        transactions,
        callbackRoute,
        transactionsDisplayInfo: PONG_TRANSACTION_INFO
      });

      sessionStorage.setItem(type, sessionId);
      setPingPongSessionId(sessionId);
    },
    []
  );

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
