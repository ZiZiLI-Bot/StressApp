import React from 'react';
import {View} from 'react-native';
import STText from '../../components/STComponents/STText';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {Avatar, Button, Divider} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {SYlogout} from '../../reducers';

export default function DrawerContainer(props) {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  return (
    <View className="flex-1">
      <View className="w-full h-28 mt-6 flex items-center">
        <Avatar.Image
          size={80}
          source={{uri: user.avatar}}
          className="overflow-hidden"
        />
        <STText className="text-2xl text-black font-bold">{user.name}</STText>
      </View>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <Divider bold />
      <View className="h-16 flex justify-center">
        <Button icon="logout" mode="text" onPress={() => dispatch(SYlogout())}>
          Đăng xuất
        </Button>
      </View>
    </View>
  );
}
