import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { userSlice } from './user';
import { linksSlice } from '@/store/links';
import { useDispatch, useSelector } from 'react-redux';
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import { reduxStorage } from './storage';

const rootReducer = combineReducers({
  user: userSlice.reducer,
  links: linksSlice.reducer,
});

const persistConfig = {
  key: 'root',
  storage: reduxStorage,
  whitelist: ['user'], // Optional: only persist specific slices
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const storeActions = {
  user: userSlice.actions,
  links: linksSlice.actions,
};

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
