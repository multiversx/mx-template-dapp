import { Transaction, TransactionPayload } from 'lib/sdkCore';
import { contractAddress } from 'config';
import {
  getAccountProvider,
  TransactionManager,
  useGetAccount,
  useGetNetworkConfig
} from 'lib/sdkDappCore';
import { GAS_LIMIT, GAS_PRICE } from 'localConstants';

export const useSendPingPongTransaction = () => {
  const { network } = useGetNetworkConfig();
  const { address, nonce } = useGetAccount();
  const provider = getAccountProvider();

  const sendPingTransaction = async (amount: string) => {
    const txManager = TransactionManager.getInstance();

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

    const signedTransactions = await provider.signTransactions([
      pingTransaction
    ]);

    await txManager.send(signedTransactions);
    await txManager.track(signedTransactions);
  };

  const sendPongTransaction = async () => {
    const txManager = TransactionManager.getInstance();
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

    const signedTransactions = await provider.signTransactions([
      pongTransaction
    ]);

    await txManager.send(signedTransactions);
    await txManager.track(signedTransactions);
  };

  return {
    sendPingTransaction,
    sendPongTransaction
  };
};
