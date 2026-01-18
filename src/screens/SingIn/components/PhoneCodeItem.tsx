import { Country } from 'country-telephone-data';
import React, { memo } from 'react';
import { Pressable, View } from 'react-native';
import { twMerge } from 'tailwind-merge';
import CountryFlag from 'react-native-country-flag';
import { ThemedText } from '@/components/ui/ThemedText';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/colors';

export type PhoneCodeItemProps = Country & {
  className?: string;
  onPress: () => void;
};

const PhoneCodeItem = memo(function({ onPress, name, dialCode, iso2, className }: Readonly<PhoneCodeItemProps>) {
  return (
    <Pressable
      onPress={onPress}
      className={twMerge(
        `border-dark-200 flex-row items-center justify-between gap-1 rounded-lg border p-4`,
        className,
      )}
    >
      <View className={'flex-row gap-2'}>
        <CountryFlag isoCode={iso2} size={16} />
        <ThemedText className={'px-1 capitalize'} size={'sm'}>{`(${dialCode}) ${name}`}</ThemedText>
      </View>
      <View>
        <IconSymbol size={20} name={'chevron.right'} color={Colors.light.icon} />
      </View>
    </Pressable>
  );
});

PhoneCodeItem.displayName = 'PhoneCodeItem';

export { PhoneCodeItem };
