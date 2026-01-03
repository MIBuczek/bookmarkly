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
    <View className="flex gap-2">
      {label && (
        <ThemedText type="title" className={twMerge('text-sm text-dark-800', labelClassName)}>
          {label}
        </ThemedText>
      )}
      <View className={'relative'}>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          editable={!disabled}
          multiline={multiline}
          numberOfLines={numberOfLines}
          className={twMerge(
            'h-[50px] rounded-xl border border-dark-400 p-4 text-dark-600 dark:border-gray-400 dark:text-dark-400',
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
