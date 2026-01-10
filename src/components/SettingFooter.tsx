import { Button } from '@/components/button/Button';
import React from 'react';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';

export default function SettingsFooter({
                                         hasChanged,
                                         onApply,
                                         onClose,
                                       }: {
  hasChanged: boolean;
  onApply: () => void;
  onClose: () => void;
}) {
  const { t } = useTranslation();

  return (
    <View className="mt-auto w-full">
      {hasChanged ? (
        <Button type={'primary'} title={t('apply')} onPress={onApply} />
      ) : (
        <Button type={'tertiary'} title={t('close')} onPress={onClose} />
      )}
    </View>
  );
};