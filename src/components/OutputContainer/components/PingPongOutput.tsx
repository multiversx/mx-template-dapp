import { Label } from 'components';
import { contractAddress } from 'config';
import {
  ACCOUNTS_ENDPOINT,
  CopyButton,
  getExplorerLink,
  MvxExplorerLink,
  SignedTransactionType,
  useGetNetworkConfig
} from 'lib';
import { TransactionsOutput } from './TransactionsOutput';

type PingPongOutputType = {
  timeRemaining: string;
  pongAllowed: boolean;
  transactions?: SignedTransactionType[] | null;
};

export const PingPongOutput = ({
  timeRemaining,
  pongAllowed,
  transactions
}: PingPongOutputType) => {
  const { network } = useGetNetworkConfig();

  if (!transactions || transactions?.length === 0) {
    return null;
  }

  const explorerAddress = network.explorerAddress;
  const explorerLink = getExplorerLink({
    to: `/${ACCOUNTS_ENDPOINT}/${contractAddress}`,
    explorerAddress
  });

  return (
    <>
      <div className='flex justify-between mb-4'>
        {contractAddress}

        <div className='flex gap-3'>
          <CopyButton text={contractAddress} />

          <MvxExplorerLink link={explorerLink} />
        </div>
      </div>

      <TransactionsOutput transactions={transactions} />
      {!pongAllowed && (
        <p>
          <Label>Time remaining: </Label>
          <span className='text-red-600'>{timeRemaining}</span> until able to
          pong
        </p>
      )}
    </>
  );
};
