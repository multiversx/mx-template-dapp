import { contractAddress } from 'config';
import { Address, AddressValue, useGetAccount } from 'lib';
import { useGetScController } from './useGetScController';

export const useGetTimeToPong = () => {
  const { address } = useGetAccount();
  const scController = useGetScController();

  const getTimeToPong = async () => {
    if (!address) {
      return;
    }

    try {
      const result = await scController.query({
        contract: Address.newFromBech32(contractAddress),
        function: 'getTimeToPong',
        arguments: [new AddressValue(new Address(address))]
      });

      const time = result.toString();
      const secondsRemaining = time ? Number(result.toString()) : null;

      return secondsRemaining;
    } catch (err) {
      console.error('Unable to call getTimeToPong', err);
    }
  };

  return getTimeToPong;
};
