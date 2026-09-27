import { safeJsonParse } from '@/utils/helper';
import { createMMKV } from 'react-native-mmkv';

export const LOCAL_STORAGE_KEY = {
  ONBOARDING: 'ONBOARDING',
  TERMS_AND_CONDITIONS: 'TERMS_AND_CONDITIONS',
  THEME: 'THEME',
  FONT_SIZE: 'FONT_SIZE',
  LANGUAGE: 'LANGUAGE',
  PHONE_CODE: 'PHONE_CODE',
  TOKEN: 'TOKEN',
  PHONE_NUMBER: 'PHONE_NUMBER',
} as const;

type KeyOfLocalStorage = keyof typeof LOCAL_STORAGE_KEY;
type LocalStorageValueType = string | number | boolean | object;

class LocalAppStorage {
  private storage = createMMKV();

  getSize() {
    return this.storage.size;
  }

  getLocalData<T extends LocalStorageValueType>(key: KeyOfLocalStorage) {
    return this.getLocalStorageData<T>(key);
  }

  setLocalData<T extends LocalStorageValueType>(key: KeyOfLocalStorage, data: T) {
    this.setLocalStorageData(key, data);
  }

  deleteLocalData(key: KeyOfLocalStorage) {
    this.deleteLocalStorageData(key);
  }

  clearAllData() {
    this.storage.clearAll();
  }

  private getLocalStorageData<T extends LocalStorageValueType>(key: KeyOfLocalStorage): T | null {
    try {
      const _localData = this.storage.getString(key);
      if (!_localData) return null;
      return safeJsonParse<T>(_localData);
    } catch (e) {
      throw new Error('[getStorageData] : ' + JSON.stringify(e));
    }
  }

  private setLocalStorageData<T extends LocalStorageValueType>(key: KeyOfLocalStorage, data: T): void {
    try {
      const _localData = JSON.stringify(data);
      this.storage.set(key, _localData);
    } catch (e) {
      throw new Error('[setLocalStorageData] : ' + JSON.stringify(e));
    }
  }

  private deleteLocalStorageData(key: KeyOfLocalStorage): void {
    try {
      this.storage.remove(key);
    } catch (e) {
      throw new Error('[deleteLocalStorageData] : ' + JSON.stringify(e));
    }
  }
}

export const localAppStorage = new LocalAppStorage();
