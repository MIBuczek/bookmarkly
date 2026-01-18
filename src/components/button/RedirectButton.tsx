import { ExternalLink } from '@/components/ui/ExternalLink';
import { View } from 'react-native';
import { ThemedText } from '@/components/ui/ThemedText';
import { Feather } from '@expo/vector-icons';
import React from 'react';

export default function RedirectButton({ url, title }: Readonly<{ url: string; title: string }>) {
  return (
    <ExternalLink href={url}>
      <View className={'w-full flex-row items-center justify-center gap-3 px-4 py-6'}>
        <ThemedText type={'subtitle'} className={'pt-1 text-blue-600 uppercase'} size={'sm'}>
          {title}
        </ThemedText>
        <View className={'flex items-center justify-center'}>
          <Feather name="external-link" size={16} color={'#2563eb'} />
        </View>
      </View>
    </ExternalLink>
  );
}
