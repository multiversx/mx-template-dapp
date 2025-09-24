import { getAccountProvider, TransactionsDisplayInfoType } from 'lib';
import { TransactionProps } from 'types';

import { sendAndTrackTransactions } from './sendAndTrackTransactions';
import { getWrapAndMultiTransferEsdtsTransactions } from './getWrapAndMultiTransferEsdtsTransactions';

interface WrapAndMultiTransferEsdtsType extends TransactionProps {
  transactionsDisplayInfo?: TransactionsDisplayInfoType;
}

export const wrapAndMultiTransferEsdts = async (
  props: WrapAndMultiTransferEsdtsType
) => {
  const { address, nonce, chainID, transactionsDisplayInfo } = props;

  const provider = getAccountProvider();

  const transactionsToSign = await getWrapAndMultiTransferEsdtsTransactions({
    address,
    chainID,
    nonce
  });

  const [wrapOneEgld, swapHalfWEgldToUsdc, multiTransferOneUsdcHalfWEgld] =
    await provider.signTransactions(transactionsToSign);

  const groupedTransactions = [
    [wrapOneEgld, swapHalfWEgldToUsdc, multiTransferOneUsdcHalfWEgld]
  ];

  const sessionId = await sendAndTrackTransactions({
    transactions: groupedTransactions,
    options: {
      transactionsDisplayInfo
    }
  });

  return sessionId;
};
