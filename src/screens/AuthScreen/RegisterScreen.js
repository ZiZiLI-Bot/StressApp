import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {ScrollView, TouchableOpacity, View} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import BackIcon from '../../components/BackIcon';
import STText from '../../components/STComponents/STText';
import {useSelector} from 'react-redux';

export default function RegisterScreen() {
  const user = useSelector(state => state.user);
  const height = useSelector(state => state.screenDimensions.height);
  const navigation = useNavigation();
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  return (
    <SafeAreaView className="bg-white relative" style={{minHeight: height}}>
      <ScrollView className="px-4 py-2">
        <BackIcon
          className="absolute left-1"
          onPress={() => navigation.goBack()}
        />
        <View>
          {/* <View className="flex justify-center items-center my-8">
            <RegisterIcon width={250} height={250} />
          </View> */}
          <STText
            font="bold"
            className="text-gray-700 text-3xl mt-14 text-center">
            Đăng ký tài khoản!
          </STText>
          <View className="mt-10 space-y-3">
            <TextInput
              label="Email"
              mode="outlined"
              left={<TextInput.Icon icon="email" />}
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
            />
          </View>
          <View>
            <TouchableOpacity className="mt-6">
              <Button
                mode="contained"
                buttonColor="blue"
                loading={user.isLoading}
                disabled={user.isLoading}
                contentStyle={{height: 50}}>
                Đăng nhập
              </Button>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
