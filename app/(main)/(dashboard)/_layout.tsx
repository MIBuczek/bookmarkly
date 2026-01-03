import { Stack } from 'expo-router';
import React from 'react';
import { Colors } from '@/constants/colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function DashboardLayout() {
  const colorScheme = useColorScheme();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        headerStyle: {
          backgroundColor: Colors[colorScheme ?? 'light'].background,
        },
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="details" />
    </Stack>
  );
}
