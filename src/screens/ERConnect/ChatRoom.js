/* eslint-disable react-hooks/exhaustive-deps */
import React, {useCallback, useEffect, useState} from 'react';
import {View} from 'react-native';
import {GiftedChat} from 'react-native-gifted-chat';
import {Avatar} from 'react-native-paper';
import {useSelector} from 'react-redux';
import BackIcon from '../../components/BackIcon/BackIcon';
import STText from '../../components/STComponents/STText';
import 'dayjs/locale/vi';
import firestore from '@react-native-firebase/firestore';
import {addDocument} from '../../helpers/FireService';

export default function ChatRoom({route, navigation}) {
  const [messages, setMessages] = useState([]);
  const user = useSelector(state => state.user);
  const {roomsData, userDisplay} = route.params;

  useEffect(() => {
    const unsubscribe = () => {
      let messagesTemp = firestore()
        .collection('messages')
        .where('roomId', '==', roomsData.roomId)
        .orderBy('createdAt', 'desc');

      messagesTemp.onSnapshot(snapshot => {
        const documents = snapshot?.docs?.map(doc => {
          return {
            ...doc.data(),
            id: doc.id,
            createdAt: doc.data().createdAt.toDate(),
          };
        });
        setMessages(documents);
      });
    };
    return unsubscribe();
  }, []);

  const onSend = useCallback((messages = []) => {
    // setMessages(previousMessages =>
    //   GiftedChat.append(previousMessages, messages),
    // );
    addDocument('messages', {...messages[0], roomId: roomsData.roomId});
  }, []);

  return (
    <>
      <View className="flex-row items-center p-2 bg-white">
        <BackIcon onPress={() => navigation.goBack()} className="mr-2" />
        <Avatar.Image source={{uri: userDisplay.avatar}} size={47} />
        <STText font="bold" className="text-xl text-black ml-3">
          {userDisplay.name}
        </STText>
      </View>
      <GiftedChat
        textInputStyle={{color: '#000'}}
        locale="vi"
        timeFormat={'LT'}
        showUserAvatar={true}
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: user.userId,
          name: user.name,
          avatar: user.avatar,
        }}
      />
    </>
  );
}
