import { Storage } from 'redux-persist';

export type  LocalStorageType = Storage & { clearStorage: () => Promise<boolean>; getTotalSize: () => Promise<number> }