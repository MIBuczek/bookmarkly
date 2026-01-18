import { View } from 'react-native';
import { ScreenHeight } from 'react-native-elements/dist/helpers';
import { PastLink } from '@/components/svg/PastLink';
import { LinkContent } from '@/components/svg/LinkContent';
import { CompleteLink } from '@/components/svg/CompleteLink';
import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { APP_ROUTES } from '@/utils/routes';
import { RootState, storeActions, useAppDispatch, useAppSelector } from '@/store';
import { useRouter } from 'expo-router';

interface ISwipeContent {
  img: React.ReactNode;
  title: string;
  description: string;
}

export default function useScreen() {
  const { t } = useTranslation();
  const router = useRouter();

  const dispatch = useAppDispatch();
  const { onboarded } = useAppSelector(({ user }: RootState) => user);

  const [slideIndex, setSlideIndex] = useState<string>('1');

  const swipeContent: { [x: string]: ISwipeContent } = useMemo(() => {
    return {
      '1': {
        img: (
          <View className={'flex justify-center'} style={{ height: ScreenHeight * 0.6 }}>
            <PastLink width={350} height={350} />
          </View>
        ),
        title: t('slide_one_title'),
        description: t('slide_one_description'),
      },
      '2': {
        img: (
          <View className={'flex justify-center'} style={{ height: ScreenHeight * 0.6 }}>
            <LinkContent width={350} height={350} />
          </View>
        ),
        title: t('slide_two_title'),
        description: t('slide_two_description'),
      },
      '3': {
        img: (
          <View className={'flex justify-center'} style={{ height: ScreenHeight * 0.6 }}>
            <CompleteLink width={250} height={250} />
          </View>
        ),
        title: t('slide_three_title'),
        description: t('slide_three_description'),
      },
    };
  }, []);

  const checkHasOnboardingBeenDone = () => {
    if (onboarded) router.navigate(APP_ROUTES.SIGN_IN);
  };

  const handleSwipeContent = () => {
    if (slideIndex === '3') {
      dispatch(storeActions.user.setOnboarded({ onboarded: true }));
      router.navigate(APP_ROUTES.SIGN_IN);
    }
    const nextSwipe = slideIndex === '3' ? '3' : `${Number(slideIndex) + 1}`;
    setSlideIndex(nextSwipe);
  };

  return {
    slideIndex,
    setSlideIndex,
    handleSwipeContent,
    swipeContent,
    checkHasOnboardingBeenDone,
  };
}
