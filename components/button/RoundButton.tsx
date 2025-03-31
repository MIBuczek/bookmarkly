import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import React from 'react';
import { twMerge } from 'tailwind-merge';

interface RoundButtonProps extends TouchableOpacityProps {
  className?: string;
  onPress: () => void;
}

export const RoundButton = ({ className, onPress, children, ...rest }: RoundButtonProps) => (
  <TouchableOpacity className={twMerge('rounded-full p-4', className)} onPress={onPress} {...rest}>
    {children}
  </TouchableOpacity>
);
