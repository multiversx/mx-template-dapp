import axios from 'axios';
import { API_URL } from 'config';
import { TimeToPongResponseType } from '../types';

export const getTimeToPong = async () => {
  try {
    const { data } = await axios.get<TimeToPongResponseType>(
      '/ping-pong/abi/time-to-pong',
      {
        baseURL: API_URL
      }
    );

    if (data.timeToPong == null) {
      // no timeToPong field → no cooldown
      return 0;
    }

    return data.timeToPong;
  } catch (err) {
    console.error(err);
    return 0;
  }
};
