import axios from 'axios';
import { API_URL } from 'config';
import { Transaction, useGetLoginInfo } from 'lib';

export const useGetPongTransaction = () => {
  const { tokenLogin } = useGetLoginInfo();

  return async () => {
    try {
      const { data } = await axios.post(
        '/ping-pong/abi/pong',
        {},
        {
          baseURL: API_URL,
          headers: {
            Authorization: `Bearer ${tokenLogin?.nativeAuthToken}`
          }
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
