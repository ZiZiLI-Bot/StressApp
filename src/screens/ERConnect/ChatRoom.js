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
import axios from 'axios';

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
    addDocument('messages', {...messages[0], roomId: roomsData.roomId});
    const res = axios({
      method: 'post',
      url: 'https://fcm.googleapis.com/fcm/send',
      headers: {
        'Content-Type': 'application/json',
        Authorization:
          'key=AAAAKiGUGB8:APA91bHGLmTsJopsMucmCvvG0tqLaGbxlaDJy5JBdOESP4NhNFt9iPHMjxvd4ctZcUYZoKqhwZNsRwfWUfGGJAgk_smwFi9V6mbnd7A3G1gy0zoGrCSncFdY3g_kZ428OVqWcjhTFH4v',
      },
      data: {
        to: userDisplay.tokenDevice,
        data: {},
        notification: {
          android: {imageUrl: user.avatar},
          title: 'Tin nhắn mới từ ' + user.name,
          body: messages[0].text,
        },
        direct_boot_ok: true,
      },
    });
    console.log('res', res);
  }, []);

  return (
    <>
      <View className="flex-row items-center p-2 bg-white">
        <BackIcon onPress={() => navigation.goBack()} className="mr-2" />
        <Avatar.Image
          className="overflow-hidden"
          source={{uri: userDisplay.avatar}}
          size={47}
        />
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
        renderAvatar={props => {
          const {user} = props.currentMessage;
          return (
            <Avatar.Image
              size={36}
              source={{uri: user.avatar}}
              className="overflow-hidden"
            />
          );
        }}
      />
    </>
  );
}
