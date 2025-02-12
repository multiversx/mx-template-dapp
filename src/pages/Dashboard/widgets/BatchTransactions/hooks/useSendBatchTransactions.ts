import { useGetAccount, useGetNetworkConfig } from 'hooks';
import { getSwapAndLockTransactions } from 'pages/Dashboard/widgets/BatchTransactions/helpers/getSwapAndLockTransactions';
import {
  Transaction,
  TransactionPayload,
  getAccountProvider,
  TransactionManager,
  GAS_LIMIT,
  GAS_PRICE
} from 'utils';

const NUMBER_OF_TRANSACTIONS = 5;

export const useSendBatchTransaction = () => {
  const { network } = useGetNetworkConfig();
  const { address, nonce } = useGetAccount();
  const provider = getAccountProvider();

  const sendBatchTransaction = async () => {
    const txManager = TransactionManager.getInstance();
    const transactions = Array.from(Array(NUMBER_OF_TRANSACTIONS).keys());

    const transactionsToSend = transactions.map((id) => {
      return new Transaction({
        value: '0',
        data: new TransactionPayload(`batch-tx-${id + 1}`),
        receiver: address,
        gasLimit: 10 * GAS_LIMIT,
        gasPrice: GAS_PRICE,
        chainID: network.chainId,
        sender: address,
        version: 1
      });
    });

    const signedTransactions =
      await provider.signTransactions(transactionsToSend);

    const groupedTransactions = [
      [signedTransactions[0]],
      [signedTransactions[1], signedTransactions[2]],
      [signedTransactions[3], signedTransactions[4]]
    ];

    const sentTransactions = await txManager.send(groupedTransactions);
    await txManager.track(sentTransactions);
  };

  const sendSwapAndLockBatchTransactions = async () => {
    const txManager = TransactionManager.getInstance();
    const transactions = getSwapAndLockTransactions({
      address,
      chainID: network.chainId,
      nonce
    });

    const signedTransactions = await provider.signTransactions(transactions);

    const groupedTransactions = [
      [signedTransactions[0]],
      [signedTransactions[1], signedTransactions[2]],
      [signedTransactions[3]]
    ];

    const sentTransactions = await txManager.send(groupedTransactions);
    await txManager.track(sentTransactions);
  };

  return {
    sendBatchTransaction,
    sendSwapAndLockBatchTransactions
  };
};
