import React, { useCallback, useEffect } from 'react';
import { View } from 'react-native';
import { Input } from '@/components/ui/Input';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { storeActions, useAppDispatch } from '@/store';
import { Button } from '@/components/button/Button';
import { Link } from '@/store/link';

interface LinkCommentFormProps {
  handleClose: () => void;
  link?: Link;
}

const commentFormSchema = yup.object().shape({
  comment: yup
    .string()
    .min(2, 'Komentarz musi mieć co najmniej 2 znaki')
    .max(50, 'Komentarz nie może przekraczać 50 znaków')
    .required('Komentarz jest wymagany'),
});

type TCommentForm = {
  comment: string;
};

const INITIAL_COMMENT_FORM: TCommentForm = {
  comment: '',
};

export const LinkCommentForm = ({ handleClose, link }: Readonly<LinkCommentFormProps>) => {
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
    (data: TCommentForm) => {
      if (!link) return;
      dispatch(
        storeActions.links.updateLink({
          link: { id: link.id, comments: data.comment },
        }),
      );
      reset(INITIAL_COMMENT_FORM);
      handleClose();
    },
    [link?.id, dispatch, reset, handleClose],
  );

  return (
    <View className={'flex-1 items-center justify-start gap-6 px-8 pt-2'}>
      <Controller
        name="comment"
        control={control}
        render={({ field: { value, onChange, onBlur } }) => (
          <Input
            label={`${link?.comments ? 'Edit' : 'Add'} your personal comment`}
            labelClassName={'pb-2'}
            placeholder={'Write your comment'}
            inputClassName={'h-32'}
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
        <Button buttonClassName={'w-1/2'} type={'secondary'} title={'Close'} onPress={handleClose} />
        <Button
          buttonClassName={'w-1/2'}
          type={'primary'}
          title={link?.comments ? 'Edit' : 'Add'}
          onPress={handleSubmit(onSubmit)}
        />
      </View>
    </View>
  );
};
