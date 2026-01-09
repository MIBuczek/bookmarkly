import { PropsWithChildren, useCallback, useEffect } from 'react';
import { useAuthGuard } from '@/hooks/useAuthGuard';
import { useTranslation } from 'react-i18next';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useColorScheme as useNativeWindColorScheme } from 'nativewind/dist/stylesheet';
import { RootState, useAppSelector } from '@/store';
import * as SplashScreen from 'expo-splash-screen';
import { router } from 'expo-router';
import { useFonts } from 'expo-font';
import { APP_ROUTES } from '@/utils/routes';


export default function AppInitialSettings({ children }: PropsWithChildren) {
  const { checkToken } = useAuthGuard();

  const { i18n } = useTranslation();
  const colorScheme = useColorScheme();
  const colorNativeWindScheme = useNativeWindColorScheme();

  const [loaded] = useFonts({
    InterRegular: require('../assets/fonts/Inter-Regular.ttf'),
    InterMedium: require('../assets/fonts/Inter-Medium.ttf'),
    InterSemiBold: require('../assets/fonts/Inter-SemiBold.ttf'),
    InterBold: require('../assets/fonts/Inter-Bold.ttf'),
    InterExtraBold: require('../assets/fonts/Inter-ExtraBold.ttf'),
  });

  const { user, onboarded } = useAppSelector((state: RootState) => state.user);

  const initApp = useCallback(async () => {
    await SplashScreen.hideAsync();
    if (!onboarded) {
      router.navigate(APP_ROUTES.ONBOARDING);
      return;
    }
    await checkToken();
  }, [checkToken]);

  const initTranslationLang = useCallback(async () => {
    let lang = 'en';
    if (user?.settings.language) lang = user?.settings.language;
    await i18n.changeLanguage(lang);
  }, [i18n, user?.settings.language]);

  const initColorSchema = useCallback(() => {
    const _theme = user?.settings.appearance;
    if (_theme) {
      colorNativeWindScheme.setColorScheme(_theme);
      return;
    }
    if (colorScheme === 'dark') {
      colorNativeWindScheme.setColorScheme('dark');
      return;
    }
    colorNativeWindScheme.setColorScheme('light');
  }, [colorScheme, user]);

  useEffect(() => {
    initApp().then(() => {
      void initTranslationLang();
      void initColorSchema();
    });
  }, [loaded]);


  return children;
}