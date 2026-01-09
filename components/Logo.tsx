import { LogoIcon } from '@/components/svg/LogoIcon';
import { ThemedText } from '@/components/ui/ThemedText';
import { View } from 'react-native';
import React from 'react';
import { twMerge } from 'tailwind-merge';

export default function Logo({ className }: Readonly<{ className: string }>) {
  return (
    <View
      className={twMerge('flex-row items-center justify-center rounded-t-lg bg-primary-100 dark:bg-primary-200', className)}>
      <LogoIcon width={50} height={50} />
      <ThemedText type="title" className={'pb-2 text-dark-600'} size={'3xl'}>
        Bookmarkly
      </ThemedText>
    </View>
  );
}