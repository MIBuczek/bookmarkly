import { Modal, ModalProps, View } from 'react-native';
import { ThemedView } from '@/components/ui/ThemedView';
import { twMerge } from 'tailwind-merge';
import React from 'react';

interface ModalBackDropProps extends ModalProps {
  className?: string;
}

export const ModalBackDrop = ({ visible, onRequestClose, className, children }: Readonly<ModalBackDropProps>) => (
  <Modal visible={visible} onRequestClose={onRequestClose} transparent animationType={'slide'}>
    <View className={'flex-1 bg-[rgba(0,0,0,0.4)] dark:bg-[rgba(255,255,255,0.4)]'}>
      <ThemedView className={twMerge('mx-6 my-auto flex items-center justify-center rounded-3xl p-6', className)}>
        {children}
      </ThemedView>
    </View>
  </Modal>
);
