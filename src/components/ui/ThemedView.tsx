import { View, type ViewProps } from 'react-native';
import React from 'react';
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
    <View className={twMerge('flex-1 bg-gray-300 dark:bg-dark-800', className)} style={style} {...otherProps}>
      {children}
    </View>
  );
}
