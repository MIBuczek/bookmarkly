import React from 'react';
import Svg, { Defs, LinearGradient, Path, Stop } from 'react-native-svg';

interface LogoIconProps {
  width?: number;
  height?: number;
}

export const LogoIcon = ({ width = 64, height = 64 }: Readonly<LogoIconProps>) => (
  // @ts-ignore
  <Svg width={width} height={height} viewBox="0 0 200 300" fill="none" xmlns="http://www.w3.org/2000/svg">
    <Defs>
      <LinearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
        <Stop offset="0%" stopColor={'#FFA726'} stopOpacity={1} />
        <Stop offset="100%" stopColor={'#E65100'} stopOpacity={1} />
      </LinearGradient>
    </Defs>
    <Path d="M50 0 H150 A20 20 0 0 1 170 20 V250 L100 200 L30 250 V20 A20 20 0 0 1 50 0 Z" fill="url(#grad)" />
  </Svg>
);
