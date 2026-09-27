import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { twMerge } from 'tailwind-merge';
import { useTranslation } from 'react-i18next';
import { ThemedText } from '@/components/ui/ThemedText';
import { DashboardBaseFilters } from '@/screens/Library/useScreen';

interface LinkFilterProps {
  selectedFilter: DashboardBaseFilters;
  onFilterChange: (filter: DashboardBaseFilters) => void;
}

export const LinkFilter: React.FC<LinkFilterProps> = ({ selectedFilter, onFilterChange }) => {
  const { t } = useTranslation();

  return (
    <View className={'flex h-12 w-full flex-row items-center rounded-bl-md rounded-br-md border-2 border-black'}>
      <TouchableOpacity
        className={twMerge(`h-full w-1/2 ${selectedFilter === 'unread' ? 'bg-dark-800' : 'bg-transparent'}`)}
        onPress={() => onFilterChange('unread')}
      >
        <ThemedText
          type={'subtitle'}
          size={'md'}
          className={twMerge(
            `m-auto ${selectedFilter === 'unread' ? 'dark:text-dark:100 text-gray-100' : 'text-dark-700'}`,
          )}
        >
          {t('unread')}
        </ThemedText>
      </TouchableOpacity>
      <View className={'h-6 w-0.5 bg-dark-800 dark:bg-dark-500'} />
      <TouchableOpacity
        className={twMerge(`h-full w-1/2 ${selectedFilter === 'read' ? 'bg-dark-800' : 'bg-transparent'}`)}
        onPress={() => onFilterChange('read')}
      >
        <ThemedText
          type={'subtitle'}
          size={'md'}
          className={twMerge(
            `m-auto ${selectedFilter === 'read' ? 'dark:text-dark:100 text-gray-100' : 'text-dark-700'}`,
          )}
        >
          {t('read')}
        </ThemedText>
      </TouchableOpacity>
    </View>
  );
};
