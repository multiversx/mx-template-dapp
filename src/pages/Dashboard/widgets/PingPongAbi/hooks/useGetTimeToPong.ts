import axios from 'axios';
import { contractAddress } from 'config';
import {
  AbiRegistry,
  Address,
  AddressValue,
  ProxyNetworkProvider,
  SmartContractController,
  useGetAccount,
  useGetNetworkConfig
} from 'lib';

export const useGetTimeToPong = () => {
  const { network } = useGetNetworkConfig();
  const { address } = useGetAccount();
  const proxy = new ProxyNetworkProvider(network.apiAddress);

  const getTimeToPong = async () => {
    if (!address) {
      return;
    }

    try {
      const response = await axios.get('src/contracts/ping-pong.abi.json');
      const abi = AbiRegistry.create(response.data);

      const scController = new SmartContractController({
        chainID: network.chainId,
        networkProvider: proxy,
        abi
      });

      const [result] = await scController.query({
        contract: Address.newFromBech32(contractAddress),
        function: 'getTimeToPong',
        arguments: [new AddressValue(new Address(address))]
      });

      const secondsRemaining: number = result?.valueOf()?.toNumber();

      return secondsRemaining;
    } catch (err) {
      console.error('Unable to call getTimeToPong', err);
    }
  };

  return getTimeToPong;
};
