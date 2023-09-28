import { renderHook } from '@testing-library/react';
import axios from 'axios';
import { useGetTimeToPong } from '../useGetTimeToPong';

describe('useGetTimeToPong', () => {
  it('should return 180 seconds', async () => {
    jest.spyOn(axios, 'get').mockResolvedValueOnce({
      data: {
        status: 'awaiting_pong',
        timeToPong: 180
      }
    });

    const { result } = renderHook(() => useGetTimeToPong());
    const timeToPong = await result.current();

    expect(timeToPong).toBe(180);
  });

  it('should return undefined', async () => {
    jest.spyOn(axios, 'get').mockResolvedValueOnce({
      data: {
        status: 'not_yet_pinged'
      }
    });

    const { result } = renderHook(() => useGetTimeToPong());
    const timeToPong = await result.current();

    expect(timeToPong).toBeUndefined();
  });

  it('should return null', async () => {
    jest.spyOn(axios, 'get').mockRejectedValueOnce(new Error('error'));

    const { result } = renderHook(() => useGetTimeToPong());

    const timeToPong = await result.current();
    expect(timeToPong).toBeNull();
  });
});
