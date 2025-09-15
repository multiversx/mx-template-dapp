import {
  faArrowsRotate,
  faPaperPlane,
  IconDefinition
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { MvxButton } from 'lib';
import { OutputContainer, TransactionsOutput } from 'components';
import {
  useGetAccount,
  useGetNetworkConfig,
  useGetPendingTransactions
} from 'lib';
import { ItemsIdentifiersEnum } from 'pages/Dashboard/dashboard.types';

import {
  sendBatchTransactions,
  signAndAutoSendBatchTransactions,
  swapAndLockTokens
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
  const transactions = useGetPendingTransactions();
  const hasPendingTransactions = transactions.length > 0;

  const executeSignAndAutoSendBatchTransactions = async () => {
    await signAndAutoSendBatchTransactions({
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
  };

  const executeBatchTransactions = async () => {
    await sendBatchTransactions({
      address,
      nonce,
      chainID: network.chainId
    });
  };

  const executeSwapAndLockTokens = async () => {
    await swapAndLockTokens({
      address,
      nonce,
      chainID: network.chainId,
      transactionsDisplayInfo: {
        processingMessage: 'Processing swap and lock',
        errorMessage: 'An error has occurred during swap and lock',
        successMessage: 'Swap and lock successful'
      }
    });
  };

  const batchTransactionsButtons: BatchTransactionsButtonsType[] = [
    {
      dataTestId: 'sign-auto-send',
      onClickFunction: executeSignAndAutoSendBatchTransactions,
      icon: faPaperPlane,
      label: 'Sign & send batch'
    },
    {
      dataTestId: 'send-transactions',
      onClickFunction: executeBatchTransactions,
      icon: faPaperPlane,
      label: 'Sign batch & controlled sending'
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
      <OutputContainer>
        <TransactionsOutput transactions={transactions} />
      </OutputContainer>

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
