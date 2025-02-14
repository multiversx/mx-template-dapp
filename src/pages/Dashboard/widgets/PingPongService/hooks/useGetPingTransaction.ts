import axios from 'axios';

import { API_URL } from 'config';
import { Transaction } from 'lib';

export const useGetPingTransaction = () => {
  return async () => {
    try {
      const { data } = await axios.post<Transaction>(
        '/ping-pong/abi/ping',
        {},
        {
          baseURL: API_URL
        }
      );

      return data;
    } catch (err) {
      console.error('Unable to get Ping Transaction', err);
      return null;
    }
  };
};
