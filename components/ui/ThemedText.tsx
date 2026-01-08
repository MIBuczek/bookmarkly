import React, { useCallback } from 'react';
import { Text, type TextProps } from 'react-native';
import { twMerge } from 'tailwind-merge';
import { RootState, useAppSelector } from '@/store';

export type ThemedTextProps = TextProps & {
  type?: 'default' | 'title' | 'subtitle' | 'link';
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | number
  className?: string;
};

export function ThemedText({ style, className, type = 'default', size, ...rest }: ThemedTextProps) {
  const { user } = useAppSelector(({ user }: RootState) => user);

  const textStyle = () => {
    let _default = 'font-sans font-normal';
    switch (type) {
      case 'title':
        return _default + ' text-dark-800 dark:text-gray-300 text-2xl font-bold';
      case 'subtitle':
        return _default + ' text-dark-800 dark:text-gray-300 text-xl font-semibold';
      case 'link':
        return _default + ' text-blue-600 dark:text-blue-400';
      default:
        return _default + ' text-dark-700 dark:text-gray-400';
    }
  };

  const fontFamily = useCallback(() => {
    switch (type) {
      case 'title':
        return 'InterBold';
      case 'subtitle':
        return 'InterSemiBold';
      default:
        return 'InterRegular';
    }
  }, [type]);

  const fontSize = useCallback(() => {
    const fontSize = user?.settings.fontSize || 14;
    switch (size) {
      case '3xl':
        return fontSize * 1.75;
      case '2xl':
        return fontSize * 1.5;
      case 'xl':
        return fontSize * 1.25;
      case 'lg':
        return fontSize * 1.125;
      case 'md':
        return fontSize;
      case 'sm':
        return fontSize * 0.875;
      case 'xs':
        return fontSize * 0.715;
      default:
        return size;
    }
  }, [user?.settings.fontSize, size]);

  return <Text className={twMerge(textStyle(), className)} {...rest}
               style={{ fontFamily: fontFamily(), fontSize: fontSize() }} />;
}
