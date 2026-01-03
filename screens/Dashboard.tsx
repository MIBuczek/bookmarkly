import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ThemedText } from '@/components/ui/ThemedText';
import { FlatList, LayoutAnimation, Platform, TouchableOpacity, UIManager, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Button } from '@/components/button/Button';
import { Input } from '@/components/ui/Input';
import { baseColors } from '@assets/theme/base-theme';
import { twMerge } from 'tailwind-merge';
import { storeActions, useAppDispatch, useAppSelector } from '@/store';
import LinkItem from '@/components/LinkItem';
import { ActionButton } from '@/components/button/ActionButton';
import { NewLinkForm } from '@/components/bottom-sheet/NewLinkForm';
import { useTranslation } from 'react-i18next';
import { TLink } from '@/types/links.type';
import linkServices from '@/services/link.services';
import { ScreenContainer } from '@/components/ui/ScreenContainer';
import { useToast } from 'react-native-toast-notifications';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

type DashboardBaseFilters = 'unread' | 'read' | 'all';

export default function DashboardScreen() {
  const { t } = useTranslation();
  const toast = useToast();

  const dispatch = useAppDispatch();
  const { links } = useAppSelector(({ links }) => links);

  const [selectedFilterLinks, setSelectedFilterLinks] = useState<DashboardBaseFilters>('all');
  const [showAddLink, setShowAddLink] = useState<boolean>(false);
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [searchPhase, setSearchPhase] = useState<string>('');

  const handleFilterLinks = (filterOption: DashboardBaseFilters) => {
    const _setFilterOption: DashboardBaseFilters = selectedFilterLinks === filterOption ? 'all' : filterOption;
    setSelectedFilterLinks(_setFilterOption);
  };

  const toggleAddLink = () => setShowAddLink(!showAddLink);

  const filteredLinks = useMemo(() => {
    let _filteredLinks = links;

    if (selectedFilterLinks !== 'all') {
      _filteredLinks = links.filter((link: TLink) => {
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
      _filteredLinks = _filteredLinks.filter((link: TLink) => {
        const titleMatch = link.title.toLowerCase().includes(searchPhase.toLowerCase());
        const tagsMatch = link.tags.some((tag) => tag.toLowerCase().includes(searchPhase.toLowerCase()));
        return titleMatch || tagsMatch;
      });
    }

    return _filteredLinks;
  }, [links, selectedFilterLinks, searchPhase]);

  const fetchLinks = useCallback(async () => {
    try {
      let { links, count } = await linkServices.getAllLink();
      dispatch(storeActions.links.setLinks({ links, count }));
    } catch (error) {
      console.error('[fetchLinks]:', error);
      toast.show('[Error] : Could not load your links', { type: 'error' });
    }
  }, [dispatch, toast]);

  useEffect(() => {
    // void fetchLinks();
  }, []);

  useEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }, [filteredLinks]);

  return (
    <ScreenContainer withBottomTabs>
      <View className="relative flex w-full items-center justify-center gap-4 py-6">
        <ThemedText type={'title'} className={'text-lg'}>
          {t('dashboard')}
        </ThemedText>
        <TouchableOpacity className={'absolute right-2 top-6 size-10'} onPress={() => setShowSearch(!showSearch)}>
          <AntDesign name="search" size={20} color={baseColors.colors.primary['500']} />
        </TouchableOpacity>
        {showSearch && (
          <View className={'h-12 w-full'}>
            <Input placeholder={'Search'} value={searchPhase} onChangeText={(text: string) => setSearchPhase(text)} />
          </View>
        )}
      </View>
      <View className={'flex h-12 w-full flex-row items-center rounded-lg bg-gray-500 p-4 dark:bg-gray-800'}>
        <TouchableOpacity
          className={twMerge(
            `h-8 w-1/2 rounded-l-lg ${selectedFilterLinks === 'unread' ? 'bg-primary-500' : 'bg-transparent'}`,
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
            `h-8 w-1/2 rounded-r-lg ${selectedFilterLinks === 'read' ? 'bg-primary-500' : 'bg-transparent'}`,
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
      <View className={'flex-1 gap-4 pt-2'}>
        {!!links.length ? (
          <>
            <FlatList
              data={filteredLinks}
              renderItem={({ item }) => {
                return <LinkItem link={item} />;
              }}
              keyExtractor={(item) => item.id}
              ListEmptyComponent={
                <View className={'flex py-40'}>
                  <View className={'mb-4 flex w-full items-center px-4'}>
                    <ThemedText type={'title'} className={'text-lg'}>
                      {t('nothing_here')}
                    </ThemedText>
                    <ThemedText>{t('saved_links')}</ThemedText>
                  </View>
                </View>
              }
            />
            <ActionButton
              title={t('add_link')}
              buttonClassName={'px-2 py-3'}
              containerClassName={'mb-0'}
              onPress={toggleAddLink}
            />
          </>
        ) : (
          <View className={'item-center mb-4 flex-1 justify-center gap-4 px-4'}>
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
    </ScreenContainer>
  );
}
