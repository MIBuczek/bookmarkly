import React, { PropsWithChildren } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ThemedView } from '@/components/ui/ThemedView';
import { Platform, View } from 'react-native';

type ScreenContainerProps = {
  withBottomTabs?: boolean;
} & PropsWithChildren;

export function ScreenContainer({ withBottomTabs = false, children }: ScreenContainerProps) {
  const isAndroid = Platform.OS === 'android';
  const insets = useSafeAreaInsets();

  return (
    <ThemedView className="flex-1">
      <View
        style={{
          flex: 1,
          paddingHorizontal: 16,
          paddingTop: insets.top,
          paddingBottom: withBottomTabs ? 0 : isAndroid ? 12 + insets.bottom : insets.bottom,
        }}
      >
        <ThemedView className="flex-1 bg-transparent">{children}</ThemedView>
      </View>
    </ThemedView>
  );
}
