import {View, Text} from 'react-native';
import React from 'react';
import STText from '../../components/STComponents/STText';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScrollView} from 'react-native-gesture-handler';
import {Avatar} from 'react-native-paper';

export default function CourseList() {
  return (
    <SafeAreaView className="p-4 h-full bg-white">
      <ScrollView className="bg-white">
        <View>
          <STText font="bold" className="text-2xl text-black mt-4">
            Khóa học online
          </STText>
          <View className="my-6 space-y-5">
            <View className="px-4 w-full h-24 bg-slate-200 rounded-lg flex-row items-center">
              <Avatar.Image
                source={{
                  uri: 'https://bacsitamly.vn/wp-content/uploads/2022/01/bac-si-tam-ly-1024x683.jpg',
                }}
              />
              <STText className="text-xl font-bold text-black ml-3">
                Khóa học 1: Khóa học tâm lý
              </STText>
            </View>
            <View className="px-4 w-full h-24 bg-slate-200 rounded-lg flex-row items-center">
              <Avatar.Image
                source={{
                  uri: 'https://bacsitamly.vn/wp-content/uploads/2022/01/bac-si-tam-ly-1024x683.jpg',
                }}
              />
              <STText className="text-xl font-bold text-black ml-3">
                Khóa học 2: Khóa học tâm hồn
              </STText>
            </View>
          </View>
        </View>
        <View>
          <STText font="bold" className="text-2xl text-black mt-4">
            Khóa học offline
          </STText>
          <View className="my-6 space-y-5">
            <View className="px-4 w-full h-24 bg-slate-200 rounded-lg flex-row items-center">
              <Avatar.Image
                source={{
                  uri: 'https://bacsitamly.vn/wp-content/uploads/2022/01/bac-si-tam-ly-1024x683.jpg',
                }}
              />
              <STText className="text-xl font-bold text-black ml-3">
                Khóa học 1: Khóa học tâm lý
              </STText>
            </View>
            <View className="px-4 w-full h-24 bg-slate-200 rounded-lg flex-row items-center">
              <Avatar.Image
                source={{
                  uri: 'https://bacsitamly.vn/wp-content/uploads/2022/01/bac-si-tam-ly-1024x683.jpg',
                }}
              />
              <STText className="text-xl font-bold text-black ml-3">
                Khóa học 2: Khóa học tâm hồn
              </STText>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
