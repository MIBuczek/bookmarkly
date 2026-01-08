import { Link, Stack } from 'expo-router';
import { ThemedText } from '@/components/ui/ThemedText';
import { ThemedView } from '@/components/ui/ThemedView';
import React from 'react';
import { useTranslation } from 'react-i18next';

export default function NotFoundScreen() {
  const { t } = useTranslation();

  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <ThemedView className={'flex-1 items-center justify-center p-5'}>
        <ThemedText type="title" size={'2xl'}>{t('not_found')}</ThemedText>
        <Link href="/" className={'mt-4 px-4'}>
          <ThemedText type="link" size={'sm'}>{t('go_to_home')}</ThemedText>
        </Link>
      </ThemedView>
    </>
  );
}
