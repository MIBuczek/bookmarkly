import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useToast } from 'react-native-toast-notifications';
import { TLink } from '@/types/links.type';
import linkServices from '@/services/link.services';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { router } from 'expo-router';
import { APP_ROUTES } from '@/utils/routes';

const newLinkFormSchema = yup.object().shape({
  url: yup.string().url('url_pattern').required('url_required'),
});

type TNewLinkForm = {
  url: string;
};

const INITIAL_NEW_LINK_FORM: TNewLinkForm = {
  url: '',
};

export default function useScreen() {
  const { t } = useTranslation();
  const toast = useToast();

  const [metadataGenerated, setMetadataGenerated] = useState(false);
  const [metadata, setMetadata] = useState<TLink | undefined>();

  const {
    control,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<TNewLinkForm>({
    defaultValues: INITIAL_NEW_LINK_FORM,
    resolver: yupResolver(newLinkFormSchema),
  });

  const { url } = watch();

  const handleCancel = () => {
    if (metadataGenerated) {
      setMetadataGenerated(false);
      setMetadata(undefined);
    } else {
      router.replace(APP_ROUTES.LIBRARY);
    }
  };

  const handleReset = () => {
    setMetadataGenerated(false);
    reset(INITIAL_NEW_LINK_FORM);
    setMetadata(undefined);
  };

  const onSubmit = async ({ url }: TNewLinkForm) => {
    try {
      const { data } = await linkServices.generateMetadata(url);
      const newLink: TLink = { ...data, tags: [...data.keywords] };
      setMetadata(newLink);
      setMetadataGenerated(true);
    } catch (error) {
      console.error('Error generating metadata: ', error);
      toast.show('[Error] : Metadata could not be generated', { type: 'error' });
    }
  };

  const handleSuccess = () => {
    setMetadataGenerated(false);
    reset(INITIAL_NEW_LINK_FORM);
    setMetadata(undefined);
    router.replace(APP_ROUTES.LIBRARY);
  };

  return {
    t,
    control,
    handleSubmit,
    errors,
    url,
    setValue,
    metadataGenerated,
    metadata,
    onSubmit,
    handleCancel,
    handleReset,
    handleSuccess,
  };
}
