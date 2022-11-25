import messaging from '@react-native-firebase/messaging';
import React, {useEffect} from 'react';
import {View} from 'react-native';
import {Button} from 'react-native-paper';
import STText from '../../components/STComponents/STText';
import {testNotification} from '../../helpers/Notification';

export default function PodCastScreen() {
  useEffect(() => {
    const getTokenDevice = async () => {
      await messaging().registerDeviceForRemoteMessages();
      const tokenDevice = await messaging().getToken();
      console.log('tokenDevice', tokenDevice);
    };
    getTokenDevice();
  }, []);

  return (
    <View className="flex items-center justify-center h-60">
      <STText font="medium" className="text-2xl text-black">
        Đang phát triển thêm...
      </STText>
      <Button mode="contained" onPress={() => testNotification()}>
        Button
      </Button>
    </View>
  );
}
