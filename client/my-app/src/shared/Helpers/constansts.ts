import { store } from '@/app/store';
import { refreshTokenApi } from '@/pages/Auth/model/auth.slice';
import axios from 'axios'

export const instance = axios.create({
  baseURL: 'http://localhost:4200/api',
})
instance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);


instance.interceptors.response.use(
  (response) => response, 
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; 

      try {
        const refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken) {
          throw new Error("Refresh token отсутствует");
        }

        const response = await store
          .dispatch(refreshTokenApi(refreshToken))
          .unwrap();
        localStorage.setItem("accessToken", response.access_token);
        localStorage.setItem("refreshToken", response.refresh_token);

        originalRequest.headers.Authorization = `Bearer ${response.access_token}`;
        return instance(originalRequest);
      } catch (err) {
        console.error("Ошибка обновления токена", err);
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);
