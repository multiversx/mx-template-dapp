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

export const useGetTimeToPong = () => {
  const { network } = useGetNetworkConfig();
  const { address } = useGetAccount();
  const proxy = new ProxyNetworkProvider(network.apiAddress);

  const getTimeToPong = async () => {
    if (!address) {
      return;
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
        function: 'getTimeToPong',
        arguments: [new AddressValue(new Address(address))]
      });

      const value = result?.valueOf();
      const secondsRemaining: number = Number(value);

      return secondsRemaining;
    } catch (err) {
      console.error('Unable to call getTimeToPong', err);
    }
  };

  return getTimeToPong;
};
