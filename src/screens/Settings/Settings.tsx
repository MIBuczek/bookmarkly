import { ThemedText } from '@/components/ui/ThemedText';
import { ScreenContainer } from '@/components/ui/ScreenContainer';
import React, { useEffect } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Button } from '@/components/button/Button';
import { BottomSheet } from '@/components/bottom-sheet/BottomSheet';
import { ModalBackDrop } from '@/components/modal/ModalBackDrop';
import { useAppSelector } from '@/store';
import { FontAwesome } from '@expo/vector-icons';
import { AvatarSvg } from '@/components/svg/AvatarIcon';
import { AVATARS_OPTIONS } from '@/constants/avatars';
import { useTranslation } from 'react-i18next';
import { ActionButton } from '@/components/button/ActionButton';
import useScreen from '@/screens/Settings/useScreen';

export default function SettingScreen() {
  const { t } = useTranslation();

  const { user } = useAppSelector(({ user }) => user);

  const {
    avatar,
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
    <ScreenContainer withBottomTabs>
      <View className="flex h-[30%] w-full items-center justify-start gap-4">
        <ThemedText type={'title'} className={'pb-6'} size={'lg'}>
          {t('settings')}
        </ThemedText>
        <View className="border-primary-500 relative size-28 rounded-3xl border">
          <AvatarSvg options={avatar || AVATARS_OPTIONS[0]} size={100} />
          <TouchableOpacity
            className="bg-primary-500 absolute right-[50%] -bottom-4 z-10 flex size-8 translate-x-1/2 items-center justify-center rounded-full"
            onPress={() => {
              setSettingOption('avatar');
              setShowBottomSheet(true);
            }}
          >
            <FontAwesome name="pencil" size={16} color={'white'} />
          </TouchableOpacity>
        </View>
        <View className="flex items-center">
          <ThemedText type="title" size="md">
            {user?.name}
          </ThemedText>
          <ThemedText size={'sm'}>{user?.email}</ThemedText>
        </View>
      </View>
      <View className={'mt-10 flex-1 justify-start'}>
        <View className="flex w-full">
          {settingsButtons.map((option, index) => (
            <TouchableOpacity
              key={`${option}_${index}`}
              className={'border-t-dark-200 flex-row items-center justify-between gap-1 border-t px-4 py-6'}
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
        <View className={'mt-auto w-full'}>
          <ActionButton
            title={t('logout')}
            buttonClassName={'p-2'}
            containerClassName={'mb-0'}
            onPress={() => {
              setLogoutModalVisible(true);
            }}
          />
        </View>
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
        <View className={'flex items-center justify-center gap-2 px-4'}>
          <ThemedText type="title" size={'lg'}>
            {t('logout')}
          </ThemedText>
          <ThemedText size={'sm'}>{t('are_you_sure_you_want_to_log_out')}</ThemedText>
          <View className={'mt-4 flex-row items-center justify-center gap-2'}>
            <Button
              buttonClassName={'flex-1 py-2'}
              type={'secondary'}
              title={t('cancel')}
              onPress={() => {
                setLogoutModalVisible(false);
              }}
            />
            <Button buttonClassName={'flex-1 py-2'} type={'primary'} title={t('logout')} onPress={logOut} />
          </View>
        </View>
      </ModalBackDrop>
    </ScreenContainer>
  );
}
