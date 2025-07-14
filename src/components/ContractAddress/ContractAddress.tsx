import { Label } from 'components';
import { contractAddress } from 'config';
import {
  ACCOUNTS_ENDPOINT,
  getExplorerLink,
  MvxExplorerLink,
  useGetNetworkConfig
} from 'lib';

export const ContractAddress = () => {
  const { network } = useGetNetworkConfig();
  const explorerAddress = network.explorerAddress;
  const explorerLink = getExplorerLink({
    to: `/${ACCOUNTS_ENDPOINT}/${contractAddress}`,
    explorerAddress
  });
  return (
    <p>
      <Label>Contract: </Label>
      <MvxExplorerLink
        link={explorerLink}
        className='border-b border-dotted border-gray-500 hover:border-solid hover:border-gray-800'
      >
        {contractAddress}
      </MvxExplorerLink>
    </p>
  );
};
