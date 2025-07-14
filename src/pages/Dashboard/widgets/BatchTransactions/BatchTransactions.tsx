import {
  faArrowsRotate,
  faPaperPlane
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, OutputContainer, TransactionsOutput } from 'components';
import {
  useGetAccount,
  useGetNetworkConfig,
  useGetPendingTransactions
} from 'lib';
import {
  sendBatchTransactions,
  signAndAutoSendBatchTransactions,
  swapAndLockTokens
} from './helpers';

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
        <TransactionsOutput transactions={transactions} />
      </OutputContainer>
    </div>
  );
};
