import { useCallback } from 'react';
import linkServices from '@/services/link.services';
import { storeActions, useAppDispatch, useAppSelector } from '@/store';
import { useToast } from 'react-native-toast-notifications';
import { useAuthGuard } from '@/hooks/useAuthGuard';
import { router } from 'expo-router';
import { APP_ROUTES } from '@/utils/routes';

export const useLoadLinks = () => {
  const dispatch = useAppDispatch();
  const toast = useToast();
  const authGuard = useAuthGuard();
  const { links } = useAppSelector((state) => state.links);

  const loadLinks = useCallback(async () => {
    if (links.length) return;

    if (!authGuard.checkUser) {
      router.replace(APP_ROUTES.SIGN_IN);
      return;
    }

    try {
      let { links, count } = await linkServices.getAllLink();
      dispatch(storeActions.links.setLinks({ links, count }));
    } catch (error) {
      console.error('[fetchLinks]:', error);
      toast.show('[Error] : Could not load your links', { type: 'error' });
    }
  }, [dispatch, toast, links]);

  return { loadLinks };
};
