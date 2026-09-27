import { ThemedText } from '@/components/ui/ThemedText';
import { View } from 'react-native';
import { Button } from '@/components/button/Button';
import React from 'react';
import { useTranslation } from 'react-i18next';

interface LogoutModalProps {
  handleLogout: () => void;
  handleCancel: () => void;
}

export const LogoutModal = ({ handleLogout, handleCancel }: Readonly<LogoutModalProps>) => {
  const { t } = useTranslation();

  return (
    <View className={'flex items-center justify-center gap-2 px-4'}>
      <ThemedText type="title" size={'lg'}>
        {t('logout')}
      </ThemedText>
      <ThemedText size={'sm'}>{t('are_you_sure_you_want_to_log_out')}</ThemedText>
      <View className={'mt-4 flex-row items-center justify-center gap-2'}>
        <Button buttonClassName={'flex-1 py-2'} type={'secondary'} title={t('cancel')} onPress={handleCancel} />
        <Button buttonClassName={'flex-1 py-2'} type={'primary'} title={t('logout')} onPress={handleLogout} />
      </View>
    </View>
  );
};
