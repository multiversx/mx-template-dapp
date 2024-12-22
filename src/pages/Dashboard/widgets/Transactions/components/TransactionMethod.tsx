import React from 'react';
import { WithTransactionPropsType } from '../types';
import { DataTestIdsEnum } from 'localConstants';
import { getTransactionMethod } from 'lib/sdkDappCore';

export const TransactionMethod = ({
  transaction
}: WithTransactionPropsType) => (
  <div className='transactionCell'>
    <span
      title={transaction.action?.description}
      className='badge badge-secondary badge-pill font-weight-light p-0'
      data-testid={DataTestIdsEnum.transactionMethod}
    >
      <div className='badge badge-secondary badge-pill'>
        <div className='transactionFunctionBadge text-truncate text-capitalize text-white p-1 transactionCellFontSmall'>
          {getTransactionMethod(transaction)}
        </div>
      </div>
    </span>
  </div>
);
