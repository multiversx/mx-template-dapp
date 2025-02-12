import {
  faPaperPlane,
  faArrowsRotate,
  faSignature
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from 'components/Button';
import { TransactionsOutput } from 'components/OutputContainer/components';
import { OutputContainer } from 'components/OutputContainer/OutputContainer';
import {
  useGetAccount,
  useGetNetworkConfig,
  useGetPendingTransactions
} from 'hooks';
import {
  signAndAutoSendBatchTransactions,
  sendBatchTransactions,
  swapAndLockTokens
} from './helpers';

export const BatchTransactions = () => {
  const { address, nonce } = useGetAccount();
  const { network } = useGetNetworkConfig();
  const transactions = useGetPendingTransactions();
  const hasPendingTransactions = transactions.length > 0;

  const handleSignAndAutoSend = async () => {
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

  const handleSendBatchTransactions = async () => {
    await sendBatchTransactions({
      address,
      nonce,
      chainID: network.chainId
    });
  };

  const handleSwapAndLock = async () => {
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
          onClick={handleSignAndAutoSend}
          disabled={hasPendingTransactions}
        >
          <FontAwesomeIcon icon={faPaperPlane} className='mr-1' />
          Sign & send batch
        </Button>
        <Button
          data-testid='send-transactions'
          onClick={handleSendBatchTransactions}
          disabled={hasPendingTransactions}
        >
          <FontAwesomeIcon icon={faSignature} className='mr-1' />
          Sign & send controlled
        </Button>
        <Button
          data-testid='swap-lock'
          onClick={handleSwapAndLock}
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
