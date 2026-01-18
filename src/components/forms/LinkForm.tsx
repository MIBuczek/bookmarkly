import React, { useCallback, useEffect, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Input } from '@/components/ui/Input';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { storeActions, useAppDispatch } from '@/store';
import { Button } from '@/components/button/Button';
import { Tags } from '@/components/Tags';
import { FontAwesome } from '@expo/vector-icons';
import { Colors } from '@/constants/colors';
import { ErrorText } from '@/components/ui/ErrorText';
import { cloneDeep, isNumber } from 'lodash-es';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useTranslation } from 'react-i18next';
import { TLink } from '@/types/links.type';
import linkServices from '@/services/link.services';
import { useToast } from 'react-native-toast-notifications';

const linkFormSchema = yup.object().shape({
  title: yup.string().min(2, 'title_min_length').max(100, 'title_max_length').required('title_required'),
  description: yup
    .string()
    .min(2, 'description_min_length')
    .max(300, 'description_max_length')
    .required('description_required'),
  tag: yup.string().defined().default('').max(20, 'Tag cannot exceed 20 characters'),
});

type TLinkForm = {
  title: string;
  description: string;
  tag: string;
};

const INITIAL_LINK_FORM: TLinkForm = {
  title: '',
  description: '',
  tag: '',
};

interface LinkFormProps {
  handleClose: () => void;
  link?: TLink;
  formState: 'new' | 'edit';
}

export const LinkForm = ({ handleClose, link, formState }: Readonly<LinkFormProps>) => {
  const theme = useColorScheme() ?? 'light';
  const { t } = useTranslation();
  const toast = useToast();

  const dispatch = useAppDispatch();

  const [formTags, setFormTags] = useState<string[]>([]);
  const [editTagIndex, setEditTagIndex] = useState<number | null>(null);

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<TLinkForm>({
    defaultValues: { ...INITIAL_LINK_FORM },
    resolver: yupResolver(linkFormSchema),
  });

  useEffect(() => {
    reset({
      ...INITIAL_LINK_FORM,
      title: link?.title || '',
      description: link?.description || '',
    });
    setFormTags(link?.tags ?? []);
  }, []);

  const addTag = useCallback(() => {
    if (formTags.length > 10) return;
    const tag = watch('tag');
    if (!tag) return;
    if (isNumber(editTagIndex)) {
      const _formTags = cloneDeep(formTags);
      _formTags[editTagIndex] = tag;
      setFormTags(_formTags);
      setEditTagIndex(null);
    } else if (formTags.includes(tag)) {
      setFormTags([...formTags.filter((_tag) => _tag !== tag), tag]);
    } else {
      setFormTags([...formTags, tag]);
    }
    setValue('tag', '');
  }, [formTags, editTagIndex]);

  const editTag = useCallback(
    (_tag: string) => {
      const _index = formTags.indexOf(_tag);
      if (_index === -1) return;
      setEditTagIndex(_index);
      setValue('tag', _tag);
    },
    [formTags],
  );

  const removeTag = useCallback(() => {
    if (editTagIndex === null) return;
    setFormTags((prev) => {
      return prev.filter((_, index) => index !== editTagIndex);
    });
    setEditTagIndex(null);
    setValue('tag', '');
  }, [formTags, editTagIndex]);

  const saveNewLinkCallback = async (_link: TLink) => {
    try {
      const { data } = await linkServices.addLink(_link);
      dispatch(
        storeActions.links.addLink({
          link: data,
        }),
      );
      toast.show('[Success] : Link was saved', { type: 'success' });
    } catch (e) {
      toast.show('[Error] : Link could not be saved', { type: 'error' });
      console.error('[saveNewLinkCallback]:', e);
    } finally {
      setFormTags([]);
      reset(INITIAL_LINK_FORM);
      handleClose();
    }
  };

  const updateLinkCallback = async (_link: TLink) => {
    try {
      const { data } = await linkServices.updateLink(_link.id, _link);
      dispatch(
        storeActions.links.updateLink({
          link: data,
        }),
      );
      toast.show('[Success] : Link was updated', { type: 'success' });
    } catch (e) {
      toast.show('[Error] : Link could not be updated', { type: 'error' });
      console.error('[updateLinkCallback]:', e);
    } finally {
      setFormTags([]);
      reset(INITIAL_LINK_FORM);
      handleClose();
    }
  };

  const onSubmit = useCallback(
    async (data: TLinkForm) => {
      if (!link) return;
      const { title, description } = data;
      const _link = Object.assign({ ...link }, { title, description, tags: formTags });
      if (formState === 'new') {
        await saveNewLinkCallback(_link);
        return;
      }
      await updateLinkCallback(_link);
    },
    [link, dispatch, reset, handleClose, formTags],
  );

  return (
    <View className={'flex-1 justify-start gap-4 px-8 pt-2'}>
      <Controller
        name="title"
        control={control}
        render={({ field: { value, onChange, onBlur } }) => (
          <Input
            label={t('title')}
            labelClassName={'pb-2'}
            placeholder={t('write_your_title')}
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            error={errors.title}
          />
        )}
      />
      <Controller
        name="description"
        control={control}
        render={({ field: { value, onChange, onBlur } }) => (
          <Input
            label={t('description')}
            labelClassName={'pb-2'}
            placeholder={t('write_your_description')}
            inputClassName={'h-32'}
            multiline={true}
            numberOfLines={5}
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            error={errors.description}
          />
        )}
      />
      <Controller
        name="tag"
        control={control}
        render={({ field: { value, onChange, onBlur } }) => (
          <Input
            label={t('tags')}
            labelClassName={' pb-2'}
            placeholder={t('write_your_tag')}
            value={value || ''}
            onChangeText={onChange}
            onBlur={onBlur}
            error={errors.tag}
          >
            <View
              className={
                'border-primary-500 bg-primary-500 absolute right-0 bottom-0 h-[50px] flex-row gap-1 rounded-r-xl border-2 p-1'
              }
            >
              {editTagIndex !== null && (
                <TouchableOpacity
                  className={'flex items-center justify-center rounded-2xl bg-white px-4 py-2'}
                  onPress={removeTag}
                >
                  <FontAwesome name="trash" size={18} color={'#ef4444'} />
                </TouchableOpacity>
              )}
              <TouchableOpacity
                className={'flex items-center justify-center rounded-2xl bg-white px-3 py-1'}
                onPress={addTag}
              >
                {isNumber(editTagIndex) ? (
                  <MaterialIcons name="swap-horizontal-circle" size={24} color={Colors[theme].primary} />
                ) : (
                  <FontAwesome name="plus-circle" size={24} color={Colors[theme].primary} />
                )}
              </TouchableOpacity>
            </View>
          </Input>
        )}
      />
      <View>
        <Tags tags={formTags} onPressAction={editTag} />
        {formTags.length > 10 && <ErrorText errorMsg={t('no_more_than_10_tags')} />}
      </View>
      <View className={'mt-auto w-full flex-row justify-between gap-2'}>
        <Button buttonClassName={'w-1/2'} type={'secondary'} title={t('cancel')} onPress={handleClose} />
        <Button
          buttonClassName={'w-1/2'}
          type={'primary'}
          title={formState === 'edit' ? t('edit') : t('add')}
          onPress={handleSubmit(onSubmit)}
        />
      </View>
    </View>
  );
};
