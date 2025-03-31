import { configureStore } from '@reduxjs/toolkit';
import { userSlice } from './user';
import { linkSlice } from '@/store/link';
import { useDispatch, useSelector } from 'react-redux';

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    links: linkSlice.reducer,
  },
});

export const storeActions = {
  user: userSlice.actions,
  links: linkSlice.actions,
};

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
