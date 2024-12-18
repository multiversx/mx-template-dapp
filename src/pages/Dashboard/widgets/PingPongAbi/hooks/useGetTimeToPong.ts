import {
  Address,
  AddressValue,
  ContractFunction,
  ResultsParser,
  ProxyNetworkProvider
} from 'utils';
import { smartContract } from 'utils/smartContract';
import { getAccount, getState, networkSelector } from 'lib/sdkDappCore';

const resultsParser = new ResultsParser();

export const useGetTimeToPong = () => {
  const network = networkSelector(getState());
  const { address } = getAccount();

  const getTimeToPong = async () => {
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
