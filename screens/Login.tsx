import React, { memo, useEffect, useMemo, useState } from 'react';
import { ThemedText } from '@/components/ui/ThemedText';
import { Pressable, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/button/Button';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { LogoIcon } from '@/components/svg/LogoIcon';
import { storeActions, useAppDispatch } from '@/store';
import { useTranslation } from 'react-i18next';
import authServices from '@/services/auth.services';
import { ScreenContainer } from '@/components/ui/ScreenContainer';
import { useToast } from 'react-native-toast-notifications';
import { BottomSheet } from '@/components/bottom-sheet/BottomSheet';
import countryTelData, { Country } from 'country-telephone-data';
import { FlatList } from 'react-native-gesture-handler';
import { ScreenWidth } from 'react-native-elements/dist/helpers';
import { twMerge } from 'tailwind-merge';
import CountryFlag from 'react-native-country-flag';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/colors';
import { debounce } from 'lodash-es';
import { LOCAL_STORAGE_KEY, localAppStorage } from '@/providers/local-app-storage';

export type PhoneCodeItemProps = Country & {
  className?: string;
  onPress: () => void;
};

export const PhoneCodeItem = memo(function({
                                             onPress,
                                             name,
                                             dialCode,
                                             iso2,
                                             className,
                                           }: Readonly<PhoneCodeItemProps>) {
    return (
      <Pressable
        onPress={onPress}
        className={twMerge(`flex-row items-center justify-between gap-1 rounded-lg border border-dark-200 p-4`, className)}>
        <View className={'flex-row gap-2'}>
          <CountryFlag isoCode={iso2} size={16} />
          <ThemedText className={'px-1 text-sm capitalize'}>{`(${dialCode}) ${name}`}</ThemedText>
        </View>
        <View>
          <IconSymbol size={20} name={'chevron.right'} color={Colors.light.icon} />
        </View>
      </Pressable>
    );
  },
);


type Props = {
  selectedItem: Country | null;
  onDismiss: () => void;
  onPress: (item: Country) => void;
};

export const PhoneCodeBottomSheet: React.FC<Props> = ({ selectedItem, onDismiss, onPress }) => {
  const { t } = useTranslation();

  const [searchPhase, setSearchPhase] = useState('');
  const [filteredPhoneCodes, setFilteredPhoneCodes] = useState<Country[]>([]);

  const countriesPhoneCodes: Country[] = useMemo(() => {
    return countryTelData.allCountries;
  }, []);

  const debouncedSearch = useMemo(
    () =>
      debounce((text: string) => {
        const _filteredCountries = countriesPhoneCodes.filter(({ name, dialCode }) =>
          `${name} ${dialCode}`.toLowerCase().includes(text.toLowerCase()),
        );
        setFilteredPhoneCodes(_filteredCountries);
      }, 300),
    [countriesPhoneCodes],
  );

  useEffect(() => {
    debouncedSearch(searchPhase);
    return () => {
      debouncedSearch.cancel();
    };
  }, [searchPhase, debouncedSearch]);

  return (
    <View className={'flex-1'}>
      <View className={'px-4 py-6 h-20'}>
        <Input placeholder={'search'} value={searchPhase} onChangeText={setSearchPhase} />
      </View>
      <View className={'flex-1 items-start border-t-primary-500 py-2'}>
        <FlatList
          style={{ width: ScreenWidth }}
          data={filteredPhoneCodes}
          keyExtractor={(item) => `${item.name}_${item.dialCode}`}
          renderItem={({ item }) => (
            <PhoneCodeItem
              {...item}
              className={`border-0 border-b px-4 py-6 rounded-none ${item.dialCode === selectedItem?.dialCode ? 'bg-primary-200' : 'bg-transparent'}`}
              onPress={() => onPress(item)}
            />
          )}
        />
      </View>
      <View className={'w-full p-4'}>
        <Button type={'secondary'} title={t('cancel')} onPress={onDismiss} />
      </View>
    </View>
  );
};

const loginSchema = yup.object().shape({
  phone: yup
    .string()
    .matches(/^[+]?[0-9]{9,15}$/, 'phone_number_digits')
    .required('phone_number_required'),
});

export type TLoginForm = {
  phone: string;
};

const INITIAL_LOGIN_FORM: TLoginForm = {
  phone: '',
};

export default function LoginScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const toast = useToast();

  const [showDirectNumberList, setShowDirectNumberList] = React.useState(false);
  const [selectedPhoneCodes, setSelectedPhoneCodes] = React.useState<Country | null>(null);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TLoginForm>({
    resolver: yupResolver(loginSchema),
  });

  const dispatch = useAppDispatch();

  const onSubmit = async (data: TLoginForm) => {
    if (!selectedPhoneCodes) return toast.show('[Error] : Please select country', { type: 'error' });
    try {
      const phone = `+${selectedPhoneCodes?.dialCode}${data.phone}`;
      await authServices.singIn({ phone });
      toast.show('[Success] : You will get verification code', { type: 'success' });
      dispatch(storeActions.user.setPhone({ phone }));
      router.navigate('/(login)/verify-code');
      reset(INITIAL_LOGIN_FORM);
    } catch (e) {
      toast.show('[Error] : Wrong phone number', { type: 'error' });
      console.log(e);
    }
  };

  useEffect(() => {
    setSelectedPhoneCodes(localAppStorage.getLocalData(LOCAL_STORAGE_KEY.PHONE_CODE) || null);
  }, []);

  return (
    <ScreenContainer>
      <View className="flex-1 flex-row items-center justify-center rounded-t-xl bg-primary-100 dark:bg-primary-200">
        <LogoIcon width={50} height={50} />
        <ThemedText type="title" className={'pb-2 text-3xl text-dark-600'}>
          Bookmarkly
        </ThemedText>
      </View>
      <View className="flex flex-1 items-start gap-6 border-t-2 border-t-primary-200 pt-10 dark:border-t-primary-300">
        <ThemedText type="title" className="text-3xl font-extrabold">
          {t('welcome')}
        </ThemedText>
        <View className="flex w-full gap-10">
          <Controller
            name="phone"
            control={control}
            render={({ field: { value, onChange, onBlur } }) => (
              <View className="w-full h-fit flex flex-row items-center rounded-xl border border-dark-400">
                <Pressable
                  onPress={() => setShowDirectNumberList((prev) => !prev)}
                  className="flex-row items-center px-4 rounded-l-xl h-full  bg-primary-100 dark:bg-primary-200 ">
                  <ThemedText type="subtitle" className="text-sm font-semibold text-primary-600">
                    {selectedPhoneCodes ? `+${selectedPhoneCodes?.dialCode}` : '00'}
                  </ThemedText>
                </Pressable>
                <Input
                  inputClassName={'border-0'}
                  placeholder={t('phone_number')}
                  inputMode={'numeric'}
                  value={value}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  error={errors.phone}
                />
              </View>
            )}
          />
          <Button type={'primary'} title={t('login')} onPress={handleSubmit(onSubmit)} />
        </View>
        <View className="w-full flex-row items-center justify-center gap-2">
          <ThemedText type="default">{t('not_a_member')}</ThemedText>
          <Pressable
            onPress={() => {
              router.navigate('./(login)/sign-up');
            }}
          >
            <ThemedText type="subtitle" className="text-sm font-semibold text-primary-600">
              {t('register')}
            </ThemedText>
          </Pressable>
        </View>
      </View>
      <BottomSheet
        height={90}
        title={t('select_country')}
        visible={showDirectNumberList}
        onRequestClose={() => {
          setShowDirectNumberList(false);
        }}>
        <PhoneCodeBottomSheet
          selectedItem={selectedPhoneCodes}
          onDismiss={() => {
            setShowDirectNumberList(false);
          }}
          onPress={(item: Country) => {
            setSelectedPhoneCodes(item);
            localAppStorage.setLocalData(LOCAL_STORAGE_KEY.PHONE_CODE, item);
            setShowDirectNumberList(false);
          }}
        />
      </BottomSheet>
    </ScreenContainer>
  );
}
