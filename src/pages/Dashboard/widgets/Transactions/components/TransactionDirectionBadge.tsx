import React from 'react';
import classNames from 'classnames';
import { WithTransactionPropsType } from '../types';

export const TransactionDirectionBadge = ({
  transaction
}: WithTransactionPropsType) => (
  <div className='d-flex'>
    <span
      className={classNames(
        'directionBadge',
        transaction.transactionDetails.direction?.toLowerCase()
      )}
    >
      {transaction.transactionDetails.direction?.toUpperCase()}
    </span>
  </div>
);
