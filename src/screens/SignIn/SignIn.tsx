import React, { useEffect } from 'react';
import { ThemedText } from '@/components/ui/ThemedText';
import { Pressable, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/button/Button';
import { Controller } from 'react-hook-form';
import { storeActions } from '@/store';
import { useTranslation } from 'react-i18next';
import { ScreenContainer } from '@/components/ui/ScreenContainer';
import { BottomSheet } from '@/components/bottom-sheet/BottomSheet';
import { Country } from 'country-telephone-data';
import { ErrorText } from '@/components/ui/ErrorText';
import Logo from '@/components/Logo';
import { APP_ROUTES } from '@/utils/routes';
import useScreen from '@/screens/SignIn/useScreen';
import { PhoneCodeBottomSheet } from '@/screens/SignIn/components/PhoneCodeBottomSheet';

export default function SignInScreen() {
  const { t } = useTranslation();
  const router = useRouter();

  const {
    dispatch,
    signInForm: {
      control,
      handleSubmit,
      formState: { errors },
    },
    preselectPhoneCode,
    selectedPhoneCodes,
    setSelectedPhoneCodes,
    showDirectNumberList,
    setShowDirectNumberList,
    onSubmit,
  } = useScreen();

  useEffect(preselectPhoneCode, []);

  return (
    <ScreenContainer>
      <Logo className={'flex-1'} />
      <View className="border-t-primary-200 dark:border-t-primary-300 flex flex-1 items-start gap-6 border-t-2 pt-10">
        <ThemedText type="title" className="font-extrabold" size={'3xl'}>
          {t('welcome')}
        </ThemedText>
        <View className="w-full flex-1 gap-2">
          <Controller
            name="phone"
            control={control}
            render={({ field: { value, onChange, onBlur } }) => (
              <>
                <View className="border-dark-400 flex h-fit w-full flex-row items-center rounded-xl border">
                  <Pressable
                    onPress={() => setShowDirectNumberList((prev) => !prev)}
                    className="bg-primary-100 dark:bg-primary-200 h-full flex-row items-center rounded-l-xl px-4"
                  >
                    <ThemedText type="subtitle" className="text-primary-600 font-semibold" size={'sm'}>
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
          <ThemedText type="default" size={'sm'}>
            {t('not_a_member')}
          </ThemedText>
          <Pressable
            onPress={() => {
              router.navigate(APP_ROUTES.SIGN_UP);
            }}
          >
            <ThemedText type="subtitle" className="text-primary-600 font-semibold" size={'sm'}>
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
