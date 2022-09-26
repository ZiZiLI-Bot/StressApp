import React from 'react';
import {ScrollView, StatusBar} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';
import HomeHeader from '../../container/HomeContainer/HomeHeader';
import HomeQuiz from '../../container/HomeContainer/HomeQuiz';

export default function HomeScreen() {
  const height = useSelector(state => state.screenDimensions.height);
  return (
    <SafeAreaView className="bg-white" style={{minHeight: height}}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <ScrollView className="p-4">
        <HomeHeader />
        <HomeQuiz />
      </ScrollView>
    </SafeAreaView>
  );
}
