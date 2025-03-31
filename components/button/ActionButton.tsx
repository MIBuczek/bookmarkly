import { Button } from '@/components/button/Button';
import { View } from 'react-native';
import React, { PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';

interface ActionButtonProps extends PropsWithChildren {
  title?: string;
  onPress: () => void;
  containerClassName?: string;
  buttonClassName?: string;
}

export const ActionButton = ({
                               title,
                               onPress,
                               children,
                               containerClassName,
                               buttonClassName,
                             }: Readonly<ActionButtonProps>) => (
  <View
    className={twMerge(
      'mb-8 flex h-12 w-full items-center justify-center rounded-3xl bg-primary-100 px-4',
      containerClassName,
    )}
  >
    <Button buttonClassName={buttonClassName} type={'primary'} title={title} onPress={onPress}>
      {children}
    </Button>
  </View>
);
