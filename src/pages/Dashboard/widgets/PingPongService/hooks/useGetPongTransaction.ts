import axios from 'axios';
import { API_URL } from 'config';
import { Transaction, useGetLoginInfo } from 'lib';
import { PingPongServiceTransactionType } from '../types';

export const useGetPongTransaction = () => {
  const { tokenLogin } = useGetLoginInfo();

  return async () => {
    try {
      const response = await axios.post<PingPongServiceTransactionType>(
        '/ping-pong/abi/pong',
        {},
        {
          baseURL: API_URL,
          headers: {
            Authorization: `Bearer ${tokenLogin?.nativeAuthToken}`
          }
        }
      );

      const pongTransaction = Transaction.newFromPlainObject(response.data);

      return pongTransaction;
    } catch (err) {
      console.error('Unable to get Pong Transaction', err);
      return null;
    }
  };
};
