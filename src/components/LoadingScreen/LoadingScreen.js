import {View, Text} from 'react-native';
import Lottie from 'lottie-react-native';
import React from 'react';
import STText from '../STComponents/STText';

export default function LoadingScreen() {
  return (
    <View className="flex justify-center items-center">
      <Lottie
        source={require('../../../assets/lottieFile/loading.json')}
        autoPlay
        loop
        autoSize
        className="w-40 h-40"
        resizeMode="cover"
      />
      <STText font="bold" className="text-2xl text-black">
        Đang tải...
      </STText>
    </View>
  );
}
