import React, { useEffect, useRef, useState } from 'react';
import { ThemedView } from '@/components/ui/ThemedView';
import { ThemedText } from '@/components/ui/ThemedText';
import { Animated, Pressable, View } from 'react-native';
import { Button } from '@/components/button/Button';
import { useRouter } from 'expo-router';
import { LOCAL_STORAGE_KEY, localAppStorage } from '@/providers/local-app-storage';

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
  img: string;
  title: string;
  description: string;
}

export default function Index() {
  const router = useRouter();
  const [slideIndex, setSlideIndex] = useState<string>('1');

  const swipeContent: { [x: string]: ISwipeContent } = {
    '1': {
      img: '1',
      title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      description:
        'nteger ullamcorper enim non nisi convallis, in tempus justo congue. Etiam at urna eu dui iaculis bibendum.',
    },
    '2': {
      img: '2',
      title: 'Morbi suscipit est quis lobortis bibendum.',
      description:
        'Duis maximus et felis et aliquam. Sed condimentum tortor neque, vitae fermentum mauris interdum vitae. Nulla facilisis porta libero, quis pulvinar neque porttitor id.',
    },
    '3': {
      img: '3',
      title: 'Nulla sagittis non lacus sed congue.',
      description:
        'Etiam vel lorem scelerisque, luctus libero a, laoreet nisi. Donec sodales tortor non dolor placerat, id cursus lacus congue. Duis tincidunt lectus ac rhoncus auctor. ',
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
      <View className="flex h-[60%] w-full items-center justify-center bg-primary-400 dark:bg-primary-200">
        <ThemedText type={'title'}>{swipeContent[slideIndex].img}</ThemedText>
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
        <Button type={'primary'} title={slideIndex === '3' ? 'Close' : 'Next'} onPress={handleSwipeContent} />
      </View>
    </ThemedView>
  );
}
