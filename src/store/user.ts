import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Country } from 'country-telephone-data';
import { TUser, TUserSettings } from '@/types/uset.type';
import { reduxStorage } from '@/store/storage';
import { mockUser } from './mockData';

type UserState = {
  user: TUser | null;
  phone: string | null;
  phoneCode: Country | null;
  token: string | null;
  onboarded: boolean;
  termsAndConditions: boolean;
  isLoggedIn: boolean;
  lastLoggedIn: string | null;
  error: Error | null;
};

const initialState: UserState = {
  user: mockUser,
  phone: mockUser.phone,
  token: 'mock-token',
  phoneCode: null,
  onboarded: true,
  termsAndConditions: true,
  isLoggedIn: true,
  lastLoggedIn: new Date().toISOString(),
  error: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setPhone: (state, action: PayloadAction<{ phone: string }>) => {
      state.phone = action.payload.phone;
    },
    setPhoneCode: (state, action: PayloadAction<{ phoneCode: Country }>) => {
      state.phoneCode = action.payload.phoneCode;
    },
    setUser: (state, action: PayloadAction<{ user: TUser }>) => {
      state.user = action.payload.user;
      state.phone = action.payload.user.phone;
      state.isLoggedIn = true;
      state.lastLoggedIn = new Date().toISOString();
    },
    setToken: (state, action: PayloadAction<{ token: string }>) => {
      state.token = action.payload.token;
    },
    setOnboarded: (state, action: PayloadAction<{ onboarded: boolean }>) => {
      state.onboarded = action.payload.onboarded;
    },
    setTermsAndConditions: (state, action: PayloadAction<{ termsAndConditions: boolean }>) => {
      state.termsAndConditions = action.payload.termsAndConditions;
    },
    updateUserSettings: (state, action: PayloadAction<TUserSettings>) => {
      state.user!.settings = Object.assign(state.user!.settings, action.payload);
    },
    logout: () => {
      void reduxStorage.clearStorage();
      return { ...initialState };
    },
  },
});
