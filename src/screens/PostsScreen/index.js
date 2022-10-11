import dayjs from 'dayjs';
import React from 'react';
import {Image, ScrollView, View} from 'react-native';
import {Divider} from 'react-native-paper';
import BackIcon from '../../components/BackIcon/BackIcon';
import STText from '../../components/STComponents/STText';

export default function PostsScreen({route, navigation}) {
  const data = route.params.item;
  return (
    <ScrollView className="bg-white p-4">
      <View className="relative flex-row items-center">
        <BackIcon className="z-10" onPress={() => navigation.goBack()} />
        <STText className="text-2xl font-bold text-center text-black absolute w-full">
          Bài viết
        </STText>
      </View>
      <STText className="text-center text-black text-2xl mt-7" font="bold">
        {data.title}
      </STText>
      <View className="mb-2">
        <Image
          source={{uri: data.imageLabel}}
          className="w-full h-40 rounded-lg my-3"
        />
        <STText>{dayjs(data.date).format('DD/MM/YYYY')} - SuperAdmin</STText>
      </View>
      <Divider />
      <View>
        <STText className="text-justify text-base text-black mt-4">
          {data.content}
        </STText>
      </View>
    </ScrollView>
  );
}
