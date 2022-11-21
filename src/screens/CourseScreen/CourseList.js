import React from 'react';
import {Alert, TouchableOpacity, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {Avatar} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import STText from '../../components/STComponents/STText';

export default function CourseList({navigation}) {
  const handleCourse = () => {
    Alert.alert('Thông báo', 'Tính năng đang được phát triển');
  };
  return (
    <SafeAreaView className="p-4 h-full bg-white">
      <ScrollView className="bg-white">
        <View>
          <View className="w-full h-16 flex-row items-center justify-between">
            <STText font="bold" className="text-2xl text-black">
              Khoá học
            </STText>
            <View>
              <TouchableOpacity
                className="bg-gray-200 w-12 h-12 flex justify-center items-center rounded-xl"
                onPress={() => navigation.openDrawer()}>
                <Icon name="menu-open" size={30} color="#5669ff" />
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity className="my-6 space-y-5">
            <TouchableOpacity
              onPress={handleCourse}
              className="px-4 w-full h-24 bg-slate-200 rounded-lg flex-row items-center">
              <Avatar.Image
                source={{
                  uri: 'https://bacsitamly.vn/wp-content/uploads/2022/01/bac-si-tam-ly-1024x683.jpg',
                }}
              />
              <STText className="text-xl font-bold text-black ml-3">
                Khóa học 1: Khóa học tâm lý
              </STText>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleCourse}
              className="px-4 w-full h-24 bg-slate-200 rounded-lg flex-row items-center">
              <Avatar.Image
                source={{
                  uri: 'https://bacsitamly.vn/wp-content/uploads/2022/01/bac-si-tam-ly-1024x683.jpg',
                }}
              />
              <STText className="text-xl font-bold text-black ml-3">
                Khóa học 2: Khóa học tâm hồn
              </STText>
            </TouchableOpacity>
          </TouchableOpacity>
        </View>
        <View>
          <STText font="bold" className="text-2xl text-black mt-4">
            Khóa học offline
          </STText>
          <View className="my-6 space-y-5">
            <TouchableOpacity
              onPress={handleCourse}
              className="px-4 w-full h-24 bg-slate-200 rounded-lg flex-row items-center">
              <Avatar.Image
                source={{
                  uri: 'https://bacsitamly.vn/wp-content/uploads/2022/01/bac-si-tam-ly-1024x683.jpg',
                }}
              />
              <STText className="text-xl font-bold text-black ml-3">
                Khóa học 1: Khóa học tâm lý
              </STText>
            </TouchableOpacity>
            <TouchableOpacity
              className="px-4 w-full h-24 bg-slate-200 rounded-lg flex-row items-center"
              onPress={handleCourse}>
              <Avatar.Image
                source={{
                  uri: 'https://bacsitamly.vn/wp-content/uploads/2022/01/bac-si-tam-ly-1024x683.jpg',
                }}
              />
              <STText className="text-xl font-bold text-black ml-3">
                Khóa học 2: Khóa học tâm hồn
              </STText>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
