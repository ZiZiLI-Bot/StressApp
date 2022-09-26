/* eslint-disable react-hooks/exhaustive-deps */
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import LoginIcon from '../../../assets/image/LoginIcon.svg';
import STText from '../../components/STComponents/STText';
import {FBlogin, GGlogin, SYlogin} from '../../reducers/user.reducer';

export default function LoginScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const height = useSelector(state => state.screenDimensions.height);
  const [showPass, setShowPass] = useState(false);

  useEffect(() => {
    if (user.isLogin) {
      navigation.navigate('Home');
    }
  }, [user]);

  const onGoogleLogin = async () => {
    dispatch(GGlogin());
  };

  const onFacebookLogin = async () => {
    dispatch(FBlogin());
  };

  const onLogin = async () => {
    const data = {password: '123456', username: 'SuperAdmin'};
    dispatch(SYlogin(data));
  };

  return (
    <SafeAreaView className="bg-white px-4" style={{minHeight: height}}>
      <ScrollView>
        <View>
          <View className="flex justify-center items-center">
            <LoginIcon width={300} height={300} />
          </View>
          <STText font="bold" className="text-gray-700 text-4xl">
            Đăng nhập!
          </STText>
          <View className="mt-4 flex space-y-3">
            <TextInput
              label="User or Email"
              mode="outlined"
              left={<TextInput.Icon icon="email" />}
            />
            <TextInput
              label="Password"
              mode="outlined"
              secureTextEntry={!showPass}
              left={<TextInput.Icon icon="lock" />}
              right={
                <TextInput.Icon
                  icon={showPass ? 'eye-off' : 'eye'}
                  onPress={() => setShowPass(!showPass)}
                />
              }
            />
          </View>
          <TouchableOpacity>
            <Text className="text-blue-700 text-sm text-right mt-3 mr-4 font-bold">
              Quên mật khẩu?
            </Text>
          </TouchableOpacity>
          <View className="mt-6">
            <TouchableOpacity>
              <Button
                onPress={onLogin}
                mode="contained"
                buttonColor="blue"
                loading={user.isLoading}
                disabled={user.isLoading}
                contentStyle={{height: 50}}>
                Đăng nhập
              </Button>
            </TouchableOpacity>
            <STText className="text-gray-500 text-center my-2">Hoặc</STText>
            <View className="flex space-y-4">
              <TouchableOpacity
                className="w-full h-12 bg-teal-50 rounded-xl flex-row items-center relative"
                onPress={() => onGoogleLogin()}>
                <Image
                  source={{
                    uri: 'https://cdn-icons-png.flaticon.com/128/300/300221.png',
                  }}
                  className="w-7 h-7 absolute left-10"
                />
                <STText className="w-full text-center text-black text-md">
                  Đăng nhập với Google
                </STText>
              </TouchableOpacity>
              <TouchableOpacity
                className="w-full h-12 bg-teal-50 rounded-xl flex-row items-center relative"
                onPress={() => onFacebookLogin()}>
                <Image
                  source={{
                    uri: 'https://cdn-icons-png.flaticon.com/128/5968/5968764.png',
                  }}
                  className="w-7 h-7 absolute left-10"
                />
                <STText className="w-full text-center text-black text-md">
                  Đăng nhập với Facebook
                </STText>
              </TouchableOpacity>
            </View>
            <STText className="text-right mt-3 text-gray-400">
              Chưa có tài khoản?{' '}
              <Text
                onPress={() => navigation.navigate('Register')}
                className="text-blue-700">
                Đăng ký!
              </Text>
            </STText>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
