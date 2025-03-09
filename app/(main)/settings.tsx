import { ThemedText } from '@/components/ui/ThemedText';
import { ThemedView } from '@/components/ui/ThemedView';
import React, { useMemo, useState } from 'react';
import { Switch, TouchableOpacity, View } from 'react-native';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Button } from '@/components/ui/Button';
import { BottomSheet } from '@/components/ui/BottomSheet';
import { ModalBackDrop } from '@/components/ui/ModalBackDrop';
import { Colors } from '@/constants/Colors';
import CountryFlag from 'react-native-country-flag';
import { localStorage } from '@/providers/local-storage';

type SettingsProps = Readonly<{ handleClose: () => void }>;

const Notification = ({ handleClose }: SettingsProps) => {
  const [notificationPermission, setNotificationPermission] = useState<boolean>(false);

  const handleNotificationPermission = () => {
    setNotificationPermission(!notificationPermission);
  };

  return (
    <View className={'flex-1 items-center justify-start gap-4 px-8 pt-6'}>
      <ThemedText className={'w-full text-sm text-gray-400'}>
        Phasellus vitae pharetra erat. Aliquam in tristique est, eu lobortis ex. Sed et turpis odio.
      </ThemedText>
      <View className={'w-full flex-row items-center justify-between py-2'}>
        <ThemedText type={'subtitle'} className={'text-base text-gray-600'}>
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

const Appearance = ({ handleClose }: SettingsProps) => {
  const [fontSize, setFontSize] = useState(1);
  const [displayMode, setDisplayMode] = useState<'dark' | 'light'>('light');
  const [hasChanged, setHasChanged] = useState(false);

  return (
    <View className={'flex-1 items-center justify-start gap-4 px-8 pt-6'}>
      <ThemedText className={'w-full text-sm text-gray-400'}>
        Phasellus vitae pharetra erat. Aliquam in tristique est, eu lobortis ex. Sed et turpis odio.
      </ThemedText>
      <View className={'w-full flex-row items-center justify-between py-2'}>
        <ThemedText type={'subtitle'} className={'text-base text-gray-600'}>
          Font size
        </ThemedText>
        <View className="flex-row items-center gap-2">
          <TouchableOpacity className={'rounded-md border border-blue-500 p-2'}>
            <IconSymbol name={'minus'} color={'#4b5563'} size={14} />
          </TouchableOpacity>
          <TouchableOpacity className={'rounded-md border border-blue-500 p-2'}>
            <IconSymbol name={'plus'} color={'#4b5563'} size={14} />
          </TouchableOpacity>
        </View>
      </View>
      <View className={'w-full flex-row items-center justify-between py-2'}>
        <ThemedText type={'subtitle'} className={'text-base text-gray-600'}>
          Color schema
        </ThemedText>
        <View className="flex-row items-center gap-2">
          <TouchableOpacity
            className={`rounded-full border border-gray-600 p-2 ${displayMode === 'dark' ? 'bg-gray-600' : 'bg-transparent'}`}
            onPress={() => setDisplayMode('dark')}
          >
            <IconSymbol name={'moon'} color={displayMode === 'dark' ? '#FFF' : '#4b5563'} size={14} />
          </TouchableOpacity>
          <TouchableOpacity
            className={`rounded-full border border-blue-500 p-2 ${displayMode === 'light' ? 'bg-blue-500' : 'bg-transparent'}`}
            onPress={() => setDisplayMode('light')}
          >
            <IconSymbol name={'sun.max'} color={displayMode === 'light' ? '#FFF' : '#4b5563'} size={14} />
          </TouchableOpacity>
        </View>
      </View>
      <View className="mt-auto w-full">
        {hasChanged ? (
          <Button type={'primary'} title={'Apply'} onPress={() => {
          }} />
        ) : (
          <Button type={'tertiary'} title={'Close'} onPress={handleClose} />
        )}
      </View>
    </View>
  );
};

const Language = ({ handleClose }: SettingsProps) => {
  const [hasChanged, setHasChanged] = useState(false);
  const [lang, setLang] = useState('PL');

  const langList = useMemo(
    () => [
      {
        name: 'United State',
        isoCode: 'US',
      },
      {
        name: 'German',
        isoCode: 'DE',
      },
      {
        name: 'France',
        isoCode: 'FR',
      },
      {
        name: 'Polish',
        isoCode: 'PL',
      },
    ],
    [],
  );

  return (
    <View className={'flex-1 items-center justify-start gap-4 px-8 pt-6'}>
      <ThemedText className={'w-full text-sm text-gray-400'}>
        Phasellus vitae pharetra erat. Aliquam in tristique est, eu lobortis ex. Sed et turpis odio.
      </ThemedText>
      <View className={'flex w-full items-start gap-2 py-2'}>
        <ThemedText type={'subtitle'} className={'text-base text-gray-600'}>
          Application language
        </ThemedText>
        <View className="w-full gap-1">
          {langList.map(({ name, isoCode }, index) => (
            <TouchableOpacity
              key={`${name}_${index}`}
              className={`flex-row items-center justify-between gap-1 rounded-lg border px-4 py-6 ${isoCode === lang ? 'border-blue-500 bg-blue-200' : 'border-gray-200 bg-transparent'}`}
              onPress={() => {
                setLang(isoCode);
              }}
            >
              <View className={'flex-row gap-2'}>
                <CountryFlag isoCode={isoCode} size={16} />
                <ThemedText className={'px-1 text-sm capitalize'}>{name}</ThemedText>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <View className="mt-auto w-full">
        {hasChanged ? (
          <Button type={'primary'} title={'Apply'} onPress={() => {
          }} />
        ) : (
          <Button type={'tertiary'} title={'Close'} onPress={handleClose} />
        )}
      </View>
    </View>
  );
};

const Storage = ({ handleClose }: SettingsProps) => {
  return (
    <View className={'flex-1 items-center justify-start gap-4 px-8 pt-6'}>
      <ThemedText className={'w-full text-sm text-gray-400'}>
        Phasellus vitae pharetra erat. Aliquam in tristique est, eu lobortis ex. Sed et turpis odio.
      </ThemedText>
      <View className={'w-full flex-row items-center justify-between py-2'}>
        <ThemedText type={'subtitle'} className={'text-base text-gray-600'}>
          Storage space {localStorage?.getSize() / (1024 * 1024)} (MB)
        </ThemedText>
        <TouchableOpacity
          className={'rounded-md border border-red-500 p-2'}
          onPress={() => localStorage?.clearAllData()}
        >
          <IconSymbol name={'trash'} color={'red'} size={16} />
        </TouchableOpacity>
      </View>
      <View className="mt-auto w-full">
        <Button type={'tertiary'} title={'Close'} onPress={handleClose} />
      </View>
    </View>
  );
};

type SettingsOptions = 'notification' | 'appearance' | 'language' | 'storage' | 'none';

export default function SettingScreen() {
  const [logOutModalVisible, setLogoutModalVisible] = useState<boolean>(false);
  const [settingOption, setSettingOption] = useState<SettingsOptions>('none');
  const [showBottomSheet, setShowBottomSheet] = useState<boolean>(false);

  const handleCloseSettingOption = () => {
    setSettingOption('none');
    setShowBottomSheet(false);
  };

  const settingsButtons: SettingsOptions[] = useMemo(() => ['notification', 'appearance', 'language', 'storage'], []);

  const settingsContent = useMemo(
    (): { [x in SettingsOptions]: React.ReactNode | null } => ({
      notification: <Notification handleClose={handleCloseSettingOption} />,
      appearance: <Appearance handleClose={handleCloseSettingOption} />,
      language: <Language handleClose={handleCloseSettingOption} />,
      storage: <Storage handleClose={handleCloseSettingOption} />,
      none: null,
    }),
    [],
  );

  const settingContentSize = useMemo(
    (): { [x in SettingsOptions]: number } => ({
      notification: 30,
      appearance: 40,
      language: 60,
      storage: 30,
      none: 0,
    }),
    [],
  );

  return (
    <ThemedView withIOSPaddingBottom withIOSPaddingTop className="flex-1 gap-8 px-6">
      <View className="flex h-[30%] w-full items-center justify-center gap-4">
        <ThemedText type={'title'} className={'py-6 text-2xl'}>
          Settings
        </ThemedText>
        <View className="relative size-28 rounded-3xl bg-blue-100">
          <View
            className="absolute -bottom-1 -right-1 flex size-8 items-center justify-center rounded-full bg-blue-600">
            <IconSymbol size={16} name={'pencil'} color={'white'} />
          </View>
        </View>
        <View className="flex items-center">
          <ThemedText type="title" className="text-xl">
            Lucas Scott
          </ThemedText>
          <ThemedText className="text-sm text-gray-400">@lucascott123</ThemedText>
        </View>
      </View>
      <View className={'flex-1 justify-start'}>
        <View className="flex w-full">
          {settingsButtons.map((option, index) => (
            <TouchableOpacity
              key={`${option}_${index}`}
              className={'flex-row items-center justify-between gap-1 border-t border-t-gray-200 px-4 py-6'}
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
            title={'Log out'}
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
            Log out
          </ThemedText>
          <ThemedText className={'text-sm text-gray-400'}>
            Are you sure you want to log out? You'll need to login again to use the app.
          </ThemedText>
          <View className={'mt-4 flex-row items-center justify-center gap-2'}>
            <Button
              buttonClassName={'flex-1 py-2'}
              type={'secondary'}
              title={'Cancel'}
              onPress={() => {
                setLogoutModalVisible(false);
              }}
            />
            <Button buttonClassName={'flex-1 py-2'} type={'primary'} title={'Log out'} onPress={() => {
            }} />
          </View>
        </View>
      </ModalBackDrop>
    </ThemedView>
  );
}
