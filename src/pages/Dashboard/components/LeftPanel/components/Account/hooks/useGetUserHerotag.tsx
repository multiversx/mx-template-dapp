import axios from 'axios';
import { useEffect, useState } from 'react';
import { ID_API_URL } from 'config';

export const useGetUserHerotag = (address: string) => {
  const [profileUrl, setProfileUrl] = useState('');
  const [herotag, setHerotag] = useState('');

  const getUserProfileData = async (address: string) => {
    if (!address) return;
    try {
      const { data } = await axios.get(`/users/api/v1/users/${address}`, {
        baseURL: ID_API_URL
      });

      return data;
    } catch (err) {
      console.error('Unable to fetch profile url');
    }
  };

  useEffect(() => {
    if (!address) return;

    const fetchUserProfileUrl = async () => {
      const data = await getUserProfileData(address);
      setProfileUrl(data?.profile?.url);
      setHerotag(data?.herotag);
    };

    fetchUserProfileUrl();
  }, [address]);

  return [herotag, profileUrl];
};
