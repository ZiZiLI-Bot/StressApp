/* eslint-disable react-hooks/exhaustive-deps */
import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {ScrollView, StatusBar} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import HomeHeader from '../../container/HomeContainer/HomeHeader';
import HomeQuiz from '../../container/HomeContainer/HomeQuiz';

export default function HomeScreen() {
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  return (
    <SafeAreaView className="bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <ScrollView className="p-4">
        <HomeHeader />
        <HomeQuiz />
      </ScrollView>
    </SafeAreaView>
  );
}
