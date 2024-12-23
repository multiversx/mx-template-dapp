import { Transaction, TransactionPayload } from 'lib/sdkCore';
import { useStore } from 'hooks/useStore';
import {
  getAccount,
  getAccountProvider,
  networkSelector,
  TransactionManager,
  refreshAccount
} from 'lib/sdkDappCore';
import { GAS_LIMIT, GAS_PRICE } from 'localConstants';
import { getSwapAndLockTransactions } from 'pages/Dashboard/widgets/BatchTransactions/helpers/getSwapAndLockTransactions';

const NUMBER_OF_TRANSACTIONS = 5;

export const useSendBatchTransaction = () => {
  const state = useStore();
  const network = networkSelector(state);
  const provider = getAccountProvider();

  const sendBatchTransaction = async () => {
    const { address, nonce } = getAccount(state);
    const txManager = TransactionManager.getInstance();
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

    const signedTransactions =
      await provider.signTransactions(transactionsToSend);

    const groupedTransactions = [
      [signedTransactions[0]],
      [signedTransactions[1], signedTransactions[2]],
      [signedTransactions[3], signedTransactions[4]]
    ];

    return txManager.send(groupedTransactions);
  };

  const sendSwapAndLockBatchTransactions = async () => {
    const { address, nonce } = getAccount(state);
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

    await refreshAccount();
    return txManager.send(groupedTransactions);
  };

  return {
    sendBatchTransaction,
    sendSwapAndLockBatchTransactions
  };
};
