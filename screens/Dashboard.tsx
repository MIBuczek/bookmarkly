import React, { useEffect, useMemo, useState } from 'react';
import { ThemedText } from '@/components/ui/ThemedText';
import { ThemedView } from '@/components/ui/ThemedView';
import { FlatList, LayoutAnimation, Platform, TouchableOpacity, UIManager, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Button } from '@/components/button/Button';
import { Input } from '@/components/ui/Input';
import { baseColors } from '@assets/theme/base-theme';
import { twMerge } from 'tailwind-merge';
import { useAppSelector } from '@/store';
import LinkItem from '@/components/LinkItem';
import { ActionButton } from '@/components/button/ActionButton';
import { Link } from '@/store/link';
import { NewLinkForm } from '@/components/bottom-sheet/NewLinkForm';
import { useTranslation } from 'react-i18next';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

type DashboardBaseFilters = 'unread' | 'read' | 'all';

export default function DashboardScreen() {
  const { t } = useTranslation();

  const [selectedFilterLinks, setSelectedFilterLinks] = useState<DashboardBaseFilters>('all');
  const [showAddLink, setShowAddLink] = useState<boolean>(false);
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [searchPhase, setSearchPhase] = useState<string>('');

  const { links } = useAppSelector(({ links }) => links);

  const handleFilterLinks = (filterOption: DashboardBaseFilters) => {
    const _setFilterOption: DashboardBaseFilters = selectedFilterLinks === filterOption ? 'all' : filterOption;
    setSelectedFilterLinks(_setFilterOption);
  };

  const toggleAddLink = () => setShowAddLink(!showAddLink);

  const filteredLinks = useMemo(() => {
    let _filteredLinks = links;

    if (selectedFilterLinks !== 'all') {
      _filteredLinks = links.filter((link: Link) => {
        if (selectedFilterLinks === 'read') {
          return link.read;
        }

        if (selectedFilterLinks === 'unread') {
          return !link.read;
        }

        return true;
      });
    }

    if (searchPhase) {
      _filteredLinks = _filteredLinks.filter((link: Link) => {
        const titleMatch = link.title.toLowerCase().includes(searchPhase.toLowerCase());
        const tagsMatch = link.tags.some((tag) => tag.toLowerCase().includes(searchPhase.toLowerCase()));
        return titleMatch || tagsMatch;
      });
    }

    return _filteredLinks;
  }, [links, selectedFilterLinks, searchPhase]);

  useEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }, [filteredLinks]);

  return (
    <ThemedView withIOSPaddingBottom withIOSPaddingTop className="flex-1 px-6">
      <View className="relative flex w-full items-center justify-center gap-4 py-6">
        <ThemedText type={'title'} className={'text-lg'}>
          {t('dashboard')}
        </ThemedText>
        <TouchableOpacity className={'absolute right-2 top-6 size-10'} onPress={() => setShowSearch(!showSearch)}>
          <AntDesign name="search1" size={20} color={baseColors.colors.primary['500']} />
        </TouchableOpacity>
        {showSearch && (
          <View className={'h-12 w-full'}>
            <Input placeholder={'Search'} value={searchPhase} onChangeText={(text: string) => setSearchPhase(text)} />
          </View>
        )}
      </View>
      <View className={'flex h-12 w-full flex-row items-center rounded-full bg-gray-500 p-4 dark:bg-gray-800'}>
        <TouchableOpacity
          className={twMerge(
            `h-8 w-1/2 rounded-l-3xl ${selectedFilterLinks === 'unread' ? 'bg-primary-500' : 'bg-transparent'}`,
          )}
          onPress={() => handleFilterLinks('unread')}
        >
          <ThemedText
            type={'subtitle'}
            className={twMerge(
              `m-auto text-sm ${selectedFilterLinks === 'unread' ? 'dark:text-dark:100 text-gray-100' : 'text-dark-700'}`,
            )}
          >
            {t('unread')}
          </ThemedText>
        </TouchableOpacity>
        <View className={'h-6 w-0.5 bg-gray-200 dark:bg-gray-500'} />
        <TouchableOpacity
          className={twMerge(
            `h-8 w-1/2 rounded-r-3xl ${selectedFilterLinks === 'read' ? 'bg-primary-500' : 'bg-transparent'}`,
          )}
          onPress={() => handleFilterLinks('read')}
        >
          <ThemedText
            type={'subtitle'}
            className={twMerge(
              `m-auto text-sm ${selectedFilterLinks === 'read' ? 'dark:text-dark:100 text-gray-100' : 'text-dark-700'}`,
            )}
          >
            {t('read')}
          </ThemedText>
        </TouchableOpacity>
      </View>
      <View className={'flex-1 gap-4 py-2'}>
        {!!filteredLinks.length && (
          <>
            <FlatList
              data={filteredLinks}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => <LinkItem link={item} />}
              keyExtractor={(item) => item.id}
            />
            <ActionButton title={t('add_link')} buttonClassName={'px-2 py-3'} onPress={toggleAddLink} />
          </>
        )}
        {!filteredLinks.length && (
          <View className={'item-center flex-1 justify-center gap-4 px-4'}>
            <View className={'mb-4 flex w-full items-center px-4'}>
              <ThemedText type={'title'} className={'text-lg'}>
                {t('nothing_here')}
              </ThemedText>
              <ThemedText>{t('saved_links')}</ThemedText>
            </View>
          </View>
        )}
        {!links.length && (
          <View className={'item-center flex-1 justify-center gap-4 px-4'}>
            <View className={'mb-4 flex w-full items-center px-4'}>
              <ThemedText type={'title'} className={'text-lg'}>
                {t('nothing_here')}
              </ThemedText>
              <ThemedText>{t('saved_links')}</ThemedText>
            </View>
            <Button
              buttonClassName={'w-28 px-2 rounded-2xl mx-auto'}
              type={'primary'}
              title={t('add_link')}
              onPress={toggleAddLink}
            />
          </View>
        )}
      </View>
      <NewLinkForm visible={showAddLink} onRequestClose={toggleAddLink} />
    </ThemedView>
  );
}
