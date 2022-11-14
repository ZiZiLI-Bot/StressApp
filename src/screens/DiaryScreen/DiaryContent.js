import React from 'react';
import {View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import STText from '../../components/STComponents/STText';
import BackIcon from '../../components/BackIcon';
import {Button, TextInput} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {createDiary, updateDiary} from '../../reducers';
import {ScrollView} from 'react-native-gesture-handler';

export default function DiaryContent({route, navigation}) {
  const {data} = route.params;
  const height = useSelector(state => state.screenDimensions.height);
  const diary = useSelector(state => state.diary);
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const [title, setTitle] = React.useState(data?.title);
  const [content, setContent] = React.useState(data?.content);

  const onSubmit = async () => {
    if (title === '' || content === '') {
      alert('Vui lòng nhập đầy đủ thông tin');
    } else {
      if (!data?.id) {
        const newDiary = {
          title: title,
          content: content,
          profileId: user.userId,
          public: false,
          isCreated: true,
          CreateAt: new Date(),
        };
        dispatch(createDiary(newDiary));
        navigation.goBack();
      } else {
        const updateDiaryData = {
          id: data.id,
          title: title,
          content: content,
          profileId: user.userId,
          public: false,
          isCreated: false,
          CreateAt: data.CreateAt,
        };
        dispatch(updateDiary(updateDiaryData));
        navigation.goBack();
      }
    }
  };

  return (
    <SafeAreaView className="p-4 bg-white">
      <ScrollView className="w-full h-full bg-white">
        <View className="flex-row items-center">
          <BackIcon className="mr-4" onPress={() => navigation.goBack()} />
          <STText className="text-2xl text-black font-bold">Nhật ký</STText>
        </View>
        <View className="mt-10">
          <STText className="text-xl text-black">Tiêu đề:</STText>
          <TextInput
            mode="outlined"
            multiline={true}
            numberOfLines={2}
            value={title}
            onChangeText={text => setTitle(text)}
          />
        </View>
        <View className="mt-6">
          <STText className="text-xl text-black">Nội dung:</STText>
          <TextInput
            mode="outlined"
            multiline={true}
            value={content}
            numberOfLines={18}
            onChangeText={text => setContent(text)}
          />
        </View>
        <View className="mt-4">
          <Button
            mode="contained-tonal"
            onPress={onSubmit}
            disabled={diary.isLoading}
            loading={diary.isLoading}>
            Cập nhật
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
