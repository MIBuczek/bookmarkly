import * as Notifications from 'expo-notifications';

type TUserSettings = {
  avatar: string;
  fontSize: number;
  notification: Notifications.PermissionStatus;
  appearance: 'light' | 'dark' | 'system';
  language: string;
};

type TUser = {
  id: string;
  phone: string;
  tokenVersion: number;
  email: string;
  name: string;
  settings: TUserSettings;
  createdAt: string;
  updatedAt: string;
};

type TAddUser = Omit<TUser, 'id' | 'updatedAt' | 'createdAt' | 'tokenVersion'>;

export type { TUser, TAddUser, TUserSettings };
