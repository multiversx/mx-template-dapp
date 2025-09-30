import axios from 'axios';

import { API_URL } from 'config';

import { TimeToPongResponseType } from '../types';

export const useGetTimeToPong = () => {
  const getTimeToPong = async () => {
    try {
      const { data } = await axios.get<TimeToPongResponseType>(
        '/ping-pong/abi/time-to-pong',
        {
          baseURL: API_URL
        }
      );

      return data.timeToPong;
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  return getTimeToPong;
};
