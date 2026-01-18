import { useToast } from 'react-native-toast-notifications';
import { useCallback, useState } from 'react';
import { RootState, storeActions, useAppDispatch, useAppSelector } from '@/store';
import linkServices from '@/services/link.services';
import { router } from 'expo-router';

export default function useScreen(id: string) {
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

  return {
    showCommentForm,
    showLinkForm,
    showDeleteModal,
    showActions,
    selectedLink,
    handleReadChange,
    handleActionBottomSheet,
    handleCommentFormBottomSheet,
    handleLinkFormBottomSheet,
    handleDeleteModalConfirmation,
    handleDeletePress,
  };
}
