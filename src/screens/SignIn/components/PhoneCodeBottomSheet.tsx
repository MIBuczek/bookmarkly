import countryTelData, { Country } from 'country-telephone-data';
import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { debounce } from 'lodash-es';
import { View } from 'react-native';
import { Input } from '@/components/ui/Input';
import { FlatList } from 'react-native-gesture-handler';
import { ScreenWidth } from 'react-native-elements/dist/helpers';
import { Button } from '@/components/button/Button';
import { PhoneCodeItem } from '@/screens/SignIn/components/PhoneCodeItem';

type PhoneCodeBottomSheetProps = {
  selectedItem: Country | null;
  onDismiss: () => void;
  onPress: (item: Country) => void;
};

const PhoneCodeBottomSheet = ({ selectedItem, onDismiss, onPress }: Readonly<PhoneCodeBottomSheetProps>) => {
  const { t } = useTranslation();

  const [searchPhase, setSearchPhase] = useState('');
  const [filteredPhoneCodes, setFilteredPhoneCodes] = useState<Country[]>([]);

  const countriesPhoneCodes: Country[] = useMemo(() => {
    return countryTelData.allCountries;
  }, []);

  const debouncedSearch = useMemo(
    () =>
      debounce((text: string) => {
        const _filteredCountries = countriesPhoneCodes.filter(({ name, dialCode }) =>
          `${name} ${dialCode}`.toLowerCase().includes(text.toLowerCase()),
        );
        setFilteredPhoneCodes(_filteredCountries);
      }, 300),
    [countriesPhoneCodes],
  );

  useEffect(() => {
    debouncedSearch(searchPhase);
    return () => {
      debouncedSearch.cancel();
    };
  }, [searchPhase, debouncedSearch]);

  return (
    <View className={'flex-1'}>
      <View className={'h-20 px-4 py-6'}>
        <Input placeholder={'search'} value={searchPhase} onChangeText={setSearchPhase} />
      </View>
      <View className={'border-t-primary-500 flex-1 items-start py-2'}>
        <FlatList
          style={{ width: ScreenWidth }}
          data={filteredPhoneCodes}
          keyExtractor={(item) => `${item.name}_${item.dialCode}`}
          renderItem={({ item }) => (
            <PhoneCodeItem
              {...item}
              className={`rounded-none border-0 border-b px-4 py-6 ${item.dialCode === selectedItem?.dialCode ? 'bg-primary-200' : 'bg-transparent'}`}
              onPress={() => onPress(item)}
            />
          )}
        />
      </View>
      <View className={'w-full p-4'}>
        <Button type={'secondary'} title={t('cancel')} onPress={onDismiss} />
      </View>
    </View>
  );
};

export { PhoneCodeBottomSheet };
