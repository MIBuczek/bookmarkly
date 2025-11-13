import { router, Stack } from 'expo-router';
import React from 'react';
import { ArrowBackButton } from '@/components/button/ArrowBackButton';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/colors';

export default function LoginLayout() {
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
      <Stack.Screen name="login" />
      <Stack.Screen
        name="sign-up"
        options={{
          headerShown: true,
          title: '',
          headerShadowVisible: false,
          headerLeft: () => (
            <ArrowBackButton
              onPress={() => {
                router.back();
              }}
            />
          ),
        }}
      />
      <Stack.Screen
        name="verify-code"
        options={{
          headerShown: true,
          title: '',
          headerShadowVisible: false,
          headerLeft: () => (
            <ArrowBackButton
              onPress={() => {
                router.back();
              }}
            />
          ),
        }}
      />
    </Stack>
  );
}
