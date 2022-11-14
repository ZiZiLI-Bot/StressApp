import firestore from '@react-native-firebase/firestore';
import React, {useEffect, useId, useState} from 'react';
import {ScrollView, TouchableOpacity, View} from 'react-native';
import {Avatar} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';
import BackIcon from '../../components/BackIcon/BackIcon';
import STText from '../../components/STComponents/STText';

export default function ERConnect({navigation}) {
  const user = useSelector(state => state.user);
  const [roomList, setRoomList] = useState([]);
  const id = useId();

  const handleCreateChat = async userTarget => {
    const room = {
      roomId: id,
      createAt: firestore.Timestamp.now(),
      members: [user, userTarget],
      membersID: [user.userId, userTarget.userId],
    };
    console.log(room);
    // await addDocument('rooms', room);
    // navigation.navigate('ChatRoom', {
    //   roomsData: room,
    //   userDisplay: userTarget,
    // });
  };

  useEffect(() => {
    let rooms = firestore()
      .collection('rooms')
      .where('membersId', 'array-contains', user.userId);

    rooms.onSnapshot(snapshot => {
      const documents = snapshot?.docs?.map(doc => {
        return {...doc.data(), id: doc.id};
      });
      setRoomList(documents);
    });
  }, [user.userId]);

  // console.log('roomList', roomList);

  return (
    <ScrollView className="p-3 bg-white">
      <View className="flex-row items-center">
        <BackIcon onPress={() => navigation.goBack()} className="mr-3" />
        <View className="overflow-hidden rounded-full">
          <Avatar.Image source={{uri: user.avatar}} size={47} />
        </View>
        <STText font="bold" className="text-xl text-black ml-3">
          ER Connect
        </STText>
      </View>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('SearchUser', {allUsers: user.allUsers})
        }
        className="mt-4 w-full h-10 bg-slate-200 rounded-lg flex-row items-center">
        <Icon name="search" size={24} style={{marginLeft: 20}} color="gray" />
        <STText className="ml-3 text-base text-gray-600">Tìm kiếm ...</STText>
      </TouchableOpacity>
      <View className="mt-3">
        {roomList.map(item => {
          const displayUser = item.members.find(
            itemTemp => itemTemp.userId !== user.userId,
          );
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('ChatRoom', {
                  roomsData: item,
                  userDisplay: displayUser,
                })
              }
              className="flex-row my-2 items-center bg-slate-100 p-2 rounded-lg"
              key={item.roomId}>
              <Avatar.Image source={{uri: displayUser.avatar}} size={55} />
              <STText className="text-base text-black ml-3">
                {displayUser.name}
              </STText>
            </TouchableOpacity>
          );
        })}
      </View>
    </ScrollView>
  );
}
