import { Platform, View, type ViewProps } from 'react-native';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { twMerge } from 'tailwind-merge';

export type ThemedViewProps = ViewProps & {
  className?: string;
  withIOSPaddingTop?: boolean;
  withIOSPaddingBottom?: boolean;
};

export function ThemedView({
                             style,
                             className,
                             withIOSPaddingTop,
                             withIOSPaddingBottom,
                             children,
                             ...otherProps
                           }: ThemedViewProps) {
  return (
    <SafeAreaProvider>
      <View className={twMerge('bg-gray-300 dark:bg-dark-800', className)} {...otherProps}>
        {Platform.OS === 'ios' && withIOSPaddingTop && <View className="h-16" />}
        {children}
        {Platform.OS === 'ios' && withIOSPaddingBottom && <View className="h-16" />}
      </View>
    </SafeAreaProvider>
  );
}
