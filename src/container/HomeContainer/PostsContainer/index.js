import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {Button, Card} from 'react-native-paper';
import Icon from 'react-native-vector-icons/AntDesign';
import STText from '../../../components/STComponents/STText';

const data = [
  {
    id: 0,
    title: 'Rối loạn do sử dụng chất kích thích',
    date: Date.now(),
    imageLabel:
      'https://recmiennam.com/wp-content/uploads/2020/10/anh-buon-1.jpg',
    content:
      'Các rối loạn liên quan đến sử dụng chất kích thích bao gồm các kiểu hành vi bệnh lý liên quan đến việc sử dụng chất (ví dụ bệnh nhân tiếp tục sử dụng một chất mặc dù gặp vấn đề nghiệm trọng liên quan đến việc sủ dụng chất đó) rối loạn sử dụng chất',
  },
  {
    id: 2,
    title: 'Rối loạn do sử dụng chất kích thích',
    date: Date.now(),
    imageLabel:
      'https://recmiennam.com/wp-content/uploads/2020/10/anh-buon-1.jpg',
    content:
      'Các rối loạn liên quan đến sử dụng chất kích thích bao gồm các kiểu hành vi bệnh lý liên quan đến việc sử dụng chất (ví dụ bệnh nhân tiếp tục sử dụng một chất mặc dù gặp vấn đề nghiệm trọng liên quan đến việc sủ dụng chất đó) rối loạn sử dụng chất',
  },
  {
    id: 3,
    title: 'Rối loạn do sử dụng chất kích thích',
    date: Date.now(),
    imageLabel:
      'https://recmiennam.com/wp-content/uploads/2020/10/anh-buon-1.jpg',
    content:
      'Các rối loạn liên quan đến sử dụng chất kích thích bao gồm các kiểu hành vi bệnh lý liên quan đến việc sử dụng chất (ví dụ bệnh nhân tiếp tục sử dụng một chất mặc dù gặp vấn đề nghiệm trọng liên quan đến việc sủ dụng chất đó) rối loạn sử dụng chất',
  },
  {
    id: 4,
    title: 'Rối loạn do sử dụng chất kích thích',
    date: Date.now(),
    imageLabel:
      'https://recmiennam.com/wp-content/uploads/2020/10/anh-buon-1.jpg',
    content:
      'Các rối loạn liên quan đến sử dụng chất kích thích bao gồm các kiểu hành vi bệnh lý liên quan đến việc sử dụng chất (ví dụ bệnh nhân tiếp tục sử dụng một chất mặc dù gặp vấn đề nghiệm trọng liên quan đến việc sủ dụng chất đó) rối loạn sử dụng chất',
  },
];

export default function PostContainer() {
  const navigation = useNavigation();
  return (
    <View className="mt-4">
      <TouchableOpacity className="flex-row justify-between items-center">
        <STText font="bold" className="text-2xl text-black">
          Bài viết mới nhất
        </STText>
        <Icon name="right" size={20} color="black" style={{marginRight: 10}} />
      </TouchableOpacity>
      <ScrollView
        horizontal
        contentContainerStyle={{paddingHorizontal: 2, paddingVertical: 5}}
        showsHorizontalScrollIndicator={true}
        className="mt-3">
        {data.map((item, index) => (
          <TouchableOpacity
            key={index + item.id}
            onPress={() => navigation.navigate('PostScreen', {item})}>
            <PostCard item={item} />
          </TouchableOpacity>
        ))}
        <View className="rounded-sm flex justify-center items-center">
          <Button mode="text" className="text-base">
            Xem thêm ...
          </Button>
        </View>
      </ScrollView>
    </View>
  );
}

const PostCard = ({item}) => {
  return (
    <Card className="w-64 mr-4">
      <Card.Cover className="h-44" source={{uri: item.imageLabel}} />
      <Card.Title
        titleNumberOfLines={1}
        titleStyle={{
          fontSize: 18,
          marginBottom: 5,
        }}
        titleVariant="headlineLarge"
        subtitleNumberOfLines={3}
        title={item.title}
        subtitle={item.content}
      />
      <Card.Actions>
        <Button mode="text">Xem thêm ...</Button>
      </Card.Actions>
    </Card>
  );
};
