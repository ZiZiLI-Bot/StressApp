import dayjs from 'dayjs';
import React, {useState} from 'react';
import {useEffect} from 'react';
import {View} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import * as ImagePicker from 'react-native-image-picker';
import {Avatar, Button, Checkbox, TextInput} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import STText from '../../components/STComponents/STText';
import STPicker from '../../components/STPicker';
import {getData} from '../../helpers/Store';
import OpenURL from '../../helpers/UniversalLink';
import {SYupdate} from '../../reducers/user.reducer';

let formatData = {
  userId: '',
  name: '',
  real_name: '',
  phone: '',
  gender: '',
};

const PrivacyPolicy =
  'https://www.termsfeed.com/live/0542a8d9-18e2-4533-8c39-ec564f0e82cc?fbclid=IwAR0WiZ5f7EUEwEWvjfsykb__cQW1IMkCNIhBg3YJ0iBdONdP-ewBevwng_U';

export default function UpdateInfoScreen({route}) {
  useEffect(() => {
    const checkLogin = async () => {
      const token = await getData('token');
      if (token) {
        console.log('token', token);
      }
    };
    checkLogin();
  }, []);
  const preData = route.params.data;
  console.log('preData', preData);
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const [birthday, setBirthday] = useState(new Date());
  const [name, setName] = useState(preData.name);
  const [gender, setGender] = useState('');
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState(false);
  const [AvatarImage, setAvatarImage] = useState(preData.avatar);
  const pickerImage = async () => {
    let result = await ImagePicker.launchImageLibrary({
      mediaTypes: 'photo',
      quality: 1,
    });
    const source = result.assets[0];
    setAvatarImage(source);
  };
  const handlerSubmit = async () => {
    const dataInput = {
      ...formatData,
      userId: preData.userId,
      gender: gender.value,
      email: preData.email,
      birthday: dayjs(birthday).format(),
      avatar: AvatarImage,
      name: name,
      state: preData.tokenDevice,
    };
    console.log('dataInput', dataInput);
    dispatch(SYupdate(dataInput)); 
  };
  return (
    <SafeAreaView style={{backgroundColor: 'white'}} className="px-4">
      <ScrollView contentContainerStyle={{paddingBottom: 18}}>
        <View>
          <STText
            font="bold"
            className="text-gray-700 text-2xl mt-3 text-center">
            Cập nhật thông tin tài khoản
          </STText>
        </View>
        <View className="space-y-4 mt-5">
          <View className="px-10">
            <View className="border-dotted border-2 border-indigo-600 flex items-center py-3">
              {AvatarImage != null ? (
                <Avatar.Image
                  size={100}
                  className="overflow-hidden"
                  source={{uri: AvatarImage.uri || AvatarImage}}
                />
              ) : (
                <Avatar.Icon size={100} icon="account" />
              )}
              <TouchableOpacity>
                <Button
                  icon="upload"
                  mode="contained"
                  onPress={pickerImage}
                  className="mt-3"
                  disabled={user.isLoading}>
                  Cập nhật hình đại diện
                </Button>
                <STText className="text-center text-gray-500 mt-1">
                  Hỗi trợ định dạng GIF, PNG, JPG, JPEG
                </STText>
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <STText className="text-gray-700 text-base">Họ và tên:</STText>
            <TextInput
              placeholder="Nhập họ và tên của bạn."
              mode="outlined"
              // defaultValue={user.real_name}
              disabled={user.isLoading}
              onChangeText={text => (formatData.real_name = text)}
            />
          </View>
          <View>
            <STText className="text-gray-700 text-base">Nickname:</STText>
            <TextInput
              placeholder="Đây sẽ là tên hiển thị của bạn."
              mode="outlined"
              value={name}
              disabled={user.isLoading}
              onChangeText={text => setName(text)}
            />
          </View>
          <View>
            <STText className="text-gray-700 text-base">Số điện thoại:</STText>
            <TextInput
              placeholder="Số điện thoại cá nhân."
              mode="outlined"
              keyboardType="phone-pad"
              // defaultValue={user.phone}
              disabled={user.isLoading}
              onChangeText={text => (formatData.phone = text)}
            />
          </View>
          <View className="flex-row justify-between">
            <View style={{width: '48%'}}>
              <STText className="text-gray-700 text-base">Ngày sinh:</STText>
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
                placeholder="Ngày sinh"
                mode="outlined"
                editable={false}
                disabled={user.isLoading}
                value={dayjs(birthday).format('DD/MM/YYYY')}
                right={
                  <TextInput.Icon
                    icon="chevron-down"
                    onPress={() => setOpen(true)}
                  />
                }
              />
            </View>
            <View style={{width: '48%'}}>
              <STText className="text-gray-700 text-base">Giới tính:</STText>
              <STPicker
                placeholder="Giới tính..."
                items={[
                  {label: 'Nam', value: 'male'},
                  {label: 'Nữ', value: 'female'},
                  {label: 'Khác', value: 'other'},
                ]}
                title="Giới tính"
                value={gender}
                setValue={setGender}
              />
            </View>
          </View>
        </View>
        <View className="mt-4">
          <STText className="text-gray-500 text-center mt-2">
            Trước khi sử dụng ứng dụng, bạn cần cập nhật thông tin tài khoản của
            mình. Đây là các thông tin cần thiết trong quá trình sử dụng ứng
            dụng của bạn.
          </STText>
          <STText className="text-gray-500 text-center mt-2">
            Toàn bộ các thông tin được cung cấp sẽ được bảo mật. Chúng tôi sẽ
            không chia sẻ thông tin của bạn cho bất kỳ bên thứ ba nào. Các thông
            tin sẽ chỉ được hiện thị khi có được sự cho phép của bạn.
          </STText>
          <View className="flex-row items-center mt-4">
            <Checkbox
              status={checked ? 'checked' : 'unchecked'}
              onPress={() => {
                setChecked(!checked);
              }}
            />
            <STText className="text-gray-500">
              Tôi đã đọc và hiểu toàn bộ nội dung{' '}
              <STText
                bold
                className="text-blue-700"
                onPress={() => OpenURL(PrivacyPolicy)}>
                Điều khoản
              </STText>{' '}
            </STText>
          </View>
          <Button
            mode="contained"
            className="mt-3"
            disabled={!checked}
            onPress={handlerSubmit}
            loading={user.isLoading}>
            Cập nhật thông tin
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
