import React, { useState } from 'react';
import { ThemedText } from '@/components/ui/ThemedText';
import { ThemedView } from '@/components/ui/ThemedView';
import { Pressable, View } from 'react-native';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { CheckBox } from 'react-native-elements';
import { BottomSheet } from '@/components/ui/BottomSheet';
import { TermsAndConditions } from '@/components/TermsAndConditions';

export default function SignUp() {
  const [isChecked, setIsChecked] = useState(false);
  const [showTermsAndConditions, setShowTermsAndConditions] = useState(false);
  return (
    <ThemedView withIOSPaddingBottom className="flex-1 items-start justify-start px-4">
      <View className={'mb-10 mt-4 flex w-full gap-2'}>
        <ThemedText type="title" className="text-xl">
          Sign Up
        </ThemedText>
        <ThemedText className="text-gray-500">Create an account to get started</ThemedText>
      </View>
      <View className="flex w-full gap-6">
        <Input
          inputMode={'text'}
          label={'Name'}
          value={''}
          placeholder={'Full name'}
          onChangeText={(text: string) => {
            console.log(text);
          }}
        />
        <Input
          inputMode={'text'}
          label={'E-mail'}
          value={''}
          placeholder={'name@email.com'}
          onChangeText={(text: string) => {
            console.log(text);
          }}
        />
        <Input
          inputMode={'numeric'}
          value={''}
          placeholder={'00 000-000-000'}
          onChangeText={(text: string) => {
            console.log(text);
          }}
          label={'Phone'}
        />
      </View>
      <View className={'mt-auto flex w-full gap-4'}>
        <View className="flex flex-row items-center justify-start">
          <CheckBox
            checked={isChecked}
            onPress={() => setIsChecked(!isChecked)}
            iconType="material-community"
            checkedIcon="checkbox-outline"
            uncheckedIcon={'checkbox-blank-outline'}
            size={30}
            className="bg-red-500"
            containerStyle={{ padding: 0, margin: 0, width: 30, height: 30, backgroundColor: 'transparent' }}
          />
          <View className="flex">
            <View className="flex flex-row flex-wrap gap-1">
              <ThemedText className="flex flex-row gap-1">I've read and agree with the</ThemedText>
              <Pressable className="inline" onPress={() => setShowTermsAndConditions(true)}>
                <ThemedText type="subtitle" className="text-wrap text-sm text-blue-600">
                  Terms and Conditions
                </ThemedText>
              </Pressable>
              <Pressable className="inline" onPress={() => setShowTermsAndConditions(true)}>
                <ThemedText type="subtitle" className="text-wrap text-sm text-blue-600">
                  and the Privacy Policy.
                </ThemedText>
              </Pressable>
            </View>
          </View>
        </View>
        <Button type={'primary'} title={'Register'} onPress={() => {
        }} />
      </View>
      <BottomSheet
        height={90}
        title="Terms and conditions"
        visible={showTermsAndConditions}
        onRequestClose={() => {
          setShowTermsAndConditions(false);
        }}
      >
        <TermsAndConditions
          onPress={() => {
            setShowTermsAndConditions(false);
          }}
        />
      </BottomSheet>
    </ThemedView>
  );
}
