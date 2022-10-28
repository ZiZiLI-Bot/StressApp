import {useNavigation} from '@react-navigation/native';
import dayjs from 'dayjs';
import React from 'react';
import {View} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';
import Insomnia from '../../../assets/image/insomnia.svg';
import STDropDown from '../../components/STComponents/STDropDown';
import STText from '../../components/STComponents/STText';

const fakeData = [
  {
    id: 0,
    name: 'Diễn đàn về vấn đề mất ngủ, trầm cảm, lo âu, OCD',
    color: 'violet',
    type: 'insomnia',
    posts: [
      {
        id: 1,
        author: 'Maria',
        avatar: 'https://picsum.photos/200',
        content: 'Mình đang mất ngủ, ai có cách giúp mình không ?',
        date: dayjs('2022-10-12 19:18'),
        likes: 16,
        re_posts: 0,
        comments: [
          {
            id: 1,
            author: 'Mark',
            avatar: 'https://picsum.photos/200',
            content: 'Bình luận 1',
            date: dayjs('2022-10-12 19:20'),
          },
          {
            id: 2,
            author: 'Light',
            avatar: 'https://picsum.photos/200',
            content: 'Bình luận 2',
            date: dayjs('2022-10-12 19:26'),
          },
          {
            id: 3,
            author: 'Peter',
            avatar: 'https://picsum.photos/200',
            content: 'Bình luận 3',
            date: dayjs('2022-10-12 20:18'),
          },
        ],
      },
      {
        id: 2,
        author: 'Super Admin',
        avatar: 'https://picsum.photos/300',
        date: dayjs('2022-10-13 7:18'),
        content:
          'Dạo gần đây mình rất hay bị lo lắng, ai có cách giúp mình không ?',
        likes: 55,
        comments: [
          {
            id: 1,
            author: 'Mark',
            avatar: 'https://picsum.photos/100',
            content: 'Bình luận 1',
            date: dayjs('2022-10-12 19:20'),
          },
          {
            id: 2,
            author: 'Light',
            avatar: 'https://picsum.photos/200',
            content: 'Bình luận 2',
            date: dayjs('2022-10-12 19:26'),
          },
          {
            id: 3,
            author: 'Peter',
            avatar: 'https://picsum.photos/300',
            content: 'Bình luận 3',
            date: dayjs('2022-10-12 20:18'),
          },
        ],
        re_posts: 0,
      },
      {
        id: 3,
        author: 'Peter',
        date: Date.now(),
        avatar: 'https://picsum.photos/400',
        content: 'Bài đăng thử nghiệm 1',
        likes: 12,
        comments: [
          {
            id: 1,
            author: 'Mark',
            avatar: 'https://picsum.photos/100',
            content: 'Bình luận 1',
            date: dayjs('2022-10-12 19:20'),
          },
          {
            id: 2,
            author: 'Light',
            avatar: 'https://picsum.photos/200',
            content: 'Bình luận 2',
            date: dayjs('2022-10-12 19:26'),
          },
          {
            id: 3,
            author: 'Peter',
            avatar: 'https://picsum.photos/300',
            content: 'Bình luận 3',
            date: dayjs('2022-10-12 20:18'),
          },
          {
            id: 3,
            author: 'Peter',
            avatar: 'https://picsum.photos/500',
            content: 'Bình luận 4',
            date: dayjs('2022-10-12 20:18'),
          },
        ],
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
        author: 'Peter',
        avatar: 'https://picsum.photos/650',
        date: dayjs('2022-10-12 19:18'),
        content: '>>>>>',
        likes: 0,
        comments: [
          {
            id: 1,
            author: 'Mark',
            avatar: 'https://picsum.photos/200',
            content: 'Bình luận 1',
            date: dayjs('2022-10-12 19:20'),
          },
          {
            id: 2,
            author: 'Light',
            avatar: 'https://picsum.photos/200',
            content: 'Bình luận 2',
            date: dayjs('2022-10-12 19:26'),
          },
          {
            id: 3,
            author: 'Peter',
            avatar: 'https://picsum.photos/200',
            content: 'Bình luận 3',
            date: dayjs('2022-10-12 20:18'),
          },
        ],
        re_posts: 0,
      },
      {
        id: 2,
        author: 'Mark',
        avatar: 'https://picsum.photos/300',
        date: Date.now(),
        content: 'I am Mark',
        likes: 0,
        comments: [
          {
            id: 1,
            author: 'Mark',
            avatar: 'https://picsum.photos/200',
            content: 'Bình luận 1',
            date: dayjs('2022-10-12 19:20'),
          },
          {
            id: 2,
            author: 'Light',
            avatar: 'https://picsum.photos/200',
            content: 'Bình luận 2',
            date: dayjs('2022-10-12 19:26'),
          },
          {
            id: 3,
            author: 'Peter',
            avatar: 'https://picsum.photos/200',
            content: 'Bình luận 3',
            date: dayjs('2022-10-12 20:18'),
          },
        ],
        re_posts: 0,
      },
      {
        id: 3,
        author: 'Super Admin',
        date: Date.now(),
        content: 'Hello world',
        likes: 0,
        comments: [
          {
            id: 1,
            author: 'Mark',
            avatar: 'https://picsum.photos/200',
            content: 'Bình luận 1',
            date: dayjs('2022-10-12 19:20'),
          },
          {
            id: 2,
            author: 'Light',
            avatar: 'https://picsum.photos/200',
            content: 'Bình luận 2',
            date: dayjs('2022-10-12 19:26'),
          },
          {
            id: 3,
            author: 'Peter',
            avatar: 'https://picsum.photos/200',
            content: 'Bình luận 3',
            date: dayjs('2022-10-12 20:18'),
          },
        ],
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
        avatar: 'https://picsum.photos/650',
        date: Date.now(),
        content: 'Hello world',
        likes: 0,
        comments: [
          {
            id: 1,
            author: 'Mark',
            avatar: 'https://picsum.photos/200',
            content: 'Bình luận 1',
            date: dayjs('2022-10-12 19:20'),
          },
          {
            id: 2,
            author: 'Light',
            avatar: 'https://picsum.photos/200',
            content: 'Bình luận 2',
            date: dayjs('2022-10-12 19:26'),
          },
          {
            id: 3,
            author: 'Peter',
            avatar: 'https://picsum.photos/200',
            content: 'Bình luận 3',
            date: dayjs('2022-10-12 20:18'),
          },
        ],
        re_posts: 0,
      },
      {
        id: 2,
        author: 'SuperAdmin',
        avatar: 'https://picsum.photos/300',
        date: Date.now(),
        content: 'Hello world',
        likes: 0,
        comments: [
          {
            id: 1,
            author: 'Mark',
            avatar: 'https://picsum.photos/200',
            content: 'Bình luận 1',
            date: dayjs('2022-10-12 19:20'),
          },
          {
            id: 2,
            author: 'Light',
            avatar: 'https://picsum.photos/200',
            content: 'Bình luận 2',
            date: dayjs('2022-10-12 19:26'),
          },
          {
            id: 3,
            author: 'Peter',
            avatar: 'https://picsum.photos/200',
            content: 'Bình luận 3',
            date: dayjs('2022-10-12 20:18'),
          },
        ],
        re_posts: 0,
      },
      {
        id: 3,
        author: 'SuperAdmin',
        avatar: 'https://picsum.photos/250',
        date: Date.now(),
        content: 'Hello world',
        likes: 0,
        comments: [
          {
            id: 1,
            author: 'Mark',
            avatar: 'https://picsum.photos/200',
            content: 'Bình luận 1',
            date: dayjs('2022-10-12 19:20'),
          },
          {
            id: 2,
            author: 'Light',
            avatar: 'https://picsum.photos/200',
            content: 'Bình luận 2',
            date: dayjs('2022-10-12 19:26'),
          },
          {
            id: 3,
            author: 'Peter',
            avatar: 'https://picsum.photos/200',
            content: 'Bình luận 3',
            date: dayjs('2022-10-12 20:18'),
          },
        ],
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
        </View>
        <View className="mt-5">
          {fakeData.map(item => (
            <Card key={item.id} data={item} />
          ))}
        </View>
        <STDropDown title="Chi tiết" className="mt-3" heightDrop={140}>
          <STText className="mt-2 text-sm text-gray-500 text-center">
            Bạn có thể chia sẻ những gì mình nghĩ, những điều khó nói, những vấn
            đề mà bạn đang gặp phải trong cuộc sống hằng ngày.
          </STText>
          <STText className="mt-2 text-sm text-gray-500 text-center">
            Tất nhiên bạn có thể hoàn toàn ẩn danh, hoặc chia sẻ thông tin. Tùy
            vào quyết định của bạn.
          </STText>
        </STDropDown>
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
