import React, { useEffect } from 'react';
import { View } from 'react-native';
import { Button } from '@/components/button/Button';
import { useTranslation } from 'react-i18next';
import { ScreenContainer } from '@/components/ui/ScreenContainer';
import Logo from '@/components/Logo';
import useScreen from '@/screens/Onboarding/useScreen';
import { SlideText } from '@/screens/Onboarding/components/SlideText';
import { SingleSlideDot } from '@/screens/Onboarding/components/SingleSlideDot';

export default function OnboardingScreen() {
  const { t } = useTranslation();

  const { slideIndex, setSlideIndex, handleSwipeContent, swipeContent, checkHasOnboardingBeenDone } = useScreen();

  useEffect(checkHasOnboardingBeenDone, []);

  return (
    <ScreenContainer>
      <View className="bg-primary-100 dark:bg-primary-200 flex items-center justify-center rounded-t-lg">
        <Logo className={'bg-primary-300 dark:bg-primary-300 w-full'} />
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
