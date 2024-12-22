import classNames from 'classnames';
import { ShardSpan } from './ShardSpan';
import { WithTransactionPropsType } from '../types';
import { TransactionDirectionEnum } from 'types/sdkDappCoreTypes';
import { WithClassnamePropsType } from 'types';
import { addressIsValid } from 'lib/sdkDappCore';
import { ExplorerLink } from 'components/ExplorerLink';
import { LockedTokenAddressIcon } from './LockedTokenAddressIcon';
import { ScAddressIcon } from './ScAddressIcon';
import { AccountName } from './AccountName';
import { DataTestIdsEnum } from '../../../../../localConstants';

export interface TransactionSenderPropsType
  extends WithTransactionPropsType,
    WithClassnamePropsType {
  showLockedAccounts?: boolean;
}

export const TransactionSender = ({
  className,
  transaction,
  showLockedAccounts
}: TransactionSenderPropsType) => {
  const directionOut =
    transaction.transactionDetails.direction === TransactionDirectionEnum.OUT;

  return (
    <div
      className={classNames(
        className,
        'transactionCell d-flex align-items-center'
      )}
      data-testid={DataTestIdsEnum.transactionSender}
    >
      {showLockedAccounts && (
        <LockedTokenAddressIcon
          address={transaction.sender}
          tokenId={transaction.tokenIdentifier ?? ''}
        />
      )}

      <ScAddressIcon initiator={transaction.sender} />

      {directionOut ? (
        <div className='w100 transactionCellOverflow transactionCellMargin'>
          <AccountName
            address={transaction.sender}
            assets={transaction.senderAssets}
          />
        </div>
      ) : addressIsValid(transaction.sender) ? (
        <ExplorerLink
          page={transaction.links.senderLink ?? ''}
          data-testid={DataTestIdsEnum.senderLink}
          className='w100 transactionCellOverflow transactionCellMargin transactionCellLink'
        >
          <AccountName
            address={transaction.sender}
            assets={transaction.senderAssets}
          />
        </ExplorerLink>
      ) : (
        <ShardSpan shard={transaction.sender} />
      )}
    </div>
  );
};
