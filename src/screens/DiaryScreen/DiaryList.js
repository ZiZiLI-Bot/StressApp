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

export default function DiaryScreen({navigation}) {
  const {diary, user} = useSelector(state => state);
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    dispatch(getDiaryById(user.userId));
    setRefreshing(false);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDiaryById(user.userId));
  }, []);
  return (
    <SafeAreaView className="pt-3 px-4 bg-white h-full relative">
      <View className="w-full h-16 flex-row items-center justify-between">
        <STText font="bold" className="text-2xl text-black">
          Nhật ký cá nhân
        </STText>
        <View>
          <TouchableOpacity
            className="bg-gray-200 w-12 h-12 flex justify-center items-center rounded-xl"
            onPress={() => navigation.openDrawer()}>
            <Icon name="menu-open" size={30} color="#5669ff" />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView
        className="bg-white"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
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
                <View className="w-full h-full flex-1 justify-center items-center">
                  <STText className="text-2xl text-black">
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
