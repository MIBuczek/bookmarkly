import { TUser } from '@/types/uset.type';
import { TLink } from '@/types/links.type';
import * as Notifications from 'expo-notifications';

export const mockUser: TUser = {
  id: '1',
  phone: '1234567890',
  tokenVersion: 1,
  email: 'test@example.com',
  name: 'John Doe',
  settings: {
    fontSize: 16,
    notification: Notifications.PermissionStatus.GRANTED,
    appearance: 'system',
    language: 'en',
  },
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

export const mockLinks: TLink[] = [
  {
    id: '1',
    userPhone: '1234567890',
    url: 'https://reactnative.dev',
    title: 'React Native',
    description: 'React Native documentation',
    image: 'https://reactnative.dev/img/tiny_logo.png',
    logo: 'https://reactnative.dev/img/tiny_logo.png',
    author: 'Facebook',
    source: 'reactnative.dev',
    tags: ['react', 'mobile'],
    read: false,
    comments: 'Good docs',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    userPhone: '1234567890',
    url: 'https://expo.dev',
    title: 'Expo',
    description: 'Expo documentation',
    image: 'https://expo.dev/static/images/og-image.png',
    logo: 'https://expo.dev/static/images/og-image.png',
    author: 'Expo',
    source: 'expo.dev',
    tags: ['expo', 'react-native'],
    read: true,
    comments: 'Great platform',
    createdAt: new Date().toISOString(),
  },
];
