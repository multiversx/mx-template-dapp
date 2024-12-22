import { AccountName } from './AccountName';
import { LockedTokenAddressIcon } from './LockedTokenAddressIcon';
import { ScAddressIcon } from './ScAddressIcon';
import { WithTransactionPropsType } from '../types';
import { DataTestIdsEnum, TransactionDirectionEnum } from 'types';
import { ExplorerLink } from 'components/ExplorerLink';

export interface TransactionReceiverPropsType extends WithTransactionPropsType {
  showLockedAccounts?: boolean;
}

export const TransactionReceiver = ({
  transaction,
  showLockedAccounts
}: TransactionReceiverPropsType) => {
  const directionIn =
    transaction.transactionDetails.direction === TransactionDirectionEnum.IN;

  return (
    <div
      className='transactionCell d-flex align-items-center'
      data-testid={DataTestIdsEnum.transactionReceiver}
    >
      {showLockedAccounts && (
        <LockedTokenAddressIcon
          address={transaction.receiver}
          tokenId={transaction.tokenIdentifier ?? ''}
        />
      )}

      <ScAddressIcon initiator={transaction.receiver} />

      {directionIn ? (
        <div className='w100 transactionCellOverflow transactionCellMargin'>
          <AccountName
            address={transaction.sender}
            assets={transaction.senderAssets}
          />
        </div>
      ) : (
        <ExplorerLink
          page={transaction.links.receiverLink ?? ''}
          data-testid={DataTestIdsEnum.receiverLink}
          className='w100 transactionCellOverflow transactionCellMargin transactionCellLink'
        >
          <AccountName
            address={transaction.receiver}
            assets={transaction.receiverAssets}
          />
        </ExplorerLink>
      )}
    </div>
  );
};
