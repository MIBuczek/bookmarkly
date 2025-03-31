import { Pressable, View } from 'react-native';
import { ThemedText } from '@/components/ui/ThemedText';
import React from 'react';
import { twMerge } from 'tailwind-merge';

interface TagsProps {
  tags: string[];
  onPressAction?: (_tag: string) => void;
  containerClassName?: string;
}

export const Tags = ({ tags, onPressAction, containerClassName }: Readonly<TagsProps>) => (
  <View className={twMerge('flex-row flex-wrap gap-2 py-4', containerClassName)}>
    {tags.map((tag, index) => (
      <Pressable key={`${tag}_${index}`} onPress={() => onPressAction && onPressAction(tag)}>
        <ThemedText
          type={'subtitle'}
          className={
            'rounded-full bg-primary-200 px-3 py-1 text-xs uppercase text-primary-600 dark:bg-primary-600 dark:text-primary-200'
          }
        >
          {tag}
        </ThemedText>
      </Pressable>
    ))}
  </View>
);
