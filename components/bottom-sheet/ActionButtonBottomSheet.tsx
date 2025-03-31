import { TouchableOpacity, View } from 'react-native';
import { ThemedText } from '@/components/ui/ThemedText';
import React, { PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';

interface ModalActionButtonProps extends PropsWithChildren {
  title: string;
  onPress: () => void;
  titleClassName?: string;
  buttonClassName?: string;
}

export const ActionButtonBottomSheet = ({
                                          title,
                                          onPress,
                                          titleClassName,
                                          buttonClassName,
                                          children,
                                        }: Readonly<ModalActionButtonProps>) => (
  <TouchableOpacity
    className={twMerge('w-full flex-row justify-center gap-3 px-2 py-4 text-center', buttonClassName)}
    onPress={onPress}
  >
    <ThemedText type={'subtitle'} className={twMerge('pt-1 text-sm uppercase', titleClassName)}>
      {title}
    </ThemedText>
    <View className={'flex items-center justify-center'}>{children}</View>
  </TouchableOpacity>
);
