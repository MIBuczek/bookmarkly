import { ThemedText } from '@/components/ui/ThemedText';
import { ThemedView } from '@/components/ui/ThemedView';
import React from 'react';
import { View } from 'react-native';
import { IconSymbol } from '@/components/ui/IconSymbol';

export default function DashboardScreen() {
  return (
    <ThemedView withIOSPaddingBottom withIOSPaddingTop className="flex-1 px-6">
      <View className="flex h-[30%] w-full items-center justify-center gap-4">
        <ThemedText type={'title'} className={'py-6 text-2xl'}>
          Settings
        </ThemedText>
        <View className="relative size-28 rounded-3xl bg-blue-100">
          <View
            className="absolute -bottom-1 -right-1 flex size-8 items-center justify-center rounded-full bg-blue-600">
            <IconSymbol size={16} name={'pencil'} color={'white'} />
          </View>
        </View>
        <View className="flex items-center">
          <ThemedText type="title" className="text-xl">
            Lucas Scott
          </ThemedText>
          <ThemedText className="text-sm text-gray-400">@lucascott123</ThemedText>
        </View>
      </View>
      <ThemedText>Dashboard</ThemedText>
    </ThemedView>
  );
}
