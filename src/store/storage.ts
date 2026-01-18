import { Storage } from 'redux-persist';
import { MMKV } from 'react-native-mmkv';

const storage = new MMKV();

export const reduxStorage: Storage & { clearStorage: () => Promise<void>; getTotalSize: () => Promise<number> } = {
  setItem: (key, value) => {
    storage.set(key, value);
    return Promise.resolve(true);
  },
  getItem: (key) => {
    const value = storage.getString(key);
    return Promise.resolve(value);
  },
  removeItem: (key) => {
    storage.delete(key);
    return Promise.resolve();
  },
  getTotalSize: () => {
    return Promise.resolve(storage.size);
  },
  clearStorage: () => {
    storage.clearAll();
    return Promise.resolve();
  },
};
