import dayjs from 'dayjs';
import React from 'react';
import {View} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {ScrollView} from 'react-native-gesture-handler';
import {Button, TextInput} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import BackIcon from '../../components/BackIcon';
import STText from '../../components/STComponents/STText';
import {updateProfile} from '../../reducers';

export default function UserInfoScreen({navigation}) {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [birthday, setBirthday] = React.useState(new Date());
  const [name, setName] = React.useState(user.name);
  const [realName, setRealName] = React.useState(user.real_name);
  const [phone, setPhone] = React.useState(user.phone);

  const updateInfo = async () => {
    const dataInput = {
      id: user.profileId,
      name: name,
      real_name: realName,
      birthday: birthday,
      phone: phone,
    };
    dispatch(updateProfile(dataInput));
  };

  return (
    <SafeAreaView className="bg-white p-4 h-full flex">
      <ScrollView className="bg-white flex-1">
        <View className="flex-row items-center">
          <BackIcon onPress={() => navigation.goBack()} />
          <STText font="bold" className="text-2xl text-blue-900 ml-2">
            Thông tin cá nhân
          </STText>
        </View>
        <View className="mt-10 space-y-6">
          <View>
            <STText className="text-base text-black">Tên đầy đủ: </STText>
            <TextInput
              mode="outlined"
              value={realName}
              onChangeText={text => setRealName(text)}
              disabled={user.isLoading}
            />
          </View>
          <View>
            <STText className="text-base text-black">Tên hiển thị: </STText>
            <TextInput
              mode="outlined"
              value={name}
              onChangeText={text => setName(text)}
              disabled={user.isLoading}
            />
          </View>
          <View className="flex-row items-center justify-between">
            <View style={{width: '49%'}}>
              <STText className="text-base text-black">Số điện thoại: </STText>
              <TextInput
                mode="outlined"
                value={phone}
                onChangeText={text => setPhone(text)}
                disabled={user.isLoading}
              />
            </View>
            <View style={{width: '49%'}}>
              <STText
                disabled={user.isLoading}
                className="text-base text-black">
                Ngày sinh:{' '}
              </STText>
              <DatePicker
                modal
                open={open}
                date={birthday}
                mode="date"
                locale="vi"
                onConfirm={date => {
                  setOpen(false);
                  setBirthday(date);
                }}
                onCancel={() => {
                  setOpen(false);
                }}
              />
              <TextInput
                mode="outlined"
                value={dayjs(birthday).format('DD/MM/YYYY')}
                editable={false}
                disabled={user.isLoading}
                right={
                  <TextInput.Icon
                    icon="chevron-down"
                    onPress={() => setOpen(true)}
                  />
                }
              />
            </View>
          </View>
        </View>
      </ScrollView>
      <Button
        mode="contained"
        onPress={() => updateInfo()}
        loading={user.isLoading}
        disabled={user.isLoading}>
        Cập nhật thông tin
      </Button>
    </SafeAreaView>
  );
}
