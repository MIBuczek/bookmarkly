import { createMMKV } from 'react-native-mmkv';
import { LocalStorageType } from '@/types/store.type';

const storageNative = createMMKV();

export const reduxStorage: LocalStorageType = {
  setItem: (key, value) => {
    storageNative.set(key, value);
    return Promise.resolve(true);
  },

  getItem: (key) => {
    const value = storageNative.getString(key);
    return Promise.resolve(value);
  },

  removeItem: (key) => {
    storageNative.remove(key);
    return Promise.resolve(true);
  },

  getTotalSize: () => {
    const size = storageNative.size;
    return Promise.resolve(size);
  },

  clearStorage: () => {
    storageNative.clearAll();
    return Promise.resolve(true);
  },
};
