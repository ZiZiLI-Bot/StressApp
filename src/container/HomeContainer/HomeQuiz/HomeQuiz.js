import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import STDropDown from '../../../components/STComponents/STDropDown';
import STText from '../../../components/STComponents/STText';

const dataEmotion = [
  {
    icon: 'https://cdn-icons-png.flaticon.com/512/2584/2584606.png',
    name: 'Vui vẻ',
  },
  {
    icon: 'https://cdn-icons-png.flaticon.com/512/725/725107.png',
    name: 'Tốt',
  },
  {
    icon: 'https://cdn-icons-png.flaticon.com/512/725/725085.png',
    name: 'OK',
  },
  {
    icon: 'https://cdn-icons-png.flaticon.com/512/725/725099.png',
    name: 'Buồn',
  },
  {
    icon: 'https://cdn-icons-png.flaticon.com/512/742/742752.png',
    name: 'Tồi tệ',
  },
];

export default function HomeQuiz() {
  const navigation = useNavigation();

  return (
    <View className="mt-8 py-2">
      <STDropDown title="Sáng nay bạn cảm thấy thế nào ?">
        <View className="w-full bg-gray-200 flex justify-center items-center mt-2 rounded-md">
          <View className="my-4 flex-row">
            {dataEmotion.map((item, index) => (
              <TouchableOpacity key={item.name}>
                <View className="flex items-center justify-center mx-4">
                  <Image
                    key={item.name + index}
                    source={{
                      uri: item.icon,
                    }}
                    className="w-10 h-10"
                  />
                  <STText>{item.name}</STText>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </STDropDown>
      <View className="mt-10 space-x-2">
        <STText className="text-2xl text-black font-bold">
          Trắc nhiệm cá nhân
        </STText>
        <TouchableOpacity
          className="bg-slate-300 w-32 h-36 mt-5 rounded-md flex justify-center items-center"
          onPress={() => navigation.navigate('QuizScreen')}>
          <STText className="text-center text-black">
            Trắc nhiệm trầm cảm PHQ
          </STText>
        </TouchableOpacity>
      </View>
    </View>
  );
}
