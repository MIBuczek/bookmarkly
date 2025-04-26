import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { ThemedText } from '@/components/ui/ThemedText';
import React from 'react';
import { twMerge } from 'tailwind-merge';

interface ButtonProps extends TouchableOpacityProps {
  type: 'primary' | 'secondary' | 'tertiary';
  title?: string;
  titleClassName?: string;
  buttonClassName?: string;
  onPress: () => void;
}

export const Button = ({ type, title, titleClassName, buttonClassName, children, onPress, ...rest }: ButtonProps) => {
  const buttonStyles = {
    primary: 'bg-primary-500 border border-primary-500',
    secondary: 'bg-transparent border border-primary-500',
    tertiary: 'bg-transparent disabled:opacity-50',
  };

  const textStyles = {
    primary: 'text-white',
    secondary: 'text-primary-500',
    tertiary: 'text-primary-500',
  };

  return (
    <TouchableOpacity
      className={twMerge('flex items-center justify-center rounded-lg p-4', buttonStyles[type], buttonClassName)}
      onPress={onPress}
      {...rest}
    >
      {title && (
        <ThemedText type="subtitle" className={twMerge(['text-sm font-semibold', textStyles[type], titleClassName])}>
          {title}
        </ThemedText>
      )}
      {children}
    </TouchableOpacity>
  );
};
