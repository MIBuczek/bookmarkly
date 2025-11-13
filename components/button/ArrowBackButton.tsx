import { Pressable, PressableProps } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import React from 'react';
import { useThemeColor } from '@/hooks/useThemeColor';

export const ArrowBackButton = ({ onPress, ...rest }: Readonly<PressableProps>) => {
  const iconColor = useThemeColor('icon');
  return (
    <Pressable onPress={onPress} {...rest} >
      <AntDesign name={'arrowleft'} size={24} color={iconColor} />
    </Pressable>
  );
};
