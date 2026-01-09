import React, { useEffect, useRef, useState } from 'react';
import { ThemedText } from '@/components/ui/ThemedText';
import { Animated, Pressable, View } from 'react-native';
import { Button } from '@/components/button/Button';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { PastLink } from '@/components/svg/PastLink';
import { LinkContent } from '@/components/svg/LinkContent';
import { CompleteLink } from '@/components/svg/CompleteLink';
import { ScreenContainer } from '@/components/ui/ScreenContainer';
import { ScreenHeight } from 'react-native-elements/dist/helpers';
import { RootState, storeActions, useAppDispatch, useAppSelector } from '@/store';
import Logo from '@/components/Logo';
import { APP_ROUTES } from '@/utils/routes';

interface SingleSlideDotProps {
  isActive: boolean;
  onPress: () => void;
}

const SingleSlideDot = ({ isActive, onPress }: Readonly<SingleSlideDotProps>) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: isActive ? 1 : 0,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [isActive, fadeAnim]);

  const backgroundColor = fadeAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['rgb(200, 200, 200)', 'rgb(255,140,66)'],
  });

  return (
    <Pressable onPress={onPress}>
      <Animated.View style={{ backgroundColor, height: 10, width: 10 }} className="size-3 rounded-full" />
    </Pressable>
  );
};

interface SlideTextProps {
  title: string;
  description: string;
  isActive: boolean;
}

const SlideText = ({ title, description, isActive }: Readonly<SlideTextProps>) => {
  const fadeAnimOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnimOpacity, {
      toValue: isActive ? 1 : 0.2,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [isActive, fadeAnimOpacity]);

  return (
    <Animated.View
      style={{
        opacity: fadeAnimOpacity,
        display: isActive ? 'flex' : 'none',
      }}
      className="flex items-start justify-start gap-6 py-6"
    >
      <ThemedText type={'title'} size={'2xl'}>{title}</ThemedText>
      <ThemedText type={'default'} size={'sm'}>{description}</ThemedText>
    </Animated.View>
  );
};

interface ISwipeContent {
  img: React.ReactNode;
  title: string;
  description: string;
}

export default function OnboardingScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { onboarded } = useAppSelector(({ user }: RootState) => user);

  const [slideIndex, setSlideIndex] = useState<string>('1');

  const swipeContent: { [x: string]: ISwipeContent } = {
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

  const checkHasOnboardingBeenDone = () => {
    if (onboarded) router.navigate(APP_ROUTES.SIGN_IN);
  };

  useEffect(checkHasOnboardingBeenDone, []);

  const handleSwipeContent = () => {
    if (slideIndex === '3') {
      dispatch(storeActions.user.setOnboarded({ onboarded: true }));
      router.navigate(APP_ROUTES.SIGN_IN);
    }
    const nextSwipe = slideIndex === '3' ? '3' : `${Number(slideIndex) + 1}`;
    setSlideIndex(nextSwipe);
  };

  return (
    <ScreenContainer>
      <View className="flex items-center justify-center bg-primary-100 dark:bg-primary-200 rounded-t-lg">
        <Logo className={'w-full bg-primary-300 dark:bg-primary-300'} />
        {swipeContent[slideIndex].img}
      </View>
      <View className="flex-1">
        <View className="h-10 flex-row justify-start gap-3 py-2">
          {Object.keys(swipeContent).map((k) => (
            <SingleSlideDot key={`single_dot_${k}`} isActive={k === slideIndex} onPress={() => setSlideIndex(k)} />
          ))}
        </View>
        {Object.keys(swipeContent).map((k) => (
          <SlideText
            key={`text_${k}`}
            isActive={k === slideIndex}
            title={swipeContent[k].title}
            description={swipeContent[k].description}
          />
        ))}
        <View className="mt-auto w-full">
          <Button type={'primary'} title={slideIndex === '3' ? t('close') : t('next')} onPress={handleSwipeContent} />
        </View>
      </View>
    </ScreenContainer>
  );
}
