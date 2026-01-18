import { Country } from 'country-list';
import { useTranslation } from 'react-i18next';
import React, { useEffect, useMemo, useState } from 'react';
import { debounce } from 'lodash-es';
import { FlatList, View } from 'react-native';
import { Input } from '@/components/ui/Input';
import { ScreenWidth } from 'react-native-elements/dist/helpers';
import { CountryItem } from '@/components/CountryItem';
import { Button } from '@/components/button/Button';

interface SelectCountryBottomSheetProps {
  countries: Country[];
  selectedCountry: Country;
  handleSelection: (country: Country) => void;
}

/**
 * SelectCountryBottomSheet component for selecting a country from a list.
 * @param {SelectCountryBottomSheetProps} props - The props for the component.
 * @returns {JSX.Element} The rendered component.
 */

const SelectCountryBottomSheet = ({
                                    countries,
                                    selectedCountry,
                                    handleSelection,
                                  }: Readonly<SelectCountryBottomSheetProps>): React.JSX.Element => {
  const { t } = useTranslation();

  const [searchPhase, setSearchPhase] = useState('');
  const [filteredCountries, setFilteredCountries] = useState<Country[]>(countries);

  const debouncedSearch = useMemo(
    () =>
      debounce((text: string) => {
        const _filteredCountries = countries.filter(({ name, code }) =>
          `${name} ${code}`.toLowerCase().includes(text.toLowerCase()),
        );
        setFilteredCountries(_filteredCountries);
      }, 300),
    [countries],
  );

  useEffect(() => {
    debouncedSearch(searchPhase);
    return () => {
      debouncedSearch.cancel();
    };
  }, [searchPhase, debouncedSearch]);

  return (
    <View className={'flex-1'}>
      <View className={'px-4 py-6'}>
        <Input placeholder={t('search_your_country')} value={searchPhase} onChangeText={setSearchPhase} />
      </View>
      <View className={'border-t-primary-500 flex h-5/6 items-start py-2'}>
        <FlatList
          style={{ width: ScreenWidth }}
          data={filteredCountries}
          keyExtractor={({ name, code }) => `${name}_${code}`}
          renderItem={({ item: { name, code } }: { item: Country }) => (
            <CountryItem
              isoCode={code}
              icon={false}
              countryName={name}
              className={`border-dark-100 rounded-none border-0 border-b px-4 py-6 ${code === selectedCountry.code ? 'bg-primary-200' : 'bg-transparent'}`}
              onPress={() => handleSelection({ name, code })}
            />
          )}
        />
        <View className={'w-full p-4'}>
          <Button type={'secondary'} title={t('cancel')} onPress={() => handleSelection(selectedCountry)} />
        </View>
      </View>
    </View>
  );
};

export { SelectCountryBottomSheet };
