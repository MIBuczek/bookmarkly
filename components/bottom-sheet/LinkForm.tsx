import React, { useCallback, useEffect, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Input } from '@/components/ui/Input';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { storeActions, useAppDispatch } from '@/store';
import { Button } from '@/components/button/Button';
import { Link } from '@/store/link';
import { Tags } from '@/components/Tags';
import { FontAwesome } from '@expo/vector-icons';
import { Colors } from '@/constants/colors';
import { ErrorText } from '@/components/ui/ErrorText';
import { cloneDeep, isNumber } from 'lodash-es';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useColorScheme } from '@/hooks/useColorScheme';

const linkFormSchema = yup.object().shape({
  title: yup
    .string()
    .min(2, 'Title must be at least 2 characters')
    .max(50, 'Title cannot exceed 50 characters')
    .required('Title is required'),
  description: yup
    .string()
    .min(2, 'Description must be at least 2 characters')
    .max(100, 'Description cannot exceed 100 characters')
    .required('Description is required'),
  tag: yup.string().max(20, 'Tag cannot exceed 50 characters'),
});

type TLinkForm = {
  title: string;
  description: string;
  tag?: string | undefined;
};

const INITIAL_LINK_FORM: TLinkForm = {
  title: '',
  description: '',
  tag: '',
};

interface LinkFormProps {
  handleClose: () => void;
  link?: Link;
  formState: 'new' | 'edit';
}

export const LinkForm = ({ handleClose, link, formState }: Readonly<LinkFormProps>) => {
  const theme = useColorScheme() ?? 'light';
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

  const clearTag = useCallback(() => {
    setEditTagIndex(null);
    setValue('tag', '');
  }, [formTags, editTagIndex]);

  const onSubmit = useCallback(
    (data: TLinkForm) => {
      if (!link) return;
      const { title, description } = data;
      dispatch(
        storeActions.links.updateLink({
          link: { ...link, title, description, tags: formTags },
        }),
      );
      setFormTags([]);
      reset(INITIAL_LINK_FORM);
      handleClose();
    },
    [link, dispatch, reset, handleClose, formTags],
  );

  return (
    <View className={'flex-1 items-center justify-start gap-6 px-8 pt-2'}>
      <Controller
        name="title"
        control={control}
        render={({ field: { value, onChange, onBlur } }) => (
          <Input
            label={'Title'}
            labelClassName={'pb-2'}
            placeholder={'Write your title'}
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
            label={'Description'}
            labelClassName={'pb-2'}
            placeholder={'Write your description'}
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
            label={'Add Tag'}
            labelClassName={' pb-2'}
            placeholder={'Write your tag'}
            value={value || ''}
            onChangeText={onChange}
            onBlur={onBlur}
            error={errors.tag}
          >
            <View
              className={
                'absolute bottom-0 right-0 h-[47px] flex-row gap-1 rounded-r-xl border-2 border-primary-500 bg-primary-500 p-1'
              }
            >
              <TouchableOpacity
                className={'flex items-center justify-center rounded-full bg-white px-3 py-2'}
                onPress={clearTag}
              >
                <FontAwesome name="trash" size={18} color={'#ef4444'} />
              </TouchableOpacity>
              <TouchableOpacity
                className={'flex items-center justify-center rounded-full bg-white px-2 py-1'}
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
        {formTags.length > 10 && <ErrorText errorMsg={'No more then 10 tags'} />}
      </View>
      <View className={'mt-auto w-full flex-row justify-between gap-2'}>
        <Button buttonClassName={'w-1/2'} type={'secondary'} title={'Close'} onPress={handleClose} />
        <Button
          buttonClassName={'w-1/2'}
          type={'primary'}
          title={formState === 'edit' ? 'Edit' : 'Add'}
          onPress={handleSubmit(onSubmit)}
        />
      </View>
    </View>
  );
};
