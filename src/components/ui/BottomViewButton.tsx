import React, { PropsWithChildren } from 'react';
import { View, ViewProps } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { twMerge } from 'tailwind-merge';

export type BottomViewButtonProps = ViewProps &
  PropsWithChildren<{
    className?: string;
    paddingTop?: number;
  }>;

export function BottomViewButton({ children, className, style, paddingTop = 32, ...props }: BottomViewButtonProps) {
  const insets = useSafeAreaInsets();

  return (
    <View
      className={twMerge(
        'absolute left-0 right-0 flex-row items-center justify-center gap-2 bg-black dark:bg-white',
        className,
      )}
      style={[
        {
          left: -16,
          right: -16,
          bottom: -insets.bottom,
          paddingTop,
          paddingBottom: 24 + insets.bottom,
        },
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
}
