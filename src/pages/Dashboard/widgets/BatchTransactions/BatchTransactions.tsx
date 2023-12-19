import { useEffect, useState } from 'react';
import {
  faPaperPlane,
  faArrowsRotate
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useGetBatches } from '@multiversx/sdk-dapp/hooks/transactions/batch/useGetBatches';
import { Button } from 'components/Button';
import {
  OutputContainer,
  TransactionsOutput
} from 'components/OutputContainer';
import {
  useGetAccountInfo,
  useGetNetworkConfig,
  useGetPendingTransactions
} from 'hooks';
import { SessionEnum } from 'localConstants/session';
import { SignedTransactionType, WidgetProps } from 'types';
import { useBatchTransactionContext } from 'wrappers';
import { useSendSignedTransactions } from './hooks';
import {
  sendBatchTransactions,
  signAndAutoSendBatchTransactions,
  swapAndLockTokens
} from './helpers';

export const BatchTransactions = ({ callbackRoute }: WidgetProps) => {
  const { setSendBatchTransactionsOnDemand } = useBatchTransactionContext();
  const { address, account } = useGetAccountInfo();
  const network = useGetNetworkConfig();
  const { batches } = useGetBatches();
  const { hasPendingTransactions } = useGetPendingTransactions();
  const [trackBatchId, setTrackBatchId] = useState(
    sessionStorage.getItem(SessionEnum.batchId)
  );

  const [stateTransactions, setStateTransactions] = useState<
    SignedTransactionType[] | null
  >(null);
  const [currentSessionId, setCurrentSessionId] = useState(
    sessionStorage.getItem(SessionEnum.signedSessionId)
  );

  const { batchId, setBatchSessionId } = useSendSignedTransactions({
    signedSessionId: currentSessionId
  });

  // If manual batch transactions are executed, track the batchId
  useEffect(() => {
    if (batchId) {
      setTrackBatchId(batchId);
    }
  }, [batchId]);

  useEffect(() => {
    if (trackBatchId && batches[trackBatchId]) {
      setStateTransactions(batches[trackBatchId].transactions.flat());
    }
  }, [trackBatchId, batches]);

  const executeSignAndAutoSendBatchTransactions = async () => {
    setSendBatchTransactionsOnDemand(false);

    const { batchId } = await signAndAutoSendBatchTransactions({
      address,
      nonce: account.nonce,
      chainID: network.chainID,
      callbackRoute
    });

    if (!batchId) {
      return;
    }

    setTrackBatchId(batchId);
  };

  const executeBatchTransactions = async () => {
    setSendBatchTransactionsOnDemand(true);
    const { newBatchSessionId, sessionId } = await sendBatchTransactions({
      address,
      nonce: account.nonce,
      chainID: network.chainID,
      callbackRoute
    });

    if (!newBatchSessionId || !sessionId) {
      return;
    }

    setBatchSessionId(newBatchSessionId);
    setCurrentSessionId(sessionId);
  };

  const executeSwapAndLockTokens = async () => {
    setSendBatchTransactionsOnDemand(true);
    const { batchId: currentBatchId } = await swapAndLockTokens({
      address,
      nonce: account.nonce,
      chainID: network.chainID,
      callbackRoute
    });

    if (!currentBatchId) {
      return;
    }

    setTrackBatchId(currentBatchId);
  };

  return (
    <div className='flex flex-col gap-6'>
      <div className='flex flex-col md:flex-row gap-2 items-start'>
        <Button
          data-testid='sign-auto-send'
          onClick={executeSignAndAutoSendBatchTransactions}
          disabled={hasPendingTransactions}
        >
          <FontAwesomeIcon icon={faPaperPlane} className='mr-1' />
          Sign & send batch
        </Button>
        <Button
          data-testid='send-transactions'
          onClick={executeBatchTransactions}
          disabled={hasPendingTransactions}
        >
          <FontAwesomeIcon icon={faPaperPlane} className='mr-1' />
          Sign batch & controlled sending
        </Button>

        <Button
          data-testid='swap-lock'
          onClick={executeSwapAndLockTokens}
          disabled={hasPendingTransactions}
        >
          <FontAwesomeIcon icon={faArrowsRotate} className='mr-1' />
          Swap & Lock
        </Button>
      </div>

      <OutputContainer>
        {stateTransactions && (
          <TransactionsOutput transactions={stateTransactions.flat()} />
        )}
      </OutputContainer>
    </div>
  );
};
