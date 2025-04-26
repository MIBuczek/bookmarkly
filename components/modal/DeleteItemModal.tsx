import { ThemedText } from '@/components/ui/ThemedText';
import { View } from 'react-native';
import { Button } from '@/components/button/Button';
import React from 'react';
import { useTranslation } from 'react-i18next';

interface DeleteItemModalProps {
  handleConfirmAction: () => void;
  handleCancelAction: () => void;
}

export const DeleteItemModal = ({ handleConfirmAction, handleCancelAction }: Readonly<DeleteItemModalProps>) => {
  const { t } = useTranslation();

  return (
    <View className={'flex items-center justify-center gap-2 px-4'}>
      <ThemedText type="title" className={'text-lg'}>
        {t('delete_item')}
      </ThemedText>
      <ThemedText>{t('are_you_sure_you_want_to_delete_this_item')}</ThemedText>
      <View className={'mt-4 flex-row items-center justify-center gap-2'}>
        <Button buttonClassName={'flex-1 py-2'} type={'secondary'} title={t('cancel')} onPress={handleCancelAction} />
        <Button buttonClassName={'flex-1 py-2'} type={'primary'} title={t('delete')} onPress={handleConfirmAction} />
      </View>
    </View>
  );
};
