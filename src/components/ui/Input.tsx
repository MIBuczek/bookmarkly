import React from 'react';
import { TextInput, TextInputProps, View } from 'react-native';
import { ThemedText } from '@/components/ui/ThemedText';
import { twMerge } from 'tailwind-merge';
import { FieldError } from 'react-hook-form';
import { ErrorText } from '@/components/ui/ErrorText';
import { useTranslation } from 'react-i18next';

interface FieldInputProps extends TextInputProps {
  label?: string;
  labelClassName?: string;
  value: string;
  onChangeText: (text: string) => void;
  inputClassName?: string;
  placeholder?: string;
  disabled?: boolean;
  error?: FieldError | undefined;
  multiline?: boolean;
  numberOfLines?: number;
}

export const Input = ({
                        label,
                        labelClassName,
                        value,
                        onChangeText,
                        inputClassName,
                        placeholder,
                        disabled,
                        error,
                        multiline,
                        numberOfLines,
                        children,
                        ...rest
                      }: FieldInputProps) => {
  const { t } = useTranslation();

  return (
    <View className="flex">
      {label && (
        <ThemedText type="title" className={twMerge('text-dark-800', labelClassName)} size={'sm'}>
          {label}
        </ThemedText>
      )}
      <View className={'relative pb-1'}>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          editable={!disabled}
          multiline={multiline}
          numberOfLines={numberOfLines}
          className={twMerge(
            'border-dark-400 text-dark-600 dark:text-dark-400 h-[50px] rounded-xl border p-4 dark:border-gray-400',
            inputClassName,
            multiline && 'h-32',
          )}
          {...rest}
        />
        {children}
      </View>
      {error && <ErrorText errorMsg={t(error.message || '')} />}
    </View>
  );
};
