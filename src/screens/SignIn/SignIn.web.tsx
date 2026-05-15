import React, { useEffect } from 'react';
import { ThemedText } from '@/components/ui/ThemedText';
import { Image, Pressable, View } from 'react-native';
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
      <View className="my-auto p-10 rounded-lg">
        <View className={'flex p-10 items-center'}>
          <View className="flex-row items-center gap-4">
            <Image
              source={require('@/assets/images/logo.png')}
              style={{ width: 50, height: 50 }}
            />
            <ThemedText type="title" className={'text-dark-600 pb-2'} size={'3xl'}>
              Welcome at Bookmarkly
            </ThemedText>
          </View>
        </View>
        <View className="flex items-center gap-2 pt-10">
          <View className=" flex flex-col justify-center items-center gap-10 w-fit">
            <Controller
              name="phone"
              control={control}
              render={({ field: { value, onChange, onBlur } }) => (
                <>
                  <View className="border-dark-400 flex w-[400px] flex-row items-center rounded-xl border">
                    <Pressable
                      onPress={() => setShowDirectNumberList((prev) => !prev)}
                      className="bg-primary-100 dark:bg-primary-200 h-full flex-row items-center rounded-l-lg px-4"
                    >
                      <ThemedText type="subtitle" className="text-primary-600 font-semibold" size={'sm'}>
                        {selectedPhoneCodes ? `+${selectedPhoneCodes?.dialCode}` : '00'}
                      </ThemedText>
                    </Pressable>
                    <Input
                      inputClassName={'border-0 w-[340px] mb-0 outline-none'}
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
            <Button type={'primary'} title={t('login')} buttonClassName={'w-[180px] h-[55px]'}
                    onPress={handleSubmit(onSubmit)} />
          </View>
          <View className="w-full flex-row items-center justify-center gap-2 mt-4">
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
