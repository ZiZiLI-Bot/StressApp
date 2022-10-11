/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import {ScrollView, StatusBar} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';
import HomeHeader from '../../container/HomeContainer/HomeHeader';
import HomeQuiz from '../../container/HomeContainer/HomeQuiz';
import PostContainer from '../../container/HomeContainer/PostsContainer';

export default function HomeScreen({navigation}) {
  const height = useSelector(state => state.screenDimensions.height);

  return (
    <SafeAreaView className="bg-white">
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <ScrollView className="p-4" contentContainerStyle={{paddingBottom: 40}}>
        <HomeHeader />
        <HomeQuiz />
        <PostContainer />
      </ScrollView>
    </SafeAreaView>
  );
}
