import { IconSymbol } from '@/components/ui/IconSymbol';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { SFSymbols6_0 } from 'sf-symbols-typescript';

export default function ThemeButton({ icon, active, onPress }: Readonly<{
  icon: SFSymbols6_0
  active: boolean
  onPress: () => void
}>) {
  return (
    <TouchableOpacity
      className={`rounded-full border border-dark-400 p-2 ${active ? 'bg-dark-600' : 'bg-transparent'}`}
      onPress={onPress}
    >
      <IconSymbol name={icon} color={active ? '#FFF' : '#4b5563'} size={14} />
    </TouchableOpacity>
  );
}