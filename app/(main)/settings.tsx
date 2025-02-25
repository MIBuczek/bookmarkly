import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import React from 'react';

export default function TabTwoScreen() {
  return (
    <ThemedView className="flex-1 justify-center items-center">
      <ThemedText>Settings</ThemedText>
    </ThemedView>
  );
}
