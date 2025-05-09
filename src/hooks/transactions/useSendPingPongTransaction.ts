import axios from 'axios';
import { contractAddress } from 'config';
import { signAndSendTransactions } from 'helpers';
import {
  AbiRegistry,
  Address,
  GAS_LIMIT,
  GAS_PRICE,
  SmartContractTransactionsFactory,
  Transaction,
  TransactionsFactoryConfig,
  useGetAccount,
  useGetNetworkConfig
} from 'lib';

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

  const getSmartContractFactory = async () => {
    const response = await axios.get('src/contracts/ping-pong.abi.json');
    const abi = AbiRegistry.create(response.data);
    const scFactory = new SmartContractTransactionsFactory({
      config: new TransactionsFactoryConfig({
        chainID: network.chainId
      }),
      abi
    });

    return scFactory;
  };

  const sendPingTransaction = async (amount: string) => {
    const pingTransaction = new Transaction({
      value: BigInt(amount),
      data: Buffer.from('ping'),
      receiver: new Address(address),
      gasLimit: BigInt(10 * GAS_LIMIT),
      gasPrice: BigInt(GAS_PRICE),
      chainID: network.chainId,
      sender: new Address(address),
      version: 1
    });

    await signAndSendTransactions({
      transactions: [pingTransaction],
      transactionsDisplayInfo: PING_TRANSACTION_INFO
    });
  };

  const sendPingTransactionFromAbi = async (amount: string) => {
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
      value: BigInt(0),
      data: Buffer.from('pong'),
      receiver: new Address(contractAddress),
      gasLimit: BigInt(GAS_LIMIT),
      gasPrice: BigInt(GAS_PRICE),
      chainID: network.chainId,
      sender: new Address(address),
      version: 1
    });

    await signAndSendTransactions({
      transactions: [pongTransaction],
      transactionsDisplayInfo: PONG_TRANSACTION_INFO
    });
  };

  //FIXME: to be removed
  const multiTx = async () => {
    const transaction = new Transaction({
      value: BigInt(1),
      data: Buffer.from('d3JhcEVnbGQ='),
      receiver: new Address(
        'erd1qqqqqqqqqqqqqpgqqkwzsxkjc83vlfex9dmznwm7tjvxlqqkpauqx0n782'
      ),
      gasLimit: BigInt(100000000),
      gasPrice: BigInt(1000000000),
      chainID: network.chainId,
      sender: new Address(address),
      version: 2
    });

    const secondTransaction = new Transaction({
      value: BigInt(0),
      data: Buffer.from(
        'TXVsdGlFU0RUTkZUVHJhbnNmZXJAMDAwMDAwMDAwMDAwMDAwMDA1MDAxMzllZDdhZTRhYTAzNzkyZTZiY2IzMzIzOTRhNDBmZTc0NmVlZmE0N2NlYkAwMkA1NzQ1NDc0YzQ0MmQ2MTMyMzg2MzM1MzlAQDhhYzcyMzA0ODllODAwMDBANGQ0NTU4MmQ2MTM2MzUzOTY0MzBAQDA3YmM1ZDZlMzEzNDdlYTdmMTExMWRANjE2NDY0NGM2OTcxNzU2OTY0Njk3NDc5QDg5NjNkZDhjMmM1ZTAwMDBAMDdhODhmYjIzNWQ1M2ZmMzBmZWZhOQ=='
      ),
      receiver: new Address(address),
      gasLimit: BigInt(4200000),
      gasPrice: BigInt(1000000000),
      chainID: network.chainId,
      sender: new Address(address),
      version: 2
    });

    const sessionId = await signAndSendTransactions({
      transactions: [transaction, secondTransaction],
      transactionsDisplayInfo: PONG_TRANSACTION_INFO
    });

    return sessionId;
  };

  const sendPongTransactionFromAbi = async () => {
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
    sendPongTransactionFromService,
    multiTx
  };
};
