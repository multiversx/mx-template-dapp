import { Label } from 'components/Label';
import { contractAddress } from 'config';
import { ACCOUNTS_ENDPOINT } from 'localConstants/sdkDappCoreConstants';
import { ExplorerLink } from '../ExplorerLink';

export const ContractAddress = () => {
  return (
    <p>
      <Label>Contract: </Label>
      <ExplorerLink
        page={`/${ACCOUNTS_ENDPOINT}/${contractAddress}`}
        className='border-b border-dotted border-gray-500 hover:border-solid hover:border-gray-800'
      >
        {contractAddress}
      </ExplorerLink>
    </p>
  );
};
