/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { Colors } from '@/constants/colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export function useThemeColor(property: keyof typeof Colors.light & keyof typeof Colors.dark) {
  const colorScheme = useColorScheme();
  const theme: keyof typeof Colors = colorScheme === 'dark' ? 'dark' : 'light';
  return Colors[theme][property];
}
