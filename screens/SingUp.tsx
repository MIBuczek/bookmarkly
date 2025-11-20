import React, { useEffect, useMemo, useState } from 'react';
import { ThemedText } from '@/components/ui/ThemedText';
import { Pressable, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/button/Button';
import { CheckBox } from 'react-native-elements';
import { BottomSheet } from '@/components/bottom-sheet/BottomSheet';
import { TermsAndConditions } from '@/components/modal/TermsAndConditions';
import { baseColors } from '@assets/theme/base-theme';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { router } from 'expo-router';
import { LOCAL_STORAGE_KEY, localAppStorage } from '@/providers/local-app-storage';
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
              className={`border-0 border-b border-dark-100 px-4 py-6 rounded-none ${code === selectedCountry.code ? 'bg-primary-200' : 'bg-transparent'}`}
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
  const loadCountries = () => {
    const _countries = countryList.getData();
    setCountries(_countries);
  };

  /**
   * useEffect hook to load countries on component mount.
   * @effect
   */
  useEffect(loadCountries, []);

  const handleCountrySelection = (_country: Country) => {
    setValue('country', _country);
    setShowCountryList(false);
  };

  const countriesPhoneCodes: PhoneCountryCode[] = useMemo(() => {
    return countryTelData.allCountries;
  }, []);

  const onSubmit = async (data: TRegistrationForm) => {
    const selectedPhoneCodes = countriesPhoneCodes.find((c) => c.iso2 === data.country.code);
    const phone = `+${selectedPhoneCodes?.dialCode}${data.phone}`;
    try {
      await authServices.singUp({ ...data, phone });
      toast.show('[Success] : You will get verification code', { type: 'success' });
      dispatch(storeActions.user.setPhone({ phone }));

      router.navigate('/(login)/verify-code');
      reset(INITIAL_REGISTRATION_FORM);

    } catch (e) {
      toast.show('[Error] : Wrong phone number', { type: 'error' });
      console.log(e);

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
        <ThemedText type="title" className="text-xl">
          {t('register')}
        </ThemedText>
        <ThemedText>{t('create_an_account_to_get_started')}</ThemedText>
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
          <ThemedText type="title" className={'text-sm text-dark-800'}>
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
                    <ThemedText className={twMerge('text-dark-700', errors.terms ? 'text-red-500' : '')}>
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
            localAppStorage.setLocalData(LOCAL_STORAGE_KEY.TERMS_AND_CONDITIONS, true);
            setShowTermsAndConditions(false);
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
