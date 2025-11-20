import React, { useEffect } from 'react';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { router, Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/useColorScheme';
import '@/global.css';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useColorScheme as useNativeWindColorScheme } from 'nativewind';
import { LOCAL_STORAGE_KEY, localAppStorage } from '@/providers/local-app-storage';
import { Provider } from 'react-redux';
import { store } from '@/store';
import { ThemeType } from '@/components/bottom-sheet/SettingsBottomSheet';
import { I18nextProvider, useTranslation } from 'react-i18next';
import i18Settings from '../i18n';
import { ToastProvider } from 'react-native-toast-notifications';
import { ToastMessage } from '@/components/ToastMessage';

/**
 * TODO LIST
 * - Add services
 * - Create firebase project with functions
 * - Write js doc
 * - Separate duplicated component
 */

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
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

  useEffect(() => {
    const _theme = localAppStorage.getLocalData<ThemeType>(LOCAL_STORAGE_KEY.THEME);
    if (_theme) {
      colorNativeWindScheme.setColorScheme(_theme);
      return;
    }
    if (colorScheme === 'dark') {
      colorNativeWindScheme.setColorScheme('dark');
      return;
    }
    colorNativeWindScheme.setColorScheme('light');
  }, [colorScheme]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync().then(() => {
        const lang = localAppStorage.getLocalData<string>(LOCAL_STORAGE_KEY.LANGUAGE);
        void i18n.changeLanguage(lang || 'en');
        const btdt = localAppStorage.getLocalData<boolean>(LOCAL_STORAGE_KEY.ONBOARDING);
        if (btdt) router.navigate('/(login)');
        else router.navigate('/(onboarding)');
      });
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18Settings}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <ToastProvider placement="top" offset={10} renderToast={(props) => <ToastMessage {...props} />}>
              <Stack initialRouteName="(onboarding)">
                <Stack.Screen name="(onboarding)" options={{ headerShown: false }} />
                <Stack.Screen name="(login)" options={{ headerShown: false }} />
                <Stack.Screen name="(main)" options={{ headerShown: false }} />
                <Stack.Screen name="+not-found" />
              </Stack>
              <StatusBar style="auto" />
            </ToastProvider>
          </ThemeProvider>
        </GestureHandlerRootView>
      </I18nextProvider>
    </Provider>
  );
}
