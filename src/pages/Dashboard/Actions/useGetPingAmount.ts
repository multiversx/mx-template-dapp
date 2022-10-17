import { useEffect, useState } from 'react';
import { useGetNetworkConfig } from '@elrondnetwork/dapp-core/hooks/useGetNetworkConfig';
import { ProxyNetworkProvider } from '@elrondnetwork/erdjs-network-providers/out';
import { ContractFunction, ResultsParser } from '@elrondnetwork/erdjs/out';
import { smartContract } from '../helpers';

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
