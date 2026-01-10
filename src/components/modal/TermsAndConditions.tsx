import React from 'react';
import { ThemedText } from '@/components/ui/ThemedText';
import { ScrollView, View } from 'react-native';
import { Button } from '@/components/button/Button';
import { useTranslation } from 'react-i18next';

interface TermsAndConditionsProps {
  onPress: () => void;
}

export const TermsAndConditions = ({ onPress }: Readonly<TermsAndConditionsProps>) => {
  const { t } = useTranslation();

  const sections = Array.from({ length: 12 }, (_, i) => (i + 1).toString());

  return (
    <ScrollView>
      <View className="flex-1 items-start justify-start gap-2 p-4">
        {sections.map((section) => (
          <React.Fragment key={section}>
            <ThemedText type={section === '1' ? 'title' : 'subtitle'} size={'md'}>
              {t(`terms_sections.${section}.title`)}
            </ThemedText>
            <ThemedText size={'sm'}>{t(`terms_sections.${section}.content`)}</ThemedText>
          </React.Fragment>
        ))}
      </View>
      <View className="px-4">
        <Button type={'primary'} title={t('understand')} onPress={onPress} />
      </View>
    </ScrollView>
  );
};
