/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */
import { baseColors } from '@/assets/theme/base-theme';

const { colors } = baseColors;
export const Colors = {
  light: {
    primary: colors.dark['900'], // Main brand color (Orange)
    secondary: colors['dark']['700'], // Pomocniczy tekst (#555555)
    title: colors['dark']['900'], // Główny tekst (#000000)
    textColor: colors['dark']['900'], // Główny tekst (#000000)
    background: colors.gray['300'], // Jasne tło (#FBFBFB)
    tint: colors.primary['500'], // Accent color (Orange)
    icon: colors['dark']['700'], // Pomocniczy kolor dla ikon
    tabIconDefault: colors['dark']['600'], // Neutral tab icons
    tabIconSelected: colors.primary['500'], // Highlighted tab icon
    switchActive: colors.primary['500'], // Active switch color
    switchInactive: colors.gray['400'], // Less prominent inactive switch
    switchTrack: colors.gray['500'], // Subtle track for inactive state
  },
  dark: {
    primary: colors.dark['100'], // Main accent color (orange)
    secondary: colors.gray['400'], // Slightly lighter for contrast
    title: colors.gray['200'], // Lighter title for readability (#FAFAFA)
    textColor: colors.gray['300'], // Lighter text for better contrast
    background: colors['dark']['800'], // Ciemne tło (#121212)
    tint: colors.primary['600'], // Accent color (orange)
    icon: colors.gray['500'], // Slightly lighter icons for visibility
    tabIconDefault: colors.gray['500'], // More visible tab icons
    tabIconSelected: colors.primary['600'], // Highlighted tab icon
    switchActive: colors.primary['600'], // Active switch color
    switchInactive: colors.gray['500'], // More visible inactive switch
    switchTrack: colors['dark']['600'], // Darker track for contrast
  },
};
