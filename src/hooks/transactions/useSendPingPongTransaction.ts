import { contractAddress } from 'config';
import { signAndSendTransactions } from 'helpers';
import {
  Address,
  Transaction,
  TransactionPayload,
  GAS_LIMIT,
  GAS_PRICE,
  useGetNetworkConfig,
  useGetAccount
} from 'lib';
import { smartContract } from 'utils';

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

export const useSendPingPongTransaction = () => {
  const { network } = useGetNetworkConfig();
  const { address } = useGetAccount();

  const sendPingTransaction = async (amount: string) => {
    const pingTransaction = new Transaction({
      value: amount,
      data: new TransactionPayload('ping'),
      receiver: address,
      gasLimit: 10 * GAS_LIMIT,
      gasPrice: GAS_PRICE,
      chainID: network.chainId,
      sender: address,
      version: 1
    });

    await signAndSendTransactions({
      transactions: [pingTransaction],
      transactionsDisplayInfo: PING_TRANSACTION_INFO
    });
  };

  const sendPingTransactionFromAbi = async (amount: string) => {
    const pingTransaction = smartContract.methodsExplicit
      .ping()
      .withSender(new Address(address))
      .withValue(amount ?? '0')
      .withGasLimit(60000000)
      .withChainID(network.chainId)
      .buildTransaction();

    const sessionId = await signAndSendTransactions({
      transactions: [pingTransaction],
      transactionsDisplayInfo: PING_TRANSACTION_INFO
    });

    return sessionId;
  };

  const sendPingTransactionFromService = async (
    transactions: Transaction[]
  ) => {
    await signAndSendTransactions({
      transactions,
      transactionsDisplayInfo: PING_TRANSACTION_INFO
    });
  };

  const sendPongTransaction = async () => {
    const pongTransaction = new Transaction({
      value: '0',
      data: new TransactionPayload('pong'),
      receiver: contractAddress,
      gasLimit: GAS_LIMIT,
      gasPrice: GAS_PRICE,
      chainID: network.chainId,
      sender: address,
      version: 1
    });

    await signAndSendTransactions({
      transactions: [pongTransaction],
      transactionsDisplayInfo: PONG_TRANSACTION_INFO
    });
  };

  const sendPongTransactionFromAbi = async () => {
    const pongTransaction = smartContract.methodsExplicit
      .pong()
      .withSender(new Address(address))
      .withValue('0')
      .withGasLimit(60000000)
      .withChainID(network.chainId)
      .buildTransaction();

    const sessionId = await signAndSendTransactions({
      transactions: [pongTransaction],
      transactionsDisplayInfo: PONG_TRANSACTION_INFO
    });

    return sessionId;
  };

  const sendPongTransactionFromService = async (
    transactions: Transaction[]
  ) => {
    const sessionId = await signAndSendTransactions({
      transactions,
      transactionsDisplayInfo: PONG_TRANSACTION_INFO
    });

    return sessionId;
  };

  return {
    sendPingTransaction,
    sendPingTransactionFromAbi,
    sendPongTransaction,
    sendPongTransactionFromAbi,
    sendPingTransactionFromService,
    sendPongTransactionFromService
  };
};
