import { View } from 'react-native';
import React from 'react';
import { Feather, FontAwesome } from '@expo/vector-icons';
import { ActionButtonBottomSheet } from '@/components/bottom-sheet/ActionButtonBottomSheet';
import { useTranslation } from 'react-i18next';
import { useThemeColor } from '@/hooks/useThemeColor';

interface DetailsActionGroupProps {
  onCommentPress: () => void;
  onEditPress: () => void;
  onDeletePress: () => void;
}

const DetailsActionGroup = ({ onCommentPress, onEditPress, onDeletePress }: Readonly<DetailsActionGroupProps>) => {
  const { t } = useTranslation();
  const iconColor = useThemeColor('icon');

  return (
    <View className={'flex h-full w-full items-stretch justify-center gap-2 px-4'}>
      <ActionButtonBottomSheet
        title={t('comment')}
        buttonClassName={'bg-dark-600 rounded-t-md'}
        titleClassName={'text-white'}
        onPress={onCommentPress}
      >
        <FontAwesome name="commenting" size={16} color={'white'} />
      </ActionButtonBottomSheet>
      <ActionButtonBottomSheet title={t('edit')} buttonClassName={'border-b border-dark-500'} onPress={onEditPress}>
        <Feather name="edit" size={16} color={iconColor} />
      </ActionButtonBottomSheet>
      <ActionButtonBottomSheet title={t('delete')} titleClassName={'text-red-500'} onPress={onDeletePress}>
        <FontAwesome name="trash" size={16} color={'#ef4444'} />
      </ActionButtonBottomSheet>
    </View>
  );
};

export default DetailsActionGroup;
