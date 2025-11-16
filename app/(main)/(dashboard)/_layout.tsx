import { router, Stack } from 'expo-router';
import React from 'react';
import { ArrowBackButton } from '@/components/button/ArrowBackButton';
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
      <Stack.Screen
        name="details"
        options={{
          headerShown: true,
          title: '',
          headerShadowVisible: false,
          headerLeft: () => <ArrowBackButton onPress={() => router.back()} />,
        }}
      />
    </Stack>
  );
}
