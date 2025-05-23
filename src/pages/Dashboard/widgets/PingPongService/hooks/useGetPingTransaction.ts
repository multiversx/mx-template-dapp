import axios from 'axios';
import { API_URL } from 'config';
import { Transaction, useGetLoginInfo } from 'lib';
import { PingPongServiceTransactionType } from '../types';

export const useGetPingTransaction = () => {
  const { tokenLogin } = useGetLoginInfo();

  return async () => {
    try {
      const response = await axios.post<PingPongServiceTransactionType>(
        '/ping-pong/abi/ping',
        {},
        {
          baseURL: API_URL,
          headers: {
            Authorization: `Bearer ${tokenLogin?.nativeAuthToken}`
          }
        }
      );

      const pingTransaction = Transaction.newFromPlainObject(response.data);

      return pingTransaction;
    } catch (err) {
      console.error('Unable to get Ping Transaction', err);
      return null;
    }
  };
};
