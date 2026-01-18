import { useState } from 'react';
import { useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field';
import { RootState, storeActions, useAppDispatch, useAppSelector } from '@/store';
import authServices from '@/services/auth.services';
import { APP_ROUTES } from '@/utils/routes';
import { useRouter } from 'expo-router';

export const CELL_COUNT = 6;
export const START_COUNT_DOWN = 90;

export default function useScreen() {
  const router = useRouter();

  const [countDown, setCountDown] = useState(START_COUNT_DOWN);
  const [otp, setOtp] = useState('');
  const ref = useBlurOnFulfill({ value: otp, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value: otp,
    setValue: setOtp,
  });

  const dispatch = useAppDispatch();
  const { phone } = useAppSelector(({ user }: RootState) => user);

  const resendCode = async () => {
    if (!phone) return;
    try {
      await authServices.singIn({ phone });
      setCountDown(START_COUNT_DOWN);
    } catch (e) {
      console.error(e);
    }
  };

  const verifyCode = async () => {
    if (!otp || otp.length !== CELL_COUNT || !phone) return;
    try {
      const { user, token } = await authServices.verifyCode({ phone, otp });
      dispatch(storeActions.user.setUser({ user }));
      dispatch(storeActions.user.setToken({ token }));
      router.navigate(APP_ROUTES.DASHBOARD);
    } catch (e) {
      console.error(e);
    } finally {
      setOtp('');
    }
  };

  return {
    ref,
    props,
    getCellOnLayoutHandler,
    countDown,
    setCountDown,
    otp,
    setOtp,
    verifyCode,
    resendCode,
  };
}
