import { Animated } from 'react-native';
import React, { PropsWithChildren, useEffect, useRef } from 'react';
import { twMerge } from 'tailwind-merge';

interface FadeInViewProps extends PropsWithChildren {
  isActive: boolean;
  className?: string;
}

export const FadeInView = ({ isActive, className, children }: Readonly<FadeInViewProps>) => {
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
      className={twMerge('h-full w-full', className)}
    >
      {children}
    </Animated.View>
  );
};
