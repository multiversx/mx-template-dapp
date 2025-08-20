import pingPongAbi from 'contracts/ping-pong.abi.json';
import {
  AbiRegistry,
  ProxyNetworkProvider,
  SmartContractController,
  useGetNetworkConfig
} from 'lib';

export const useGetScController = () => {
  const { network } = useGetNetworkConfig();

  const proxy = new ProxyNetworkProvider(network.apiAddress);

  const abi = AbiRegistry.create(pingPongAbi);

  const scController = new SmartContractController({
    chainID: network.chainId,
    networkProvider: proxy,
    abi
  });

  return scController;
};
