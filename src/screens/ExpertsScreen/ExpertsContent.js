import {View, Text, SafeAreaView, Alert} from 'react-native';
import React from 'react';
import STText from '../../components/STComponents/STText';
import BackIcon from '../../components/BackIcon';
import {Avatar, Button} from 'react-native-paper';
import {ScrollView} from 'react-native-gesture-handler';
import MapView, {Marker} from 'react-native-maps';

export default function ExpertsContent({route, navigation}) {
  const {data, isDoctor} = route.params;
  const bookDoctor = () => {
    console.log('book doctor');
  };
  const bookOffice = () => {
    Alert.alert('Thông báo', 'Tính năng đang được phát triển', ['có', 'không']);
  };
  return (
    <SafeAreaView className="bg-white pt-3 h-full">
      <View className="w-full h-32 relative px-4">
        <View className="flex-row items-center">
          <BackIcon onPress={() => navigation.goBack()} />
          <STText className="text-2xl text-black ml-3" font="bold">
            {isDoctor ? 'Thông tin Bác sĩ' : 'Chi tiết cơ sở'}
          </STText>
        </View>
        <Avatar.Image
          source={{uri: data.avatar}}
          className="absolute z-10 overflow-hidden"
          style={{left: '50%', bottom: -33, transform: [{translateX: -45}]}}
          size={120}
        />
      </View>
      <ScrollView className="h-full bg-gray-200 rounded-3xl">
        <View className="overflow-hidden mt-10 p-4">
          <STText className="text-xl text-black" font="bold">
            {isDoctor ? `Bác sĩ: ${data.name}` : `Cơ sở: ${data.name}`}
          </STText>
          <STText className="text-xl text-black mt-6" font="bold">
            {isDoctor
              ? `Đơn vị công tác: ${data.address}`
              : `Địa chỉ: ${data.address}`}
          </STText>
        </View>
        <View className="flex-1 bg-white items-center justify-center">
          <MapView
            region={{
              latitude: data.localMap[0],
              longitude: data.localMap[1],
              latitudeDelta: 0.015,
              longitudeDelta: 0.0121,
            }}
            className="w-full h-60">
            <Marker
              coordinate={{
                latitude: data.localMap[0],
                longitude: data.localMap[1],
              }}
            />
          </MapView>
        </View>
      </ScrollView>
      <View className="w-full h-16 bg-white flex-row items-center justify-around">
        <Button
          mode="contained"
          onPress={() => navigation.navigate('PremiumScreen')}>
          Tư vấn Online
        </Button>
        <Button mode="contained" onPress={bookOffice}>
          Đặt lịch khám
        </Button>
      </View>
    </SafeAreaView>
  );
}
