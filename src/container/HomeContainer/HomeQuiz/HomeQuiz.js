import React from 'react';
import {View} from 'react-native';
import STDropDown from '../../../components/STComponents/STDropDown';
import STText from '../../../components/STComponents/STText';

export default function HomeQuiz() {
  return (
    <View className="mt-8 py-2">
      <STDropDown title="Sáng nay bạn cảm thấy thế nào?">
        <View className="w-full h-20 bg-gray-200 flex justify-center items-center mt-2 rounded-md">
          <STText className="text-black">Hello World</STText>
        </View>
      </STDropDown>
    </View>
  );
}
