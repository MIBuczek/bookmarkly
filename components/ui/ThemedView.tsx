import { Platform, View, type ViewProps } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  className?: string;
  withIOSPaddingTop?: boolean;
  withIOSPaddingBottom?: boolean;
};

export function ThemedView({
                             style,
                             lightColor,
                             darkColor,
                             className,
                             withIOSPaddingTop,
                             withIOSPaddingBottom,
                             children,
                             ...otherProps
                           }: ThemedViewProps) {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  return (
    <SafeAreaProvider>
      <View className={className} style={[{ backgroundColor }, style]} {...otherProps}>
        {Platform.OS === 'ios' && withIOSPaddingTop && <View className="h-16" />}
        {children}
        {Platform.OS === 'ios' && withIOSPaddingBottom && <View className="h-16" />}
      </View>
    </SafeAreaProvider>
  );
}
