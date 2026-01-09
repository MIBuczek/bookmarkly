import React, { useEffect, useMemo, useState } from 'react';
import { Switch, TouchableOpacity, View } from 'react-native';
import { ThemedText } from '@/components/ui/ThemedText';
import { Colors } from '@/constants/colors';
import { Button } from '@/components/button/Button';
import { useColorScheme as useNativeWindColorScheme } from 'nativewind/dist/stylesheet';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { LAND_OPTIONS } from '@/utils/setting.const';
import { CountryItem } from '@/components/CountryItem';
import { ModalBackDrop } from '@/components/modal/ModalBackDrop';
import { AVATARS_OPTIONS } from '@/constants/avatars';
import { AvatarSvg } from '@/components/svg/AvatarIcon';
import { Options } from '@dicebear/core';
import { twMerge } from 'tailwind-merge';
import { useTranslation } from 'react-i18next';
import * as Localization from 'expo-localization';
import { useUpdateSettings } from '@/hooks/useUpdateSettings';
import { reduxStorage } from '@/store/storage';
import FontButton from '@/components/button/FontButton';
import ThemeButton from '@/components/button/ThemeButton';
import SettingsFooter from '@/components/SettingFooter';

type SettingsProps = Readonly<{ handleClose: () => void }>;

export const Notification = ({ handleClose }: SettingsProps) => {
  const { t } = useTranslation();
  const [notificationPermission, setNotificationPermission] = useState<boolean>(false);

  //TODO integrate with os native permission and api
  const handleNotificationPermission = () => {
    setNotificationPermission(!notificationPermission);
  };

  return (
    <View className={'flex-1 items-center justify-start gap-4 px-8 pt-6'}>
      <ThemedText size={'sm'} className={'w-full'}>{t('notification_preview_text')}</ThemedText>
      <View className={'w-full flex-row items-center justify-between py-2'}>
        <ThemedText size={'md'} type={'subtitle'}>
          {t('allow_push_notification')}
        </ThemedText>
        <Switch
          trackColor={{ false: Colors.light.switchInactive, true: Colors.light.switchActive }}
          thumbColor={notificationPermission ? Colors.light.switchInactive : Colors.light.switchActive}
          ios_backgroundColor="#FFF"
          onValueChange={handleNotificationPermission}
          value={notificationPermission}
        />
      </View>
      <View className="mt-auto w-full">
        <Button type={'tertiary'} title={t('close')} onPress={handleClose} />
      </View>
    </View>
  );
};

export type ThemeType = 'dark' | 'light';

export const Appearance = ({ handleClose }: SettingsProps) => {
  const { t } = useTranslation();

  const { getSelectedSettings, updateSettings } = useUpdateSettings();
  const colorNativeWindScheme = useNativeWindColorScheme();

  const [fontSize, setFontSize] = useState(14);
  const [theme, setTheme] = useState<ThemeType>('light');
  const [hasChanged, setHasChanged] = useState(false);

  const setInitialState = () => {
    const _theme = getSelectedSettings<ThemeType>('appearance');
    setTheme(_theme ?? 'light');
    const _fontSize = getSelectedSettings<number>('fontSize');
    setFontSize(_fontSize ?? 14);
  };

  useEffect(setInitialState, []);

  const handleChange = () => {
    const _theme = getSelectedSettings<ThemeType>('appearance');
    const _fontSize = getSelectedSettings<number>('fontSize');
    setHasChanged(_theme !== theme || _fontSize !== fontSize);
  };

  useEffect(handleChange, [theme, fontSize]);

  return (
    <View className={'flex-1 items-center justify-start gap-4 px-8 pt-6'}>
      <ThemedText size={'sm'} className={'w-full'}>{t('appearance_preview_text')}</ThemedText>
      <View className={'w-full flex-row items-center justify-between py-2'}>
        <ThemedText size={fontSize} type={'subtitle'} className={'text-gray-800'}>
          {t('font_size')}
        </ThemedText>
        <View className="flex-row items-center gap-2">
          <FontButton
            icon={'minus'}
            disabled={fontSize <= 12}
            onPress={() => setFontSize((prev) => --prev)} />
          <FontButton
            icon={'plus'}
            disabled={fontSize >= 18}
            onPress={() => setFontSize((prev) => ++prev)} />
        </View>
      </View>
      <View className={'w-full flex-row items-center justify-between py-2'}>
        <ThemedText size={'md'} type={'subtitle'} className={'text-gray-800'}>
          {t('color_theme')}
        </ThemedText>
        <View className="flex-row items-center gap-2">
          <ThemeButton
            icon={'moon'}
            active={theme === 'dark'}
            onPress={() => setTheme('dark')}
          />
          <ThemeButton
            icon={'sun.max'}
            active={theme === 'light'}
            onPress={() => setTheme('light')}
          />
        </View>
      </View>
      <SettingsFooter
        hasChanged={hasChanged}
        onApply={() => {
          void updateSettings({ appearance: theme, fontSize });
          colorNativeWindScheme.setColorScheme(theme);
          handleClose();
        }}
        onClose={handleClose}
      />
    </View>
  );
};

export const Language = ({ handleClose }: SettingsProps) => {
  const { t, i18n } = useTranslation();
  const { getSelectedSettings, updateSettings } = useUpdateSettings();

  const [hasChanged, setHasChanged] = useState(false);
  const [lang, setLang] = useState<string | null>(Localization.getLocales()[0].languageCode);

  const langList = useMemo(() => LAND_OPTIONS, []);

  const setInitialState = () => {
    const _lang = getSelectedSettings<string>('language');
    if (_lang) setLang(_lang);
    else setLang(Localization.getLocales()[0].languageCode);
  };

  useEffect(setInitialState, []);

  const handleChange = () => {
    const _lang = getSelectedSettings<string>('language');
    setHasChanged(_lang !== lang);
  };

  useEffect(handleChange, [lang]);

  const applyChanges = async () => {
    if (!lang) return;
    try {
      await updateSettings({ language: lang });
      await i18n.changeLanguage(lang);
    } catch (error) {
      console.log('[applyChanges]:', error);
    } finally {
      handleClose();
    }
  };

  return (
    <View className={'flex-1 items-center justify-start gap-4 px-8 pt-6'}>
      <ThemedText size={'sm'} className={'w-full'}>{t('language_preview_text')}</ThemedText>
      <View className={'flex w-full items-start gap-2 py-2'}>
        <ThemedText size={'md'} type={'subtitle'}>
          {t('application_language')}
        </ThemedText>
        <View className="w-full gap-1">
          {langList.map(({ name, isoCode }, index) => (
            <CountryItem
              key={`${name}_${index}`}
              className={`${isoCode === lang ? 'bg-primary-200' : 'bg-transparent'}`}
              countryName={name}
              isoCode={isoCode}
              onPress={() => {
                setLang(isoCode);
              }}
            />
          ))}
        </View>
      </View>
      <SettingsFooter
        hasChanged={hasChanged}
        onApply={() => {
          void applyChanges();
        }}
        onClose={handleClose}
      />
    </View>
  );
};

export const Storage = ({ handleClose }: SettingsProps) => {
  const { t } = useTranslation();
  const [showClearConfirmationModal, setShowClearConfirmationModal] = useState(false);

  const totalSize = useMemo(async () => {
    const _size = await reduxStorage?.getTotalSize();
    return (_size / (1024 * 1024)).toFixed(2);
  }, []);

  return (
    <View className={'flex-1 items-center justify-start gap-4 px-8 pt-6'}>
      <ThemedText size={'sm'} className={'w-full'}>{t('storage_preview_text')}</ThemedText>
      <View className={'w-full flex-row items-center justify-between py-2'}>
        <ThemedText size={'md'} type={'subtitle'}>
          {t('storage_space')} {totalSize} (MB)
        </ThemedText>
        <TouchableOpacity
          className={'rounded-md border border-red-500 p-2'}
          onPress={() => {
            setShowClearConfirmationModal(true);
          }}
        >
          <IconSymbol name={'trash'} color={'red'} size={16} />
        </TouchableOpacity>
      </View>
      <View className="mt-auto w-full">
        <Button type={'tertiary'} title={'Close'} onPress={handleClose} />
      </View>
      <ModalBackDrop
        visible={showClearConfirmationModal}
        onRequestClose={() => {
          setShowClearConfirmationModal(false);
        }}
      >
        <View className={'flex items-center justify-center gap-2 px-4'}>
          <ThemedText size={'lg'} type="title" className={'text-red-500'}>
            {t('clear_local_storage')}
          </ThemedText>
          <ThemedText size={'sm'}>{t('clear_local_storage_confirmation_msg')}</ThemedText>
          <View className={'mt-4 flex-row items-center justify-center gap-2'}>
            <Button
              buttonClassName={'flex-1 py-2'}
              type={'tertiary'}
              title={t('cancel')}
              onPress={() => {
                setShowClearConfirmationModal(false);
              }}
            />
            <Button
              buttonClassName={'flex-1 py-2 bg-red-500 border-red-500'}
              type={'primary'}
              title={t('clear')}
              onPress={() => void reduxStorage.clearStorage()}
            />
          </View>
        </View>
      </ModalBackDrop>
    </View>
  );
};

interface AvatarsProps extends SettingsProps {
  avatar: Options | null;
  updateAvatar: (_avatar: Options) => void;
}

export const Avatars = ({ avatar, updateAvatar, handleClose }: Readonly<AvatarsProps>) => {
  const { t } = useTranslation();
  const { updateSettings } = useUpdateSettings();
  const [hasChanged, setHasChanged] = useState<boolean>(false);
  const [selectedAvatar, setSelectedAvatar] = useState<Options | null>(avatar);

  const avatars = useMemo(() => AVATARS_OPTIONS, []);

  const handleChange = () => {
    setHasChanged(avatar?.seed !== selectedAvatar?.seed);
  };

  useEffect(handleChange, [selectedAvatar]);

  const applyChanges = async () => {
    if (!selectedAvatar) return;
    try {
      await updateSettings({ avatar: selectedAvatar.seed });
      updateAvatar(selectedAvatar);
    } catch (error) {
      console.log('[applyChanges]:', error);
    } finally {
      handleClose();
    }
  };
  return (
    <View className={'flex-1 items-center justify-start gap-4 px-8 pt-6'}>
      <ThemedText size={'sm'} className={'w-full'}>{t('avatars_preview_text')}</ThemedText>
      <View className={'flex w-full items-start py-2'}>
        <ThemedText size={'md'} type={'subtitle'}>
          {t('choice_your_avatar')}
        </ThemedText>
      </View>
      <View className="flex w-full flex-row flex-wrap justify-center gap-4">
        {avatars.map((option, index) => (
          <TouchableOpacity
            key={`${option.seed}_${index}`}
            onPress={() => {
              setSelectedAvatar(option);
            }}
            className={twMerge(
              'relative size-28 rounded-3xl border border-dark-400',
              `${option.seed === selectedAvatar?.seed ? 'border-primary-500' : 'border-dark-400'}`,
            )}
          >
            <AvatarSvg options={option} size={100} />
          </TouchableOpacity>
        ))}
      </View>
      <SettingsFooter
        hasChanged={hasChanged}
        onApply={() => {
          void applyChanges();
        }}
        onClose={handleClose}
      />
    </View>
  );
};
