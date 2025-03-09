import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { ThemedText } from '@/components/ui/ThemedText';
import React from 'react';
import { twMerge } from 'tailwind-merge';

interface ButtonProps extends TouchableOpacityProps {
  type: 'primary' | 'secondary' | 'tertiary';
  title: string;
  titleClassName?: string;
  buttonClassName?: string;
  onPress: () => void;
}

export const Button = ({ type, title, titleClassName, buttonClassName, onPress, ...rest }: ButtonProps) => {
  const buttonStyles = {
    primary: 'bg-blue-500 border border-blue-500',
    secondary: 'bg-white border border-blue-500',
    tertiary: 'bg-transparent',
  };

  const textStyles = {
    primary: 'text-white',
    secondary: 'text-blue-500',
    tertiary: 'text-blue-500',
  };

  return (
    <TouchableOpacity
      className={twMerge(...['flex items-center justify-center rounded-lg p-4', buttonStyles[type], buttonClassName])}
      onPress={onPress}
      {...rest}
    >
      <ThemedText type="subtitle" className={twMerge(['text-sm font-semibold', textStyles[type], titleClassName])}>
        {title}
      </ThemedText>
    </TouchableOpacity>
  );
};
