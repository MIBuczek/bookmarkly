import React, { useCallback } from 'react';
import countryTelData, { Country } from 'country-telephone-data';
import { useRouter } from 'expo-router';
import { useToast } from 'react-native-toast-notifications';
import { RootState, storeActions, useAppDispatch, useAppSelector } from '@/store';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import authServices from '@/services/auth.services';
import { APP_ROUTES } from '@/utils/routes';
import { getSystemLanguage } from '@/providers/localization';
import * as yup from 'yup';

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

export default function useScreen() {
  const router = useRouter();
  const toast = useToast();
  const dispatch = useAppDispatch();
  const { phoneCode } = useAppSelector(({ user }: RootState) => user);

  const [showDirectNumberList, setShowDirectNumberList] = React.useState(false);
  const [selectedPhoneCodes, setSelectedPhoneCodes] = React.useState<Country | null>(null);

  const signInForm = useForm<TLoginForm>({
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
      signInForm.reset(INITIAL_LOGIN_FORM);
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

  return {
    signInForm,
    preselectPhoneCode,
    showDirectNumberList,
    setShowDirectNumberList,
    selectedPhoneCodes,
    setSelectedPhoneCodes,
    onSubmit,
    dispatch,
  };
}
