/* eslint-disable react-hooks/exhaustive-deps */
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import Insomnia from '../../../assets/image/insomnia.svg';
import LoadingScreen from '../../components/LoadingScreen/LoadingScreen';
import STDropDown from '../../components/STComponents/STDropDown';
import STText from '../../components/STComponents/STText';
import ForumAPI from '../../helpers/API/ForumAPI';

export default function ForumList() {
  const [listForum, setListForum] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getForumList = async () => {
      setLoading(true);
      const res = await ForumAPI.getForums();
      if (res) {
        setListForum(res.data);
      }
      setLoading(false);
    };
    getForumList();
  }, []);

  return (
    <SafeAreaView className="p-4 bg-white h-full">
      {!loading ? (
        <ScrollView className="bg-white h-full">
          <View className="mt-4">
            <STText className="text-3xl font-bold text-black text-center">
              Diễn đàn xã hội
            </STText>
          </View>
          <View className="mt-5">
            {listForum.map(item => (
              <Card key={item.id} data={item} />
            ))}
          </View>
          <STDropDown title="Chi tiết" className="mt-3" heightDrop={140}>
            <STText className="mt-2 text-sm text-gray-500 text-center">
              Bạn có thể chia sẻ những gì mình nghĩ, những điều khó nói, những
              vấn đề mà bạn đang gặp phải trong cuộc sống hằng ngày.
            </STText>
            <STText className="mt-2 text-sm text-gray-500 text-center">
              Tất nhiên bạn có thể hoàn toàn ẩn danh, hoặc chia sẻ thông tin.
              Tùy vào quyết định của bạn.
            </STText>
          </STDropDown>
        </ScrollView>
      ) : (
        <View className="h-full flex justify-center">
          <LoadingScreen />
        </View>
      )}
    </SafeAreaView>
  );
}

const Card = ({data}) => {
  const navigation = useNavigation();
  const colorList = ['#F9A826', '#F9A826', '#F9A826'];
  return (
    <TouchableOpacity
      className="w-full h-28 rounded-lg my-2"
      style={{backgroundColor: colorList[data.id % 3]}}
      onPress={() => navigation.navigate('ForumScreen', {id: data.id})}>
      <View className="p-4 h-full w-5/6 flex-row items-center">
        <Insomnia width={80} height={80} />
        <STText className="text-white text-lg">{data.name}</STText>
      </View>
    </TouchableOpacity>
  );
};
