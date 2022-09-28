/* eslint-disable react-hooks/exhaustive-deps */
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {Avatar, Divider} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';
import BackIcon from '../../components/BackIcon/BackIcon';
import STText from '../../components/STComponents/STText';

export default function ForumScreen({route}) {
  const navigation = useNavigation();
  const data = route.params.data;
  const height = useSelector(state => state.screenDimensions.height);
  const user = useSelector(state => state.user);

  return (
    <SafeAreaView style={{minHeight: height}}>
      <View className="flex-row items-center bg-white rounded-lg py-2">
        <BackIcon onPress={() => navigation.goBack()} className="ml-1" />
        <Avatar.Image
          size={50}
          source={{uri: user.avatar}}
          className="ml-4 overflow-hidden"
        />
        <STText className="ml-6 text-black text-base">
          Bạn có điều gì muốn chia sẻ ?
        </STText>
      </View>
      <ScrollView>
        {data.posts.map(item => (
          <View key={item.id} className="bg-white rounded-lg my-2">
            <View className="flex-row py-2">
              <Avatar.Image size={50} className="ml-2" />
              <View>
                <STText className="ml-3 text-black text-base">
                  {item.author}
                </STText>
                <STText className="ml-3 text-black text-base">
                  {item.date}
                </STText>
              </View>
            </View>
            <View className="my-2">
              <STText className="ml-3 text-black text-base">
                {item.content}
              </STText>
            </View>
            <Divider bold={true} />
            <View className="flex-row justify-center my-1">
              <View className="flex-row justify-between w-11/12">
                <View className="flex-row items-center">
                  <Icon name="heart-outline" size={26} color="black" />
                  <STText className="ml-2 text-black text-sm">0 Thích</STText>
                </View>
                <View className="flex-row items-center">
                  <Icon name="comment-outline" size={26} color="black" />
                  <STText className="ml-2 text-black text-sm">
                    {item.comments.length} Bình luận
                  </STText>
                </View>
                <View className="flex-row items-center">
                  <Icon name="share-outline" size={26} color="black" />
                  <STText className="ml-2 text-black text-sm">0 Chia sẻ</STText>
                </View>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
