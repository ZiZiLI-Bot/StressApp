import {View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import STText from '../../../components/STComponents/STText';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function HomeHeader() {
  return (
    <View>
      <View className="flex-row items-center">
        <View className="flex-1">
          <Image
            source={{
              uri: 'https://haycafe.vn/wp-content/uploads/2021/11/Anh-avatar-dep-chat-lam-hinh-dai-dien.jpg',
            }}
            className="w-14 h-14 rounded-xl"
          />
        </View>
        <TouchableOpacity className="bg-gray-200 w-12 h-12 flex justify-center items-center rounded-xl">
          <Icon name="menu-open" size={30} color="#5669ff" />
        </TouchableOpacity>
      </View>
      <View className="pt-12">
        <STText className="text-2xl text-gray-600">Chào buổi sáng,</STText>
        <STText font="bold" className="text-3xl text-blue-700">
          Olivia!
        </STText>
      </View>
    </View>
  );
}
