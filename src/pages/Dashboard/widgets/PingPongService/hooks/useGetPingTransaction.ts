import axios from 'axios';
import { API_URL } from 'config';
import { Address, Transaction, useGetLoginInfo } from 'lib';
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

      const {
        data,
        gasLimit,
        gasPrice,
        value,
        nonce,
        receiver,
        sender,
        ...rest
      } = response.data;

      const pingTransaction = new Transaction({
        data: Uint8Array.from(Buffer.from(data)),
        gasLimit: BigInt(gasLimit),
        gasPrice: BigInt(gasPrice),
        value: BigInt(value),
        nonce: BigInt(nonce),
        receiver: new Address(receiver),
        sender: new Address(sender),
        ...rest
      });

      return pingTransaction;
    } catch (err) {
      console.error('Unable to get Ping Transaction', err);
      return null;
    }
  };
};
