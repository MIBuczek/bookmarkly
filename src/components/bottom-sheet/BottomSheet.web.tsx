import React from 'react';
import { Modal, ModalProps, TouchableOpacity, View } from 'react-native';
import { ThemedView } from '@/components/ui/ThemedView';
import { ThemedText } from '@/components/ui/ThemedText';
import { twMerge } from 'tailwind-merge';

interface BottomSheetProps extends ModalProps {
  className?: string;
  title?: string;
  height?: number;
}

export const BottomSheet = ({
                              title,
                              className,
                              visible,
                              children,
                              onRequestClose,
                            }: Readonly<BottomSheetProps>) => (
  <Modal
    transparent={true}
    animationType="fade"
    visible={visible}
    onRequestClose={onRequestClose}
  >
    <View className="flex-1 items-center justify-center bg-[rgba(0,0,0,0.5)]">
      <TouchableOpacity
        activeOpacity={1}
        className="absolute bottom-0 left-0 right-0 top-0"
        onPress={onRequestClose}
      />
      <ThemedView
        className={twMerge(
          'm-4 max-h-[90%] w-full max-w-xl overflow-hidden rounded-2xl border border-gray-200 shadow-2xl dark:border-gray-700',
          className,
        )}
      >
        <View className="flex flex-row items-center justify-between border-b border-gray-100 p-4 dark:border-gray-800">
          {title ? (
            <ThemedText type="subtitle" className="capitalize" size={'lg'}>
              {title}
            </ThemedText>
          ) : <View />}
          <TouchableOpacity onPress={onRequestClose}>
            <ThemedText size={'lg'} className="text-dark-400 text-xl font-bold">✕</ThemedText>
          </TouchableOpacity>
        </View>
        <View className="flex-1 p-2">
          {children}
        </View>
      </ThemedView>
    </View>
  </Modal>
);
