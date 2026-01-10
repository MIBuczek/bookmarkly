import { TUserSettings } from '@/types/uset.type';
import { useToast } from 'react-native-toast-notifications';
import userServices from '@/services/user.service';
import { storeActions, useAppDispatch, useAppSelector } from '@/store';
import { ThemeType } from '@/components/bottom-sheet/SettingsBottomSheet';

export function useUpdateSettings() {
  const toast = useToast();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);

  const getSelectedSettings = <T extends string | boolean | number | ThemeType>(key: keyof TUserSettings): T | undefined => {
    return user?.settings?.[key] as T;
  };

  const updateSettings = async (settings: Partial<TUserSettings>) => {
    if (!user) return;
    try {
      const updatedSettings = Object.assign({ ...user.settings }, settings);
      console.log(updatedSettings);
      await userServices.updateUserSettings({ settings: updatedSettings });
      dispatch(storeActions.user.updateUserSettings(updatedSettings));
      toast.show('Settings updated successfully', { type: 'success' });
    } catch (error) {
      console.error('[updateSettings]:', error);
      toast.show('[Error] : Could not update settings', { type: 'error' });
    }
  };

  return { getSelectedSettings, updateSettings };
}
