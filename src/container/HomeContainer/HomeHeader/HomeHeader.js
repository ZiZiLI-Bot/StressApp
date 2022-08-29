import {View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import STText from '../../../components/STComponents/STText';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';

export default function HomeHeader() {
  const userData = useSelector(state => state.user);
  const navigation = useNavigation();
  return (
    <View>
      <View className="flex-row items-center">
        <View className="flex-1">
          <Image
            source={{
              uri: userData.avatar,
            }}
            className="w-14 h-14 rounded-xl"
          />
        </View>
        <TouchableOpacity
          className="bg-gray-200 w-12 h-12 flex justify-center items-center rounded-xl"
          onPress={() => navigation.navigate('Login')}>
          <Icon name="menu-open" size={30} color="#5669ff" />
        </TouchableOpacity>
      </View>
      <View className="pt-12">
        <STText className="text-2xl text-gray-600">Chào buổi sáng,</STText>
        <STText font="bold" className="text-3xl text-blue-700">
          {userData.name}
        </STText>
      </View>
    </View>
  );
}
