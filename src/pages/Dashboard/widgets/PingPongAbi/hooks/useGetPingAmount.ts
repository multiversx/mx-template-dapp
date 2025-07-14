import { useEffect, useState } from 'react';
import { contractAddress } from 'config';
import pingPongAbi from 'contracts/ping-pong.abi.json';
import {
  AbiRegistry,
  Address,
  ProxyNetworkProvider,
  SmartContractController,
  useGetNetworkConfig
} from 'lib';

export const useGetPingAmount = () => {
  const { network } = useGetNetworkConfig();
  const [pingAmount, setPingAmount] = useState<string>('0');

  const proxy = new ProxyNetworkProvider(network.apiAddress);

  const getPingAmount = async () => {
    try {
      const abi = AbiRegistry.create(pingPongAbi);

      const scController = new SmartContractController({
        chainID: network.chainId,
        networkProvider: proxy,
        abi
      });

      const [result] = await scController.query({
        contract: Address.newFromBech32(contractAddress),
        function: 'getPingAmount',
        arguments: []
      });

      setPingAmount(result?.valueOf()?.toString(10));
    } catch (err) {
      console.error('Unable to call getPingAmount', err);
    }
  };

  useEffect(() => {
    getPingAmount();
  }, []);

  return pingAmount;
};
