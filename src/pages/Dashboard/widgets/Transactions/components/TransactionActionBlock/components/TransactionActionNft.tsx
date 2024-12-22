import React from 'react';
import { NftBadge } from './NftBadge';
import { DataTestIdsEnum } from 'localConstants';
import { ExplorerLink } from 'components/ExplorerLink';
import { TransactionActionNftReturnType } from 'types/sdkDappCoreTypes';
import { formatAmount } from 'lib/sdkDappUtils';

export const TransactionActionNft = ({
  badgeText,
  tokenFormattedAmount,
  tokenExplorerLink,
  tokenLinkText,
  token,
  showLastNonZeroDecimal
}: TransactionActionNftReturnType) => {
  if (!token.identifier) {
    return null;
  }

  return (
    <div className='transactionActionNft'>
      {badgeText != null && (
        <NftBadge text={badgeText} className='mr-1 my-auto' />
      )}

      {tokenFormattedAmount != null && (
        <div
          className={`mr-1 ${token.svgUrl ? 'text-truncate' : ''}`}
          data-testid={DataTestIdsEnum.nftFormattedAmount}
        >
          {formatAmount({
            input: token.value,
            digits: 2,
            showLastNonZeroDecimal: showLastNonZeroDecimal,
            decimals: token.decimals
          })}
        </div>
      )}

      <ExplorerLink
        page={tokenExplorerLink}
        data-testid={DataTestIdsEnum.nftExplorerLink}
        className={`explorer ${
          token.svgUrl ? 'side-link d-flex' : 'text-truncate'
        }`}
      >
        <div className='data'>
          {token.svgUrl && (
            <img
              src={token.svgUrl}
              alt={token.name}
              className='side-icon mr-1'
            />
          )}

          <span className={token.ticker === token.collection ? 'truncate' : ''}>
            {tokenLinkText}
          </span>
        </div>
      </ExplorerLink>
    </div>
  );
};
