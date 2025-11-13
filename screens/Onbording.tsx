import React, { useEffect, useRef, useState } from 'react';
import { ThemedView } from '@/components/ui/ThemedView';
import { ThemedText } from '@/components/ui/ThemedText';
import { Animated, Pressable, View } from 'react-native';
import { Button } from '@/components/button/Button';
import { useRouter } from 'expo-router';
import { LOCAL_STORAGE_KEY, localAppStorage } from '@/providers/local-app-storage';
import { useTranslation } from 'react-i18next';
import { PastLink } from '@/components/svg/PastLink';
import { LinkContent } from '@/components/svg/LinkContent';
import { CompleteLink } from '@/components/svg/CompleteLink';

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
      <Animated.View style={{ backgroundColor }} className="size-3 rounded-full" />
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
      className="h-full items-start justify-start gap-6 py-6"
    >
      <ThemedText type={'title'}>{title}</ThemedText>
      <ThemedText type={'default'}>{description}</ThemedText>
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

  const [slideIndex, setSlideIndex] = useState<string>('1');

  const swipeContent: { [x: string]: ISwipeContent } = {
    '1': {
      img: (
        <View className={'flex-1 pt-20'}>
          <PastLink width={350} height={350} />
        </View>
      ),
      title: t('slide_one_title'),
      description: t('slide_one_description'),
    },
    '2': {
      img: (
        <View className={'flex-1 pt-20'}>
          <LinkContent width={350} height={350} />
        </View>
      ),
      title: t('slide_two_title'),
      description: t('slide_two_description'),
    },
    '3': {
      img: (
        <View className={'flex-1 pt-32'}>
          <CompleteLink width={250} height={250} />
        </View>
      ),
      title: t('slide_three_title'),
      description: t('slide_three_description'),
    },
  };

  const checkHasOnboardingBeenDone = () => {
    const btdt = localAppStorage.getLocalData<boolean>(LOCAL_STORAGE_KEY.ONBOARDING);
    if (btdt) router.navigate('/(login)');
  };

  useEffect(checkHasOnboardingBeenDone, []);

  const handleSwipeContent = () => {
    if (slideIndex === '3') {
      localAppStorage.setLocalData<boolean>(LOCAL_STORAGE_KEY.ONBOARDING, true);
      router.navigate('/(login)');
    }
    const nextSwipe = slideIndex === '3' ? '3' : `${Number(slideIndex) + 1}`;
    setSlideIndex(nextSwipe);
  };

  return (
    <ThemedView withIOSPaddingBottom className="flex-1">
      <View className="flex h-[60%] w-full items-center justify-center bg-primary-50 pt-20">
        {swipeContent[slideIndex].img}
      </View>
      <View className="h-[30%] w-full items-start px-6 py-10">
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
      </View>
      <View className="h-[10%] w-full px-6">
        <Button type={'primary'} title={slideIndex === '3' ? t('close') : t('next')} onPress={handleSwipeContent} />
      </View>
    </ThemedView>
  );
}
