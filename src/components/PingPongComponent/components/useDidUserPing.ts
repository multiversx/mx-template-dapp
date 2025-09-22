import { contractAddress } from 'config';
import pingPongAbi from 'contracts/ping-pong.abi.json';
import {
  AbiRegistry,
  Address,
  AddressValue,
  ProxyNetworkProvider,
  SmartContractController,
  useGetAccount,
  useGetNetworkConfig
} from 'lib';

export const useDidUserPing = () => {
  const { network } = useGetNetworkConfig();
  const { address } = useGetAccount();
  const proxy = new ProxyNetworkProvider(network.apiAddress);

  const didUserPing = async (): Promise<boolean> => {
    if (!address) {
      return false;
    }

    try {
      const abi = AbiRegistry.create(pingPongAbi);

      const scController = new SmartContractController({
        chainID: network.chainId,
        networkProvider: proxy,
        abi
      });

      const [result] = await scController.query({
        contract: Address.newFromBech32(contractAddress),
        function: 'didUserPing',
        arguments: [new AddressValue(new Address(address))]
      });

      return result;
    } catch (err) {
      console.error('Unable to call didUserPing', err);
      return false;
    }
  };

  return didUserPing;
};
