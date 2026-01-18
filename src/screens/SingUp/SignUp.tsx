import React, { useEffect } from 'react';
import { ThemedText } from '@/components/ui/ThemedText';
import { Pressable, View } from 'react-native';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/button/Button';
import { CheckBox } from 'react-native-elements';
import { BottomSheet } from '@/components/bottom-sheet/BottomSheet';
import { TermsAndConditions } from '@/components/modal/TermsAndConditions';
import { baseColors } from '@assets/theme/base-theme';
import { Controller } from 'react-hook-form';
import { router } from 'expo-router';
import { ErrorText } from '@/components/ui/ErrorText';
import { twMerge } from 'tailwind-merge';
import { CountryItem } from '@/components/CountryItem';
import { useTranslation } from 'react-i18next';
import { ScreenContainer } from '@/components/ui/ScreenContainer';
import { ArrowBackButton } from '@/components/button/ArrowBackButton';
import { storeActions } from '@/store';
import useScreen from '@/screens/SingUp/useScreen';
import { SelectCountryBottomSheet } from '@/screens/SingUp/components/SelectCountryBottomSheet';

/**
 * SignUp component for user registration.
 * @returns {JSX.Element} The rendered component.
 */
export default function SignUpScreen(): React.JSX.Element {
  const { t } = useTranslation();

  const {
    dispatch,
    loadCountries,
    registrationForm: {
      control,
      handleSubmit,
      formState: { errors },
      setValue,
    },
    showCountryList,
    setShowCountryList,
    countries,
    selectedCountry,
    handleCountrySelection,
    showTermsAndConditions,
    setShowTermsAndConditions,
    onSubmit,
  } = useScreen();

  useEffect(loadCountries, []);

  return (
    <ScreenContainer>
      <ArrowBackButton
        onPress={() => {
          router.back();
        }}
      />
      <View className={'mt-4 mb-10 flex w-full gap-2'}>
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
