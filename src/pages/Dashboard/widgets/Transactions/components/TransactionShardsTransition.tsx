import React from 'react';
import { WithTransactionPropsType } from '../types';
import { ExplorerLink } from 'components/ExplorerLink';
import { DataTestIdsEnum } from 'localConstants';
import { ShardSpan } from './ShardSpan';

export const TransactionShardsTransition = ({
  transaction
}: WithTransactionPropsType) => (
  <div className='transactionCell d-flex align-items-center'>
    <ExplorerLink
      page={transaction.links.senderShardLink ?? ''}
      className='transactionCellMargin transactionCellLink'
      data-testid={DataTestIdsEnum.shardFromLink}
    >
      <ShardSpan
        shard={transaction.senderShard}
        data-testid={DataTestIdsEnum.senderShard}
      />
    </ExplorerLink>

    <span className='text-secondary mx-2'>&#10132;</span>

    <ExplorerLink
      className='transactionCellMargin transactionCellLink'
      page={transaction.links.receiverShardLink ?? ''}
      data-testid={DataTestIdsEnum.shardToLink}
    >
      <ShardSpan
        shard={transaction.receiverShard}
        data-testid={DataTestIdsEnum.receiverShard}
      />
    </ExplorerLink>
  </div>
);
