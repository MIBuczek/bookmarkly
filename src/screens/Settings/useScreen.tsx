import React, { useCallback, useMemo, useState } from 'react';
import {
  SETTING_CONTENT_OPTIONS,
  SETTINGS_CONTENT_SIZE,
  TSettingsContent,
  TSettingsContentSize,
  TSettingsOptions,
} from '@/utils/setting.const';
import { storeActions, useAppDispatch } from '@/store';
import { Appearance, Language, Notification, Storage } from '@/components/bottom-sheet/SettingsBottomSheet';
import { router } from 'expo-router';
import { APP_ROUTES } from '@/utils/routes';

export default function useScreen() {
  const [logOutModalVisible, setLogoutModalVisible] = useState<boolean>(false);
  const [settingOption, setSettingOption] = useState<TSettingsOptions>('none');
  const [showBottomSheet, setShowBottomSheet] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const settingsButtons: TSettingsOptions[] = useMemo(() => SETTING_CONTENT_OPTIONS, []);

  const handleCloseSettingOption = () => {
    setSettingOption('none');
    setShowBottomSheet(false);
  };

  const settingsContent = useMemo(
    (): TSettingsContent => ({
      notification: <Notification handleClose={handleCloseSettingOption} />,
      appearance: <Appearance handleClose={handleCloseSettingOption} />,
      language: <Language handleClose={handleCloseSettingOption} />,
      storage: <Storage handleClose={handleCloseSettingOption} />,
      none: null,
    }),
    [],
  );

  const settingContentSize = useMemo((): TSettingsContentSize => SETTINGS_CONTENT_SIZE, []);

  const logOut = useCallback(() => {
    router.navigate(APP_ROUTES.SIGN_IN);
    dispatch(storeActions.user.logout());
    setLogoutModalVisible(false);
  }, [router, dispatch]);

  return {
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
  };
}
