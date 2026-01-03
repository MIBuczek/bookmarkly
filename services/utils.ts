import axios from 'axios';
import { store } from '@/store'; // Import your redux store to access the token

const BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost/api';

/* Authentication urls */
const AUTH_SING_IN_URL: Readonly<string> = `${BASE_URL}/sign-in`;
const AUTH_SING_UP_URL: Readonly<string> = `${BASE_URL}/sign-up`;
const AUTH_VERIFY_CODE_URL: Readonly<string> = `${BASE_URL}/verify-code`;
const AUTH_VERIFY_SESSION: Readonly<string> = `${BASE_URL}/verify-session`;

/* Links urls */
const GENERATE_METADATA_URL: Readonly<string> = `${BASE_URL}/generate-metadata`;
const LINKS_URL: Readonly<string> = `${BASE_URL}/links`;

/* User urls */
const USER_SETTINGS_URL: Readonly<string> = `${BASE_URL}/user-settings`;

export const API_URLS = {
  AUTH_SING_IN_URL,
  AUTH_SING_UP_URL,
  AUTH_VERIFY_CODE_URL,
  AUTH_VERIFY_SESSION,
  GENERATE_METADATA_URL,
  LINKS_URL,
  USER_SETTINGS_URL,
};

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const token = state.user.token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
