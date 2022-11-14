/* eslint-disable react-hooks/exhaustive-deps */
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import LoginIcon from '../../../assets/image/LoginIcon.svg';
import STText from '../../components/STComponents/STText';
import AuthApi from '../../helpers/API/Auth.api';
import FacebookLogin from '../../helpers/SocialLogin/FacebookLogin';
import GoogleLogin from '../../helpers/SocialLogin/GoogleLogin';
import {SYlogin} from '../../reducers/user.reducer';

const dataForm = {
  username: '',
  password: '',
};

export default function LoginScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const height = useSelector(state => state.screenDimensions.height);
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user.isLogin) {
      navigation.navigate('Home');
    }
  }, [user]);

  const onGoogleLogin = async () => {
    let res;
    try {
      setLoading(true);
      res = await GoogleLogin();
    } catch (error) {
      setLoading(false);
      console.log('error', error);
    }
    if (res) {
      const infoLoginGG = {
        password: res.user._user.uid + res.user._user.email,
        role: 'user',
        email: res.user._user.email,
        avatar: res.user._user.photoURL,
        name: res.user._user.displayName,
        username: res.user._user.email,
      };
      const resLogin = await AuthApi.login(infoLoginGG);
      if (resLogin) {
        dispatch(SYlogin(infoLoginGG));
        setLoading(false);
      } else {
        const resRegister = await AuthApi.register(infoLoginGG);
        if (resRegister.success) {
          dispatch(SYlogin(infoLoginGG));
          setLoading(false);
        }
      }
    }
  };

  const onFacebookLogin = async () => {
    let res;
    try {
      setLoading(true);
      res = await FacebookLogin();
    } catch (error) {
      setLoading(false);
      console.log('error', error);
    }
    if (res) {
      const infoLoginFB = {
        password: res.user._user.uid + res.user._user.email,
        role: 'user',
        email: res.user._user.email,
        avatar: res.additionalUserInfo.profile.picture.data.url,
        name: res.user._user.displayName,
        username: res.user._user.email + res.user._user.uid,
      };
      const resLogin = await AuthApi.login(infoLoginFB);
      if (resLogin) {
        dispatch(SYlogin(infoLoginFB));
        setLoading(false);
      } else {
        const resRegister = await AuthApi.register(infoLoginFB);
        if (resRegister.success) {
          dispatch(SYlogin(infoLoginFB));
          setLoading(false);
        }
      }
    }
  };

  const onLogin = async () => {
    const res = dispatch(SYlogin(dataForm));
    console.log(res);
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
              label="Email"
              mode="outlined"
              left={<TextInput.Icon icon="email" />}
              onChangeText={text => {
                dataForm.username = text;
              }}
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
              onChangeText={text => {
                dataForm.password = text;
              }}
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
                loading={user.isLoading || loading}
                disabled={user.isLoading || loading}
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
            <STText className="text-right mt-6 text-gray-400 text-base">
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
