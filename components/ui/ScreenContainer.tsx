import React, { PropsWithChildren } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedView } from '@/components/ui/ThemedView';
import { Platform, StatusBar } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';

export function ScreenContainer({ children }: PropsWithChildren) {
  const isAndroid = Platform.OS === 'android';
  const colorScheme = useColorScheme();
  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: isAndroid ? (StatusBar.currentHeight ?? 0) : 0,
        paddingBottom: isAndroid ? 8 : 0,
        paddingHorizontal: 16,
      }}
      edges={['top', 'bottom']}
    >
      <ThemedView>{children}</ThemedView>
    </SafeAreaView>
  );
}
