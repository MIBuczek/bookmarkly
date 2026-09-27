import { Switch, View } from 'react-native';
import { ThemedText } from '@/components/ui/ThemedText';
import React from 'react';
import { baseColors } from '@/assets/theme/base-theme';
import { useLocalSearchParams } from 'expo-router/build/hooks';
import { Entypo } from '@expo/vector-icons';
import { formatDate } from '@/utils/helper';
import { Tags } from '@/components/Tags';
import { BottomSheet } from '@/components/bottom-sheet/BottomSheet';
import DetailsActionGroup from '@/components/bottom-sheet/DetailsActionGroup';
import { ModalBackDrop } from '@/components/modal/ModalBackDrop';
import { DeleteItemModal } from '@/components/modal/DeleteItemModal';
import { LinkCommentForm } from '@/components/forms/LinkCommentForm';
import { LinkForm } from '@/components/forms/LinkForm';
import { useTranslation } from 'react-i18next';
import { ScreenContainer } from '@/components/ui/ScreenContainer';
import { ArrowBackButton } from '@/components/button/ArrowBackButton';
import { router } from 'expo-router';
import RedirectButton from '@/components/button/RedirectButton';
import { ScreenTitle } from '@/components/ui/ScreenTitle';
import useScreen from '@/screens/Details/useScreen';
import { BottomViewButton } from '@/components/ui/BottomViewButton';
import { Button } from '@/components/button/Button';

export default function DetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { t } = useTranslation();

  const {
    showActions,
    showCommentForm,
    showLinkForm,
    showDeleteModal,
    selectedLink,
    handleReadChange,
    handleActionBottomSheet,
    handleCommentFormBottomSheet,
    handleLinkFormBottomSheet,
    handleDeleteModalConfirmation,
    handleDeletePress,
  } = useScreen(id);

  return (
    <ScreenContainer>
      <ArrowBackButton
        onPress={() => {
          router.back();
        }}
      />
      <View className="flex-1 gap-6">
        <ScreenTitle title={selectedLink?.title ?? ''} description={selectedLink?.description ?? ''} />
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
            size={'sm'}
          >{`${selectedLink?.comments ? selectedLink?.comments : t('not_added_yet')}`}</ThemedText>
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
        <BottomViewButton paddingTop={16} className="flex-col">
          <View className={'mt-auto flex'}>
            <RedirectButton title={t('redirect_to_page')} url={selectedLink?.url ?? ''} />
          </View>
          <Button buttonClassName={'px-10 py-2'} type={'secondary'} onPress={handleActionBottomSheet}>
            <Entypo name="dots-three-horizontal" size={24} color="black" />
          </Button>
        </BottomViewButton>
      </View>
      <BottomSheet onRequestClose={handleActionBottomSheet} visible={showActions} height={25}>
        <DetailsActionGroup
          onCommentPress={handleCommentFormBottomSheet}
          onEditPress={handleLinkFormBottomSheet}
          onDeletePress={handleDeleteModalConfirmation}
        />
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
