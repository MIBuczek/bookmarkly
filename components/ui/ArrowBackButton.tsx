import { Pressable, PressableProps } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import React from 'react';

export const ArrowBackButton = ({ onPress, ...rest }: Readonly<PressableProps>) => (
  <Pressable onPress={onPress} {...rest}>
    <AntDesign name={'arrowleft'} size={24} />
  </Pressable>
);
