import {View, Text} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScrollView} from 'react-native-gesture-handler';
import BackIcon from '../../components/BackIcon';
import STText from '../../components/STComponents/STText';
import Lottie from 'lottie-react-native';

export default function NotificationScreen({navigation}) {
  return (
    <SafeAreaView className="bg-white h-full p-4">
      <ScrollView className="bg-white">
        <View className="flex-row items-center">
          <BackIcon onPress={() => navigation.goBack()} />
          <STText className="text-2xl ml-2 text-blue-900" font="bold">
            Thông báo
          </STText>
        </View>
        <View className="flex items-center justify-center mt-10">
          <Lottie
            source={require('../../../assets/lottieFile/no-notification.json')}
            autoPlay
            autoSize
            className="w-72 h-72"
            resizeMode="cover"
          />
          <STText className="text-2xl text-black font-bold text-center">
            Hiện chưa có thông báo nào
          </STText>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
