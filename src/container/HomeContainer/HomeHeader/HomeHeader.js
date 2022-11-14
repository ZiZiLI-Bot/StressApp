/* eslint-disable react-hooks/exhaustive-deps */
import {useNavigation} from '@react-navigation/native';
import dayjs from 'dayjs';
import React, {useEffect, useState} from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useSelector} from 'react-redux';
import STText from '../../../components/STComponents/STText';

export default function HomeHeader() {
  const userData = useSelector(state => state.user);
  const navigation = useNavigation();
  const [timeTitle, setTimeTitle] = useState('');
  const time = dayjs(Date.now()).format('HH');
  useEffect(() => {
    if (time < 12) {
      setTimeTitle('Chào buổi sáng');
    } else if (time < 18) {
      setTimeTitle('Buổi chiều tốt lành');
    } else {
      setTimeTitle('Chào buổi tối');
    }
  }, []);
  return (
    <View>
      <View className="flex-row items-center">
        <View className="flex-1">
          <View className="w-14 h-14 rounded-xl overflow-hidden">
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <Image
                source={{
                  uri: userData.avatar,
                }}
                className="w-full h-full"
              />
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity
          className="bg-gray-200 w-12 h-12 flex justify-center items-center rounded-xl"
          onPress={() => navigation.openDrawer()}>
          <Icon name="menu-open" size={30} color="#5669ff" />
        </TouchableOpacity>
      </View>
      <View className="pt-12">
        <STText className="text-2xl text-gray-600">{timeTitle},</STText>
        <STText font="bold" className="text-3xl text-blue-700">
          {userData.name}
        </STText>
      </View>
    </View>
  );
}
