import { ThemedText } from '@/components/ui/ThemedText';
import { ThemedView } from '@/components/ui/ThemedView';
import React, { useEffect, useMemo, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Button } from '@/components/button/Button';
import { BottomSheet } from '@/components/bottom-sheet/BottomSheet';
import { ModalBackDrop } from '@/components/modal/ModalBackDrop';
import {
  SETTING_CONTENT_OPTIONS,
  SETTINGS_CONTENT_SIZE,
  TSettingsContent,
  TSettingsContentSize,
  TSettingsOptions,
} from '@/utils/setting.const';
import { storeActions, useAppDispatch, useAppSelector } from '@/store';
import { FontAwesome } from '@expo/vector-icons';
import { AvatarSvg } from '@/components/svg/AvatarIcon';
import { Appearance, Avatars, Language, Notification, Storage } from '@/components/bottom-sheet/SettingsBottomSheet';
import { AVATARS_OPTIONS } from '@/constants/avatars';
import { Options } from '@dicebear/core';
import { LOCAL_STORAGE_KEY, localAppStorage } from '@/providers/local-app-storage';
import { useTranslation } from 'react-i18next';
import { router } from 'expo-router';

export default function SettingScreen() {
  const { t } = useTranslation();

  const [logOutModalVisible, setLogoutModalVisible] = useState<boolean>(false);
  const [settingOption, setSettingOption] = useState<TSettingsOptions>('none');
  const [showBottomSheet, setShowBottomSheet] = useState<boolean>(false);
  const [avatar, setAvatar] = useState<Options | null>(null);

  const dispatch = useAppDispatch();
  const { user } = useAppSelector(({ user }) => user);

  const settingsButtons: TSettingsOptions[] = useMemo(() => SETTING_CONTENT_OPTIONS, []);

  const initialAvatarState = () => {
    const _avatar = localAppStorage.getLocalData<Options>(LOCAL_STORAGE_KEY.AVATAR);
    if (_avatar) setAvatar(_avatar);
  };

  useEffect(initialAvatarState, []);

  const updateAvatar = (_avatar: Options) => {
    setAvatar(_avatar);
  };

  const handleCloseSettingOption = () => {
    setSettingOption('none');
    setShowBottomSheet(false);
  };

  const settingsContent = useMemo(
    (): TSettingsContent => ({
      avatar: <Avatars avatar={avatar} updateAvatar={updateAvatar} handleClose={handleCloseSettingOption} />,
      notification: <Notification handleClose={handleCloseSettingOption} />,
      appearance: <Appearance handleClose={handleCloseSettingOption} />,
      language: <Language handleClose={handleCloseSettingOption} />,
      storage: <Storage handleClose={handleCloseSettingOption} />,
      none: null,
    }),
    [avatar],
  );

  const settingContentSize = useMemo((): TSettingsContentSize => SETTINGS_CONTENT_SIZE, []);

  return (
    <ThemedView withIOSPaddingBottom withIOSPaddingTop className="flex-1 gap-8 px-6">
      <View className="flex h-[30%] w-full items-center justify-start gap-4">
        <ThemedText type={'title'} className={'pb-6 text-lg'}>
          {t('settings')}
        </ThemedText>
        <View className="relative size-28 rounded-3xl border border-primary-500">
          <AvatarSvg options={avatar || AVATARS_OPTIONS[0]} size={100} />
          <TouchableOpacity
            className="absolute -bottom-4 right-[50%] z-10 flex size-8 translate-x-1/2 items-center justify-center rounded-full bg-primary-500"
            onPress={() => {
              setSettingOption('avatar');
              setShowBottomSheet(true);
            }}
          >
            <FontAwesome name="pencil" size={16} color={'white'} />
          </TouchableOpacity>
        </View>
        <View className="flex items-center">
          <ThemedText type="title" className="text-base">
            {user?.name}
          </ThemedText>
          <ThemedText>{user?.email}</ThemedText>
        </View>
      </View>
      <View className={'flex-1 justify-start'}>
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
              <ThemedText className={'px-1 text-sm capitalize'}>{option}</ThemedText>
              <IconSymbol name={'chevron.right'} color={'gray'} size={16} />
            </TouchableOpacity>
          ))}
        </View>
        <View className={'mt-auto w-full'}>
          <Button
            type={'tertiary'}
            title={t('logout')}
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
          <ThemedText type="title" className={'text-lg'}>
            {t('logout')}
          </ThemedText>
          <ThemedText>{t('are_you_sure_you_want_to_log_out')}</ThemedText>
          <View className={'mt-4 flex-row items-center justify-center gap-2'}>
            <Button
              buttonClassName={'flex-1 py-2'}
              type={'secondary'}
              title={t('cancel')}
              onPress={() => {
                setLogoutModalVisible(false);
              }}
            />
            <Button
              buttonClassName={'flex-1 py-2'}
              type={'primary'}
              title={t('logout')}
              onPress={() => {
                router.navigate('/(login)');
                dispatch(storeActions.user.logout());
                setLogoutModalVisible(false);
              }}
            />
          </View>
        </View>
      </ModalBackDrop>
    </ThemedView>
  );
}
