import { Label } from 'components';
import { contractAddress } from 'config';
import { ACCOUNTS_ENDPOINT, MvxExplorerLink, useGetNetworkConfig } from 'lib';

export const ContractAddress = () => {
  const { network } = useGetNetworkConfig();

  return (
    <p>
      <Label>Contract: </Label>
      <MvxExplorerLink
        link={`${network.explorerAddress}/${ACCOUNTS_ENDPOINT}/${contractAddress}`}
        className='border-b border-dotted border-gray-500 hover:border-solid hover:border-gray-800'
      >
        {contractAddress}
      </MvxExplorerLink>
    </p>
  );
};
