import {
  Address,
  AddressValue,
  ContractFunction,
  ProxyNetworkProvider,
  ResultsParser
} from 'lib/sdkCore';
import { useGetAccount, useGetNetworkConfig } from 'lib/sdkDappCore';
import { smartContract } from 'utils/smartContract';

const resultsParser = new ResultsParser();

export const useGetTimeToPong = () => {
  const { network } = useGetNetworkConfig();
  const { address } = useGetAccount();

  const getTimeToPong = async () => {
    if (!address) {
      return;
    }

    try {
      const query = smartContract.createQuery({
        func: new ContractFunction('getTimeToPong'),
        args: [new AddressValue(new Address(address))]
      });
      const provider = new ProxyNetworkProvider(network.apiAddress);
      const queryResponse = await provider.queryContract(query);
      const endpointDefinition = smartContract.getEndpoint('getTimeToPong');
      const { firstValue } = resultsParser.parseQueryResponse(
        queryResponse,
        endpointDefinition
      );
      const secondsRemaining: number = firstValue?.valueOf()?.toNumber();

      return secondsRemaining;
    } catch (err) {
      console.error('Unable to call getTimeToPong', err);
    }
  };

  return getTimeToPong;
};
