import axiosDefaultInstance from 'config/axios';

const BASE_URL = '/users/api/v1/self';

export const getMyInfo = async () => {
  const result = await axiosDefaultInstance.get(`${BASE_URL}/info`);

  return result.data;
};
