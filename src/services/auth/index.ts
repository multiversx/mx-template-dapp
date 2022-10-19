import axios from 'axios';

const BASE_URL = 'https://devnet-id.maiar.com/api/v1/login';

const axiosLoginInstance = axios.create({
  baseURL: BASE_URL
});

axiosLoginInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem('credentials');
      localStorage.removeItem('loginToken');
      window.location.href = '/unlock';
    }

    return Promise.reject(error);
  }
);

export const getLoginToken = async () => {
  const { data } = await axiosLoginInstance.post(`${BASE_URL}/init`);
  const { loginToken } = data;

  return loginToken;
};

export const getCredentials = async () => {
  const loginToken = JSON.parse(localStorage.getItem('loginToken')!);

  const queryParams = new URLSearchParams(window.location.search);

  const address = queryParams.get('address');
  const signature = queryParams.get('signature');

  const { data } = await axiosLoginInstance.post(BASE_URL, {
    data: {},
    loginToken,
    address,
    signature
  });

  return data;
};

export const refreshAccessToken = async () => {
  const { refreshToken } = JSON.parse(localStorage.getItem('credentials')!);

  const { data } = await axiosLoginInstance.post(
    `${BASE_URL}/access-token-generate`,
    {
      refreshToken
    }
  );

  return data;
};
