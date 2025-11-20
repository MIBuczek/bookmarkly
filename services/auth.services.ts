import axios from 'axios';
import { AUTH_SING_IN_URL, AUTH_SING_UP_URL, AUTH_VERIFY_CODE_URL } from '@/services/utils';
import { TLoginForm } from '@/screens/Login';
import { TRegistrationForm } from '@/screens/SingUp';
import { TVerifyCodeForm } from '@/screens/VerifyCode';
import { User } from '@/store/user';

type TSingInResponse = {
  message: string;
};

const singIn = async (payload: TLoginForm): Promise<TSingInResponse> => {
  try {
    const response = await axios.post(AUTH_SING_IN_URL, payload);
    return response.data;
  } catch (e) {
    throw new Error('[singIn]' + JSON.stringify(e));
  }
};

type TSingUpResponse = TSingInResponse

const singUp = async (payload: TRegistrationForm): Promise<TSingUpResponse> => {
  try {
    const response = await axios.post(AUTH_SING_UP_URL, payload);
    return response.data;
  } catch (e) {
    throw new Error('[singIn]' + JSON.stringify(e));
  }
};

type TVerifyCodeResponse = {
  message: string;
  user: User;
  token: string;
};

const verifyCode = async (payload: TVerifyCodeForm): Promise<TVerifyCodeResponse> => {
  try {
    const response = await axios.post(AUTH_VERIFY_CODE_URL, payload);
    return response.data;
  } catch (e) {
    throw new Error('[singIn]' + JSON.stringify(e));
  }
};

const authServices = {
  singIn,
  singUp,
  verifyCode,
};

export default authServices;
