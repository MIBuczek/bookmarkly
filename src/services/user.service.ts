import { API_URLS, axiosInstance } from '@/services/utils';
import { TUpdateUserSettingsPayload } from '@/types/payload.type';

const updateUserSettings = async (payload: TUpdateUserSettingsPayload): Promise<{ message: string }> => {
  try {
    const response = await axiosInstance.patch(API_URLS.USER_SETTINGS_URL, payload);
    return response.data;
  } catch (e) {
    throw new Error('[updateUserSettings] ' + JSON.stringify(e));
  }
};

const userServices = {
  updateUserSettings,
};

export default userServices;
