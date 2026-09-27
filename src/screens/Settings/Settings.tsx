import { ThemedText } from '@/components/ui/ThemedText';
import { ScreenContainer } from '@/components/ui/ScreenContainer';
import React, { useEffect } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { BottomSheet } from '@/components/bottom-sheet/BottomSheet';
import { ModalBackDrop } from '@/components/modal/ModalBackDrop';
import { LogoutModal } from '@/components/modal/LogoutModal';
import { useAppSelector } from '@/store';
import { useTranslation } from 'react-i18next';
import useScreen from '@/screens/Settings/useScreen';
import { BottomViewButton } from '@/components/ui/BottomViewButton';
import { Button } from '@/components/button/Button';
import { ScreenTitle } from '@/components/ui/ScreenTitle';
import { ArrowBackButton } from '@/components/button/ArrowBackButton';
import { router } from 'expo-router';

export default function SettingScreen() {
  const { t } = useTranslation();

  const { user } = useAppSelector(({ user }) => user);

  const {
    setSettingOption,
    setShowBottomSheet,
    setLogoutModalVisible,
    logOutModalVisible,
    logOut,
    settingOption,
    showBottomSheet,
    settingsButtons,
    settingsContent,
    settingContentSize,
    initialAvatarState,
  } = useScreen();

  useEffect(initialAvatarState, []);

  return (
    <ScreenContainer>
      <ArrowBackButton onPress={() => {
        router.back();
      }} />
      <ScreenTitle title={t('settings')} />
      <View className="flex h-[30%] w-full items-center justify-center gap-4">
        <View className="flex h-28  items-center justify-center rounded-md border-2 px-4">
          <ThemedText size={'5xl'} type={'title'} className={'font-bold uppercase'}>
            {'Michal'}
          </ThemedText>
        </View>
        <View className="flex items-center">
          <ThemedText size={'sm'}>{user?.email}</ThemedText>
        </View>
      </View>
      <View className={'mt-10 flex-1 justify-start'}>
        <View className="flex w-full">
          {settingsButtons.map((option, index) => (
            <TouchableOpacity
              key={`${option}_${index}`}
              className={'flex-row items-center justify-between gap-1 border-t border-t-dark-200 px-4 py-6'}
              onPress={() => {
                setSettingOption(option);
                setShowBottomSheet(true);
              }}
            >
              <ThemedText className={'px-1 capitalize'} size={'sm'}>
                {option}
              </ThemedText>
              <IconSymbol name={'chevron.right'} color={'gray'} size={16} />
            </TouchableOpacity>
          ))}
        </View>
        <BottomViewButton>
          <Button
            type={'primary'}
            title={t('logout')}
            onPress={() => {
              setLogoutModalVisible(true);
            }}
          />
        </BottomViewButton>
      </View>
      <BottomSheet
        visible={showBottomSheet}
        onRequestClose={() => {
          setSettingOption('none');
          setShowBottomSheet(false);
        }}
        title={settingOption}
        height={settingContentSize[settingOption]}
      >
        {settingsContent[settingOption]}
      </BottomSheet>
      <ModalBackDrop
        visible={logOutModalVisible}
        onRequestClose={() => {
          setLogoutModalVisible(false);
        }}
      >
        <LogoutModal handleLogout={logOut} handleCancel={() => setLogoutModalVisible(false)} />
      </ModalBackDrop>
    </ScreenContainer>
  );
}
