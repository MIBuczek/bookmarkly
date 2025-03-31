import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { TouchableOpacity, View } from 'react-native';
import { ThemedText } from '@/components/ui/ThemedText';
import * as Clipboard from 'expo-clipboard';
import { FontAwesome, Octicons } from '@expo/vector-icons';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/button/Button';
import React, { useState } from 'react';
import { BottomSheet } from '@/components/bottom-sheet/BottomSheet';
import { LinkForm } from '@/components/bottom-sheet/LinkForm';
import { Colors } from '@/constants/colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { twMerge } from 'tailwind-merge';
import { Link, MOCK_LINKS } from '@/store/link';

const newLinkFormSchema = yup.object().shape({
  url: yup.string().url('Podaj poprawny adres URL').required('Adres URL jest wymagany'),
});

type TNewLinkForm = {
  url: string;
};

const INITIAL_NEW_LINK_FORM: TNewLinkForm = {
  url: '',
};

interface NewLinkFormProps {
  visible: boolean;
  onRequestClose: () => void;
}

export const NewLinkForm = ({ visible, onRequestClose }: Readonly<NewLinkFormProps>) => {
  const theme = useColorScheme() ?? 'light';
  const [metadataGenerated, setMetadataGenerated] = useState(false);
  const [metadata, setMetadata] = useState<Link | undefined>();

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

  const onCancel = () => {
    setMetadataGenerated(false);
    reset(INITIAL_NEW_LINK_FORM);
    onRequestClose();
  };

  const onSubmit = (data: TNewLinkForm) => {
    console.log('Wysłane dane:', data);
    setMetadataGenerated(true);
    setMetadata(MOCK_LINKS[0]);
  };

  return (
    <BottomSheet
      height={metadataGenerated ? 85 : 32}
      title={'Add new link'}
      visible={visible}
      onRequestClose={onRequestClose}
    >
      <View className={'flex items-center justify-start gap-6 px-8 py-2'}>
        <ThemedText className={'w-full'}>
          Phasellus vitae pharetra erat. Aliquam in tristique est, eu lobortis ex. Sed et turpis odio.
        </ThemedText>
        <Controller
          name="url"
          control={control}
          render={({ field: { value, onChange, onBlur } }) => (
            <Input
              inputClassName={'lowercase'}
              placeholder={'Past url address'}
              value={value}
              disabled={metadataGenerated}
              onChangeText={onChange}
              onBlur={onBlur}
              error={errors.url}
            >
              <View
                className={twMerge(
                  'absolute bottom-0 right-0 h-[47px] flex-row gap-1 rounded-r-xl border-2 border-primary-500 bg-primary-500 p-1',
                  metadataGenerated ? 'border-gray-800 bg-gray-600' : '',
                )}
              >
                {url ? (
                  <TouchableOpacity
                    className={'flex items-center justify-center rounded-full bg-white px-3 py-2'}
                    disabled={metadataGenerated}
                    onPress={() => {
                      setValue('url', '');
                    }}
                  >
                    <FontAwesome name="trash" size={18} color={metadataGenerated ? Colors[theme].icon : '#ef4444'} />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    className={'flex items-center justify-center rounded-full bg-white px-3 py-2'}
                    disabled={metadataGenerated}
                    onPress={() => {
                      Clipboard.getStringAsync().then((text) => {
                        setValue('url', text);
                      });
                    }}
                  >
                    <Octicons
                      name="paste"
                      size={24}
                      color={metadataGenerated ? Colors[theme].icon : Colors[theme].primary}
                    />
                  </TouchableOpacity>
                )}
              </View>
            </Input>
          )}
        />
        {!metadataGenerated && (
          <View className={'mt-auto w-full flex-row justify-between gap-2'}>
            <Button buttonClassName={'w-1/2'} type={'secondary'} title={'Cancel'} onPress={onCancel} />
            <Button
              buttonClassName={'w-1/2'}
              type={'primary'}
              title={'Generate metadata'}
              onPress={handleSubmit(onSubmit)}
            />
          </View>
        )}
      </View>
      {metadataGenerated && <LinkForm handleClose={onCancel} link={metadata} formState={'new'} />}
    </BottomSheet>
  );
};
