import { ThemedText } from '@/components/ui/ThemedText';
import React from 'react';
import { View } from 'react-native';
import { IconSymbol } from '@/components/ui/IconSymbol';

interface ErrorTextProps {
  errorMsg?: string;
}

export const ErrorText = ({ errorMsg }: Readonly<ErrorTextProps>) => (
  <View className={'flex flex-row gap-1'}>
    <IconSymbol name={'exclamationmark.circle'} color={'#ef4444'} size={16} />
    <ThemedText className={'text-red-500 dark:text-red-400'} size="sm">{errorMsg}</ThemedText>
  </View>
);
