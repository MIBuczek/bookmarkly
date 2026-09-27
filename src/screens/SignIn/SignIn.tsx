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
import { APP_ROUTES } from '@/utils/routes';
import useScreen from '@/screens/SignIn/useScreen';
import { PhoneCodeBottomSheet } from '@/screens/SignIn/components/PhoneCodeBottomSheet';
import { BottomViewButton } from '@/components/ui/BottomViewButton';
import { ReadMeLogo } from '@/components/ui/ReadMeLogo';

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
      <View className="relative flex-1  justify-stretch items-start gap-10">
        <View className="py-20 pb-4 h-1/3">
          <ThemedText type="title" className="font-black uppercase" size={'2xl'}>
            {t('welcome')}
          </ThemedText>
          <ReadMeLogo />
        </View>
        <View className="w-full gap-4">
          <Controller
            name="phone"
            control={control}
            render={({ field: { value, onChange, onBlur } }) => (
              <View>
                <View className="flex h-16 w-full flex-row items-center border-2 border-black dark:border-white">
                  <Pressable
                    onPress={() => setShowDirectNumberList((prev) => !prev)}
                    className="h-full flex-row items-center border-r-2 border-black px-4 dark:border-white"
                  >
                    <ThemedText type="subtitle" className="font-bold" size={'lg'}>
                      {selectedPhoneCodes ? `+${selectedPhoneCodes?.dialCode}` : '00'}
                    </ThemedText>
                  </Pressable>
                  <Input
                    inputClassName={'border-0 text-lg font-medium'}
                    placeholder={t('phone_number')}
                    inputMode={'numeric'}
                    value={value}
                    onBlur={onBlur}
                    onChangeText={onChange}
                  />
                </View>
                {errors.phone && <ErrorText errorMsg={t(errors.phone.message || '')} />}
              </View>
            )}
          />
          <Button
            type={'primary'}
            title={t('login').toUpperCase()}
            buttonClassName={'mt-2 h-16 rounded-none bg-black dark:bg-white'}
            titleClassName={'text-white dark:text-black font-black'}
            onPress={handleSubmit(onSubmit)}
          />
        </View>
        <BottomViewButton>
          <ThemedText type="default" size={'md'} className="uppercase text-white opacity-80">
            {t('not_a_member')}
          </ThemedText>
          <Pressable
            onPress={() => {
              router.navigate(APP_ROUTES.SIGN_UP);
            }}
          >
            <ThemedText type="subtitle" className="font-bold uppercase text-white underline" size={'md'}>
              {t('register')}
            </ThemedText>
          </Pressable>
        </BottomViewButton>
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
