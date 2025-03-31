import { ThemedText } from '@/components/ui/ThemedText';
import { View } from 'react-native';
import { Button } from '@/components/button/Button';
import React from 'react';

interface DeleteItemModalProps {
  handleConfirmAction: () => void;
  handleCancelAction: () => void;
}

export const DeleteItemModal = ({ handleConfirmAction, handleCancelAction }: Readonly<DeleteItemModalProps>) => (
  <View className={'flex items-center justify-center gap-2 px-4'}>
    <ThemedText type="title" className={'text-lg'}>
      Delete item
    </ThemedText>
    <ThemedText>Are you sure you want to delete this item?</ThemedText>
    <View className={'mt-4 flex-row items-center justify-center gap-2'}>
      <Button buttonClassName={'flex-1 py-2'} type={'secondary'} title={'Cancel'} onPress={handleCancelAction} />
      <Button buttonClassName={'flex-1 py-2'} type={'primary'} title={'Delete'} onPress={handleConfirmAction} />
    </View>
  </View>
);
