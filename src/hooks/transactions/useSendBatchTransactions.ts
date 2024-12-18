import { Transaction, TransactionPayload } from '@multiversx/sdk-core/out';
import { useStore } from 'hooks/useStore';
import {
  getAccount,
  getAccountProvider,
  getState,
  networkSelector
} from 'lib/sdkDappCore';
import { TransactionManager } from '@multiversx/sdk-dapp-core/out/core/managers/TransactionManager';
import { GAS_LIMIT, GAS_PRICE } from 'localConstants';

export const useSendBatchTransaction = () => {
  const network = networkSelector(getState());
  const store = useStore();
  const provider = getAccountProvider();

  const sendBatchTransaction = async () => {
    const { address, nonce } = getAccount(store);
    const txManager = TransactionManager.getInstance();
    const NUMBER_OF_TRANSACTIONS = 5;
    const transactions = Array.from(Array(NUMBER_OF_TRANSACTIONS).keys());

    const transactionsToSend = transactions.map((id) => {
      return new Transaction({
        value: '0',
        data: new TransactionPayload(`batch-tx-${id + 1}`),
        receiver: address,
        gasLimit: GAS_LIMIT,
        gasPrice: GAS_PRICE,
        chainID: network.chainId,
        nonce: nonce + id,
        sender: address,
        version: 1
      });
    });

    const signedTransactions = await provider.signTransactions(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      transactionsToSend as any
    );

    const groupedTransactions = [
      [signedTransactions[0]],
      [signedTransactions[1], signedTransactions[2]],
      [signedTransactions[3], signedTransactions[4]]
    ];

    const hashes = await txManager.send(groupedTransactions);

    console.log('Batch transactions hashes', hashes);
  };

  return {
    sendBatchTransaction
  };
};
