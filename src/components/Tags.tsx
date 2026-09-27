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
          size={'xs'}
          className={'rounded-md bg-dark-500 px-3 py-1 uppercase text-white dark:bg-dark-100 dark:text-dark-900'}
        >
          {tag}
        </ThemedText>
      </Pressable>
    ))}
  </View>
);
