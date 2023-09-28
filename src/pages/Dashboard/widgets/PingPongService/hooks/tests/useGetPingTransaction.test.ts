import { renderHook } from '@testing-library/react';
import axios from 'axios';
import { useGetPingTransaction } from '../useGetPingTransaction';

const pingTransaction = {
  nonce: 10705,
  value: '1000000000000000000',
  receiver: 'erd1qqqqqqqqqqqqqpgq72l6vl07fkn3alyfq753mcy4nakm0l72396qkcud5x',
  sender: 'erd1wh9c0sjr2xn8hzf02lwwcr4jk2s84tat9ud2kaq6zr7xzpvl9l5q8awmex',
  gasPrice: 1000000000,
  gasLimit: 6000000,
  data: 'cGluZw==',
  chainID: 'D',
  version: 1
};

describe('useGetPingTransaction', () => {
  it('should return Ping transaction', async () => {
    jest.spyOn(axios, 'post').mockResolvedValueOnce({
      data: pingTransaction
    });

    const { result } = renderHook(() => useGetPingTransaction());
    const transactionReceived = await result.current();

    expect(transactionReceived).toBe(pingTransaction);
  });

  it('should return null', async () => {
    jest.spyOn(axios, 'post').mockRejectedValueOnce(new Error('error'));

    const { result } = renderHook(() => useGetPingTransaction());
    const transactionReceived = await result.current();

    expect(transactionReceived).toBeNull();
  });
});
