import { Stack } from 'expo-router';
import React from 'react';

export default function MainLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="read-me" />
      <Stack.Screen name="library" />
      <Stack.Screen name="details" />
      <Stack.Screen name="settings" />
    </Stack>
  );
}
