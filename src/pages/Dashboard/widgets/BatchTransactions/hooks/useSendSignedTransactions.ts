import { useEffect, useState } from 'react';

import { TransactionBatchStatusesEnum } from '@multiversx/sdk-dapp/types/enums.types';
import {
  useSendBatchTransactions,
  useGetSignedTransactions
} from 'hooks/sdkDappHooks';
import { SessionEnum } from 'localConstants';
import {
  deleteTransactionToast,
  removeAllSignedTransactions,
  removeAllTransactionsToSign,
  setTransactionsDisplayInfoState,
  setTransactionsToSignedState
} from 'services/sdkDappServices';
import { useBatchTransactionContext } from 'wrappers';

export const useSendSignedTransactions = ({
  signedSessionId = null,
  transactionsOrder
}: {
  signedSessionId: string | null;
  transactionsOrder?: number[][];
}) => {
  const [batchSessionId, setBatchSessionId] = useState<string | null>(
    sessionStorage.getItem(SessionEnum.batchSessionId)
  );
  const { signedTransactions } = useGetSignedTransactions();
  const { send: sendBatchToBlockchain, batchId } = useSendBatchTransactions();
  const { sendBatchTransactionsOnDemand } = useBatchTransactionContext();

  const clearTransactionsInformation = () => {
    removeAllSignedTransactions();
    removeAllTransactionsToSign();
    deleteTransactionToast(batchSessionId ?? '');
    sessionStorage.removeItem(SessionEnum.batchSessionId);
    setBatchSessionId(null);
  };

  const sendTransactions = async () => {
    if (!batchSessionId || !signedSessionId) {
      return;
    }

    const signedSession = signedTransactions?.[signedSessionId];
    const signedSessionTransactions = signedSession?.transactions;

    if (!signedSession || signedSessionTransactions?.length === 0) {
      return;
    }

    // Cancel flow
    if (signedSession?.status !== 'signed') {
      clearTransactionsInformation();
      return;
    }

    const transactions = [];

    if (transactionsOrder && transactionsOrder.length > 0) {
      transactionsOrder.forEach((txOrders) => {
        const batch = txOrders.map(
          (txIndex) => signedSessionTransactions[txIndex]
        );

        transactions.push(batch);
      });
    } else {
      transactions.push(signedSessionTransactions);
    }

    setTransactionsToSignedState({
      sessionId: batchSessionId,
      status: TransactionBatchStatusesEnum.signed,
      transactions: signedSessionTransactions
    });

    // In order to reuse the current flow for batch transactions in sdk-dapp we need to use this function
    // in order to set the toast display info because the last signed sessionId is not used anymore
    // but the new sessionId from the batchId is used
    setTransactionsDisplayInfoState({
      sessionId: batchSessionId,
      transactionsDisplayInfo: {
        processingMessage: 'Processing transactions',
        errorMessage: 'An error has occurred during transaction execution',
        successMessage: 'Batch transactions successful'
      }
    });

    const { error } = await sendBatchToBlockchain({
      transactions,
      sessionId: batchSessionId
    });

    setBatchSessionId(null);
    sessionStorage.removeItem(SessionEnum.batchSessionId);

    if (error) {
      clearTransactionsInformation();
      console.log('Failed to send batch', batchSessionId);
    }
  };

  useEffect(() => {
    if (!sendBatchTransactionsOnDemand) {
      return;
    }

    if (!batchSessionId) {
      return;
    }

    // Let the app enough time to reload when coming back from the web allet
    const timeoutId = setTimeout(() => {
      sendTransactions();
    }, 500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [batchSessionId, signedTransactions[signedSessionId]?.status]);

  return {
    batchId,
    setBatchSessionId
  };
};
