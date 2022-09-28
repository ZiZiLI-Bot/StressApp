import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';
import STText from '../../components/STComponents/STText';
import Insomnia from '../../../assets/image/insomnia.svg';
import ReLaxMind from '../../../assets/image/relaxing-mind.svg';
import BullyPerson from '../../../assets/image/bullying-person.svg';

const fakeData = [
  {
    id: 0,
    name: 'Diễn đàn về vấn đề mất ngủ, trầm cảm, lo âu, OCD',
    color: 'violet',
    type: 'insomnia',
    posts: [
      {
        id: 1,
        author: 'SuperAdmin',
        date: Date.now(),
        content: 'Hello world',
        likes: 0,
        comments: ['Hello world', 'Hello world', 'Hello world'],
        re_posts: 0,
      },
      {
        id: 2,
        author: 'SuperAdmin',
        date: Date.now(),
        content: 'Hello world',
        likes: 0,
        comments: ['Hello world', 'Hello world', 'Hello world'],
        re_posts: 0,
      },
      {
        id: 3,
        author: 'SuperAdmin',
        date: Date.now(),
        content: 'Hello world',
        likes: 0,
        comments: ['Hello world', 'Hello world', 'Hello world'],
        re_posts: 0,
      },
    ],
  },
  {
    id: 1,
    name: 'Diễn đàn về những khó khăn trong tâm lý học đường',
    color: 'blue',
    type: 'insomnia',
    posts: [
      {
        id: 1,
        author: 'SuperAdmin',
        date: Date.now(),
        content: 'Hello world',
        likes: 0,
        comments: ['Hello world', 'Hello world', 'Hello world'],
        re_posts: 0,
      },
      {
        id: 2,
        author: 'SuperAdmin',
        date: Date.now(),
        content: 'Hello world',
        likes: 0,
        comments: ['Hello world', 'Hello world', 'Hello world'],
        re_posts: 0,
      },
      {
        id: 3,
        author: 'SuperAdmin',
        date: Date.now(),
        content: 'Hello world',
        likes: 0,
        comments: ['Hello world', 'Hello world', 'Hello world'],
        re_posts: 0,
      },
    ],
  },
  {
    id: 3,
    name: 'Tư duy tích cực, thay đổi cuộc sống',
    color: 'green',
    type: 'insomnia',
    posts: [
      {
        id: 1,
        author: 'SuperAdmin',
        date: Date.now(),
        content: 'Hello world',
        likes: 0,
        comments: ['Hello world', 'Hello world', 'Hello world'],
        re_posts: 0,
      },
      {
        id: 2,
        author: 'SuperAdmin',
        date: Date.now(),
        content: 'Hello world',
        likes: 0,
        comments: ['Hello world', 'Hello world', 'Hello world'],
        re_posts: 0,
      },
      {
        id: 3,
        author: 'SuperAdmin',
        date: Date.now(),
        content: 'Hello world',
        likes: 0,
        comments: ['Hello world', 'Hello world', 'Hello world'],
        re_posts: 0,
      },
    ],
  },
];

export default function ForumList() {
  const height = useSelector(state => state.screenDimensions.height);
  return (
    <SafeAreaView
      style={{backgroundColor: 'white', minHeight: height}}
      className="p-4">
      <ScrollView>
        <View className="mt-4">
          <STText className="text-3xl font-bold text-black text-center">
            Diễn đàn xã hội
          </STText>
          <STText className="mt-2 text-sm text-gray-500 text-center">
            Bạn có thể chia sẻ những gì mình nghĩ, những điều khó nói, những vấn
            đề mà bạn đang gặp phải trong cuộc sống hằng ngày.
          </STText>
          <STText className="mt-2 text-sm text-gray-500 text-center">
            Tất nhiên bạn có thể hoàn toàn ẩn danh, hoặc chia sẻ thông tin. Tùy
            vào quyết định của bạn.
          </STText>
        </View>
        <View className="mt-5">
          {fakeData.map(item => (
            <Card key={item.id} data={item} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const Card = ({data}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      className="w-full h-28 rounded-lg my-2"
      style={{backgroundColor: data.color}}
      onPress={() => navigation.navigate('ForumScreen', {data: data})}>
      <View className="p-4 h-full w-5/6 flex-row items-center">
        <Insomnia width={80} height={80} />
        <STText className="text-white text-lg">{data.name}</STText>
      </View>
    </TouchableOpacity>
  );
};
