import React, { useState } from 'react';
import { ThemedView } from '@/components/ui/ThemedView';
import { StyleSheet, Text, View } from 'react-native';
import { ThemedText } from '@/components/ui/ThemedText';
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field';
import { Button } from '@/components/button/Button';
import { baseColors } from '@assets/theme/base-theme';
import { useRouter } from 'expo-router';
import { storeActions, useAppDispatch } from '@/store';
import { userMock } from '@/store/user';

const CELL_COUNT = 4;

export default function VerifyCodeScreen() {
  const router = useRouter();
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const dispatch = useAppDispatch();

  return (
    <ThemedView withIOSPaddingBottom className="flex-1 items-center justify-center px-6">
      <View className="flex-1 items-center justify-center gap-4">
        <ThemedText type="title" className="text-xl">
          Enter confirmation code
        </ThemedText>
        <ThemedText type="default" className={'text-center'}>
          {`A 4-digit code was sent to \n +1 555 555 5555`}
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
        <Button type={'tertiary'} title={'Resend code'} onPress={() => {
        }} />
        <Button
          type={'primary'}
          title={'Continue'}
          onPress={() => {
            dispatch(storeActions.user.setUser({ user: userMock }));
            router.navigate('/(main)/(dashboard)');
          }}
        />
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
