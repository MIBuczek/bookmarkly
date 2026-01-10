export type TSettingsOptions = 'avatar' | 'notification' | 'appearance' | 'language' | 'storage' | 'none';
export type TSettingsContent = { [x in TSettingsOptions]: React.ReactNode | null };
export type TSettingsContentSize = { [x in TSettingsOptions]: number };

export const LAND_OPTIONS = [
  {
    name: 'United State',
    isoCode: 'en',
  },
  {
    name: 'German',
    isoCode: 'de',
  },
  {
    name: 'France',
    isoCode: 'fr',
  },
  {
    name: 'Polish',
    isoCode: 'pl',
  },
] as const;

export const SETTING_CONTENT_OPTIONS: TSettingsOptions[] = [
  'notification',
  'appearance',
  'language',
  'storage',
] as const;

export const SETTINGS_CONTENT_SIZE = {
  avatar: 70,
  notification: 30,
  appearance: 35,
  language: 60,
  storage: 30,
  none: 0,
} as const;
