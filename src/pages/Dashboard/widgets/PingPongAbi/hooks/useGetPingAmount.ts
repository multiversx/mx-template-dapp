import { useEffect, useState } from 'react';
import { contractAddress } from 'config';
import { Address } from 'lib';
import { useGetScController } from './useGetScController';

export const useGetPingAmount = () => {
  const scController = useGetScController();
  const [pingAmount, setPingAmount] = useState<string>('0');

  const getPingAmount = async () => {
    try {
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
