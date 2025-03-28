import { ArgSerializer } from '@multiversx/sdk-core';
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

      const result = await scController.query({
        contract: Address.newFromBech32(contractAddress),
        function: 'getTimeToPong',
        arguments: new ArgSerializer().valuesToBuffers([
          new AddressValue(Address.newFromBech32(address))
        ])
      });

      console.log('result', result);

      const secondsRemaining: number = Number(
        Buffer.from(result[0]).toString()
      );

      return secondsRemaining;
    } catch (err) {
      console.error('Unable to call getTimeToPong', err);
    }
  };

  return getTimeToPong;
};
