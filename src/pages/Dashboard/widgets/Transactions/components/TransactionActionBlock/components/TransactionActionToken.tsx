import React from 'react';
import { DataTestIdsEnum, DECIMALS } from 'localConstants';
import { ExplorerLink } from 'components/ExplorerLink';
import { TransactionActionTokenReturnType } from 'types/sdkDappCoreTypes';

export const TransactionActionToken = ({
  tokenExplorerLink,
  showFormattedAmount,
  tokenLinkText,
  token,
  showLastNonZeroDecimal
}: TransactionActionTokenReturnType) => {
  if (!token.token) {
    return null;
  }

  return (
    <>
      {showFormattedAmount && (
        <div
          className='text-truncate'
          data-testid={DataTestIdsEnum.tokenFormattedAmount}
        >
          {/* TODO: Define component types */}
          {/* @ts-ignore */}
          <format-amount
            value={token.value}
            digits={2}
            showLastNonZeroDecimal={showLastNonZeroDecimal}
            decimals={token.decimals ?? DECIMALS}
          />
        </div>
      )}

      <ExplorerLink
        page={tokenExplorerLink}
        data-testid={DataTestIdsEnum.tokenExplorerLink}
        className={`d-flex ${token.svgUrl ? 'side-link' : ''}`}
      >
        <div className='d-flex align-items-center'>
          {token.svgUrl && (
            <img
              src={token.svgUrl}
              alt={token.name}
              className='side-icon mr-1'
            />
          )}
          <span>{tokenLinkText}</span>
        </div>
      </ExplorerLink>
    </>
  );
};
