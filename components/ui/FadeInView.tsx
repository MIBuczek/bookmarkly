import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';

interface FadeInViewProps {
  children: React.ReactNode;
}

export const FadeInView = ({ children }: Readonly<FadeInViewProps>) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return <Animated.View style={{ opacity: fadeAnim }}>{children}</Animated.View>;
};
