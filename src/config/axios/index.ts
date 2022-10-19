import axios, { AxiosRequestConfig } from 'axios';
import { refreshAccessToken } from 'services/auth';
import { hasValidAccessToken } from 'utils';
import { BACKEND_URL } from './constants';

const axiosDefaultInstance = axios.create({
  baseURL: BACKEND_URL
});

axiosDefaultInstance.interceptors.request.use(
  async (config: AxiosRequestConfig) => {
    let accessToken;

    const credentials = JSON.parse(localStorage.getItem('credentials')!);

    if (credentials !== null) {
      if (!hasValidAccessToken()) {
        const payload = await refreshAccessToken();
        const expirationTime = payload.expirationTime;
        localStorage.removeItem('credentials');
        localStorage.setItem(
          'credentials',
          JSON.stringify({
            ...credentials,
            accessTokenExpirationTime: expirationTime
          })
        );
        window.dispatchEvent(new Event('storage'));
        accessToken = payload.accessToken;
      } else {
        accessToken = credentials.accessToken;
      }
    }

    if (accessToken) config.headers['Authorization'] = `Bearer ${accessToken}`;

    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

axiosDefaultInstance.interceptors.response.use(
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

export default axiosDefaultInstance;
