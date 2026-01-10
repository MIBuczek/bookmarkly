import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { ThemedText } from '@/components/ui/ThemedText';
import { Pressable, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/button/Button';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { RootState, storeActions, useAppDispatch, useAppSelector } from '@/store';
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
import { ErrorText } from '@/components/ui/ErrorText';
import { getSystemLanguage } from '@/providers/localization';
import Logo from '@/components/Logo';
import { APP_ROUTES } from '@/utils/routes';

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
      className={twMerge(
        `flex-row items-center justify-between gap-1 rounded-lg border border-dark-200 p-4`,
        className,
      )}
    >
      <View className={'flex-row gap-2'}>
        <CountryFlag isoCode={iso2} size={16} />
        <ThemedText className={'px-1 capitalize'} size={'sm'}>{`(${dialCode}) ${name}`}</ThemedText>
      </View>
      <View>
        <IconSymbol size={20} name={'chevron.right'} color={Colors.light.icon} />
      </View>
    </Pressable>
  );
});

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
      <View className={'h-20 px-4 py-6'}>
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
              className={`rounded-none border-0 border-b px-4 py-6 ${item.dialCode === selectedItem?.dialCode ? 'bg-primary-200' : 'bg-transparent'}`}
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

const signInSchema = yup.object().shape({
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

export default function SignInScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const toast = useToast();
  const dispatch = useAppDispatch();
  const { phoneCode } = useAppSelector(({ user }: RootState) => user);

  const [showDirectNumberList, setShowDirectNumberList] = React.useState(false);
  const [selectedPhoneCodes, setSelectedPhoneCodes] = React.useState<Country | null>(null);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TLoginForm>({
    resolver: yupResolver(signInSchema),
  });

  const onSubmit = async (data: TLoginForm) => {
    if (!selectedPhoneCodes) return toast.show('[Error] : Please select country', { type: 'error' });
    try {
      const phone = `+${selectedPhoneCodes?.dialCode}${data.phone}`;
      await authServices.singIn({ phone });
      toast.show('[Success] : You will get verification code', { type: 'success' });
      dispatch(storeActions.user.setPhone({ phone }));
      router.navigate(APP_ROUTES.VERIFY_CODE);
      reset(INITIAL_LOGIN_FORM);
    } catch (e) {
      toast.show('[Error] : Wrong phone number', { type: 'error' });
      console.log(e);
    }
  };

  const preselectPhoneCode = useCallback(() => {
    let preselectPhoneCode = phoneCode;
    if (!preselectPhoneCode) {
      const language = getSystemLanguage();
      const systemRegionCode = (language.regionCode || language.languageCode?.split('-')[1] || 'US').toLowerCase();

      preselectPhoneCode =
        countryTelData.allCountries.find((c) => c.iso2 === systemRegionCode) ||
        countryTelData.allCountries.find((c) => c.iso2 === 'us') ||
        countryTelData.allCountries[0];
    }
    setSelectedPhoneCodes(preselectPhoneCode);
  }, [phoneCode, getSystemLanguage, countryTelData]);

  useEffect(preselectPhoneCode, []);

  return (
    <ScreenContainer>
      <Logo className={'flex-1'} />
      <View className="flex flex-1 items-start gap-6 border-t-2 border-t-primary-200 pt-10 dark:border-t-primary-300">
        <ThemedText type="title" className="font-extrabold" size={'3xl'}>
          {t('welcome')}
        </ThemedText>
        <View className="w-full flex-1 gap-2">
          <Controller
            name="phone"
            control={control}
            render={({ field: { value, onChange, onBlur } }) => (
              <>
                <View className="flex h-fit w-full flex-row items-center rounded-xl border border-dark-400">
                  <Pressable
                    onPress={() => setShowDirectNumberList((prev) => !prev)}
                    className="h-full flex-row items-center rounded-l-xl bg-primary-100 px-4 dark:bg-primary-200"
                  >
                    <ThemedText type="subtitle" className="font-semibold text-primary-600" size={'sm'}>
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
                  />
                </View>
                {errors.phone && <ErrorText errorMsg={t(errors.phone.message || '')} />}
              </>
            )}
          />
          <Button type={'primary'} title={t('login')} buttonClassName={'mt-auto'} onPress={handleSubmit(onSubmit)} />
        </View>
        <View className="w-full flex-row items-center justify-center gap-2">
          <ThemedText type="default" size={'sm'}>{t('not_a_member')}</ThemedText>
          <Pressable
            onPress={() => {
              router.navigate(APP_ROUTES.SIGN_UP);
            }}
          >
            <ThemedText type="subtitle" className="font-semibold text-primary-600" size={'sm'}>
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
        }}
      >
        <PhoneCodeBottomSheet
          selectedItem={selectedPhoneCodes}
          onDismiss={() => {
            setShowDirectNumberList(false);
          }}
          onPress={(phoneCode: Country) => {
            setSelectedPhoneCodes(phoneCode);
            dispatch(storeActions.user.setPhoneCode({ phoneCode }));
            setShowDirectNumberList(false);
          }}
        />
      </BottomSheet>
    </ScreenContainer>
  );
}
