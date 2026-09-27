import { Controller } from 'react-hook-form';
import { TouchableOpacity, View } from 'react-native';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/button/Button';
import React from 'react';
import { LinkForm } from '@/components/forms/LinkForm';
import { ScreenContainer } from '@/components/ui/ScreenContainer';
import { ScreenTitle } from '@/components/ui/ScreenTitle';
import useScreen from './useScreen';
import { URLInputActions } from '@/components/ui/URLInputActions';
import { BottomViewButton } from '@/components/ui/BottomViewButton';
import { router } from 'expo-router';
import { APP_ROUTES } from '@/utils/routes';
import { useAppSelector } from '@/store';
import { ThemedText } from '@/components/ui/ThemedText';
import { ReadMeLogo } from '@/components/ui/ReadMeLogo';

export default function AddLinkScreen() {
  const { user } = useAppSelector((state) => state.user);
  const {
    t,
    control,
    handleSubmit,
    errors,
    url,
    setValue,
    metadataGenerated,
    metadata,
    onSubmit,
    handleSuccess,
  } = useScreen();

  return (
    <ScreenContainer>
      <View className={'w-full flex items-end justify-end'}>
        <TouchableOpacity className={'bg-transparent border-b-2 px-2 py-1 flex justify-center items-center'}
                          onPress={() => {
                            router.navigate(APP_ROUTES.SETTINGS);
                          }}>
          <ThemedText size={'md'} className={'text-black font-bold uppercase'}>
            {user?.name[0] ?? 'Michal'}
          </ThemedText>
        </TouchableOpacity>
      </View>
      <View className={'flex-1 items-stretch justify-start gap-6'}>
        <ReadMeLogo containerClassName={'h-[20%]'} />
        <ScreenTitle title={'Let me read for you'} description={t('add_link_description')} />
        <View className={'my-6 gap-6'}>
          <Controller
            name="url"
            control={control}
            render={({ field: { value, onChange, onBlur } }) => (
              <Input
                inputClassName={'uppercase'}
                placeholder={t('past_url_address')}
                value={value}
                disabled={metadataGenerated}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.url}
              >
                <URLInputActions
                  url={url}
                  onClear={() => setValue('url', '')}
                  onPaste={(text) => setValue('url', text)}
                  metadataGenerated={metadataGenerated}
                />
              </Input>
            )}
          />
          {!metadataGenerated && (
            <View className={'w-full flex-row items-center justify-center gap-4'}>
              <Button
                buttonClassName={'w-1/2'}
                type={'secondary'}
                title={'send'}
                onPress={handleSubmit(onSubmit)}
              />
            </View>
          )}
        </View>
        {metadataGenerated && <LinkForm handleClose={handleSuccess} link={metadata} formState={'new'} />}
      </View>
      <BottomViewButton>
        <Button
          type={'primary'}
          title={'My Library'}
          onPress={() => {
            router.navigate(APP_ROUTES.LIBRARY);
          }}
        />
      </BottomViewButton>
    </ScreenContainer>
  );
}
