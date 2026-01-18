import React, { useCallback, useEffect } from 'react';
import { View } from 'react-native';
import { Input } from '@/components/ui/Input';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { storeActions, useAppDispatch } from '@/store';
import { Button } from '@/components/button/Button';
import { useTranslation } from 'react-i18next';
import { TLink } from '@/types/links.type';
import linkServices from '@/services/link.services';
import { useToast } from 'react-native-toast-notifications';

interface LinkCommentFormProps {
  handleClose: () => void;
  link?: TLink;
}

const commentFormSchema = yup.object().shape({
  comment: yup.string().min(2, 'comment_min_length').max(50, 'comment_max_length').required('comment_required'),
});

type TCommentForm = {
  comment: string;
};

const INITIAL_COMMENT_FORM: TCommentForm = {
  comment: '',
};

export const LinkCommentForm = ({ handleClose, link }: Readonly<LinkCommentFormProps>) => {
  const { t } = useTranslation();
  const toast = useToast();

  const dispatch = useAppDispatch();

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<TCommentForm>({
    defaultValues: INITIAL_COMMENT_FORM,
    resolver: yupResolver(commentFormSchema),
  });

  useEffect(() => {
    setValue('comment', link?.comments || '');
  }, []);

  const onSubmit = useCallback(
    async (data: TCommentForm) => {
      if (!link) return;
      const { comment } = data;
      try {
        const updatedLink = Object.assign({ ...link }, { comments: comment });
        const { data } = await linkServices.updateLink(link.id, updatedLink);
        dispatch(
          storeActions.links.updateLink({
            link: data,
          }),
        );
        toast.show('[Success] : Link was updated', { type: 'success' });
      } catch (e) {
        toast.show('[Error] : Comment could not be added', { type: 'error' });
        console.error('[onSubmit - ADD COMMENT ]:', e);
      } finally {
        reset(INITIAL_COMMENT_FORM);
        handleClose();
      }
    },
    [link?.id, dispatch, reset, handleClose],
  );

  return (
    <View className={'flex-1 items-stretch justify-start gap-6 px-8 pt-2'}>
      <Controller
        name="comment"
        control={control}
        render={({ field: { value, onChange, onBlur } }) => (
          <Input
            label={`${link?.comments ? t('edit_your_personal_comment') : t('add_your_personal_comment')}`}
            labelClassName={'pb-2'}
            placeholder={t('write_your_comment')}
            inputClassName={'h-32 w-full'}
            multiline={true}
            numberOfLines={5}
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            error={errors.comment}
          />
        )}
      />
      <View className={'mt-auto w-full flex-row justify-between gap-2'}>
        <Button buttonClassName={'w-1/2'} type={'secondary'} title={t('cancel')} onPress={handleClose} />
        <Button
          buttonClassName={'w-1/2'}
          type={'primary'}
          title={link?.comments ? t('edit') : t('add')}
          onPress={handleSubmit(onSubmit)}
        />
      </View>
    </View>
  );
};
