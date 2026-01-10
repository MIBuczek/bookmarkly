import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ThemedText } from '@/components/ui/ThemedText';
import { Pressable, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/button/Button';
import { CheckBox } from 'react-native-elements';
import { BottomSheet } from '@/components/bottom-sheet/BottomSheet';
import { TermsAndConditions } from '@/components/modal/TermsAndConditions';
import { baseColors } from '@/assets/theme/base-theme';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { router } from 'expo-router';
import { ErrorText } from '@/components/ui/ErrorText';
import { twMerge } from 'tailwind-merge';
import { CountryItem } from '@/components/CountryItem';
import countryList, { Country } from 'country-list';
import { debounce } from 'lodash-es';
import { useTranslation } from 'react-i18next';
import { ScreenContainer } from '@/components/ui/ScreenContainer';
import { ArrowBackButton } from '@/components/button/ArrowBackButton';
import { ScreenWidth } from 'react-native-elements/dist/helpers';
import countryTelData, { Country as PhoneCountryCode } from 'country-telephone-data';
import authServices from '@/services/auth.services';
import { storeActions, useAppDispatch } from '@/store';
import { useToast } from 'react-native-toast-notifications';
import { TAddUser, TUserSettings } from '@/types/uset.type';
import { checkPushNotificationsStatus } from '@/providers/push-notification';
import { getSystemLanguage } from '@/providers/localization';
import { getSystemAppearance } from '@/providers/apparence';
import { APP_ROUTES } from '@/utils/routes';

interface SelectCountryBottomSheetProps {
  countries: Country[];
  selectedCountry: Country;
  handleSelection: (country: Country) => void;
}

/**
 * SelectCountryBottomSheet component for selecting a country from a list.
 * @param {SelectCountryBottomSheetProps} props - The props for the component.
 * @returns {JSX.Element} The rendered component.
 */

const SelectCountryBottomSheet = ({
                                    countries,
                                    selectedCountry,
                                    handleSelection,
                                  }: Readonly<SelectCountryBottomSheetProps>): React.JSX.Element => {
  const { t } = useTranslation();

  const [searchPhase, setSearchPhase] = useState('');
  const [filteredCountries, setFilteredCountries] = useState<Country[]>(countries);

  const debouncedSearch = useMemo(
    () =>
      debounce((text: string) => {
        const _filteredCountries = countries.filter(({ name, code }) =>
          `${name} ${code}`.toLowerCase().includes(text.toLowerCase()),
        );
        setFilteredCountries(_filteredCountries);
      }, 300),
    [countries],
  );

  useEffect(() => {
    debouncedSearch(searchPhase);
    return () => {
      debouncedSearch.cancel();
    };
  }, [searchPhase, debouncedSearch]);

  return (
    <View className={'flex-1'}>
      <View className={'px-4 py-6'}>
        <Input placeholder={t('search_your_country')} value={searchPhase} onChangeText={setSearchPhase} />
      </View>
      <View className={'flex h-5/6 items-start border-t-primary-500 py-2'}>
        <FlatList
          style={{ width: ScreenWidth }}
          data={filteredCountries}
          keyExtractor={({ name, code }) => `${name}_${code}`}
          renderItem={({ item: { name, code } }: { item: Country }) => (
            <CountryItem
              isoCode={code}
              icon={false}
              countryName={name}
              className={`rounded-none border-0 border-b border-dark-100 px-4 py-6 ${code === selectedCountry.code ? 'bg-primary-200' : 'bg-transparent'}`}
              onPress={() => handleSelection({ name, code })}
            />
          )}
        />
        <View className={'w-full p-4'}>
          <Button type={'secondary'} title={t('cancel')} onPress={() => handleSelection(selectedCountry)} />
        </View>
      </View>
    </View>
  );
};

/**
 * Registration schema using yup for form validation.
 * @type {yup.ObjectSchema<TRegistrationForm>}
 */
export const registrationSchema: yup.ObjectSchema<TRegistrationForm> = yup.object().shape({
  name: yup.string().min(2, 'name_min_length').max(50, 'name_max_length').required('name_required'),
  email: yup.string().email('invalid_email').required('email_required'),
  country: yup.object<Country>().required('country_required').shape({
    code: yup.string().required(),
    name: yup.string().required(),
  }),
  phone: yup
    .string()
    .matches(/^[0-9]{9,15}$/, 'phone_number_digits')
    .required('phone_number_required'),
  terms: yup.boolean().oneOf([true], 'terms_required'),
});

export type TRegistrationForm = {
  name: string;
  email: string;
  country: Country;
  phone: string;
  terms?: boolean | undefined;
};

const INITIAL_REGISTRATION_FORM: TRegistrationForm = {
  name: '',
  email: '',
  country: { code: 'PL', name: 'Poland' },
  phone: '',
  terms: false,
};

/**
 * SignUp component for user registration.
 * @returns {JSX.Element} The rendered component.
 */
export default function SignUpScreen(): React.JSX.Element {
  const { t } = useTranslation();
  const toast = useToast();
  const dispatch = useAppDispatch();

  const [showCountryList, setShowCountryList] = useState(false);
  const [showTermsAndConditions, setShowTermsAndConditions] = useState(false);
  const [countries, setCountries] = useState<Country[]>([]);

  const {
    control,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<TRegistrationForm>({
    defaultValues: INITIAL_REGISTRATION_FORM,
    resolver: yupResolver(registrationSchema),
  });

  const selectedCountry = watch('country');

  /**
   * Loads the list of countries from the country-list library.
   */
  const loadCountries = useCallback(() => {
    const _countries = countryList.getData();
    setCountries(_countries);
    /* Preselect user country */
    const language = getSystemLanguage();
    const systemRegionCode = (language.regionCode || language.languageCode?.split('-')[1] || 'PL').toUpperCase();

    const systemCountry = _countries.find(c => c.code === systemRegionCode);
    if (systemCountry) {
      setValue('country', systemCountry);
    }
  }, [setValue, countryList, setCountries]);

  useEffect(loadCountries, []);

  const handleCountrySelection = (_country: Country) => {
    setValue('country', _country);
    setShowCountryList(false);
  };

  const countriesPhoneCodes: PhoneCountryCode[] = useMemo(() => {
    return countryTelData.allCountries;
  }, []);

  const generateUserInitialSettings = async (): Promise<TUserSettings> => {
    const notification = await checkPushNotificationsStatus();
    const language = getSystemLanguage().languageCode || 'en';
    const appearance = getSystemAppearance();
    return {
      notification,
      language,
      appearance,
      fontSize: 16,
      avatar: 'Ryker',
    };
  };

  const onSubmit = async (data: TRegistrationForm) => {
    const selectedPhoneCodes = countriesPhoneCodes.find((c) => c.iso2 === data.country.code);
    const phone = `+${selectedPhoneCodes?.dialCode}${data.phone}`;
    try {
      const settings = await generateUserInitialSettings();
      const user: TAddUser = { ...data, phone, settings };
      await authServices.singUp({ user });
      toast.show('[Success] : You will get verification code', { type: 'success' });
      dispatch(storeActions.user.setPhone({ phone }));
      router.navigate(APP_ROUTES.VERIFY_CODE);
      reset(INITIAL_REGISTRATION_FORM);
    } catch (error) {
      console.error('[onSubmit]:', error);
      toast.show('[Error] : Wrong phone number', { type: 'error' });
    }
  };

  return (
    <ScreenContainer>
      <ArrowBackButton
        onPress={() => {
          router.back();
        }}
      />
      <View className={'mb-10 mt-4 flex w-full gap-2'}>
        <ThemedText type="title" size={'xl'}>
          {t('register')}
        </ThemedText>
        <ThemedText size={'sm'}>{t('create_an_account_to_get_started')}</ThemedText>
      </View>
      <View className="flex-1 justify-start gap-6">
        <Controller
          name="name"
          control={control}
          render={({ field: { value, onChange, onBlur } }) => (
            <Input
              inputMode={'text'}
              label={t('name')}
              value={value}
              placeholder={t('full_name')}
              onChangeText={onChange}
              onBlur={onBlur}
              error={errors.name}
            />
          )}
        />
        <Controller
          name="email"
          control={control}
          render={({ field: { value, onChange, onBlur } }) => (
            <Input
              placeholder={'name@email.com'}
              inputMode={'text'}
              label={t('email')}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={errors.email}
            />
          )}
        />
        <View className="flex w-full gap-2">
          <ThemedText type="title" size={'sm'} className={'text-dark-800'}>
            {t('country')}
          </ThemedText>
          <CountryItem
            isoCode={selectedCountry.code}
            icon={true}
            countryName={selectedCountry.name}
            onPress={() => {
              setShowCountryList(true);
            }}
          />
          {errors.country && <ErrorText errorMsg={errors.country.message} />}
        </View>
        <Controller
          name="phone"
          control={control}
          render={({ field: { value, onChange, onBlur } }) => (
            <Input
              label={t('phone_number')}
              placeholder={'00 000-000-000'}
              inputMode={'numeric'}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={errors.phone}
            />
          )}
        />
      </View>
      <View className={'mt-auto flex w-full gap-2'}>
        <View className="flex items-start justify-start">
          <Controller
            name="terms"
            control={control}
            render={({ field: { value, onChange, onBlur } }) => (
              <CheckBox
                title={
                  <Pressable onPress={() => setShowTermsAndConditions(true)}>
                    <ThemedText size={'sm'} className={twMerge('text-dark-700', errors.terms ? 'text-red-500' : '')}>
                      {t('terms_and_conditions')}
                    </ThemedText>
                  </Pressable>
                }
                checked={value}
                onPress={() => onChange(!value)}
                onBlur={onBlur}
                iconType="material-community"
                checkedIcon="checkbox-outline"
                uncheckedIcon={'checkbox-blank-outline'}
                size={30}
                checkedColor={baseColors.colors.primary['500']}
                wrapperStyle={{
                  backgroundColor: 'transparent',
                  borderWidth: 0,
                }}
                containerStyle={{
                  padding: 0,
                  marginBottom: 0,
                  borderWidth: 0,
                  backgroundColor: 'transparent',
                }}
              />
            )}
          />
        </View>
        <Button type={'primary'} title={t('register')} buttonClassName={'mt-2'} onPress={handleSubmit(onSubmit)} />
      </View>
      <BottomSheet
        height={90}
        title={t('terms_and_conditions_title')}
        visible={showTermsAndConditions}
        onRequestClose={() => {
          setShowTermsAndConditions(false);
        }}
      >
        <TermsAndConditions
          onPress={() => {
            dispatch(storeActions.user.setTermsAndConditions({ termsAndConditions: true }));
            setShowTermsAndConditions(false);
            setValue('terms', true);
          }}
        />
      </BottomSheet>
      <BottomSheet
        height={90}
        title={t('select_country')}
        visible={showCountryList}
        onRequestClose={() => {
          setShowCountryList(false);
        }}
      >
        <SelectCountryBottomSheet
          countries={countries}
          selectedCountry={selectedCountry}
          handleSelection={handleCountrySelection}
        />
      </BottomSheet>
    </ScreenContainer>
  );
}
