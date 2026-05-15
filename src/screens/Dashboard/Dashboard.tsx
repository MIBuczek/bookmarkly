import React, { useEffect } from 'react';
import { ThemedText } from '@/components/ui/ThemedText';
import { FlatList, LayoutAnimation, Platform, TouchableOpacity, UIManager, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Button } from '@/components/button/Button';
import { Input } from '@/components/ui/Input';
import { baseColors } from '@/assets/theme/base-theme';
import { twMerge } from 'tailwind-merge';
import LinkItem from '@/components/LinkItem';
import { ActionButton } from '@/components/button/ActionButton';
import { NewLinkForm } from '@/components/forms/NewLinkForm';
import { useTranslation } from 'react-i18next';
import { ScreenContainer } from '@/components/ui/ScreenContainer';
import { useLoadLinks } from '@/hooks/useLoadLinks';
import useScreen from '@/screens/Dashboard/useScreen';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

export default function DashboardScreen() {
  const { t } = useTranslation();

  const { loadLinks } = useLoadLinks();

  const {
    links,
    filteredLinks,
    selectedFilterLinks,
    handleFilterLinks,
    toggleAddLink,
    showAddLink,
    showSearch,
    setShowSearch,
    searchPhase,
    setSearchPhase,
  } = useScreen();

  useEffect(() => {
    void loadLinks();
  }, []);

  useEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }, [filteredLinks]);

  return (
    <ScreenContainer withBottomTabs>
      <View className="relative flex w-full items-center justify-center gap-4 py-6">
        <ThemedText type={'title'} size={'lg'}>
          {t('dashboard')}
        </ThemedText>
        <TouchableOpacity className={'absolute top-6 right-2 size-10'} onPress={() => setShowSearch(!showSearch)}>
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
            size={'sm'}
            className={twMerge(
              `m-auto ${selectedFilterLinks === 'unread' ? 'dark:text-dark:100 text-gray-100' : 'text-dark-700'}`,
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
            size={'sm'}
            className={twMerge(
              `m-auto ${selectedFilterLinks === 'read' ? 'dark:text-dark:100 text-gray-100' : 'text-dark-700'}`,
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
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => {
                return <LinkItem link={item} />;
              }}
              ListEmptyComponent={
                <View className={'flex py-40'}>
                  <View className={'mb-4 flex w-full items-center px-4'}>
                    <ThemedText type={'title'} size={'lg'}>
                      {t('nothing_here')}
                    </ThemedText>
                    <ThemedText size={'md'}>{t('saved_links')}</ThemedText>
                  </View>
                </View>
              }
            />
            <ActionButton
              title={t('add_link')}
              buttonClassName={'py-2'}
              containerClassName={'mb-0'}
              onPress={toggleAddLink}
            />
          </>
        ) : (
          <View className={'item-center mb-4 flex-1 justify-center gap-4 px-4'}>
            <View className={'mb-4 flex w-full items-center px-4'}>
              <ThemedText type={'title'} size={'lg'}>
                {t('nothing_here')}
              </ThemedText>
              <ThemedText size={'sm'}>{t('saved_links')}</ThemedText>
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
