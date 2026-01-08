import React, { memo, useCallback, useState } from 'react';
import { Pressable, TouchableOpacity, View } from 'react-native';
import { ThemedText } from '@/components/ui/ThemedText';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { baseColors } from '@assets/theme/base-theme';
import { router } from 'expo-router';
import { storeActions, useAppDispatch } from '@/store';
import { BottomSheet } from '@/components/bottom-sheet/BottomSheet';
import { Tags } from '@/components/Tags';
import { FadeInView } from '@/components/ui/FadeInView';
import { ExternalLink } from '@/components/ui/ExternalLink';
import { Feather, FontAwesome } from '@expo/vector-icons';
import { ActionButtonBottomSheet } from '@/components/bottom-sheet/ActionButtonBottomSheet';
import { ModalBackDrop } from '@/components/modal/ModalBackDrop';
import { DeleteItemModal } from '@/components/modal/DeleteItemModal';
import { TLink } from '@/types/links.type';

interface LinkItemProps {
  link: TLink;
}

const LinkItem = memo(({ link }: Readonly<LinkItemProps>) => {
  const dispatch = useAppDispatch();
  const [showActions, setShowActions] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

  const handleDetailsPress = useCallback(() => {
    router.push({ pathname: '/(main)/(dashboard)/details', params: { id: link.id } });
  }, [link.id]);

  const handleActionBottomSheet = useCallback(() => {
    setShowActions(!showActions);
  }, [showActions]);

  const handleDeleteModalConfirmation = useCallback(() => {
    setShowActions(false);
    setShowDeleteModal(!showDeleteModal);
  }, [showDeleteModal]);

  const handleDeletePress = useCallback(() => {
    dispatch(storeActions.links.deleteLink({ id: link.id }));
  }, [link.id]);

  return (
    <>
      <FadeInView isActive={true} className="h-fit">
        <View className={'flex-row gap-2 border-b border-b-dark-200 px-2 py-4'}>
          <Pressable className={'flex w-5/6'} onPress={handleActionBottomSheet}>
            <ThemedText size={'md'} type={'title'} className={'text-primary-700'}>
              {link.title}
            </ThemedText>
            <ThemedText size={'sm'}>{link.description}</ThemedText>
            <Tags containerClassName={'py-0 pt-3'} tags={link.tags.slice(0, 3)} />
          </Pressable>
          <TouchableOpacity
            className={'my-auto flex h-20 w-1/6 items-center justify-center rounded-xl'}
            onPress={handleDetailsPress}
          >
            <IconSymbol name={'chevron.right'} color={baseColors.colors.primary['500']} size={16} />
          </TouchableOpacity>
        </View>
        <BottomSheet onRequestClose={handleActionBottomSheet} visible={showActions} height={20}>
          <View className={'flex h-full w-full items-stretch justify-center gap-2 px-4'}>
            <ExternalLink href={link?.url ?? ''}>
              <View
                className={'w-full flex-row items-center justify-center gap-3 rounded-t-md bg-primary-400 px-4 py-6'}
              >
                <ThemedText type={'subtitle'} size={'sm'} className={'pt-1 uppercase text-white'}>
                  Redirect to page
                </ThemedText>
                <View className={'flex items-center justify-center'}>
                  <Feather name="external-link" size={16} color={'white'} />
                </View>
              </View>
            </ExternalLink>
            <ActionButtonBottomSheet title={'Delete'} onPress={handleDeleteModalConfirmation}>
              <FontAwesome name="trash" size={16} color={'#ef4444'} />
            </ActionButtonBottomSheet>
          </View>
        </BottomSheet>
      </FadeInView>
      <ModalBackDrop visible={showDeleteModal} onRequestClose={handleDeleteModalConfirmation}>
        <DeleteItemModal handleConfirmAction={handleDeletePress} handleCancelAction={handleDeleteModalConfirmation} />
      </ModalBackDrop>
    </>
  );
});

LinkItem.displayName = 'LinkItem';

export default LinkItem;
