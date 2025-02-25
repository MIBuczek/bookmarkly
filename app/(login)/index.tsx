import React from 'react';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function Index() {
  return (
    <ThemedView className="flex-1 justify-center items-center">
      <ThemedText>
        SignIn
      </ThemedText>
    </ThemedView>
  );
}
