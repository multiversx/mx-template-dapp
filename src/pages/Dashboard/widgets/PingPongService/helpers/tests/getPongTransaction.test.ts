import axios from 'axios';
import { getPongTransaction } from '../getPongTransaction';

const pongTransaction = {
  nonce: 10702,
  value: '0',
  receiver: 'erd1qqqqqqqqqqqqqpgqm6ad6xrsjvxlcdcffqe8w58trpec09ug9l5qde96pq',
  sender: 'erd1axhx4kenjlae6sknq7zjg2g4fvzavv979r2fg425p62wkl84avtqsf7vvv',
  gasPrice: 1000000000,
  gasLimit: 6000000,
  data: 'cG9uZw==',
  chainID: 'D',
  version: 1
};

describe('useGetPongTransaction', () => {
  it('should return Pong transaction', async () => {
    jest.spyOn(axios, 'post').mockResolvedValueOnce({
      data: pongTransaction
    });

    const transactionReceived = await getPongTransaction();
    expect(transactionReceived).toBe(pongTransaction);
  });

  it('should return null', async () => {
    jest.spyOn(axios, 'post').mockRejectedValueOnce(new Error('error'));

    const transactionReceived = await getPongTransaction();
    expect(transactionReceived).toBeNull();
  });
});
