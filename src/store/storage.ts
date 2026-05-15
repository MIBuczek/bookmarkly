import { createMMKV } from 'react-native-mmkv';
import { LocalStorageType } from '@/types/store.type';
import { IS_WEB } from '@/utils/device-info';

const storageNative = createMMKV();
let webStorage: Record<string, any> = {};

export const reduxStorage: LocalStorageType = {

  setItem: (key, value) => {
    if (IS_WEB) {
      webStorage[key] = value;
    } else {
      storageNative.set(key, value);
    }
    return Promise.resolve(true);
  },

  getItem: (key) => {
    let value;
    if (IS_WEB) {
      value = webStorage[key];
    } else {
      value = storageNative.getString(key);
    }
    return Promise.resolve(value);
  },

  removeItem: (key) => {
    if (IS_WEB) {
      delete webStorage[key];
    } else {
      storageNative.remove(key);
    }
    return Promise.resolve(true);
  },

  getTotalSize: () => {
    let size = 0;
    if (!IS_WEB) {
      size = storageNative.size;
    }
    return Promise.resolve(size);
  },

  clearStorage: () => {
    if (IS_WEB) {
      webStorage = {};
    } else {
      storageNative.clearAll();
    }
    return Promise.resolve(true);
  },
};