import { Transaction, TransactionPayload } from 'lib/sdkCore';
import { contractAddress } from 'config';
import { useSelector } from 'hooks/useSelector';
import {
  accountSelector,
  getAccountProvider,
  networkSelector,
  TransactionManager
} from 'lib/sdkDappCore';
import { GAS_LIMIT, GAS_PRICE } from 'localConstants';

export const useSendPingPongTransaction = () => {
  const network = useSelector(networkSelector);
  const { address, nonce } = useSelector(accountSelector);
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
