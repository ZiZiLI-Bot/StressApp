import {View, Text, Image, ImageBackground, Alert} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScrollView} from 'react-native-gesture-handler';
import BackIcon from '../../components/BackIcon';
import STText from '../../components/STComponents/STText';
import {Button, Divider} from 'react-native-paper';

export default function PremiumScreen({navigation}) {
  return (
    <SafeAreaView className="bg-white h-full p-4">
      <ScrollView className="bg-white">
        <View className="">
          <BackIcon onPress={() => navigation.goBack()} />
          <STText className="text-3xl text-black mt-5 text-center" font="bold">
            <STText className="text-blue-600" font="bold">
              ER
            </STText>{' '}
            Emotional Rescue
          </STText>
          <STText
            className="text-3xl text-lime-900 mt-1 text-center"
            font="bold">
            Premium
          </STText>
        </View>
        <View>
          <STText className="text-lg text-center text-blue-800 mt-4">
            Tính năng bạn vừa truy cập thuộc gói Premium:
          </STText>
          <View
            className="mt-3 w-full h-48 overflow-hidden relative rounded-md"
            style={{borderTopEndRadius: 50}}>
            <ImageBackground
              className="w-full h-48 absolute"
              source={{
                uri: 'https://i.pinimg.com/originals/df/17/b7/df17b7e4700c2c5868d5f01acd0fdeca.jpg',
              }}
            />
            <STText className="text-white text-4xl m-4 mt-6" font="bold">
              ER Premium
            </STText>
            <View className="absolute bottom-5 right-5 flex items-end">
              <STText className="text-white text-4xl" font="bold">
                24.000đ
              </STText>
              <STText className="text-base text-white">/month</STText>
            </View>
          </View>
          <STText className="text-base text-center text-blue-800 mt-4">
            Với gói{' '}
            <STText font="bold" className="text-lime-900">
              ER Premium
            </STText>{' '}
            bạn sẽ được truy cập đầy đủ các khóa học và các tính năng như:
          </STText>
        </View>
        <View className="mt-3 px-3">
          <View className="flex-row justify-between my-2">
            <STText className="text-xl text-center text-gray-500 mt-4">
              Khóa học:
            </STText>
            <STText
              className="text-xl text-center text-blue-800 mt-4"
              font="bold">
              Không giới hạn
            </STText>
          </View>
          <Divider />
          <View className="flex-row justify-between my-2">
            <STText className="text-xl text-center text-gray-500 mt-4">
              Tư vấn online:
            </STText>
            <STText
              className="text-xl text-center text-blue-800 mt-4"
              font="bold">
              Không giới hạn
            </STText>
          </View>
          <Divider />
          <View className="flex-row justify-between my-2">
            <STText className="text-xl text-center text-gray-500 mt-4">
              Đặt lịch hẹn:
            </STText>
            <STText
              className="text-xl text-center text-blue-800 mt-4"
              font="bold">
              Không giới hạn
            </STText>
          </View>
          <Divider />
          <View className="flex-row justify-between my-2">
            <STText className="text-xl text-center text-gray-500 mt-4">
              Quảng cáo:
            </STText>
            <STText
              className="text-xl text-center text-blue-800 mt-4"
              font="bold">
              Loại bỏ
            </STText>
          </View>
        </View>
        <Button
          mode="contained"
          buttonColor="green"
          className="mt-6 text-2xl"
          onPress={() => Alert.alert('Thông báo', 'Tính năng đang phát triển')}>
          ĐĂNG KÝ NGAY
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
}
