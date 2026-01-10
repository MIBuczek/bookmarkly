/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */
import { baseColors } from '@/assets/theme/base-theme';

const { colors } = baseColors;
export const Colors = {
  light: {
    primary: colors.primary['500'], // Main brand color (Orange)
    secondary: colors['dark']['700'], // Slightly darker for contrast
    title: colors['dark']['900'], // Strong contrast for titles
    textColor: colors['dark']['800'], // High readability for text
    background: colors.gray['300'], // Lighter background for clarity
    tint: colors.primary['500'], // Accent color (Orange)
    icon: colors['dark']['700'], // Darker icons for visibility
    tabIconDefault: colors['dark']['600'], // Neutral tab icons
    tabIconSelected: colors.primary['500'], // Highlighted tab icon
    switchActive: colors.primary['500'], // Active switch color
    switchInactive: colors.gray['400'], // Less prominent inactive switch
    switchTrack: colors.gray['500'], // Subtle track for inactive state
  },
  dark: {
    primary: colors.primary['600'], // Main accent color (orange)
    secondary: colors['dark']['500'], // Slightly lighter for contrast
    title: colors.gray['300'], // Lighter title for readability
    textColor: colors.gray['400'], // Slightly lighter text for better contrast
    background: colors['dark']['800'], // Deep dark background
    tint: colors.primary['600'], // Accent color (orange)
    icon: colors.gray['500'], // Slightly lighter icons for visibility
    tabIconDefault: colors.gray['500'], // More visible tab icons
    tabIconSelected: colors.primary['600'], // Highlighted tab icon
    switchActive: colors.primary['600'], // Active switch color
    switchInactive: colors.gray['500'], // More visible inactive switch
    switchTrack: colors['dark']['600'], // Darker track for contrast
  },
};
