import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {ScrollView, TouchableOpacity, View} from 'react-native';
import {TextInput, Button, Text} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import BackIcon from '../../components/BackIcon';
import STText from '../../components/STComponents/STText';
import {useSelector} from 'react-redux';
import RegisterIcon from '../../../assets/image/RegisterIcon.svg';
import AuthApi from '../../helpers/API/Auth.api';

let dataForm = {
  email: '',
  password: '',
  role: 'user',
  confirmPassword: '',
};

export default function RegisterScreen() {
  const navigation = useNavigation();
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handlerSubmit = async () => {
    setLoading(true);
    console.log(dataForm);
    if (dataForm.password !== dataForm.confirmPassword) {
      setLoading(false);
      return setError(
        <STText className="text-center text-red-500">
          Mật khẩu không khớp
        </STText>,
      );
    } else {
      setError(null);
      const data = {
        username: dataForm.email,
        role: dataForm.role,
        password: dataForm.password,
      };
      const res = await AuthApi.register(data);
      if (res.data) {
        setLoading(false);
        return setError(
          <STText className="text-center text-green-500 mt-3">
            Đăng ký thành công, bạn có thể trở lại đăng nhập
          </STText>,
        );
      } else {
        setLoading(false);
        console.log(res);
        return setError(
          <STText className="text-center text-red-500 mt-3">
            Đăng ký thất bại, vui lòng thử lại
          </STText>,
        );
      }
    }
  };
  return (
    <SafeAreaView className="bg-white relative">
      <ScrollView className="px-4 py-2">
        <BackIcon
          className="absolute left-1"
          onPress={() => navigation.goBack()}
        />
        <View>
          <View className="flex justify-center items-center my-4">
            <RegisterIcon width={250} height={250} />
          </View>
          <STText
            font="bold"
            className="text-gray-700 text-3xl mt-3 text-center">
            Đăng ký tài khoản!
          </STText>
          <View className="mt-6 space-y-3">
            <TextInput
              label="Email"
              mode="outlined"
              left={<TextInput.Icon icon="email" />}
              onChangeText={text => (dataForm.email = text)}
            />
            <TextInput
              label="Mật khẩu"
              mode="outlined"
              secureTextEntry={!showPass}
              left={<TextInput.Icon icon="lock" />}
              right={
                <TextInput.Icon
                  icon={showPass ? 'eye-off' : 'eye'}
                  onPress={() => setShowPass(!showPass)}
                />
              }
              onChangeText={text => (dataForm.password = text)}
            />
            <TextInput
              mode="outlined"
              secureTextEntry={!showConfirmPass}
              label="Xác nhận mật khẩu"
              left={<TextInput.Icon icon="lock" />}
              right={
                <TextInput.Icon
                  icon={showConfirmPass ? 'eye-off' : 'eye'}
                  onPress={() => setShowConfirmPass(!showConfirmPass)}
                />
              }
              onChangeText={text => (dataForm.confirmPassword = text)}
            />
          </View>
          <View>
            <TouchableOpacity className="mt-6">
              <Button
                mode="contained"
                buttonColor="blue"
                loading={loading}
                disabled={loading}
                contentStyle={{height: 50}}
                onPress={handlerSubmit}>
                Đăng Ký
              </Button>
            </TouchableOpacity>
            {error && error}
          </View>
        </View>
        <STText className="text-right mt-6 text-gray-400 text-base">
          Đã có tài khoản?{' '}
          <Text
            onPress={() => navigation.navigate('Login')}
            className="text-blue-700">
            Đăng nhập!
          </Text>
        </STText>
      </ScrollView>
    </SafeAreaView>
  );
}
