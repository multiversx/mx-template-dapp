import axios from 'axios';
import { API_URL } from 'config';
import { Address, Transaction, useGetLoginInfo } from 'lib';
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

      const pongTransaction = new Transaction({
        data: Uint8Array.from(Buffer.from(data)),
        gasLimit: BigInt(gasLimit),
        gasPrice: BigInt(gasPrice),
        value: BigInt(value),
        nonce: BigInt(nonce),
        receiver: new Address(receiver),
        sender: new Address(sender),
        ...rest
      });

      return pongTransaction;
    } catch (err) {
      console.error('Unable to get Pong Transaction', err);
      return null;
    }
  };
};
