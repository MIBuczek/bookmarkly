import { ScreenContainer } from '@/components/ui/ScreenContainer';
import React, { useEffect } from 'react';
import { View } from 'react-native';
import Logo from '@/components/Logo';
import { SingleSlideDot } from '@/screens/Onboarding/components/SingleSlideDot';
import { SlideText } from '@/screens/Onboarding/components/SlideText';
import { Button } from '@/components/button/Button';
import { useTranslation } from 'react-i18next';
import useScreen from '@/screens/Onboarding/useScreen';

export default function OnboardingScreen() {
  const { t } = useTranslation();

  const { slideIndex, setSlideIndex, handleSwipeContent, swipeContent, checkHasOnboardingBeenDone } = useScreen();

  useEffect(checkHasOnboardingBeenDone, []);

  return (
    <ScreenContainer>
      <View
        className="dark:bg-dark-700 bg-gray-400 rounded-lg">
        <Logo className={'bg-gray-300 dark:bg-dark-800 w-full rounded-t-none'} />
        <View
          className={'w-full flex items-center justify-center rounded-lg border-y-2 border-primary-500 overflow-hidden'}>
          {swipeContent[slideIndex].img}
        </View>
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
        <View className="mt-auto flex flex-row gap-2 justify-end">
          {slideIndex !== '1' && (
            <Button type={'secondary'} title={'Back'} onPress={() => setSlideIndex(`${Number(slideIndex) - 1}`)}
                    buttonClassName={'min-w-[140px]'} />
          )}
          <Button
            type={'primary'} title={slideIndex === '3' ? t('close') : t('next')} onPress={handleSwipeContent}
            buttonClassName={'min-w-[140px]'} />
        </View>
      </View>
    </ScreenContainer>
  );
}
