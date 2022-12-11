import React, {useState} from 'react';
import {Image, ScrollView, TouchableOpacity, View} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import {Button} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';
import STText from '../../components/STComponents/STText';
import {SYlogout, updateAvatar} from '../../reducers';

export default function SettingScreen({navigation}) {
  const options = [
    {
      id: 0,
      name: 'Thông tin cá nhân',
      icon: 'account',
      onPress: () => navigation.navigate('UserInfoScreen'),
    },
    {
      id: 1,
      name: 'Thông báo',
      icon: 'bell',
      onPress: () => navigation.navigate('NotificationScreen'),
    },
  ];

  const user = useSelector(state => state.user);
  const [avatar, setAvatar] = useState(null);
  const dispatch = useDispatch();

  const openLibrary = async () => {
    const getImage = await ImagePicker.openPicker({
      mediaType: 'photo',
      width: 300,
      height: 400,
      cropping: true,
    });
    const currentImage = {...getImage, id: Date.now().toString()};
    setAvatar(currentImage.path);
    return currentImage;
  };

  const HandlerUpdateAvatar = async () => {
    const dataAvatar = await openLibrary();
    const data = {
      profileId: user.profileId,
      avatar: dataAvatar,
    };
    dispatch(updateAvatar(data));
  };
  return (
    <SafeAreaView className="p-4 bg-white h-full flex">
      <ScrollView className="bg-white flex-1">
        <View>
          <STText font="bold" className="text-3xl ml-2 text-blue-900">
            Cài đặt
          </STText>
          <View className="mt-10 flex items-center">
            <TouchableOpacity
              className="relative"
              onPress={() => HandlerUpdateAvatar()}>
              <View className="absolute bottom-0 right-0 z-10 bg-gray-200 p-1 rounded-full">
                <Icon name="pencil" size={20} color="#432c81" />
              </View>
              <View className="overflow-hidden rounded-full">
                <Image
                  source={{uri: avatar ? avatar : user.avatar}}
                  className="w-24 h-24 "
                />
              </View>
            </TouchableOpacity>
            <View className="mt-3">
              <STText
                font="bold"
                className="text-xl ml-2 text-center text-blue-900">
                {user.real_name}
              </STText>
              <STText
                font="bold"
                className="text-base text-center ml-2 text-slate-500">
                {user.name} - {user.email}
              </STText>
            </View>
          </View>
        </View>
        <View className="mt-6 flex-1">
          {options.map(item => (
            <TouchableOpacity className="px-4" onPress={item.onPress}>
              <View className="flex-row items-center justify-between mt-10">
                <View className="flex-row items-center">
                  <Icon name={item.icon} size={30} color="#432c81" />
                  <STText font="bold" className="text-lg ml-5 text-blue-900">
                    {item.name}
                  </STText>
                </View>
                <Icon name="chevron-right" size={30} color="#432c81" />
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <View>
        <TouchableOpacity
          className="px-4"
          onPress={() => console.log('Logout')}>
          <Button mode="contained" onPress={() => dispatch(SYlogout())}>
            Đăng xuất
          </Button>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
