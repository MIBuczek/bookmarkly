import React from 'react';
import { Text, type TextProps } from 'react-native';
import { twMerge } from 'tailwind-merge';

export type ThemedTextProps = TextProps & {
  type?: 'default' | 'title' | 'subtitle' | 'link';
  className?: string;
};

export function ThemedText({ style, className, type = 'default', ...rest }: ThemedTextProps) {
  const textStyle = () => {
    let _default = 'font-sans text-gray-800 text-sm font-normal';
    switch (type) {
      case 'title':
        return _default + ' text-2xl font-bold';
      case 'subtitle':
        return _default + ' text-xl font-semibold';
      case 'link':
        return _default + ' text-blue-600';
      default:
        return _default;
    }
  };

  const fontStyle = () => {
    switch (type) {
      case 'title':
        return 'InterBold';
      case 'subtitle':
        return 'InterSemiBold';
      default:
        return 'InterRegular';
    }
  };

  return <Text className={twMerge(textStyle(), className)} {...rest} style={{ fontFamily: fontStyle() }} />;
}
