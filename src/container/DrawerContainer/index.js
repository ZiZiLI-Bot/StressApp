import React from 'react';
import {View} from 'react-native';
import STText from '../../components/STComponents/STText';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {Avatar, Button, Divider} from 'react-native-paper';
import {useSelector} from 'react-redux';

export default function DrawerContainer(props) {
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
        <Button icon="logout" mode="text">
          Đăng xuất
        </Button>
      </View>
    </View>
  );
}
