import axios from 'axios';

import { API_URL } from 'config';
import { Transaction } from 'lib';

export const useGetPongTransaction = () => {
  return async () => {
    try {
      const { data } = await axios.post(
        '/ping-pong/abi/pong',
        {},
        {
          baseURL: API_URL
        }
      );

      const pongTransaction = Transaction.newFromPlainObject(data);

      return pongTransaction;
    } catch (err) {
      console.error('Unable to get Pong Transaction', err);
      return null;
    }
  };
};
