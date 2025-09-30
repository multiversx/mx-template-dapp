import {
  faArrowsRotate,
  faPaperPlane,
  IconDefinition
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';

import { MvxButton, useGetPendingTransactionsSessions } from 'lib';
import { OutputContainer, TransactionsOutput } from 'components';
import {
  useGetAccount,
  useGetNetworkConfig,
  useGetPendingTransactions
} from 'lib';
import { ItemsIdentifiersEnum } from 'pages/Dashboard/dashboard.types';

import {
  signAndAutoSendBatchTransactions,
  swapAndLockTokens,
  wrapAndMultiTransferTransactions
} from './helpers';

// prettier-ignore
const styles = {
  batchTx: 'batch-tx flex flex-col gap-6',
  buttonsContainer: 'buttons-container flex flex-col md:flex-row gap-2 items-start',
  batchTxButton: 'batch-tx-button text-sm font-normal'
} satisfies Record<string, string>;

interface BatchTransactionsButtonsType {
  dataTestId: string;
  onClickFunction: () => Promise<void>;
  icon: IconDefinition;
  label: string;
}

export const BatchTransactions = () => {
  const { address, nonce } = useGetAccount();
  const { network } = useGetNetworkConfig();
  const [currentSessionId, setCurrentSessionId] = useState('');
  const pendingSession = useGetPendingTransactionsSessions();
  const [sessionId] = Object.keys(pendingSession);
  const transactions = useGetPendingTransactions();
  const pendingBatchTransactions =
    currentSessionId === sessionId ? transactions : [];
  const hasPendingTransactions = pendingBatchTransactions.length > 0;

  const executeSignAndAutoSendBatchTransactions = async () => {
    const sessionId = await signAndAutoSendBatchTransactions({
      address,
      nonce,
      chainID: network.chainId,
      transactionsDisplayInfo: {
        processingMessage: 'Processing batch transactions',
        errorMessage:
          'An error has occurred during batch transaction execution',
        successMessage: 'Batch transactions successful'
      }
    });

    setCurrentSessionId(sessionId);
  };

  const executeWrapMultiTransferTransactions = async () => {
    const sessionId = await wrapAndMultiTransferTransactions({
      address,
      nonce,
      chainID: network.chainId,
      transactionsDisplayInfo: {
        processingMessage: 'Processing wrap and multi-transfer ESDTs',
        errorMessage:
          'An error has occurred during wrap and multi-transfer ESDTs',
        successMessage: 'Wrap and multi-transfer ESDTs successful'
      }
    });

    setCurrentSessionId(sessionId);
  };

  const executeSwapAndLockTokens = async () => {
    const sessionId = await swapAndLockTokens({
      address,
      nonce,
      chainID: network.chainId,
      transactionsDisplayInfo: {
        processingMessage: 'Processing swap and lock',
        errorMessage: 'An error has occurred during swap and lock',
        successMessage: 'Swap and lock successful'
      }
    });

    setCurrentSessionId(sessionId);
  };

  const batchTransactionsButtons: BatchTransactionsButtonsType[] = [
    {
      dataTestId: 'sign-auto-send',
      onClickFunction: executeSignAndAutoSendBatchTransactions,
      icon: faPaperPlane,
      label: 'Sign & send batch'
    },
    {
      dataTestId: 'wrap-multi-transfer',
      onClickFunction: executeWrapMultiTransferTransactions,
      icon: faPaperPlane,
      label: 'Wrap & Multi-Transfer'
    },
    {
      dataTestId: 'swap-lock',
      onClickFunction: executeSwapAndLockTokens,
      icon: faArrowsRotate,
      label: 'Swap & Lock'
    }
  ];

  return (
    <div id={ItemsIdentifiersEnum.batchTransactions} className={styles.batchTx}>
      {pendingBatchTransactions.length > 0 && (
        <OutputContainer>
          <TransactionsOutput transactions={pendingBatchTransactions} />
        </OutputContainer>
      )}
      <div className={styles.buttonsContainer}>
        {batchTransactionsButtons.map((button) => (
          <MvxButton
            key={button.dataTestId}
            data-testid={button.dataTestId}
            onClick={button.onClickFunction}
            disabled={hasPendingTransactions}
            size='small'
          >
            <FontAwesomeIcon
              icon={button.icon}
              className={styles.batchTxButton}
            />

            <span className={styles.batchTxButton}>{button.label}</span>
          </MvxButton>
        ))}
      </div>
    </div>
  );
};
