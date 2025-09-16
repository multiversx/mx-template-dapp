import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Label } from 'components';
import { contractAddress } from 'config';
import {
  ACCOUNTS_ENDPOINT,
  getExplorerLink,
  MvxCopyButton,
  SignedTransactionType,
  useGetNetworkConfig
} from 'lib';

import { TransactionsOutput } from './TransactionsOutput';

// prettier-ignore
const styles = {
  pingPongAddressContainer: 'ping-pong-address-container flex gap-3 mb-4',
  pingPongButtons: 'ping-pong-buttons flex gap-2',
  timeRemaining: 'time-remaining text-red-600'
} satisfies Record<string, string>;

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
      <div className={styles.pingPongAddressContainer}>
        {contractAddress}

        <div className={styles.pingPongButtons}>
          <MvxCopyButton text={contractAddress} />

          <a href={explorerLink} target='_blank' rel='noreferrer'>
            <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
          </a>
        </div>
      </div>

      <TransactionsOutput transactions={transactions} />

      {!pongAllowed && (
        <p>
          <Label>Time remaining: </Label>
          <span className={styles.timeRemaining}>{timeRemaining}</span> until
          able to pong
        </p>
      )}
    </>
  );
};
