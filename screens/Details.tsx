import { Switch, View } from 'react-native';
import { ThemedText } from '@/components/ui/ThemedText';
import React, { useCallback, useState } from 'react';
import { baseColors } from '@assets/theme/base-theme';
import { useLocalSearchParams } from 'expo-router/build/hooks';
import { RootState, storeActions, useAppDispatch, useAppSelector } from '@/store';
import { ActionButton } from '@/components/button/ActionButton';
import { Entypo, Feather, FontAwesome } from '@expo/vector-icons';
import { formatDate } from '@/utils/helper';
import { Tags } from '@/components/Tags';
import { BottomSheet } from '@/components/bottom-sheet/BottomSheet';
import { ActionButtonBottomSheet } from '@/components/bottom-sheet/ActionButtonBottomSheet';
import { ModalBackDrop } from '@/components/modal/ModalBackDrop';
import { DeleteItemModal } from '@/components/modal/DeleteItemModal';
import { Colors } from '@/constants/colors';
import { LinkCommentForm } from '@/components/forms/LinkCommentForm';
import { LinkForm } from '@/components/forms/LinkForm';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useTranslation } from 'react-i18next';
import { ScreenContainer } from '@/components/ui/ScreenContainer';
import { ArrowBackButton } from '@/components/button/ArrowBackButton';
import { router } from 'expo-router';
import linkServices from '@/services/link.services';
import { useToast } from 'react-native-toast-notifications';
import RedirectButton from '@/components/button/RedirectButton';

export default function DetailsScreen() {
  const theme = useColorScheme() ?? 'light';
  const { id } = useLocalSearchParams<{ id: string }>();
  const { t } = useTranslation();
  const toast = useToast();

  const [showActions, setShowActions] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [showCommentForm, setShowCommentForm] = useState<boolean>(false);
  const [showLinkForm, setShowLinkForm] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const selectedLink = useAppSelector(({ links }: RootState) => {
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

  const handleDeletePress = useCallback(async () => {
    if (!selectedLink?.id) return;
    const { id } = selectedLink;
    try {
      await linkServices.deleteLink(id);
      dispatch(storeActions.links.deleteLink({ id }));
      router.back();
      toast.show('[Success] : Link was deleted', { type: 'success' });
    } catch (e) {
      console.error('[handleDeletePress]', e);
      toast.show('[Error] : Could not delete selected link', { type: 'error' });
    }
  }, [selectedLink?.id]);

  return (
    <ScreenContainer withBottomTabs>
      <ArrowBackButton
        onPress={() => {
          router.back();
        }}
      />
      <View className="flex-1 gap-6">
        <View className={'mt-4 flex gap-4'}>
          <ThemedText type={'title'} className={'text-primary-700'} size={'2xl'}>
            {`${selectedLink?.title}`}
          </ThemedText>
          <ThemedText size={'md'}>{`${selectedLink?.description}`}</ThemedText>
        </View>
        <View className={'flex gap-2'}>
          <ThemedText type={'title'} size={'sm'}>
            Info
          </ThemedText>
          <ThemedText size={'sm'}>{`Author : ${selectedLink?.author}`}</ThemedText>
          <ThemedText size={'sm'}>{`Source : ${selectedLink?.source ?? 'N/A'}`}</ThemedText>
          <ThemedText size={'sm'}>{`Added at : ${formatDate(selectedLink?.createdAt)}`}</ThemedText>
        </View>
        <View className={'flex gap-2'}>
          <ThemedText type={'title'} size={'sm'}>
            {t('tags')}
          </ThemedText>
          <Tags tags={selectedLink?.tags ?? []} />
        </View>
        <View className="flex w-full gap-2">
          <ThemedText type="title" className={'text-dark-800'} size={'sm'}>
            {t('my_comments')}
          </ThemedText>
          <ThemedText
            size={'sm'}>{`${selectedLink?.comments ? selectedLink?.comments : t('not_added_yet')}`}</ThemedText>
        </View>
        <View className={'flex w-full gap-2'}>
          <ThemedText type="title" className={'text-dark-800'} size={'sm'}>
            {t('mark_as_read')}
          </ThemedText>
          <View className={'mr-auto'}>
            <Switch
              trackColor={{ false: '#767577', true: baseColors.colors.primary['500'] }}
              thumbColor={selectedLink?.read ? 'white' : '#f4f3f4'}
              ios_backgroundColor={selectedLink?.read ? baseColors.colors.primary['500'] : '#767577'}
              onValueChange={handleReadChange}
              value={selectedLink?.read}
            />
          </View>
        </View>
        <View className={'mt-auto flex'}>
          <RedirectButton
            title={t('redirect_to_page')}
            url={selectedLink?.url ?? ''}
          />
        </View>
        <ActionButton buttonClassName={'px-2 py-2'} containerClassName={'mb-0'} onPress={handleActionBottomSheet}>
          <Entypo name="dots-three-horizontal" size={24} color="white" />
        </ActionButton>
      </View>
      <BottomSheet onRequestClose={handleActionBottomSheet} visible={showActions} height={25}>
        <View className={'flex h-full w-full items-stretch justify-center gap-2 px-4'}>
          <ActionButtonBottomSheet
            title={selectedLink?.comments ? t('edit') : t('add')}
            buttonClassName={'bg-primary-400 rounded-t-md'}
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
    </ScreenContainer>
  );
}
