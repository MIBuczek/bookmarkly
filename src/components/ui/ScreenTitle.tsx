import React from 'react';
import { View } from 'react-native';
import { ThemedText } from './ThemedText';

export type ScreenTitleProps = {
  title: string;
  description?: string;
};

export function ScreenTitle({ title, description }: ScreenTitleProps) {
  return (
    <View className="mt-4 flex gap-4 border-b-2 border-black my-4 py-2">
      <ThemedText type="title" size="2xl" className={'uppercase'}>
        {title}
      </ThemedText>
      {description ? <ThemedText size="md">{description}</ThemedText> : null}
    </View>
  );
}
