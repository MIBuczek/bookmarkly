import * as Localization from 'expo-localization';

export const getSystemLanguage = () => {
  // Returns an array of locales, ordered by user preference
  const locales = Localization.getLocales();

  // Get the primary language code (e.g., 'en', 'es', 'fr')
  const primaryLanguage = locales[0]?.languageCode;

  // Get the full locale identifier (e.g., 'en-US')
  const fullLocale = locales[0]?.languageTag;

  return {
    languageCode: primaryLanguage, // 'en'
    languageTag: fullLocale, // 'en-US'
    regionCode: locales[0]?.regionCode, // 'US'
  };
};
