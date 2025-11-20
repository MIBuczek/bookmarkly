import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ThemedText } from '@/components/ui/ThemedText';
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field';
import { Button } from '@/components/button/Button';
import { baseColors } from '@assets/theme/base-theme';
import { useRouter } from 'expo-router';
import { RootState, storeActions, useAppDispatch, useAppSelector } from '@/store';
import { useTranslation } from 'react-i18next';
import authServices from '@/services/auth.services';
import { ScreenContainer } from '@/components/ui/ScreenContainer';
import { ArrowBackButton } from '@/components/button/ArrowBackButton';

const CELL_COUNT = 6;
const START_COUNT_DOWN = 90;

export type TVerifyCodeForm = {
  phone: string;
  otp: string;
};

export default function VerifyCodeScreen() {
  const router = useRouter();
  const { t } = useTranslation();

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
      dispatch(storeActions.user.setOtpCode({ otpCode: otp }));
      dispatch(storeActions.user.setToken({ token }));
      router.navigate('/(main)/(dashboard)');
    } catch (e) {
      console.error(e);
    } finally {
      setOtp('');
    }
  };

  useEffect(() => {
    if (countDown > 0) {
      const interval = setInterval(() => {
        setCountDown((prevCount) => prevCount - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
    return;
  }, [countDown]);

  return (
    <ScreenContainer>
      <ArrowBackButton
        onPress={() => {
          router.back();
        }}
      />
      <View className="flex-1 items-center justify-center gap-4">
        <ThemedText type="title" className="text-xl">
          {t('enter_confirmation_code')}
        </ThemedText>
        <ThemedText type="default" className={'text-center'}>
          {`${t('a_4_digit_code_was_sent_to')} \n ${phone || '(unknown)'}`}
        </ThemedText>
        <CodeField
          ref={ref}
          {...props}
          // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
          value={otp}
          onChangeText={setOtp}
          cellCount={CELL_COUNT}
          rootStyle={styles.codeFieldRoot}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          testID="my-code-input"
          renderCell={({ index, symbol, isFocused }) => (
            <Text
              className="m-2 rounded-lg"
              key={index}
              style={[styles.cell, isFocused && styles.focusCell]}
              onLayout={getCellOnLayoutHandler(index)}
            >
              {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
          )}
        />
      </View>
      <View className="mt-auto flex w-full gap-2">
        <Button
          type={'tertiary'}
          disabled={countDown > 0}
          title={countDown > 0 ? `${t('resend_code')} (${countDown}'s)` : t('resend_code')}
          onPress={resendCode}
        />
        <Button type={'primary'} title={t('continue')} onPress={verifyCode} />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, padding: 20 },
  title: { textAlign: 'center', fontSize: 30 },
  codeFieldRoot: { marginTop: 20 },
  cell: {
    width: 50,
    height: 50,
    lineHeight: 38,
    fontSize: 24,
    borderWidth: 1,
    borderColor: baseColors.colors.dark['400'],
    textAlign: 'center',
  },
  focusCell: {
    borderColor: baseColors.colors.dark['600'],
  },
});
