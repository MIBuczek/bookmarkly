import React from 'react';
import { View } from 'react-native';
import { ThemedText } from '@/components/ui/ThemedText';
import { twMerge } from 'tailwind-merge';

interface ReadMeLogoProps {
  containerClassName?: string;
}

export const ReadMeLogo = ({ containerClassName }: ReadMeLogoProps) => {
  return (
    <View className={twMerge('flex-row  items-center justify-center', containerClassName)}>
      <ThemedText size={'5xl'} className={'uppercase bg-black p-4 text-white border-2 text-center'}>
        Read
      </ThemedText>
      <ThemedText size={'5xl'} className={'font-bold uppercase text-black p-4 border-2 text-center'}>
        me
      </ThemedText>
    </View>
  );
};
