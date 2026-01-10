import { useCallback, useMemo } from 'react';
import { useRouter } from 'expo-router';
import { storeActions, useAppDispatch, useAppSelector } from '@/store';
import authServices from '@/services/auth.services';
import { APP_ROUTES } from '@/utils/routes';

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
      router.navigate(APP_ROUTES.SIGN_IN);
      return;
    }

    try {

      const { valid, user } = await authServices.verifySession();

      if (valid && user) {
        dispatch(storeActions.user.setUser({ user }));
        router.navigate(APP_ROUTES.DASHBOARD);
        return;
      }

      dispatch(storeActions.user.logout());
      router.navigate(APP_ROUTES.SIGN_IN);
    } catch (error) {
      console.error('[checkToken]:', error);
      dispatch(storeActions.user.logout());
      router.navigate(APP_ROUTES.SIGN_IN);
    }
  }, [dispatch, router, token]);

  return { checkUser, checkToken };
};
