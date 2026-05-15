import React, { PropsWithChildren } from 'react';
import { ThemedView } from '@/components/ui/ThemedView';
import { View } from 'react-native';

type ScreenContainerProps = {
  withBottomTabs?: boolean;
} & PropsWithChildren;

export function ScreenContainer({ withBottomTabs = false, children }: ScreenContainerProps) {

  return (
    <ThemedView className="flex-1 items-center">
      <View
        className="w-full max-w-[640px] flex-1 my-4"
        style={{
          marginHorizontal: 'auto',
        }}
      >
        {children}
      </View>
    </ThemedView>
  );
}