import { WithTransactionPropsType } from '../types';
import { WithClassnameType } from 'types';
import classNames from 'classnames';
import { DataTestIdsEnum } from 'localConstants';
import { ExplorerLink } from 'components/ExplorerLink';
import { TransactionIcon } from './TransactionIcon';

export const TransactionHash = ({
  className,
  transaction
}: WithTransactionPropsType & WithClassnameType) => {
  const transactionHashLink = `/transactions/${
    transaction.originalTxHash
      ? `${transaction.originalTxHash}#${transaction.txHash}`
      : transaction.txHash
  }`;

  return (
    <div className={classNames(className)}>
      <TransactionIcon transaction={transaction} />

      <ExplorerLink
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
