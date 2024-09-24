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
  signedSessionId = ''
}: {
  signedSessionId: string;
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
    if (signedSession?.status !== TransactionBatchStatusesEnum.signed) {
      clearTransactionsInformation();
      return;
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
      transactions: [signedSessionTransactions],
      sessionId: batchSessionId
    });

    setBatchSessionId(null);
    sessionStorage.removeItem(SessionEnum.batchSessionId);

    if (error) {
      clearTransactionsInformation();
      console.log('Failed to send batch', batchSessionId);
    }
  };

  const status = signedTransactions[signedSessionId]?.status;

  useEffect(() => {
    if (!sendBatchTransactionsOnDemand) {
      return;
    }

    if (!batchSessionId) {
      return;
    }

    if (status === TransactionBatchStatusesEnum.signed) {
      sendTransactions();
    }
  }, [batchSessionId, status]);

  return {
    batchId,
    setBatchSessionId
  };
};
