import {
  getAccountProvider,
  ToastManager,
  TransactionsDisplayInfoType
} from 'lib';
import { TransactionProps } from 'types';
import { getWrapAndMultiTransferTransactions } from './getWrapAndMultiTransferTransactions';
import { sendAndTrackTransactions } from './sendAndTrackTransactions';

interface WrapAndMultiTransferTransactionsType extends TransactionProps {
  transactionsDisplayInfo?: TransactionsDisplayInfoType;
}

export const wrapAndMultiTransferTransactions = async (
  props: WrapAndMultiTransferTransactionsType
) => {
  const { address, nonce, chainID, transactionsDisplayInfo, isGuarded } = props;

  const provider = getAccountProvider();

  const transactionsToSign = await getWrapAndMultiTransferTransactions({
    isGuarded,
    address,
    chainID,
    nonce
  });

  const signedTransactions = await provider.signTransactions([
    transactionsToSign.wrapOneEgld,
    transactionsToSign.swapHalfWEgldToUsdc,
    transactionsToSign.multiTransferOneUsdcHalfWEgld
  ]);

  const groupedTransactions = [
    [signedTransactions[0], signedTransactions[1], signedTransactions[2]]
  ];

  const sessionId = await sendAndTrackTransactions({
    transactions: groupedTransactions,
    options: {
      transactionsDisplayInfo,
      onFail: async () => {
        ToastManager.getInstance().createCustomToast({
          toastId: 'multi-transfer-fail',
          icon: 'times',
          iconClassName: 'error text-error mt-1',
          title: 'Multi-Transfer Failed',
          message:
            'Fix it by replacing multiTransfer receiver address with an actual user address.'
        });
      }
    }
  });

  return sessionId;
};
