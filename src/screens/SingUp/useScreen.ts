import { useToast } from 'react-native-toast-notifications';
import { storeActions, useAppDispatch } from '@/store';
import { useCallback, useEffect, useMemo, useState } from 'react';
import countryList, { Country } from 'country-list';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { getSystemLanguage } from '@/providers/localization';
import countryTelData, { Country as PhoneCountryCode } from 'country-telephone-data';
import { TAddUser, TUserSettings } from '@/types/uset.type';
import { checkPushNotificationsStatus } from '@/providers/push-notification';
import { getSystemAppearance } from '@/providers/apparence';
import authServices from '@/services/auth.services';
import { router } from 'expo-router';
import { APP_ROUTES } from '@/utils/routes';
import * as yup from 'yup';

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

export default function useScreen() {
  const toast = useToast();
  const dispatch = useAppDispatch();

  const [showCountryList, setShowCountryList] = useState(false);
  const [showTermsAndConditions, setShowTermsAndConditions] = useState(false);
  const [countries, setCountries] = useState<Country[]>([]);

  const registrationForm = useForm<TRegistrationForm>({
    defaultValues: INITIAL_REGISTRATION_FORM,
    resolver: yupResolver(registrationSchema),
  });

  const selectedCountry = registrationForm.watch('country');

  /**
   * Loads the list of countries from the country-list library.
   */
  const loadCountries = useCallback(() => {
    const _countries = countryList.getData();
    setCountries(_countries);
    /* Preselect user country */
    const language = getSystemLanguage();
    const systemRegionCode = (language.regionCode || language.languageCode?.split('-')[1] || 'PL').toUpperCase();

    const systemCountry = _countries.find((c) => c.code === systemRegionCode);
    if (systemCountry) {
      registrationForm.setValue('country', systemCountry);
    }
  }, [registrationForm, countryList, setCountries]);

  useEffect(loadCountries, []);

  const handleCountrySelection = (_country: Country) => {
    registrationForm.setValue('country', _country);
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
      registrationForm.reset(INITIAL_REGISTRATION_FORM);
    } catch (error) {
      console.error('[onSubmit]:', error);
      toast.show('[Error] : Wrong phone number', { type: 'error' });
    }
  };

  return {
    dispatch,
    loadCountries,
    registrationForm,
    showCountryList,
    setShowCountryList,
    countries,
    selectedCountry,
    handleCountrySelection,
    showTermsAndConditions,
    setShowTermsAndConditions,
    onSubmit,
  };
}
