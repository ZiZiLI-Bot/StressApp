/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import {SafeAreaView, TouchableOpacity, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import BackIcon from '../../components/BackIcon';
import STText from '../../components/STComponents/STText';
import {getListQuestions} from '../../reducers/questions.reducers';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function QuizListScreen({navigation}) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getListQuestions());
  }, []);

  const questionsList = useSelector(state => state.questions.listQuestions);
  return (
    <SafeAreaView className="h-full bg-white p-4">
      <View className="flex-row">
        <BackIcon onPress={() => navigation.goBack()} />
      </View>
      <View className="mt-2">
        <STText className="text-2xl text-blue-800 mt-1" font="bold">
          Bài trắc nghiệm tâm lý
        </STText>
      </View>
      <ScrollView className="bg-white mt-2">
        {questionsList.map(item => (
          <TouchableOpacity
            onPress={() => navigation.navigate('QuizScreen', {item})}>
            <View className="bg-slate-100 p-4 rounded-md my-2">
              <STText className="text-gray-800 text-xl font-bold">
                Bài test {item.name}
              </STText>
              <View className="flex-row items-end justify-between">
                <STText
                  numberOfLines={2}
                  className="mt-2 text-gray-500 w-11/12">
                  {item.overview}
                </STText>
                <Icon name="arrow-right" color="gray" size={18} />
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
