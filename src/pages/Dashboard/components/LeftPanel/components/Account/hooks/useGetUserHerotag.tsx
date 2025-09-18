import axios from 'axios';
import { useEffect, useState } from 'react';

import { ID_API_URL, USERS_API_URL } from 'config/config.mainnet';
import { useGetAccountInfo } from 'lib';

export const useGetUserHerotag = () => {
  const { address } = useGetAccountInfo();
  const [profileUrl, setProfileUrl] = useState('');
  const [herotag, setHerotag] = useState('');

  const getUserProfileData = async (address?: string) => {
    if (!address) {
      return;
    }

    try {
      const { data } = await axios.get(`${USERS_API_URL}${address}`, {
        baseURL: ID_API_URL
      });

      return data;
    } catch (err) {
      console.error('Unable to fetch profile url');
    }
  };

  useEffect(() => {
    if (!address) {
      return;
    }

    const fetchUserProfileUrl = async () => {
      const data = await getUserProfileData(address);
      setProfileUrl(data?.profile?.url);
      setHerotag(data?.herotag);
    };

    fetchUserProfileUrl();
  }, [address]);

  return { herotag, profileUrl };
};
