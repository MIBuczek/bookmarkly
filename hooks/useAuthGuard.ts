import { useCallback, useMemo } from 'react';
import { useRouter } from 'expo-router';
import { storeActions, useAppDispatch, useAppSelector } from '@/store';
import authServices from '@/services/auth.services';

export const useAuthGuard = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { token, isLoggedIn } = useAppSelector((state) => state.user);

  const checkUser = useMemo(() => {
    return isLoggedIn;
  }, [isLoggedIn]);
  
  

  const checkToken = useCallback(async () => {
    if (!token) {
      dispatch(storeActions.user.logout());
      router.navigate('/(login)/sign-in');
      return;
    }

    try {

      const { valid, user } = await authServices.verifySession();

      if (valid && user) {
        dispatch(storeActions.user.setUser({ user }));
        router.navigate('/(main)/(dashboard)');
        return;
      }

      dispatch(storeActions.user.logout());
      router.navigate('/(login)/sign-in');
    } catch (error) {
      console.error('[checkToken]:', error);
      dispatch(storeActions.user.logout());
      router.navigate('/(login)/sign-in');
    }
  }, [dispatch, router, token]);

  return { checkUser, checkToken };
};
