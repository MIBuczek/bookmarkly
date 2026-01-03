import { TUserSettings } from '@/types/uset.type';
import { useToast } from 'react-native-toast-notifications';
import userServices from '@/services/user.service';

export function useUpdateSettings() {
  const toast = useToast();
  const updateSettings = async (settings: Partial<TUserSettings>) => {
    try {
      await userServices.updateUserSettings({ settings });
      toast.show('Settings updated successfully', { type: 'success' });
    } catch (error) {
      console.error('[updateSettings]:', error);
      toast.show('[Error] : Could not update settings', { type: 'error' });
    }
  };

  return { updateSettings };
}
