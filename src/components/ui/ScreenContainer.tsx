import React, { PropsWithChildren, useMemo } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedView } from '@/components/ui/ThemedView';
import { Platform, StatusBar } from 'react-native';

type ScreenContainerProps = {
  withBottomTabs?: boolean;
} & PropsWithChildren;

export function ScreenContainer({ withBottomTabs = false, children }: ScreenContainerProps) {
  const isAndroid = Platform.OS === 'android';

  const paddingBottom = useMemo(() => {
    if (isAndroid) {
      return 8 + (withBottomTabs ? 50 : 0);
    }
    return 0 + (withBottomTabs ? 50 : 0);
  }, [withBottomTabs, isAndroid]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: isAndroid ? (StatusBar.currentHeight ?? 0) : 0,
        paddingBottom,
        paddingHorizontal: 16,
      }}
      edges={['top', 'bottom']}
    >
      <ThemedView>{children}</ThemedView>
    </SafeAreaView>
  );
}
