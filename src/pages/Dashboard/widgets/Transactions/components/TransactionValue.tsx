import React, { ReactNode } from 'react';
import { faLayerGroup } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DataTestIdsEnum } from 'localConstants';
import { WithTransactionPropsType } from '../types';
import { getTransactionValue } from 'lib/sdkDappCore';
import { TransactionActionBlock } from './TransactionActionBlock';
import { NftEnumType } from 'types/sdkDappCoreTypes';
import { FormatAmount } from '../../../../../components';

interface TokenWrapperPropsType {
  children: ReactNode;
  titleText?: string;
}

export interface TransactionValuePropsType extends WithTransactionPropsType {
  hideMultipleBadge?: boolean;
}

const TokenWrapper = ({ children, titleText }: TokenWrapperPropsType) => (
  <div
    className='d-flex align-items-center'
    data-testid={DataTestIdsEnum.transactionValue}
  >
    {children}

    {titleText && (
      <FontAwesomeIcon
        icon={faLayerGroup}
        className='ml-2 text-secondary'
        title={titleText}
      />
    )}
  </div>
);

export const TransactionValue = ({
  transaction,
  hideMultipleBadge
}: TransactionValuePropsType) => {
  const { egldValueData, tokenValueData, nftValueData } = getTransactionValue({
    transaction,
    hideMultipleBadge
  });

  if (tokenValueData) {
    return (
      <div className='transactionCell'>
        <TokenWrapper titleText={tokenValueData.titleText}>
          <TransactionActionBlock.Token {...tokenValueData} />
        </TokenWrapper>
      </div>
    );
  }

  if (nftValueData) {
    const hideBadgeForMetaESDT =
      nftValueData.token.type === NftEnumType.MetaESDT;
    const badgeText = hideBadgeForMetaESDT ? null : nftValueData.badgeText;

    return (
      <div className='transactionCell'>
        <TokenWrapper titleText={nftValueData.titleText}>
          <TransactionActionBlock.Nft {...nftValueData} badgeText={badgeText} />
        </TokenWrapper>
      </div>
    );
  }

  if (egldValueData) {
    return (
      <div className='transactionCell'>
        <FormatAmount
          data-testid={DataTestIdsEnum.transactionValue}
          input={transaction.value}
          digits={2}
        />
      </div>
    );
  }

  return null;
};
