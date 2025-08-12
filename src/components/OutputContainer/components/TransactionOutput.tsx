import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Label } from 'components';
import {
  ACCOUNTS_ENDPOINT,
  ExplorerLink,
  FormatAmount,
  getExplorerLink,
  MvxCopyButton,
  MvxFormatAmount,
  SignedTransactionType,
  TRANSACTIONS_ENDPOINT,
  useGetAccountInfo,
  useGetNetworkConfig
} from 'lib';

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
    <div className='flex flex-col'>
      <p className='flex gap-2'>
        <Label>Hash:</Label>
        <div className='flex justify-between w-full'>
          {transaction.hash}

          <div className='flex gap-3'>
            <MvxCopyButton text={transaction.hash} />

            <a href={hashExplorerLink} target='_blank' rel='noreferrer'>
              <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
            </a>
          </div>
        </div>
      </p>
      <p className='flex gap-2'>
        <Label>Receiver:</Label>
        <div className='flex justify-between w-full'>
          {transaction.receiver}

          <div className='flex gap-3'>
            <MvxCopyButton text={transaction.receiver} />

            <a href={receiverExplorerLink} target='_blank' rel='noreferrer'>
              <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
            </a>
          </div>
        </div>
      </p>

      <p>
        <Label>Amount: </Label>
        <FormatAmount value={account.balance} />
      </p>
      <p>
        <Label>Gas price: </Label>
        {transaction.gasPrice}
      </p>
      <p>
        <Label>Gas limit: </Label>
        {transaction.gasLimit}
      </p>
      <p className='whitespace-nowrap'>
        <Label>Data: </Label> {decodedData}
      </p>
    </div>
  );
};
