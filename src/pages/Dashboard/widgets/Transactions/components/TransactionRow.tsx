import { WithClassnameType } from 'types';
import { WithTransactionPropsType } from '../types';
import classNames from 'classnames';
import { TransactionHash } from './TransactionHash';

export interface TransactionRowPropsType
  extends WithTransactionPropsType,
    WithClassnameType {
  showDirectionCol?: boolean;
  showLockedAccounts?: boolean;
}

export const TransactionRow = ({
  className,
  transaction,
  showDirectionCol,
  showLockedAccounts
}: TransactionRowPropsType) => {
  return (
    <tr className={classNames(className, { new: transaction.isNew })}>
      <td>
        <TransactionHash transaction={transaction} />
      </td>

      <td>
        <TimeAgo value={transaction.timestamp} short tooltip />
      </td>

      <td>
        <TransactionShardsTransition transaction={transaction} />
      </td>

      <td>
        <TransactionSender
          transaction={transaction}
          showLockedAccounts={showLockedAccounts}
        />
      </td>

      {showDirectionCol && (
        <td>
          <TransactionDirectionBadge transaction={transaction} />
        </td>
      )}

      <td>
        <TransactionReceiver
          transaction={transaction}
          showLockedAccounts={showLockedAccounts}
        />
      </td>

      <td className='transactionFunction'>
        <TransactionMethod transaction={transaction} />
      </td>

      <td className='textLeft'>
        <TransactionValue transaction={transaction} />
      </td>
    </tr>
  );
};
