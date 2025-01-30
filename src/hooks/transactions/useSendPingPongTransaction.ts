import { Address, Transaction, TransactionPayload } from 'lib/sdkCore';
import { contractAddress } from 'config';
import { useGetAccount, useGetNetworkConfig } from 'lib/sdkDappCore';
import { GAS_LIMIT, GAS_PRICE } from 'localConstants';
import { smartContract } from 'utils/smartContract';
import { signAndSendTransactions } from 'helpers';
import { IPlainTransactionObject } from 'types/sdkCoreTypes';

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
  const { address, nonce } = useGetAccount();

  const signRelayedTransaction = async () => {
    const initialTransaction = new Transaction({
      value: '1',
      data: new TransactionPayload('ping'),
      receiver:
        'erd1wh9c0sjr2xn8hzf02lwwcr4jk2s84tat9ud2kaq6zr7xzpvl9l5q8awmex',
      sender: address,
      relayer: new Address(address),
      gasLimit: 10 * GAS_LIMIT,
      gasPrice: GAS_PRICE,
      chainID: network.chainId,
      nonce,
      version: 1
    });

    const tx = await signAndSendTransactions({
      transactions: [initialTransaction],
      skipSend: true,
      transactionsDisplayInfo: PING_TRANSACTION_INFO
    });

    const signedTx = tx?.[0].toPlainObject();

    if (!signedTx) {
      return;
    }

    const { signature: relayerSignature, ...rest } = signedTx;

    sessionStorage.setItem(
      'relayerTx',
      JSON.stringify({
        ...rest,
        relayerSignature
      })
    );

    const ownTransaction = Transaction.fromPlainObject({
      ...rest,
      relayerSignature
    });

    await signAndSendTransactions({
      transactions: [ownTransaction],
      transactionsDisplayInfo: PING_TRANSACTION_INFO
    });

    // secondTxSigned = secondTx?.[0].toPlainObject();
    // console.log('secondTxSigned', secondTxSigned);
    // TODO: use CrossWindowProvider to sign tx
  };

  const sendPingTransaction = async (amount: string) => {
    const pingTransaction = new Transaction({
      value: amount,
      data: new TransactionPayload('ping'),
      receiver: address,
      gasLimit: 10 * GAS_LIMIT,
      gasPrice: GAS_PRICE,
      chainID: network.chainId,
      nonce,
      sender: address,
      version: 1
    });

    const obj = sessionStorage.getItem('relayerTx');

    const relayed = obj
      ? Transaction.fromPlainObject(JSON.parse(obj))
      : pingTransaction;

    sessionStorage.removeItem('relayerTx');

    console.log('relayed', relayed);

    await signAndSendTransactions({
      transactions: [relayed],
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
      nonce: nonce,
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
  };

  const sendPongTransactionFromService = async (
    transactions: Transaction[]
  ) => {
    const sessionId = await signAndSendTransactions({
      transactions,
      transactionsDisplayInfo: PONG_TRANSACTION_INFO
    });
  };

  return {
    sendPingTransaction,
    sendPingTransactionFromAbi,
    sendPongTransaction,
    sendPongTransactionFromAbi,
    sendPingTransactionFromService,
    sendPongTransactionFromService,
    signRelayedTransaction
  };
};
