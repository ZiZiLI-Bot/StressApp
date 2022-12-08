import React from 'react';
import {Alert, TouchableOpacity, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {Avatar} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import BackIcon from '../../components/BackIcon';
import STText from '../../components/STComponents/STText';

const courseOnline = [
  {
    id: 0,
    name: 'Khóa học 1: Hít thở thư giãn',
    overview: 'Khóa học này giúp bạn thư giãn và hít thở đúng cách',
    image:
      'https://i.ytimg.com/vi/4CKvml4pjo8/hqdefault.jpg?sqp=-oaymwEcCPYBEIoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBcP-cizl82xkqqwTGFCoNbmYRweg',
    url: '4CKvml4pjo8',
  },
];

export default function CourseList({navigation}) {
  const handleCourse = item => {
    navigation.navigate('CourseDetail', {data: item});
  };
  return (
    <SafeAreaView className="p-4 h-full bg-white">
      <ScrollView className="bg-white">
        <View>
          <View className="w-full h-16 flex-row items-center">
            <BackIcon className="mr-3" onPress={() => navigation.goBack()} />
            <STText font="bold" className="text-2xl text-black">
              Khoá học
            </STText>
          </View>
          {courseOnline.map(item => (
            <TouchableOpacity
              onPress={() => handleCourse(item)}
              className="px-4 w-full h-24 bg-slate-200 rounded-lg flex-row items-center">
              <Avatar.Image
                source={{
                  uri: item.image,
                }}
              />
              <View>
                <STText className="text-xl font-bold text-black ml-3">
                  {item.name}
                </STText>
                <STText className="text-sm text-gray-600 ml-3 w-9/12 mt-1">
                  {item.overview}
                </STText>
              </View>
            </TouchableOpacity>
          ))}
        </View>
        <View>
          <STText font="bold" className="text-2xl text-black mt-4">
            Khóa học offline
          </STText>
          <View className="my-6 space-y-5">
            <TouchableOpacity
              onPress={() => Alert.alert('Coming soon')}
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
              onPress={() => Alert.alert('Coming soon')}>
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
