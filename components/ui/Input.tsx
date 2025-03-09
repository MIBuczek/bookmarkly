import React from 'react';
import { TextInput, TextInputProps, View } from 'react-native';
import { ThemedText } from '@/components/ui/ThemedText';
import { twMerge } from 'tailwind-merge';

interface FieldInputProps extends TextInputProps {
  label?: string;
  labelClassName?: string;
  value: string;
  onChangeText: (text: string) => void;
  inputClassName?: string;
  placeholder?: string;
  disabled?: boolean;
}

export const Input = ({
                        label,
                        labelClassName,
                        value,
                        onChangeText,
                        inputClassName,
                        placeholder,
                        disabled,
                      }: FieldInputProps) => {
  return (
    <View className="flex w-full gap-2">
      {label && (
        <ThemedText type="title" className={twMerge('text-sm text-gray-600', labelClassName)}>
          {label}
        </ThemedText>
      )}
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        editable={!disabled}
        className={twMerge(
          'w-full rounded-xl border border-gray-300 p-4 text-gray-600 placeholder:text-gray-400 dark:border-gray-200',
          inputClassName,
        )}
      />
    </View>
  );
};
