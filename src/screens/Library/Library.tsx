import React, { useEffect } from 'react';
import { EmptyState } from '@/components/ui/EmptyState';
import { FlatList, LayoutAnimation, Platform, UIManager, View } from 'react-native';
import { Button } from '@/components/button/Button';
import LinkItem from '@/components/LinkItem';
import { useTranslation } from 'react-i18next';
import { LinkFilter } from '@/components/LinkFilter';
import { ScreenContainer } from '@/components/ui/ScreenContainer';
import { useLoadLinks } from '@/hooks/useLoadLinks';
import useScreen from '@/screens/Library/useScreen';
import { BottomViewButton } from '@/components/ui/BottomViewButton';
import { ScreenTitle } from '@/components/ui/ScreenTitle';
import { router } from 'expo-router';
import { ArrowBackButton } from '@/components/button/ArrowBackButton';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

export default function DashboardScreen() {
  const { t } = useTranslation();

  const { loadLinks } = useLoadLinks();

  const { links, filteredLinks, selectedFilterLinks, handleFilterLinks, toggleAddLink } = useScreen();

  useEffect(() => {
    void loadLinks();
  }, [loadLinks]);

  useEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }, [filteredLinks]);

  return (
    <ScreenContainer>
      <ArrowBackButton
        onPress={() => {
          router.back();
        }}
      />
      <View className="flex-1 gap-2">
        <ScreenTitle title={'Library'} />
        <LinkFilter selectedFilter={selectedFilterLinks} onFilterChange={handleFilterLinks} />
        <View className={'flex-1 gap-4 pt-2'}>
          {links.length > 0 ? (
            <>
              <FlatList
                data={filteredLinks}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => {
                  return <LinkItem link={item} />;
                }}
                ListEmptyComponent={
                  <EmptyState title={t('nothing_here')} description={t('saved_links')} className={'py-40'} />
                }
              />
              <BottomViewButton>
                <Button
                  buttonClassName={'px-20 py-6'}
                  type={'secondary'}
                  title={t('add_link').toUpperCase()}
                  onPress={toggleAddLink}
                />
              </BottomViewButton>
            </>
          ) : (
            <EmptyState
              title={t('nothing_here')}
              description={t('saved_links')}
              buttonTitle={t('add_link')}
              onPress={toggleAddLink}
            />
          )}
        </View>
      </View>
    </ScreenContainer>
  );
}
