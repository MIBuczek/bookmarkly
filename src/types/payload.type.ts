import { TCreateLink, TUpdateLink } from '@/types/links.type';
import { TAddUser, TUserSettings } from '@/types/uset.type';

type TSignItPayload = {
  phone: string;
};

type TSignUpPayload = {
  user: TAddUser;
};

type TVerifyCodePayload = {
  phone: string;
  otp: string;
};

type TAddLinkPayload = {
  link: TCreateLink;
};

type TUpdateLinkPayload = {
  link: TUpdateLink;
};

type TDeleteLinkPayload = {
  id: string;
};

type TUpdateUserSettingsPayload = {
  settings: Partial<TUserSettings>;
};

export type {
  TSignItPayload,
  TSignUpPayload,
  TVerifyCodePayload,
  TAddLinkPayload,
  TUpdateLinkPayload,
  TDeleteLinkPayload,
  TUpdateUserSettingsPayload,
};
