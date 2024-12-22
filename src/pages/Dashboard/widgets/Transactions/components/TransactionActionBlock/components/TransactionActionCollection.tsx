import { ExplorerLink } from 'components/ExplorerLink';
import { TokenArgumentType } from 'types/sdkDappCoreTypes';
import { explorerUrlBuilder } from 'lib/sdkDappCore';

export const TransactionActionCollection = ({
  token
}: {
  token: TokenArgumentType;
}) => {
  if (!token.collection) {
    return null;
  }

  return (
    <ExplorerLink
      page={explorerUrlBuilder.collectionDetails(token.collection)}
      className='transactionActionCollection'
    >
      <div className='d-flex align-items-center'>
        {token.svgUrl && (
          <img src={token.svgUrl} alt={token.name} className='side-icon mr-1' />
        )}

        <span>{token.ticker}</span>
      </div>
    </ExplorerLink>
  );
};
