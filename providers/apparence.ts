import { Appearance } from 'react-native';

export const getSystemAppearance = () => {
  const colorScheme = Appearance.getColorScheme();
  return colorScheme || 'light';
};
