import React, { useState } from 'react';
import { ThemedView } from '@/components/ui/ThemedView';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ThemedText } from '@/components/ui/ThemedText';
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field';

const CELL_COUNT = 4;

export default function VerifyCodeScreen() {
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

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
        <TouchableOpacity className="flex items-center justify-center rounded-lg p-4">
          <ThemedText type="link">Resend code</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity
          className="items-center justify-center rounded-lg bg-blue-500 p-4 dark:bg-amber-300"
          onPress={() => {
          }}
        >
          <ThemedText type="default" className="text-white">
            Continue
          </ThemedText>
        </TouchableOpacity>
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
    borderColor: '#00000030',
    textAlign: 'center',
  },
  focusCell: {
    borderColor: '#000',
  },
});
