import React, { useEffect, useRef } from 'react';
import { Animated, Pressable } from 'react-native';

interface SingleSlideDotProps {
  isActive: boolean;
  onPress: () => void;
}

const SingleSlideDot = ({ isActive, onPress }: Readonly<SingleSlideDotProps>) => {
  const fadeAnim = useRef(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(fadeAnim.current, {
      toValue: isActive ? 1 : 0,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [isActive]);

  const dotStyle = {
    backgroundColor: fadeAnim.current.interpolate({
      inputRange: [0, 1],
      outputRange: ['rgb(200, 200, 200)', 'rgb(255,140,66)'],
    }),
    height: 10,
    width: 10,
  };

  return (
    <Pressable onPress={onPress}>
      <Animated.View style={dotStyle} className="size-3 rounded-full" />
    </Pressable>
  );
};

export { SingleSlideDot };
