import { Appearance } from 'react-native';

export const getSystemAppearance = (): 'light' | 'dark' | 'system' => {
  const colorScheme = Appearance.getColorScheme();
  if (colorScheme === 'dark') return 'dark';
  return 'light';
};
