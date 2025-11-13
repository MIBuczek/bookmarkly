import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Country } from 'country-list';

export interface User {
  name: string;
  email: string;
  country: Country;
  phone: string;
}

export const userMock: User = {
  name: 'Jon Doe',
  email: 'jon_doe@gmail.com',
  country: { code: 'US', name: 'United States' },
  phone: '555-555-5555',
};

type UserState = {
  user: User | null;
  phone: string | null;
  otpCode: string | null;
  token: string | null;
  isLoggedIn: boolean;
  lastLoggedIn: string | null;
  error: Error | null;
};

const initialState: UserState = {
  user: null,
  phone: null,
  otpCode: null,
  token: null,
  isLoggedIn: false,
  lastLoggedIn: null,
  error: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setPhone: (state, action: PayloadAction<{ phone: string }>) => {
      return { ...state, ...action.payload };
    },
    setOtpCode: (state, action: PayloadAction<{ otpCode: string }>) => {
      return { ...state, ...action.payload };
    },
    setUser: (state, action: PayloadAction<{ user: User }>) => {
      return { ...state, ...action.payload, isLoggedIn: true, lastLoggedIn: new Date().toISOString() };
    },
    setToken: (state, action: PayloadAction<{ token: string }>) => {
      return { ...state, ...action.payload };
    },
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      return { ...state, ...action.payload };
    },
    logout: (state) => {
      return { ...initialState };
    },
  },
});
