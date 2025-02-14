import axios from 'axios';
import { useState } from 'react';

import { API_URL } from 'config';
import { ProfileType } from 'types';

export const useGetProfile = () => {
  const [profile, setProfile] = useState<ProfileType | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const getProfile = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get('/account', {
        baseURL: API_URL
      });

      if (data) {
        setProfile(data);
      }
    } catch (err) {
      console.error('Unable to fetch profile');
    } finally {
      setIsLoading(false);
    }
  };

  return { profile, getProfile, isLoading };
};
