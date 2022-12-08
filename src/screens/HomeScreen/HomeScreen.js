/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {ScrollView, StatusBar, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';
import STText from '../../components/STComponents/STText';
import HiIcon from '../../../assets/image/waving-hand-svgrepo-com.svg';
import TNTLICON from '../../../assets/image/choices-order.svg';
import CDCNICON from '../../../assets/image/CDCNICON.svg';
import NKCNICON from '../../../assets/image/NKCNICON.svg';
import KHICON from '../../../assets/image/KHICON.svg';
import TVCGICON from '../../../assets/image/TVCGICON.svg';
import BVICON from '../../../assets/image/BVICON.svg';
import {Avatar} from 'react-native-paper';

const listFunction = [
  {
    id: 0,
    link: 'QuizListScreen',
    name: 'Trắc nghiệm tâm lý',
    icon: <TNTLICON width={100} height={100} />,
  },
  {
    id: 1,
    link: 'IdentifyScreen',
    name: 'Chẩn đoán cá nhân',
    icon: <CDCNICON width={86} height={86} />,
  },
  {
    id: 2,
    link: 'DiaryScreen',
    name: 'Nhật ký cá nhân',
    icon: <NKCNICON width={86} height={86} />,
  },
  {
    id: 3,
    link: 'CourseScreen',
    name: 'Khóa học',
    icon: <KHICON width={100} height={100} />,
  },
  {
    id: 4,
    link: 'ExpertsScreen',
    name: 'Tư vấn từ chuyên gia',
    icon: <TVCGICON width={100} height={100} />,
  },
  {
    id: 5,
    link: 'NewspaperListScreen',
    name: 'Bài viết',
    icon: <BVICON width={86} height={86} />,
  },
];

export default function HomeScreen({navigation}) {
  const user = useSelector(state => state.user);

  return (
    <SafeAreaView className="bg-white">
      <ScrollView
        className="p-4 bg-white"
        contentContainerStyle={{paddingBottom: 40}}>
        <View className="mt-4 flex-row justify-between items-center">
          <View className="flex-row flex-1 items-center">
            <HiIcon width={30} height={30} />
            <STText className="text-2xl ml-1 text-blue-700" font="bold">
              Hi {user.name}!
            </STText>
          </View>
          <View className="w-14 h-14 bg-slate-300 flex items-center justify-center rounded-full">
            <Avatar.Image
              size={40}
              source={{uri: user.avatar}}
              className="overflow-hidden"
            />
          </View>
        </View>
        <View className="mt-6">
          {listFunction.map(item => (
            <TouchableOpacity
              key={item.id}
              onPress={() => navigation.navigate(item.link)}
              className="flex-row w-full h-32 bg-slate-200 items-center justify-between rounded-xl p-3 my-3">
              <STText className="text-xl w-8/12 text-blue-900" font="bold">
                {item.name}
              </STText>
              <View className="w-24 flex items-center">{item.icon}</View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
