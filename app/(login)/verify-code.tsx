import React, { useEffect, useState } from 'react';
import { ThemedView } from '@/components/ui/ThemedView';
import { StyleSheet, Text, View } from 'react-native';
import { ThemedText } from '@/components/ui/ThemedText';
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field';
import { Button } from '@/components/button/Button';
import { baseColors } from '@assets/theme/base-theme';
import { useRouter } from 'expo-router';
import { storeActions, useAppDispatch } from '@/store';
import { userMock } from '@/store/user';
import { useTranslation } from 'react-i18next';

const CELL_COUNT = 4;
const START_COUNT_DOWN = 90;

export default function VerifyCodeScreen() {
  const router = useRouter();
  const { t } = useTranslation();

  const [countDown, setCountDown] = useState(START_COUNT_DOWN);
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const dispatch = useAppDispatch();

  const resendCode = () => {
    console.log('resendCode');
    setCountDown(START_COUNT_DOWN);
  };

  const verifyCode = () => {
    console.log('verifyCode');
    dispatch(storeActions.user.setUser({ user: userMock }));
    router.navigate('/(main)/(dashboard)');
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
    <ThemedView withIOSPaddingBottom className="flex-1 items-center justify-center px-6">
      <View className="flex-1 items-center justify-center gap-4">
        <ThemedText type="title" className="text-xl">
          {t('enter_confirmation_code')}
        </ThemedText>
        <ThemedText type="default" className={'text-center'}>
          {`${t('a_4_digit_code_was_sent_to')} \n +1 555 555 5555`}
        </ThemedText>
        <CodeField
          ref={ref}
          {...props}
          // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
          value={value}
          onChangeText={setValue}
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
    </ThemedView>
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
