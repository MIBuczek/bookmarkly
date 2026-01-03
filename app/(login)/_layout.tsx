import { Stack } from 'expo-router';
import React, { useEffect } from 'react';
import { useAuthGuard } from '@/hooks/useAuthGuard';

export default function LoginLayout() {
  const { checkToken } = useAuthGuard();

  useEffect(() => {
    void checkToken();
  }, []);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="sign-in" />
      <Stack.Screen name="sign-up" />
      <Stack.Screen name="verify-code" />
    </Stack>
  );
}
