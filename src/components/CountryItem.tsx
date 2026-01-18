import { Pressable, View } from 'react-native';
import CountryFlag from 'react-native-country-flag';
import { ThemedText } from '@/components/ui/ThemedText';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/colors';
import React, { memo } from 'react';
import { twMerge } from 'tailwind-merge';

interface CountryItemProps {
  className?: string;
  countryName: string;
  isoCode: string;
  icon?: boolean;
  onPress: () => void;
}

export const CountryItem = memo(function({
                                           onPress,
                                           isoCode,
                                           countryName,
                                           className,
                                           icon = false,
                                         }: Readonly<CountryItemProps>) {
  return (
    <Pressable
      onPress={onPress}
      className={twMerge(
        `border-dark-400 h-[50px] flex-row items-center justify-between gap-1 rounded-lg border p-4`,
        className,
      )}
    >
      <View className={'flex-row gap-2'}>
        <CountryFlag isoCode={isoCode} size={16} />
        <ThemedText className={'px-1 capitalize'} size={'sm'}>
          {countryName}
        </ThemedText>
      </View>
      {icon && (
        <View>
          <IconSymbol size={20} name={'chevron.down'} color={Colors.light.icon} />
        </View>
      )}
    </Pressable>
  );
});
