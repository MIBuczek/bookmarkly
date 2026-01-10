import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';
import en from '@/locales/en.json';
import pl from '@/locales/pl.json';

const resources = {
  en: {
    translation: en,
  },
  pl: {
    translation: pl,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: Localization.getLocales()[0].languageCode ?? 'en', // Set the initial language based on the device's locale
  fallbackLng: 'en', // Fallback language if the device's locale is not supported
  interpolation: {
    escapeValue: false, // React already escapes values
  },
});

export default i18n;
