import React, { useEffect } from 'react';
import { ThemedText } from '@/components/ui/ThemedText';
import { ThemedView } from '@/components/ui/ThemedView';
import { Pressable, View } from 'react-native';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useRouter } from 'expo-router';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { RoundButton } from '@/components/ui/RoundButton';

export default function Index() {
  const router = useRouter();
  const [phone, setPhone] = React.useState('');

  useEffect(() => {
    setTimeout(() => {
      router.navigate('/(main)');
    }, 1000);
  }, [router]);

  return (
    <ThemedView withIOSPaddingBottom className="flex-1">
      <View className="flex-1 bg-blue-400 dark:bg-amber-200" />
      <View className="flex-1 items-start gap-6 px-6 pt-10">
        <ThemedText type="title" className="text-3xl font-extrabold">
          Welcome!
        </ThemedText>
        <View className="w-full">
          <Input
            placeholder={'Phone number'}
            inputMode={'numeric'}
            value={phone}
            onChangeText={(text) => setPhone(text)}
          />
        </View>
        <Button
          type={'primary'}
          title={'Login'}
          onPress={() => {
            router.navigate('/(login)/verify-code');
          }}
        />
        <View className="w-full flex-row items-center justify-center gap-2">
          <ThemedText type="default">Not a member ?</ThemedText>
          <Pressable
            onPress={() => {
              router.navigate('./(login)/sign-up');
            }}
          >
            <ThemedText type="subtitle" className="text-sm font-semibold text-blue-600">
              Register now
            </ThemedText>
          </Pressable>
        </View>
        <View className="flex w-full items-center justify-center gap-4 border-t border-gray-200 pt-6">
          <ThemedText type="default">or continue with</ThemedText>
          <View className="flex-row items-center justify-center gap-4">
            <RoundButton className={'bg-blue-500'} onPress={() => {
            }}>
              <IconSymbol name={'facemask'} color="white" size={24} />
            </RoundButton>
            <RoundButton className={'bg-red-500'} onPress={() => {
            }}>
              <IconSymbol name="gauge" color="white" size={24} />
            </RoundButton>
            <RoundButton className={'bg-black'} onPress={() => {
            }}>
              <IconSymbol name="appletv" color="white" size={24} />
            </RoundButton>
          </View>
        </View>
      </View>
    </ThemedView>
  );
}
