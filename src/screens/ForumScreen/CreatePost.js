import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import storage from '@react-native-firebase/storage';
import React, {useCallback, useMemo, useRef, useState} from 'react';
import {
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import ImagePicker from 'react-native-image-crop-picker';
import {Avatar, Button, Divider} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';
import BackIcon from '../../components/BackIcon';
import STText from '../../components/STComponents/STText';
import {createPost} from '../../reducers/forum.reducers';

export default function CreatePost({navigation, route}) {
  const {socialId} = route.params;
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const isLoading = useSelector(state => state.forum.isLoading);
  const [image, setImage] = useState([]);
  const [text, setText] = useState('');
  const sheetRef = useRef(null);
  const [openSheet, setOpenSheet] = useState(false);
  const snapPoints = useMemo(() => ['20%'], []);

  const handleCloseSheet = useCallback(() => {
    setOpenSheet(false);
  }, []);

  const handlePresentModalPress = useCallback(() => {
    setOpenSheet(true);
    sheetRef.current?.present();
  }, []);

  const openLibrary = async () => {
    const getImage = await ImagePicker.openPicker({
      multiple: true,
      mediaType: 'photo',
    });
    const imagesList = getImage.map((item, idx) => {
      return {
        id: item.size + item.modificationDate,
        ...item,
      };
    });
    setImage(prev => [...imagesList, ...prev]);
    console.log(image);
    sheetRef.current?.dismiss();
  };

  const openCamera = async () => {
    const getImage = {
      id: Date.now().toString(),
      ...(await ImagePicker.openCamera({
        mediaType: 'photo',
      })),
    };
    setImage(prev => [getImage, ...prev]);
    console.log(image);
    sheetRef.current?.dismiss();
  };

  const removeImage = id => {
    setImage(prev => prev.filter(item => item.id !== id));
  };

  const handleSummitPost = async () => {
    const data = {
      content: text,
      image: image,
      like: 0,
      profile_id: user.profileId,
      public: true,
      share: 0,
      society_id: socialId,
      comment: null,
      title: 'string',
    };
    dispatch(createPost(data)).then(res => {
      navigation.goBack();
    });
  };

  return (
    <SafeAreaView className="h-full relative">
      <ScrollView className="bg-white">
        <View className="flex-row ml-3 items-center my-2">
          <View className="flex-row items-center flex-1">
            <BackIcon onPress={() => navigation.goBack()} />
            <STText font="medium" className="text-xl ml-4 text-slate-700">
              Tạo bài viết
            </STText>
          </View>
          <Button
            mode="contained"
            className="mx-2 my-1"
            onPress={handleSummitPost}
            disabled={isLoading}
            loading={isLoading}>
            Đăng
          </Button>
        </View>
        <Divider bold />
        <View className="mt-2">
          <View className="flex-row items-center">
            <Avatar.Image
              size={55}
              className="ml-2 overflow-hidden"
              source={{uri: user.avatar}}
            />
            <STText font="medium" className="ml-2 text-xl text-black">
              {user.name}
            </STText>
          </View>
          <View className="mt-4">
            <TextInput
              placeholderTextColor="#9CA3AF"
              placeholder="Viết gì đó ..."
              multiline
              numberOfLines={14}
              onChangeText={textInput => setText(textInput)}
              textAlignVertical="top"
              className="w-full px-2 text-xl text-black"
            />
          </View>
          <Divider className="mt-2" bold />
          <View className="mt-3 px-2">
            <Button
              mode="contained"
              className="h-30"
              disabled={isLoading}
              onPress={() => handlePresentModalPress(true)}>
              Thêm hình ảnh
            </Button>
          </View>
          <ScrollView
            horizontal
            contentContainerStyle={{paddingHorizontal: 2, paddingVertical: 5}}
            showsHorizontalScrollIndicator={true}
            className="mt-3">
            {image?.map(item => (
              <View key={item.id} className="p-2 relative">
                <TouchableOpacity
                  className="absolute right-3 top-3 z-10"
                  onPress={() => removeImage(item.id)}>
                  <Icon name="close-circle" size={25} color="red" />
                </TouchableOpacity>
                <Image
                  className="w-36 h-36 rounded-md"
                  resizeMode="cover"
                  source={{uri: item?.path}}
                />
              </View>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
      <BottomSheetModalProvider>
        <BottomSheetModal
          ref={sheetRef}
          snapPoints={snapPoints}
          style={styles.bottomSheet}
          enablePanDownToClose={true}
          onDismiss={handleCloseSheet}>
          <BottomSheetView>
            <STText className="text-center text-black text-base">
              Chọn hình ảnh từ
            </STText>
            <View className="flex-row justify-evenly mt-4">
              <TouchableOpacity
                style={{backgroundColor: '#E5D9B6'}}
                onPress={() => openCamera()}
                className="flex items-center p-4 mx-4 rounded-xl">
                <Icon name="camera" size={35} color="#5F8D4E" />
                <STText className="text-center text-black text-sm">
                  Camera
                </STText>
              </TouchableOpacity>
              <TouchableOpacity
                style={{backgroundColor: '#E5D9B6'}}
                onPress={() => openLibrary()}
                className="flex items-center p-4 mx-4 rounded-xl">
                <Icon name="library" size={35} color="#5F8D4E" />
                <STText className="text-center text-black text-sm">
                  Thư viện
                </STText>
              </TouchableOpacity>
            </View>
          </BottomSheetView>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  bottomSheet: {
    backgroundColor: 'white',
    borderRadius: 24,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.1,
    shadowRadius: 24,
    elevation: 10,
  },
});
