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
  lastLoggedIn: Date | null;
  error: Error | null;
};

const initialState: UserState = {
  user: userMock,
  lastLoggedIn: null,
  error: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ user: User }>) => {
      return { ...state, ...action.payload, isLoggedIn: true };
    },
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      return { ...state, ...action.payload };
    },
    logout: (state) => {
      return { ...initialState };
    },
  },
});
