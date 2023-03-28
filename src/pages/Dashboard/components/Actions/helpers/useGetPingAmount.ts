import { useEffect, useState } from 'react';
import { ContractFunction, ResultsParser } from '@multiversx/sdk-core/out';
import { ProxyNetworkProvider } from '@multiversx/sdk-network-providers/out';

import { useGetNetworkConfig } from 'hooks';
import { smartContract } from './smartContract';

const resultsParser = new ResultsParser();

export const useGetPingAmount = () => {
  const { network } = useGetNetworkConfig();
  const [pingAmount, setPingAmount] = useState<string>();

  const proxy = new ProxyNetworkProvider(network.apiAddress);

  const getPingAmount = async () => {
    try {
      const query = smartContract.createQuery({
        func: new ContractFunction('getPingAmount')
      });
      const queryResponse = await proxy.queryContract(query);

      const endpointDefinition = smartContract.getEndpoint('getPingAmount');

      const { firstValue: amount } = resultsParser.parseQueryResponse(
        queryResponse,
        endpointDefinition
      );

      setPingAmount(amount?.valueOf()?.toString(10));
    } catch (err) {
      console.error('Unable to call getPingAmount', err);
    }
  };

  useEffect(() => {
    getPingAmount();
  }, []);

  return pingAmount;
};
