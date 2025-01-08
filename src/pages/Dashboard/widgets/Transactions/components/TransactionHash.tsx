import { WithTransactionPropsType } from '../types';
import { DataTestIdsEnum } from 'localConstants';
import { ExplorerLink } from 'components/ExplorerLink';
import { TransactionIcon } from './TransactionIcon';

export const TransactionHash = ({ transaction }: WithTransactionPropsType) => {
  const transactionHashLink = `/transactions/${
    transaction.originalTxHash
      ? `${transaction.originalTxHash}#${transaction.txHash}`
      : transaction.txHash
  }`;

  return (
    <div className='transactionCell d-flex align-items-center'>
      <TransactionIcon transaction={transaction} />

      <ExplorerLink
        className='transactionCellMargin transactionCellLink'
        page={transactionHashLink}
        data-testid={DataTestIdsEnum.transactionLink}
      >
        <span
          className='transactionHash'
          data-testid={DataTestIdsEnum.transactionHash}
        >
          {transaction.txHash}
        </span>
      </ExplorerLink>
    </div>
  );
};
