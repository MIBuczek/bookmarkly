import { API_URLS, axiosInstance } from '@/services/utils';
import { TSignItPayload, TSignUpPayload, TVerifyCodePayload } from '@/types/payload.type';
import { TUser } from '@/types/uset.type';

type TSingInResponse = {
  message: string;
};

const singIn = async (payload: TSignItPayload): Promise<TSingInResponse> => {
  try {
    const response = await axiosInstance.post(API_URLS.AUTH_SING_IN_URL, payload);
    return response.data;
  } catch (e) {
    throw new Error('[singIn] ' + JSON.stringify(e));
  }
};

type TSingUpResponse = TSingInResponse;

const singUp = async (payload: TSignUpPayload): Promise<TSingUpResponse> => {
  try {
    const response = await axiosInstance.post(API_URLS.AUTH_SING_UP_URL, { body: payload });
    return response.data;
  } catch (e) {
    throw new Error('[singUp] ' + JSON.stringify(e));
  }
};

type TVerifyCodeResponse = {
  message: string;
  user: TUser;
  token: string;
};

const verifyCode = async (payload: TVerifyCodePayload): Promise<TVerifyCodeResponse> => {
  try {
    const response = await axiosInstance.post<TVerifyCodeResponse>(API_URLS.AUTH_VERIFY_CODE_URL, payload);
    return response.data;
  } catch (e) {
    throw new Error('[verifyCode] ' + JSON.stringify(e));
  }
};

type TVerifySessionResponse = {
  valid: boolean;
  user: TUser | null;
};

const verifySession = async (): Promise<TVerifySessionResponse> => {
  try {
    const response = await axiosInstance.get<TVerifySessionResponse>(API_URLS.AUTH_VERIFY_SESSION);
    return response.data;
  } catch (e) {
    throw new Error('[verifySession] ' + JSON.stringify(e));
  }
};

const authServices = {
  singIn,
  singUp,
  verifyCode,
  verifySession,
};

export default authServices;
