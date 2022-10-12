import React from 'react';
import {View, ScrollView, TouchableOpacity} from 'react-native';
import {Avatar, TextInput} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import STText from '../../components/STComponents/STText';

const dataDoctor = [
  {
    id: 0,
    name: 'Admin',
    avatar: 'https://day.js.org/img/logo.png',
    address: 'Chuyên khoa tâm lý bệnh viện đại học Phenikaa',
  },
  {
    id: 1,
    name: 'Admin - 2',
    avatar: 'https://day.js.org/img/logo.png',
    address: 'Chuyên khoa tâm lý bệnh viện đại học Phenikaa',
  },
];

const dataOffice = [
  {
    id: 2,
    avatar: 'https://day.js.org/img/logo.png',
    name: 'Bệnh viện đại học Phenikaa',
    address: 'Yên Nghĩa - Hà Đông - Hà Nội',
  },
  {
    id: 3,
    avatar: 'https://day.js.org/img/logo.png',
    name: 'Viện Sức khỏe Tâm thần Quốc gia',
    address: '78 Giải Phóng, Phương Đình, Đống Đa, Hà Nội',
  },
];

export default function ExpertsScreen({navigation}) {
  return (
    <SafeAreaView className="pt-4 px-3 w-full h-full bg-white">
      <ScrollView className="bg-white">
        <View>
          <STText font="bold" className="text-2xl text-black">
            Bác sĩ chuyên khoa
          </STText>
          <View className="mt-3">
            {dataDoctor.map(item => (
              <CardDoctor
                key={item.id}
                item={item}
                navigation={navigation}
                isDoctor={true}
              />
            ))}
          </View>
        </View>
        <View className="mt-6">
          <STText font="bold" className="text-2xl text-black mt-5">
            Cơ sở chuyên môn
          </STText>
          <View className="mt-3">
            {dataOffice.map(item => (
              <CardDoctor
                key={item.id}
                item={item}
                navigation={navigation}
                isDoctor={false}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const CardDoctor = ({item, navigation, isDoctor}) => {
  return (
    <TouchableOpacity
      className="my-3"
      onPress={() =>
        navigation.navigate('ExpertsContent', {data: item, isDoctor})
      }>
      <View className="flex-row items-center bg-slate-200 p-3 rounded-lg">
        <Avatar.Image source={{uri: item?.avatar}} />
        <View className="ml-4">
          <STText font="bold" className="text-black text-lg w-10/12">
            {item?.name}
          </STText>
          <STText className="text-gray-500 text-sm w-10/12 mt-1">
            {item?.address}
          </STText>
        </View>
      </View>
    </TouchableOpacity>
  );
};
