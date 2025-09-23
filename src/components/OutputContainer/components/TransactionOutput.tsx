import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Label } from 'components';
import {
  ACCOUNTS_ENDPOINT,
  FormatAmount,
  getExplorerLink,
  MvxCopyButton,
  SignedTransactionType,
  TRANSACTIONS_ENDPOINT,
  useGetAccountInfo,
  useGetNetworkConfig
} from 'lib';

// prettier-ignore
const styles = {
  transactionContainer: 'transaction-container flex flex-col',
  transactionElementContainer: 'transaction-elem-container flex gap-2',
  transactionElement: 'transaction-elem flex gap-3 w-full',
  buttons: 'buttons flex gap-2',
  dataContainer: 'data-container whitespace-nowrap',
  decodedData: 'decoded-data whitespace-normal break-words'
} satisfies Record<string, string>;

export const TransactionOutput = ({
  transaction
}: {
  transaction: SignedTransactionType;
}) => {
  const { network } = useGetNetworkConfig();
  const { account } = useGetAccountInfo();
  const decodedData = transaction.data
    ? Buffer.from(transaction.data, 'base64').toString('ascii')
    : 'N/A';

  const explorerAddress = network.explorerAddress;
  const hashExplorerLink = getExplorerLink({
    to: `/${TRANSACTIONS_ENDPOINT}/${transaction.hash}`,
    explorerAddress
  });
  const receiverExplorerLink = getExplorerLink({
    to: `/${ACCOUNTS_ENDPOINT}/${transaction.receiver}`,
    explorerAddress
  });

  return (
    <div className={styles.transactionContainer}>
      <div className={styles.transactionElementContainer}>
        <Label>Hash:</Label>

        <div className={styles.transactionElement}>
          {transaction.hash}

          <div className={styles.buttons}>
            <MvxCopyButton text={transaction.hash} />

            <a href={hashExplorerLink} target='_blank' rel='noreferrer'>
              <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
            </a>
          </div>
        </div>
      </div>

      <div className={styles.transactionElementContainer}>
        <Label>Receiver:</Label>
        <div className={styles.transactionElement}>
          {transaction.receiver}

          <div className={styles.buttons}>
            <MvxCopyButton text={transaction.receiver} />

            <a href={receiverExplorerLink} target='_blank' rel='noreferrer'>
              <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
            </a>
          </div>
        </div>
      </div>

      <p>
        <Label>Amount: </Label>
        <FormatAmount value={account.balance} data-testid='balance' />
      </p>
      <p>
        <Label>Gas price: </Label>
        {transaction.gasPrice}
      </p>
      <p>
        <Label>Gas limit: </Label>
        {transaction.gasLimit}
      </p>
      <p className={styles.dataContainer}>
        <Label>Data: </Label>
        <span className={styles.decodedData}>{decodedData}</span>
      </p>
    </div>
  );
};
