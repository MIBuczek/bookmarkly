import { IconSymbol } from '@/components/ui/IconSymbol';
import { baseColors } from '@/assets/theme/base-theme';
import { TouchableOpacity } from 'react-native';
import React from 'react';
import { SFSymbols6_0 } from 'sf-symbols-typescript';

export default function FontButton({
                                     icon, onPress, disabled,
                                   }: Readonly<{ icon: SFSymbols6_0, disabled: boolean, onPress: () => void }>) {
  return (
    <TouchableOpacity
      className={'rounded-md border border-primary-500 p-2 disabled:bg-gray-600'}
      disabled={disabled}
      onPress={onPress}>
      <IconSymbol name={icon} color={baseColors.colors.dark['600']} size={14} />
    </TouchableOpacity>
  );
}