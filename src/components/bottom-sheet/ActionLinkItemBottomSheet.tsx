import { View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { ActionButtonBottomSheet } from '@/components/bottom-sheet/ActionButtonBottomSheet';
import { BottomSheet } from '@/components/bottom-sheet/BottomSheet';
import React from 'react';
import { TLink } from '@/types/links.type';
import { useTranslation } from 'react-i18next';
import RedirectButton from '@/components/button/RedirectButton';

export default function ActionLinkItemBottomSheet({
                                                    link,
                                                    showActions,
                                                    handleActionBottomSheet,
                                                    handleDeleteModalConfirmation,
                                                  }: Readonly<{
  link: TLink;
  showActions: boolean;
  handleActionBottomSheet: () => void;
  handleDeleteModalConfirmation: () => void;
}>) {
  const { t } = useTranslation();

  return (
    <BottomSheet onRequestClose={handleActionBottomSheet} visible={showActions} height={20}>
      <View className={'flex h-full w-full items-stretch justify-center gap-2 px-4'}>
        <RedirectButton title={t('redirect_to_page')} url={link?.url ?? ''} />
        <ActionButtonBottomSheet title={t('delete')} onPress={handleDeleteModalConfirmation}>
          <FontAwesome name="trash" size={16} color={'#ef4444'} />
        </ActionButtonBottomSheet>
      </View>
    </BottomSheet>
  );
}
