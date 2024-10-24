import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import qs from 'query-string'
import Config from 'react-native-config';

// Helper function to get the access token
const getAccessToken = async (): Promise<string | null> => {
  return await AsyncStorage.getItem('accessToken');
};

// Helper function to refresh the token
const refreshToken = async (): Promise<string | null> => {
  try {
    const refreshToken = await AsyncStorage.getItem('refreshToken');
    const response = await axios.post(`${Config.API_URL}/${Config.API_VERSION}/refresh-token`, {
      refreshToken,
    });

    const newAccessToken = response.data.accessToken;
    await AsyncStorage.setItem('accessToken', newAccessToken);

    return newAccessToken;
  } catch (error) {
    throw error;
  }
};

// Create Axios instance
const axiosInstance = axios.create({
  baseURL: `${Config.API_URL}/${Config.API_VERSION}`,
  timeout: 310000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",

  },
  paramsSerializer: params =>
    qs.stringify(params, {
      arrayFormat: "comma",
      skipNull: true,
      skipEmptyString: true,
    }),
});

// Request interceptor to add Authorization header
axiosInstance.interceptors.request.use(
  //@ts-ignore
  async (config: AxiosRequestConfig) => {
    const token = await getAccessToken();
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle token expiration
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const newToken = await refreshToken();
        if (newToken) {
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return axiosInstance(originalRequest);
        }
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

// API request functions with centralized error handling

export const apiGet = async <T>(endpoint: string, params: object = {}): Promise<T> => {
  try {
    const response = await axiosInstance.get<T>(endpoint, { params });
    return response.data;
  } catch (error) {
    handleError(error);
    throw error;
  }
};

export const apiPost = async <T>(endpoint: string, data: object): Promise<T> => {
  try {
    const response = await axiosInstance.post<T>(endpoint, data);
    return response.data;
  } catch (error) {
    handleError(error);
    throw error;
  }
};

export const apiPut = async <T>(endpoint: string, data: object): Promise<T> => {
  try {
    const response = await axiosInstance.put<T>(endpoint, data);
    return response.data;
  } catch (error) {
    handleError(error);
    throw error;
  }
};

export const apiDelete = async <T>(endpoint: string): Promise<T> => {
  try {
    const response = await axiosInstance.delete<T>(endpoint);
    return response.data;
  } catch (error) {
    handleError(error);
    throw error;
  }
};

// Centralized error handler
const handleError = (error: any) => {
  console.error('API error:', error);
  // You can handle different types of errors here, such as showing notifications
  // or redirecting to login if the token is invalid.
};
