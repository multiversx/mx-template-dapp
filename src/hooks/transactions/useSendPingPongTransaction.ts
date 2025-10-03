import { ProxyNetworkProvider } from '@multiversx/sdk-core/out';
import axios from 'axios';
import { contractAddress } from 'config';
import { signAndSendTransactions } from 'helpers';
import {
  AbiRegistry,
  Address,
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
      receiver: new Address(contractAddress),
      gasLimit: BigInt(6000000),
      gasPrice: BigInt(GAS_PRICE),
      chainID: network.chainId,
      sender: new Address(address),
      version: 2
    });

    const networkProvider = new ProxyNetworkProvider(network.apiAddress);
    const account = await networkProvider.getAccount(new Address(address));
    pingTransaction.nonce = account.nonce;

    const transactionCost =
      await networkProvider.estimateTransactionCost(pingTransaction);
    pingTransaction.gasLimit = BigInt(transactionCost.gasLimit); // overwrite default gas limit with estimation

    const sessionId = await signAndSendTransactions({
      transactions: [pingTransaction],
      transactionsDisplayInfo: PING_TRANSACTION_INFO
    });

    return sessionId;
  };

  const sendPingTransactionFromAbi = async (amount: string) => {
    const scFactory = await getSmartContractFactory();
    const pingTransaction = await scFactory.createTransactionForExecute(
      new Address(address),
      {
        gasLimit: BigInt(6000000),
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
    const sessionId = await signAndSendTransactions({
      transactions,
      transactionsDisplayInfo: PING_TRANSACTION_INFO
    });

    return sessionId;
  };

  const sendPongTransaction = async () => {
    const pongTransaction = new Transaction({
      value: BigInt(0),
      data: Buffer.from('pong'),
      receiver: new Address(contractAddress),
      gasLimit: BigInt(6000000),
      gasPrice: BigInt(GAS_PRICE),
      chainID: network.chainId,
      sender: new Address(address),
      version: 2
    });

    const networkProvider = new ProxyNetworkProvider(network.apiAddress);
    const account = await networkProvider.getAccount(new Address(address));
    pongTransaction.nonce = account.nonce;

    const transactionCost =
      await networkProvider.estimateTransactionCost(pongTransaction);
    pongTransaction.gasLimit = BigInt(transactionCost.gasLimit); // overwrite default gas limit with estimation

    const sessionId = await signAndSendTransactions({
      transactions: [pongTransaction],
      transactionsDisplayInfo: PONG_TRANSACTION_INFO
    });

    return sessionId;
  };

  const sendPongTransactionFromAbi = async () => {
    const scFactory = await getSmartContractFactory();
    const pongTransaction = await scFactory.createTransactionForExecute(
      new Address(address),
      {
        gasLimit: BigInt(6000000),
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
    transactions?: Transaction[]
  ) => {
    if (!transactions) {
      return;
    }

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
