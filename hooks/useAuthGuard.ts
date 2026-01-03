import { useCallback } from 'react';
import { router } from 'expo-router';
import { storeActions, useAppDispatch } from '@/store';
import { LOCAL_STORAGE_KEY, localAppStorage } from '@/providers/local-app-storage';
import authServices from '@/services/auth.services';

export const useAuthGuard = () => {
  const dispatch = useAppDispatch();

  const checkToken = useCallback(async () => {
    try {
      const _token = localAppStorage.getLocalData<string>(LOCAL_STORAGE_KEY.TOKEN);

      if (!_token) {
        router.replace('/(login)/sign-in');
        return;
      }

      dispatch(storeActions.user.setToken({ token: _token }));
      const { valid, user } = await authServices.verifySession();

      if (valid && user) {
        dispatch(storeActions.user.setUser({ user }));
        router.replace('/(main)/(dashboard)');
        return;
      }

      localAppStorage.deleteLocalData(LOCAL_STORAGE_KEY.TOKEN);
      router.replace('/(login)/sign-in');
    } catch (error) {
      console.error('[checkToken]:', error);
      localAppStorage.deleteLocalData(LOCAL_STORAGE_KEY.TOKEN);
      router.replace('/(login)/sign-in');
    }
  }, [dispatch, localAppStorage, router]);

  return { checkToken };
};
