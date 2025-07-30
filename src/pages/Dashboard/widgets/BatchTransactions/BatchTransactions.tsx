import {
  faArrowsRotate,
  faPaperPlane,
  IconDefinition
} from '@fortawesome/free-solid-svg-icons';
import { Button, OutputContainer, TransactionsOutput } from 'components';
import {
  useGetAccount,
  useGetNetworkConfig,
  useGetPendingTransactions
} from 'lib';
import { ItemsIdEnum } from 'pages/Dashboard/dashboard.types';
import {
  sendBatchTransactions,
  signAndAutoSendBatchTransactions,
  swapAndLockTokens
} from './helpers';

interface BatchTransactionsButtonsType {
  dataTestId: string;
  onclickFunction: () => Promise<void>;
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
      onclickFunction: executeSignAndAutoSendBatchTransactions,
      icon: faPaperPlane,
      label: 'Sign & send batch'
    },
    {
      dataTestId: 'send-transactions',
      onclickFunction: executeBatchTransactions,
      icon: faPaperPlane,
      label: 'Sign batch & controlled sending'
    },
    {
      dataTestId: 'swap-lock',
      onclickFunction: executeSwapAndLockTokens,
      icon: faArrowsRotate,
      label: 'Swap & Lock'
    }
  ];

  return (
    <div id={ItemsIdEnum.batchTransactions} className='flex flex-col gap-6'>
      <OutputContainer>
        <TransactionsOutput transactions={transactions} />
      </OutputContainer>

      <div className='flex flex-col md:flex-row gap-2 items-start'>
        {batchTransactionsButtons.map((button) => (
          <Button
            key={button.dataTestId}
            data-testid={button.dataTestId}
            onClick={button.onclickFunction}
            disabled={hasPendingTransactions}
            icon={button.icon}
            label={button.label}
          />
        ))}
      </div>
    </div>
  );
};
