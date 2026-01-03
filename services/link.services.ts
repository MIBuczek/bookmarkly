import { API_URLS, axiosInstance } from './utils';
import { TCreateLink, TLink, TUpdateLink } from '@/types/links.type';

const generateMetadata = async (url: string): Promise<TLink> => {
  try {
    const response = await axiosInstance.post(API_URLS.GENERATE_METADATA_URL, { url });
    return response.data;
  } catch (e) {
    throw new Error('[generateMetadata] ' + JSON.stringify(e));
  }
};

const getAllLink = async (): Promise<{ links: TLink[]; count: number }> => {
  try {
    const response = await axiosInstance.get(API_URLS.LINKS_URL);
    return response.data;
  } catch (e) {
    throw new Error('[getAllLink] ' + JSON.stringify(e));
  }
};

const addLink = async (linkData: TCreateLink): Promise<TLink> => {
  try {
    const response = await axiosInstance.post(API_URLS.LINKS_URL, linkData);
    return response.data;
  } catch (e) {
    throw new Error('[addLink] ' + JSON.stringify(e));
  }
};

const updateLink = async (id: string, linkData: TUpdateLink): Promise<TLink> => {
  try {
    const response = await axiosInstance.patch(`${API_URLS.LINKS_URL}/${id}`, linkData);
    return response.data;
  } catch (e) {
    throw new Error('[updateLink] ' + JSON.stringify(e));
  }
};

const deleteLink = async (id: string): Promise<void> => {
  try {
    await axiosInstance.delete(`${API_URLS.LINKS_URL}/${id}`);
  } catch (e) {
    throw new Error('[deleteLink] ' + JSON.stringify(e));
  }
};

const linkServices = {
  addLink,
  updateLink,
  deleteLink,
  getAllLink,
  generateMetadata,
};

export default linkServices;
