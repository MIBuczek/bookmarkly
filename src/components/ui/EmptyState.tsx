import React from 'react';
import { View } from 'react-native';
import { ThemedText } from '@/components/ui/ThemedText';
import { Button } from '@/components/button/Button';
import { twMerge } from 'tailwind-merge';

interface EmptyStateProps {
  title: string;
  description: string;
  buttonTitle?: string;
  onPress?: () => void;
  className?: string;
}

export const EmptyState = ({ title, description, buttonTitle, onPress, className }: EmptyStateProps) => {
  return (
    <View className={twMerge('mb-4 flex-1 items-center justify-center gap-4 px-4', className)}>
      <View className={'mb-4 flex w-full items-center gap-2 px-4'}>
        <ThemedText type={'title'} size={'lg'}>
          {title}
        </ThemedText>
        <ThemedText size={'md'} className={'px-4 text-center'}>
          {description}
        </ThemedText>
      </View>
      {buttonTitle && onPress && <Button type={'secondary'} title={buttonTitle} onPress={onPress} />}
    </View>
  );
};
