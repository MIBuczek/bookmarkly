import React, { useEffect, useMemo, useState } from 'react';
import { Switch, TouchableOpacity, View } from 'react-native';
import { ThemedText } from '@/components/ui/ThemedText';
import { Colors } from '@/constants/colors';
import { Button } from '@/components/button/Button';
import { useColorScheme as useNativeWindColorScheme } from 'nativewind/dist/stylesheet';
import { LOCAL_STORAGE_KEY, localAppStorage } from '@/providers/local-app-storage';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { baseColors } from '@assets/theme/base-theme';
import { LAND_OPTIONS } from '@/utils/setting.const';
import { CountryItem } from '@/components/CountryItem';
import { ModalBackDrop } from '@/components/modal/ModalBackDrop';
import { AVATARS_OPTIONS } from '@/constants/avatars';
import { AvatarSvg } from '@/components/svg/AvatarIcon';
import { Options } from '@dicebear/core';
import { twMerge } from 'tailwind-merge';

type SettingsProps = Readonly<{ handleClose: () => void }>;

export const Notification = ({ handleClose }: SettingsProps) => {
  const [notificationPermission, setNotificationPermission] = useState<boolean>(false);

  const handleNotificationPermission = () => {
    setNotificationPermission(!notificationPermission);
  };

  return (
    <View className={'flex-1 items-center justify-start gap-4 px-8 pt-6'}>
      <ThemedText className={'w-full'}>
        Phasellus vitae pharetra erat. Aliquam in tristique est, eu lobortis ex. Sed et turpis odio.
      </ThemedText>
      <View className={'w-full flex-row items-center justify-between py-2'}>
        <ThemedText type={'subtitle'} className={'text-base'}>
          Allow to push notification
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
        <Button type={'tertiary'} title={'Close'} onPress={handleClose} />
      </View>
    </View>
  );
};

export type ThemeType = 'dark' | 'light';

export const Appearance = ({ handleClose }: SettingsProps) => {
  const colorNativeWindScheme = useNativeWindColorScheme();

  const [fontSize, setFontSize] = useState(1);
  const [theme, setTheme] = useState<ThemeType>('light');
  const [hasChanged, setHasChanged] = useState(false);

  const setInitialState = () => {
    const _theme = localAppStorage.getLocalData<ThemeType>(LOCAL_STORAGE_KEY.THEME);
    setTheme(_theme ?? 'light');
    const _fontSize = localAppStorage.getLocalData<number>(LOCAL_STORAGE_KEY.FONT_SIZE);
    setFontSize(_fontSize ?? 1);
  };

  useEffect(setInitialState, []);

  const handleChange = () => {
    const _theme = localAppStorage.getLocalData<ThemeType>(LOCAL_STORAGE_KEY.THEME);
    const _fontSize = localAppStorage.getLocalData<number>(LOCAL_STORAGE_KEY.FONT_SIZE);
    setHasChanged(_theme !== theme || _fontSize !== fontSize);
  };

  useEffect(handleChange, [theme, fontSize]);

  return (
    <View className={'flex-1 items-center justify-start gap-4 px-8 pt-6'}>
      <ThemedText className={'w-full'}>
        Phasellus vitae pharetra erat. Aliquam in tristique est, eu lobortis ex. Sed et turpis odio.
      </ThemedText>
      <View className={'w-full flex-row items-center justify-between py-2'}>
        <ThemedText type={'subtitle'} className={'text-base text-gray-800'}>
          Font size
        </ThemedText>
        <View className="flex-row items-center gap-2">
          <TouchableOpacity className={'rounded-md border border-primary-500 p-2'}>
            <IconSymbol name={'minus'} color={baseColors.colors.dark['600']} size={14} />
          </TouchableOpacity>
          <TouchableOpacity className={'rounded-md border border-primary-500 p-2'}>
            <IconSymbol name={'plus'} color={baseColors.colors.dark['600']} size={14} />
          </TouchableOpacity>
        </View>
      </View>
      <View className={'w-full flex-row items-center justify-between py-2'}>
        <ThemedText type={'subtitle'} className={'text-base text-gray-800'}>
          Color schema
        </ThemedText>
        <View className="flex-row items-center gap-2">
          <TouchableOpacity
            className={`rounded-full border border-dark-400 p-2 ${theme === 'dark' ? 'bg-dark-600' : 'bg-transparent'}`}
            onPress={() => setTheme('dark')}
          >
            <IconSymbol name={'moon'} color={theme === 'dark' ? '#FFF' : '#4b5563'} size={14} />
          </TouchableOpacity>
          <TouchableOpacity
            className={`rounded-full border border-primary-500 p-2 ${theme === 'light' ? 'bg-primary-500' : 'bg-transparent'}`}
            onPress={() => setTheme('light')}
          >
            <IconSymbol name={'sun.max'} color={theme === 'light' ? '#FFF' : '#4b5563'} size={14} />
          </TouchableOpacity>
        </View>
      </View>
      <View className="mt-auto w-full">
        {hasChanged ? (
          <Button
            type={'primary'}
            title={'Apply'}
            onPress={() => {
              localAppStorage.setLocalData<number>(LOCAL_STORAGE_KEY.FONT_SIZE, fontSize);
              localAppStorage.setLocalData<string>(LOCAL_STORAGE_KEY.THEME, theme);
              colorNativeWindScheme.setColorScheme(theme);
              handleClose();
            }}
          />
        ) : (
          <Button type={'tertiary'} title={'Close'} onPress={handleClose} />
        )}
      </View>
    </View>
  );
};

export const Language = ({ handleClose }: SettingsProps) => {
  const [hasChanged, setHasChanged] = useState(false);
  const [lang, setLang] = useState('PL');

  const langList = useMemo(() => LAND_OPTIONS, []);

  const setInitialState = () => {
    const _lang = localAppStorage.getLocalData<string>(LOCAL_STORAGE_KEY.LANGUAGE);
    if (_lang) setLang(_lang);
    else setLang('EN');
  };

  useEffect(setInitialState, []);

  const handleChange = () => {
    const _lang = localAppStorage.getLocalData<string>(LOCAL_STORAGE_KEY.LANGUAGE);
    setHasChanged(_lang !== lang);
  };

  useEffect(handleChange, [lang]);

  return (
    <View className={'flex-1 items-center justify-start gap-4 px-8 pt-6'}>
      <ThemedText className={'w-full'}>
        Phasellus vitae pharetra erat. Aliquam in tristique est, eu lobortis ex. Sed et turpis odio.
      </ThemedText>
      <View className={'flex w-full items-start gap-2 py-2'}>
        <ThemedText type={'subtitle'} className={'text-base'}>
          Application language
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
      <View className="mt-auto w-full">
        {hasChanged ? (
          <Button
            type={'primary'}
            title={'Apply'}
            onPress={() => {
              localAppStorage.setLocalData(LOCAL_STORAGE_KEY.LANGUAGE, lang);
              handleClose();
            }}
          />
        ) : (
          <Button type={'tertiary'} title={'Close'} onPress={handleClose} />
        )}
      </View>
    </View>
  );
};

export const Storage = ({ handleClose }: SettingsProps) => {
  const [showClearConfirmationModal, setShowClearConfirmationModal] = useState(false);

  return (
    <View className={'flex-1 items-center justify-start gap-4 px-8 pt-6'}>
      <ThemedText className={'w-full'}>
        Phasellus vitae pharetra erat. Aliquam in tristique est, eu lobortis ex. Sed et turpis odio.
      </ThemedText>
      <View className={'w-full flex-row items-center justify-between py-2'}>
        <ThemedText type={'subtitle'} className={'text-base'}>
          Storage space {(localAppStorage?.getSize() / (1024 * 1024)).toFixed(2)} (MB)
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
          <ThemedText type="title" className={'text-lg text-red-500'}>
            Clear local application storage
          </ThemedText>
          <ThemedText>
            Are you sure you want to clear application storage? You'll lost some settings data, and we restore default
            one.
          </ThemedText>
          <View className={'mt-4 flex-row items-center justify-center gap-2'}>
            <Button
              buttonClassName={'flex-1 py-2'}
              type={'tertiary'}
              title={'Cancel'}
              onPress={() => {
                setShowClearConfirmationModal(false);
              }}
            />
            <Button
              buttonClassName={'flex-1 py-2 bg-red-500 border-red-500'}
              type={'primary'}
              title={'Clear'}
              onPress={() => localAppStorage.clearAllData()}
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
  const [hasChanged, setHasChanged] = useState<boolean>(false);
  const [selectedAvatar, setSelectedAvatar] = useState<Options | null>(avatar);

  const avatars = useMemo(() => AVATARS_OPTIONS, []);

  const handleChange = () => {
    setHasChanged(avatar?.seed !== selectedAvatar?.seed);
  };

  useEffect(handleChange, [selectedAvatar]);

  return (
    <View className={'flex-1 items-center justify-start gap-4 px-8 pt-6'}>
      <ThemedText className={'w-full'}>
        Phasellus vitae pharetra erat. Aliquam in tristique est, eu lobortis ex. Sed et turpis odio.
      </ThemedText>
      <View className={'flex w-full items-start py-2'}>
        <ThemedText type={'subtitle'} className={'text-base'}>
          Choice your avatar
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
      <View className="mt-auto w-full">
        {hasChanged ? (
          <Button
            type={'primary'}
            title={'Apply'}
            onPress={() => {
              if (!selectedAvatar) return;
              updateAvatar(selectedAvatar);
              localAppStorage.setLocalData(LOCAL_STORAGE_KEY.AVATAR, selectedAvatar);
              handleClose();
            }}
          />
        ) : (
          <Button type={'tertiary'} title={'Close'} onPress={handleClose} />
        )}
      </View>
    </View>
  );
};
