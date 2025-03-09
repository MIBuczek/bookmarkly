import { router, Stack } from 'expo-router';
import React from 'react';
import { ArrowBackButton } from '@/components/ui/ArrowBackButton';

export default function LoginLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
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
