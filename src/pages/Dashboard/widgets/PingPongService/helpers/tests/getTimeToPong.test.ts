import axios from 'axios';
import { getTimeToPong } from '../getTimeToPong';

describe('useGetTimeToPong', () => {
  it('should return 180 seconds', async () => {
    jest.spyOn(axios, 'get').mockResolvedValueOnce({
      data: {
        status: 'awaiting_pong',
        timeToPong: 180
      }
    });

    const timeToPong = await getTimeToPong();

    expect(timeToPong).toBe(180);
  });

  it('should return undefined', async () => {
    jest.spyOn(axios, 'get').mockResolvedValueOnce({
      data: {
        status: 'not_yet_pinged'
      }
    });

    const timeToPong = await getTimeToPong();

    expect(timeToPong).toBeUndefined();
  });

  it('should return null', async () => {
    jest.spyOn(axios, 'get').mockRejectedValueOnce(new Error('error'));

    const timeToPong = await getTimeToPong();

    expect(timeToPong).toBeNull();
  });
});
