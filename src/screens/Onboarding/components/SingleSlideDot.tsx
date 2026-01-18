import React, { useEffect, useRef } from 'react';
import { Animated, Pressable } from 'react-native';

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

export { SingleSlideDot };
