/* eslint-disable react-hooks/exhaustive-deps */
import dayjs from 'dayjs';
import React, {useEffect} from 'react';
import {RefreshControl, Text, TouchableOpacity, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {ActivityIndicator, Card, MD2Colors, FAB} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useDispatch, useSelector} from 'react-redux';
import STText from '../../components/STComponents/STText';
import {getDiaryById} from '../../reducers';
import 'dayjs/locale/vi';
import Lottie from 'lottie-react-native';
import BackIcon from '../../components/BackIcon';

export default function DiaryScreen({navigation}) {
  const {diary, user} = useSelector(state => state);
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = async () => {
    setRefreshing(!refreshing);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDiaryById(user.userId));
  }, [refreshing]);
  return (
    <SafeAreaView className="pt-3 px-4 bg-white h-full relative">
      <View className="w-full h-16 flex-row items-center">
        <BackIcon onPress={() => navigation.goBack()} />
        <STText font="bold" className="text-2xl ml-2 text-black">
          Nhật ký cá nhân
        </STText>
      </View>
      <ScrollView
        className="bg-white"
        refreshControl={
          <RefreshControl refreshing={diary.isLoading} onRefresh={onRefresh} />
        }>
        <View>
          {diary.isLoading ? (
            <View className="flex items-center justify-center w-full h-full">
              <ActivityIndicator
                size={40}
                animating={true}
                color={MD2Colors.amber700}
              />
            </View>
          ) : (
            <View className="w-full h-full">
              {diary.diary.length > 0 ? (
                <DiaryContainer diary={diary.diary} navigation={navigation} />
              ) : (
                <View className="w-full h-96 flex-1 justify-center items-center">
                  <Lottie
                    source={require('../../../assets/lottieFile/no-results.json')}
                    autoPlay
                    autoSize
                    loop={false}
                    speed={1.5}
                    className="w-72 h-72"
                    resizeMode="cover"
                  />
                  <STText font="bold" className="text-2xl text-black">
                    Chưa có bản ghi nào
                  </STText>
                </View>
              )}
            </View>
          )}
        </View>
      </ScrollView>
      <FAB
        className="absolute bottom-10 right-10"
        icon="fountain-pen-tip"
        onPress={() => navigation.navigate('DiaryContent', {data: null})}
      />
    </SafeAreaView>
  );
}

const DiaryContainer = ({diary, navigation}) => {
  return (
    <View className="mt-4">
      {diary &&
        diary.map(item => (
          <TouchableOpacity
            key={item.id}
            onPress={() => navigation.navigate('DiaryContent', {data: item})}>
            <Card elevation={5} mode="contained" className="my-2">
              <Card.Content>
                <STText
                  numberOfLines={2}
                  font="bold"
                  className="text-base text-black mt-3">
                  {item.title}
                </STText>
                <Text
                  numberOfLines={2}
                  className="text-base text-gray-500 mt-3">
                  {item.content}
                </Text>
                <View className="w-full flex items-end">
                  <STText className="text-xs text-gray-500 mt-2">
                    Ngày viết: {dayjs(item.CreateAt).locale('vi').format('LLL')}
                  </STText>
                </View>
              </Card.Content>
            </Card>
          </TouchableOpacity>
        ))}
    </View>
  );
};
