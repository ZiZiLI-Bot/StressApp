import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import STText from '../../components/STComponents/STText';
import {getData} from '../../helpers/Store';
import Lottie from 'lottie-react-native';
import {useDispatch} from 'react-redux';
import {SYloginJWT} from '../../reducers';

export default function AutoLog() {
  const dispatch = useDispatch();
  useEffect(() => {
    const getJWT = async () => {
      const JWT = await getData('token');
      if (JWT) {
        dispatch(SYloginJWT(JWT));
      }
    };
    getJWT();
  }, []);
  return (
    <View className="flex-1 justify-center items-center bg-white">
      <View className="flex justify-center items-center">
        <Lottie
          source={require('../../../assets/lottieFile/user_login.json')}
          autoPlay
          loop
          autoSize
          resizeMode="cover"
          className="w-28 h-28 mb-14"
        />
        <STText font="bold" className="text-center text-black text-3xl">
          Đang đăng nhập...
        </STText>
      </View>
    </View>
  );
}
