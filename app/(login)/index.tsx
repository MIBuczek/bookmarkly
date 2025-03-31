import React, { useEffect } from 'react';
import { ThemedText } from '@/components/ui/ThemedText';
import { ThemedView } from '@/components/ui/ThemedView';
import { Pressable, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/button/Button';
import { RoundButton } from '@/components/button/RoundButton';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { LogoIcon } from '@/components/svg/LogoIcon';
import { FacebookIcon } from '@/components/svg/FacebookIcon';
import { GoogleIcon } from '@/components/svg/GoogleIcon';
import { useAppSelector } from '@/store';

const loginSchema = yup.object().shape({
  phone: yup
    .string()
    .matches(/^[0-9]{9,15}$/, 'Numer telefonu musi mieć od 9 do 15 cyfr')
    .required('Numer telefonu jest wymagany'),
});

type TLoginForm = {
  phone: string;
};

const INITIAL_LOGIN_FORM: TLoginForm = {
  phone: '',
};

export default function Index() {
  const router = useRouter();

  const { user } = useAppSelector(({ user }) => user);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TLoginForm>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = (data: TLoginForm) => {
    console.log('Wysłane dane:', data);
    router.navigate('/(login)/verify-code');
    reset(INITIAL_LOGIN_FORM);
  };

  useEffect(() => {
    setTimeout(() => {
      if (user) router.navigate('/(main)/(dashboard)');
    }, 100);
  }, []);

  return (
    <ThemedView withIOSPaddingBottom className="flex-1">
      <View className="w-full flex-1 flex-row items-center justify-center bg-primary-100 dark:bg-primary-200">
        <LogoIcon width={50} height={50} />
        <ThemedText type="title" className={'pb-2 text-[40px] text-dark-600'}>
          Bookmarkly
        </ThemedText>
      </View>
      <View className="flex-1 items-start gap-6 border-t-2 border-t-primary-200 px-6 pt-10 dark:border-t-primary-300">
        <ThemedText type="title" className="text-3xl font-extrabold">
          Welcome!
        </ThemedText>
        <View className="flex w-full gap-10">
          <Controller
            name="phone"
            control={control}
            render={({ field: { value, onChange, onBlur } }) => (
              <Input
                placeholder={'Phone number'}
                inputMode={'numeric'}
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
                error={errors.phone}
              />
            )}
          />
          <Button type={'primary'} title={'Login'} onPress={handleSubmit(onSubmit)} />
        </View>
        <View className="w-full flex-row items-center justify-center gap-2">
          <ThemedText type="default">Not a member ?</ThemedText>
          <Pressable
            onPress={() => {
              router.navigate('./(login)/sign-up');
            }}
          >
            <ThemedText type="subtitle" className="text-sm font-semibold text-primary-600">
              Register now
            </ThemedText>
          </Pressable>
        </View>
        <View
          className="flex w-full items-center justify-center gap-4 border-t border-dark-400 pt-6 dark:border-gray-500">
          <ThemedText type="default">or continue with</ThemedText>
          <View className="flex-row items-center justify-center gap-4">
            <RoundButton className={'border-4 border-gray-500 p-0'} onPress={() => {
            }}>
              <FacebookIcon width={50} height={50} />
            </RoundButton>
            <RoundButton className={'border-4 border-gray-500 bg-white p-0'} onPress={() => {
            }}>
              <GoogleIcon width={50} height={50} />
            </RoundButton>
          </View>
        </View>
      </View>
    </ThemedView>
  );
}
