import React, { useMemo } from 'react';
import { createAvatar, Options } from '@dicebear/core';
import { lorelei } from '@dicebear/collection';
import { SvgUri } from 'react-native-svg';

interface AvatarSvgProps {
  options: Options;
  size?: number;
}

export const AvatarSvg = ({ options, size = 100 }: Readonly<AvatarSvgProps>) => {
  const svg = useMemo(() => {
    const avatar = createAvatar(lorelei, {
      ...options,
    });

    return avatar.toDataUri();
  }, [options]);

  return <SvgUri width={size} height={size} uri={svg} />;
};
