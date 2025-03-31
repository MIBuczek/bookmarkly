import { Pressable, PressableProps } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import React from 'react';
import { baseColors } from '@assets/theme/base-theme';

export const ArrowBackButton = ({ onPress, ...rest }: Readonly<PressableProps>) => (
  <Pressable onPress={onPress} {...rest}>
    <AntDesign name={'arrowleft'} size={24} color={baseColors.colors.dark['800']} />
  </Pressable>
);
