import React, { useCallback, useMemo, useState } from 'react';
import {
  SETTING_CONTENT_OPTIONS,
  SETTINGS_CONTENT_SIZE,
  TSettingsContent,
  TSettingsContentSize,
  TSettingsOptions,
} from '@/utils/setting.const';
import { Options } from '@dicebear/core';
import { storeActions, useAppDispatch, useAppSelector } from '@/store';
import { AVATARS_OPTIONS } from '@/constants/avatars';
import { Appearance, Avatars, Language, Notification, Storage } from '@/components/bottom-sheet/SettingsBottomSheet';
import { router } from 'expo-router';
import { APP_ROUTES } from '@/utils/routes';

export default function useScreen() {
  const [logOutModalVisible, setLogoutModalVisible] = useState<boolean>(false);
  const [settingOption, setSettingOption] = useState<TSettingsOptions>('none');
  const [showBottomSheet, setShowBottomSheet] = useState<boolean>(false);
  const [avatar, setAvatar] = useState<Options | null>(null);

  const dispatch = useAppDispatch();
  const { user } = useAppSelector(({ user }) => user);

  const settingsButtons: TSettingsOptions[] = useMemo(() => SETTING_CONTENT_OPTIONS, []);

  const initialAvatarState = () => {
    const _avatar =
      AVATARS_OPTIONS.find((av) => {
        return av.seed === user?.settings.avatar;
      }) || AVATARS_OPTIONS[0];
    if (_avatar) setAvatar(_avatar);
  };

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

  const logOut = useCallback(() => {
    router.navigate(APP_ROUTES.SIGN_IN);
    dispatch(storeActions.user.logout());
    setLogoutModalVisible(false);
  }, [router, dispatch]);

  return {
    avatar,
    setSettingOption,
    setShowBottomSheet,
    logOutModalVisible,
    setLogoutModalVisible,
    logOut,
    settingOption,
    showBottomSheet,
    settingsButtons,
    settingsContent,
    settingContentSize,
    initialAvatarState,
  };
}
