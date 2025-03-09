import React from 'react';
import { Modal, ModalProps, TouchableOpacity, View } from 'react-native';
import { ThemedView } from '@/components/ui/ThemedView';
import { ThemedText } from '@/components/ui/ThemedText';
import { twMerge } from 'tailwind-merge';

interface BottomSheetProps extends ModalProps {
  className?: string;
  title?: string;
  height: number;
}

export const BottomSheet = ({
                              title,
                              className,
                              height = 90,
                              visible,
                              children,
                              onRequestClose,
                            }: Readonly<BottomSheetProps>) => {
  return (
    <Modal transparent={true} animationType="slide" visible={visible} onRequestClose={onRequestClose}>
      <View className="flex-1 bg-[rgba(0,0,0,0.4)]">
        <TouchableOpacity
          style={{ height: `${100 - height}%` }}
          className="transparent w-full"
          onPress={onRequestClose}
        />
        <ThemedView className={twMerge('flex-1 rounded-xl border border-blue-600 pb-10 shadow', className)}>
          <View className="flex items-center justify-center">
            <TouchableOpacity className="h-1 w-32 rounded-b-md bg-blue-600" />
          </View>
          <View className="flex flex-row items-center pt-4">
            {title && (
              <ThemedText type="subtitle" className="mx-auto text-center text-lg capitalize">
                {title}
              </ThemedText>
            )}
          </View>
          {children}
        </ThemedView>
      </View>
    </Modal>
  );
};
