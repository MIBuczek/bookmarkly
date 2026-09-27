import React, { useCallback } from 'react';
import { Text, type TextProps } from 'react-native';
import { twMerge } from 'tailwind-merge';
import { RootState, useAppSelector } from '@/store';

export type ThemedTextProps = TextProps & {
  type?: 'default' | 'title' | 'subtitle' | 'link';
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | number;
  className?: string;
};

export function ThemedText({ style, className, type = 'default', size, ...rest }: ThemedTextProps) {
  const { user } = useAppSelector(({ user }: RootState) => user);

  const textStyle = () => {
    let _default = 'font-normal';
    switch (type) {
      case 'title':
        return _default + ' text-black dark:text-white text-4xl font-bold';
      case 'subtitle':
        return _default + ' text-black dark:text-white text-xl font-semibold';
      case 'link':
        return _default + ' text-blue-600 dark:text-blue-400';
      default:
        return _default + ' text-dark-700 dark:text-gray-400';
    }
  };

  const fontFamily = useCallback(() => {
    switch (type) {
      case 'title':
        return 'SpaceMonoBold';
      case 'subtitle':
        return 'SpaceMonoBold';
      default:
        return 'SpaceMonoRegular';
    }
  }, [type]);

  const fontSize = useCallback(() => {
    const fontSize = user?.settings.fontSize || 16;
    switch (size) {
      case '5xl':
        return fontSize * 2.5;
      case '4xl':
        return fontSize * 2.25;
      case '3xl':
        return fontSize * 2;
      case '2xl':
        return fontSize * 1.75;
      case 'xl':
        return fontSize * 1.5;
      case 'lg':
        return fontSize * 1.25;
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

  const lineHeight = useCallback(() => {
    return fontSize() * 1.2;
  }, [fontSize]);

  return (
    <Text
      className={twMerge(textStyle(), className)}
      {...rest}
      style={{ fontFamily: fontFamily(), fontSize: fontSize(), lineHeight: lineHeight() }}
    />
  );
}
