import React from 'react';
import { View } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { twMerge } from 'tailwind-merge';
import { Button } from '@/components/button/Button';

interface URLInputActionsProps {
  url: string;
  onClear: () => void;
  onPaste: (text: string) => void;
  metadataGenerated: boolean;
}

export const URLInputActions = ({
                                  url,
                                  onClear,
                                  onPaste,
                                  metadataGenerated,
                                }: URLInputActionsProps) => {

  return (
    <View
      className={twMerge(
        'absolute right-0 top-0 h-[50px] flex-row gap-1 ',
        metadataGenerated ? 'border-dark-800 bg-dark-800' : '',
      )}
    >
      {url ? (
        <Button disabled={metadataGenerated} type={'secondary'} title={'delete'} onPress={onClear} />
      ) : (
        <Button type={'primary'} title={'paste'} onPress={() => {
          Clipboard.getStringAsync().then((text) => {
            onPaste(text);
          });
        }} />
      )}
    </View>
  );
};
