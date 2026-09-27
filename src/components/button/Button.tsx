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
    primary: 'bg-black border border-black',
    secondary: 'bg-white border border-black',
    tertiary: 'bg-transparent disabled:opacity-50',
  };

  const textStyles = {
    primary: 'text-white',
    secondary: 'text-black',
    tertiary: 'text-black',
  };

  return (
    <TouchableOpacity
      className={twMerge('rounded-xs flex h-fit items-center justify-center p-4', buttonStyles[type], buttonClassName)}
      onPress={onPress}
      {...rest}
    >
      {title && (
        <ThemedText
          type="subtitle"
          size={'md'}
          className={twMerge(['font-semibold uppercase', textStyles[type], titleClassName])}
        >
          {title}
        </ThemedText>
      )}
      {children}
    </TouchableOpacity>
  );
};
