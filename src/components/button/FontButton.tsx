import { IconSymbol, IconSymbolName } from '@/components/ui/IconSymbol';
import { baseColors } from '@/assets/theme/base-theme';
import { TouchableOpacity } from 'react-native';
import React from 'react';

export default function FontButton({
                                     icon,
                                     onPress,
                                     disabled,
                                   }: Readonly<{ icon: IconSymbolName; disabled: boolean; onPress: () => void }>) {
  return (
    <TouchableOpacity
      className={'rounded-md border border-primary-500 p-2 disabled:bg-gray-600'}
      disabled={disabled}
      onPress={onPress}
    >
      <IconSymbol name={icon} color={baseColors.colors.dark['600']} size={14} />
    </TouchableOpacity>
  );
}
