import axios from 'axios';

import { API_URL } from 'config';
import { Transaction } from 'lib';

export const useGetPongTransaction = () => {
  return async () => {
    try {
      const { data } = await axios.post<Transaction>(
        '/ping-pong/abi/pong',
        {},
        {
          baseURL: API_URL
        }
      );

      return data;
    } catch (err) {
      console.error('Unable to get Pong Transaction', err);
      return null;
    }
  };
};
