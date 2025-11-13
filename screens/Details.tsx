import { Switch, View } from 'react-native';
import { ThemedText } from '@/components/ui/ThemedText';
import React, { useCallback, useState } from 'react';
import { ThemedView } from '@/components/ui/ThemedView';
import { baseColors } from '@assets/theme/base-theme';
import { useLocalSearchParams } from 'expo-router/build/hooks';
import { storeActions, useAppDispatch, useAppSelector } from '@/store';
import { ExternalLink } from '@/components/ui/ExternalLink';
import { ActionButton } from '@/components/button/ActionButton';
import { Entypo, Feather, FontAwesome } from '@expo/vector-icons';
import { formatDate } from '@/utils/helper';
import { Tags } from '@/components/Tags';
import { BottomSheet } from '@/components/bottom-sheet/BottomSheet';
import { ActionButtonBottomSheet } from '@/components/bottom-sheet/ActionButtonBottomSheet';
import { ModalBackDrop } from '@/components/modal/ModalBackDrop';
import { DeleteItemModal } from '@/components/modal/DeleteItemModal';
import { Colors } from '@/constants/colors';
import { LinkCommentForm } from '@/components/bottom-sheet/LinkCommentForm';
import { LinkForm } from '@/components/bottom-sheet/LinkForm';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useTranslation } from 'react-i18next';

export default function DetailsScreen() {
  const theme = useColorScheme() ?? 'light';
  const { id } = useLocalSearchParams<{ id: string }>();
  const { t } = useTranslation();

  const [showActions, setShowActions] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [showCommentForm, setShowCommentForm] = useState<boolean>(false);
  const [showLinkForm, setShowLinkForm] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const selectedLink = useAppSelector(({ links }) => {
    return links.links.find((link) => link.id === id);
  });

  const handleReadChange = useCallback(
    (value: boolean) => {
      if (selectedLink) {
        dispatch(storeActions.links.updateLink({ link: { ...selectedLink, read: value } }));
      }
    },
    [selectedLink],
  );

  const handleActionBottomSheet = useCallback(() => {
    setShowActions(!showActions);
  }, [showActions]);

  const handleCommentFormBottomSheet = useCallback(() => {
    setShowActions(false);
    setShowCommentForm(!showCommentForm);
  }, [showCommentForm]);

  const handleLinkFormBottomSheet = useCallback(() => {
    setShowActions(false);
    setShowLinkForm(!showLinkForm);
  }, [showLinkForm]);

  const handleDeleteModalConfirmation = useCallback(() => {
    setShowActions(false);
    setShowDeleteModal(!showDeleteModal);
  }, [showDeleteModal]);

  const handleDeletePress = useCallback(() => {
    dispatch(storeActions.links.deleteLink({ id: selectedLink?.id || '' }));
  }, [selectedLink?.id]);

  return (
    <ThemedView withIOSPaddingBottom className="flex-1 gap-6 px-6">
      <View className={'mt-6 flex gap-4'}>
        <ThemedText type={'title'} className={'text-primary-700'}>
          {`${selectedLink?.title}`}
        </ThemedText>
        <ThemedText>{`${selectedLink?.description}`}</ThemedText>
      </View>
      <View className={'flex gap-2'}>
        <ThemedText type={'title'} className={'text-sm'}>
          Info
        </ThemedText>
        <ThemedText className={'text-sm'}>{`Author : ${selectedLink?.author}`}</ThemedText>
        <ThemedText className={'text-sm'}>{`Source : ${selectedLink?.source}`}</ThemedText>
        <ThemedText className={'text-sm'}>{`Added at : ${formatDate(selectedLink?.created_ad)}`}</ThemedText>
      </View>
      <View className={'flex gap-2'}>
        <ThemedText type={'title'} className={'text-sm'}>
          {t('tags')}
        </ThemedText>
        <Tags tags={selectedLink?.tags ?? []} />
      </View>
      <View className="flex w-full gap-2">
        <ThemedText type="title" className={'text-sm text-dark-800'}>
          {t('my_comments')}
        </ThemedText>
        <ThemedText>{`${selectedLink?.comments ? selectedLink?.comments : t('not_added_yet')}`}</ThemedText>
      </View>
      <View className={'flex w-full gap-2'}>
        <ThemedText type="title" className={'text-sm text-dark-800'}>
          {t('mark_as_read')}
        </ThemedText>
        <View className={'mr-auto scale-75'}>
          <Switch
            trackColor={{ false: '#767577', true: baseColors.colors.primary['500'] }}
            thumbColor={selectedLink?.read ? 'white' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={handleReadChange}
            value={selectedLink?.read}
          />
        </View>
      </View>
      <View className={'m-auto flex'}>
        <ExternalLink href={selectedLink?.url ?? ''}>
          <View className={'w-full flex-row items-center justify-center gap-3 px-4 py-6'}>
            <ThemedText type={'subtitle'} className={'pt-1 text-sm uppercase text-blue-600'}>
              {t('redirect_to_page')}
            </ThemedText>
            <View className={'flex items-center justify-center'}>
              <Feather name="external-link" size={16} color={'#2563eb'} />
            </View>
          </View>
        </ExternalLink>
      </View>
      <ActionButton buttonClassName={'px-2 py-2'} onPress={handleActionBottomSheet}>
        <Entypo name="dots-three-horizontal" size={24} color="white" />
      </ActionButton>
      <BottomSheet onRequestClose={handleActionBottomSheet} visible={showActions} height={25}>
        <View className={'flex h-full w-full items-stretch justify-center gap-2 px-4'}>
          <ActionButtonBottomSheet
            title={selectedLink?.comments ? t('edit') : t('add')}
            buttonClassName={'bg-primary-400 rounded-t-xl'}
            titleClassName={'text-white'}
            onPress={handleCommentFormBottomSheet}
          >
            <FontAwesome name="commenting" size={16} color={'white'} />
          </ActionButtonBottomSheet>
          <ActionButtonBottomSheet
            title={t('edit')}
            buttonClassName={'border-b border-primary-500'}
            onPress={handleLinkFormBottomSheet}
          >
            <Feather name="edit" size={16} color={Colors[theme].icon} />
          </ActionButtonBottomSheet>
          <ActionButtonBottomSheet
            title={t('delete')}
            titleClassName={'text-red-500'}
            onPress={handleDeleteModalConfirmation}
          >
            <FontAwesome name="trash" size={16} color={'#ef4444'} />
          </ActionButtonBottomSheet>
        </View>
      </BottomSheet>
      <BottomSheet visible={showCommentForm} height={35}>
        <LinkCommentForm link={selectedLink} handleClose={handleCommentFormBottomSheet} />
      </BottomSheet>
      <BottomSheet visible={showLinkForm} height={70}>
        <LinkForm formState={'edit'} link={selectedLink} handleClose={handleLinkFormBottomSheet} />
      </BottomSheet>
      <ModalBackDrop visible={showDeleteModal} onRequestClose={handleDeleteModalConfirmation}>
        <DeleteItemModal handleConfirmAction={handleDeletePress} handleCancelAction={handleDeleteModalConfirmation} />
      </ModalBackDrop>
    </ThemedView>
  );
}
