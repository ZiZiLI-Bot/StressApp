import {View, Text} from 'react-native';
import React from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import BackIcon from '../../components/BackIcon';
import {Avatar, Divider} from 'react-native-paper';
import STText from '../../components/STComponents/STText';
import DayjsParse from '../../helpers/Dayjs';
import FastImage from 'react-native-fast-image';

export default function ViewDetailPost({navigation, route}) {
  const {data} = route.params;
  return (
    <ScrollView className="bg-white">
      <View className="p-4">
        <BackIcon onPress={() => navigation.goBack()} />
      </View>
      <View className="p-4 flex-row items-center">
        <Avatar.Image
          source={{uri: data.profile.avatar}}
          className="overflow-hidden"
        />
        <View className="px-2">
          <STText font="medium" className="text-xl text-black">
            {data.profile.name}
          </STText>
          <STText font="medium" className="text-sm text-slate-500">
            {DayjsParse.dynamicsDate(data.CreatedAt)}
          </STText>
        </View>
      </View>
      <View className="px-5">
        <STText font="medium" className="text-lg text-black">
          {data.content}
        </STText>
      </View>
      <Divider className="my-2" />
      <View>
        {data.image.map((item, idx) => (
          <View className="pb-2 rounded-sm overflow-hidden">
            <FastImage
              key={idx}
              source={{uri: item}}
              className="w-full h-96"
              resizeMode="cover"
            />
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
