import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import { ThemedText } from '@/components/ui/ThemedText';

interface SlideTextProps {
  title: string;
  description: string;
  isActive: boolean;
}

const SlideText = ({ title, description, isActive }: Readonly<SlideTextProps>) => {
  const fadeAnimOpacity = useRef(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(fadeAnimOpacity.current, {
      toValue: isActive ? 1 : 0.2,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [isActive]);

  const slideTextStyle = {
    opacity: fadeAnimOpacity.current,
    display: isActive ? 'flex' : ('none' as const),
  };

  return (
    <Animated.View
      style={slideTextStyle}
      className="flex items-start justify-start gap-6 py-6"
    >
      <ThemedText type={'title'} size={'2xl'}>
        {title}
      </ThemedText>
      <ThemedText type={'default'} size={'sm'}>
        {description}
      </ThemedText>
    </Animated.View>
  );
};

export { SlideText };
