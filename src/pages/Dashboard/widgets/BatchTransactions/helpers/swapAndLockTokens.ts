import { createRoot } from 'react-dom/client';
import {
  getAccountProvider,
  ToastManager,
  TransactionsDisplayInfoType
} from 'lib';
import { TransactionProps } from 'types';
import { ToastContent } from '../components';
import { getSwapAndLockTransactions } from './getSwapAndLockTransactions';
import { sendAndTrackTransactions } from './sendAndTrackTransactions';

export const swapAndLockTokens = async ({
  isGuarded,
  address,
  nonce,
  chainID,
  transactionsDisplayInfo = {
    processingMessage: 'Processing transactions',
    errorMessage: 'An error has occurred during transaction execution',
    successMessage: 'Swap and lock transactions successful'
  }
}: TransactionProps & {
  transactionsDisplayInfo?: TransactionsDisplayInfoType;
}) => {
  const provider = getAccountProvider();

  const transactionsToSign = getSwapAndLockTransactions({
    isGuarded,
    address,
    chainID,
    nonce
  });

  const transactions = await provider.signTransactions(transactionsToSign);

  const groupedTransactions = [
    [transactions[0]],
    [transactions[1], transactions[2]],
    [transactions[3]]
  ];

  const sessionId = await sendAndTrackTransactions({
    transactions: groupedTransactions,
    options: {
      transactionsDisplayInfo,
      onSuccess: async () => {
        ToastManager.getInstance().createCustomToast({
          toastId: 'swap-lock-toast',
          hasCloseButton: false,
          instantiateToastElement: () => {
            const toastBody = document.createElement('div');
            const root = createRoot(toastBody);
            root.render(ToastContent());
            return toastBody;
          }
        });
      }
    }
  });

  return sessionId;
};
