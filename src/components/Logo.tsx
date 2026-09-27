import { ThemedText } from '@/components/ui/ThemedText';
import { View } from 'react-native';
import React from 'react';
import { twMerge } from 'tailwind-merge';

export default function Logo({ className }: Readonly<{ className?: string }>) {
  return (
    <View className={twMerge('flex items-center justify-center border-4 border-black px-4 py-8', className)}>
      <ThemedText type="title" className="font-black uppercase tracking-tighter" size={'5xl'}>
        Bookmarkly
      </ThemedText>
    </View>
  );
}
