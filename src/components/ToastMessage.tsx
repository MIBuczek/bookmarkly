// components/ToastMessage.tsx
import React from 'react';
import { Text, View } from 'react-native';
import { ToastProps } from 'react-native-toast-notifications/src/toast';

const COLORS: Record<string, { bg: string; border: string; text: string }> = {
  info: {
    bg: '#e0f2fe', // light blue
    border: '#0284c7',
    text: '#0f172a',
  },
  success: {
    bg: '#dcfce7', // light green
    border: '#16a34a',
    text: '#052e16',
  },
  warning: {
    bg: '#fef3c7', // light yellow
    border: '#d97706',
    text: '#431407',
  },
  error: {
    bg: '#fee2e2', // light red
    border: '#dc2626',
    text: '#450a0a',
  },
};

export const ToastMessage: React.FC<ToastProps> = ({ type = 'info', message }) => {
  const colors = COLORS[type];
  return (
    <View
      className={'mt-2 flex-row items-center gap-2 rounded-xl border px-2 py-3'}
      style={{ backgroundColor: colors.bg, borderColor: colors.border }}
    >
      <View className={'mr-3 w-1 self-stretch rounded-full'} style={{ backgroundColor: colors.border }} />
      <View className={'flex-shrink'}>
        <Text className={'text-sm font-medium'} style={[{ color: colors.text }]} numberOfLines={2}>
          {message}
        </Text>
      </View>
    </View>
  );
};
