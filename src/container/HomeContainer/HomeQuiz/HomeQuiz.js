/* eslint-disable react-hooks/exhaustive-deps */
import {useNavigation} from '@react-navigation/native';
import dayjs from 'dayjs';
import React from 'react';
import {Image, ScrollView, TouchableOpacity, View} from 'react-native';
import {Button} from 'react-native-paper';
import STDropDown from '../../../components/STComponents/STDropDown';
import STText from '../../../components/STComponents/STText';
import {useSelector, useDispatch} from 'react-redux';
import {getListQuestions} from '../../../reducers/questions.reducers';
import {useEffect} from 'react';

const dataEmotion = [
  {
    id: 0,
    icon: 'https://cdn-icons-png.flaticon.com/512/2584/2584606.png',
    name: 'Vui vẻ',
  },
  {
    id: 1,
    icon: 'https://cdn-icons-png.flaticon.com/512/725/725107.png',
    name: 'Tốt',
  },
  {
    id: 2,
    icon: 'https://cdn-icons-png.flaticon.com/512/725/725085.png',
    name: 'OK',
  },
  {
    id: 3,
    icon: 'https://cdn-icons-png.flaticon.com/512/725/725099.png',
    name: 'Buồn',
  },
  {
    id: 4,
    icon: 'https://cdn-icons-png.flaticon.com/512/742/742752.png',
    name: 'Tồi tệ',
  },
];

export default function HomeQuiz() {
  const navigation = useNavigation();
  const [selectedEmotion, setSelectedEmotion] = React.useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getListQuestions());
  }, []);
  const questionsList = useSelector(state => state.questions.listQuestions);

  return (
    <View className="mt-8 py-2">
      <STDropDown title="Hiện tại bạn cảm thấy thế nào ?" heightDrop={90}>
        <View className="w-full bg-gray-200 flex justify-center items-center mt-2 rounded-md">
          {!selectedEmotion ? (
            <SelectedEmotionView setSelectedEmotion={setSelectedEmotion} />
          ) : (
            <UnSelectedEmotionView emotionSelect={selectedEmotion} />
          )}
        </View>
      </STDropDown>
      <View className="mt-10 space-x-2">
        <STText font="bold" className="text-2xl text-black">
          Trắc nhiệm cá nhân
        </STText>
        <ScrollView
          horizontal
          contentContainerStyle={{paddingHorizontal: 2, paddingVertical: 5}}
          showsHorizontalScrollIndicator={true}>
          {questionsList.map(item => (
            <TouchableOpacity
              key={item.id}
              className="bg-slate-300 w-32 h-36 mt-3 mr-4 rounded-md flex justify-center items-center"
              onPress={() => navigation.navigate('QuizScreen', {item})}>
              <STText className="text-center text-black">
                Bài trắc nghiệm {item.name}
              </STText>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const SelectedEmotionView = ({setSelectedEmotion}) => {
  return (
    <View className="my-4 flex-row">
      {dataEmotion.map((item, index) => (
        <TouchableOpacity
          key={item.id}
          onPress={() => setSelectedEmotion(item)}>
          <View className="flex items-center justify-center mx-4">
            <Image
              key={item.name + index}
              source={{
                uri: item.icon,
              }}
              className="w-10 h-10"
            />
            <STText>{item.name}</STText>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const UnSelectedEmotionView = ({emotionSelect}) => {
  let time;
  if (dayjs(Date.now()).format('HH') < 12) {
    time = 'sáng';
  } else if (dayjs(Date.now()).format('HH') < 18) {
    time = 'chiều';
  } else {
    time = 'tối';
  }

  let title;
  switch (emotionSelect.id) {
    case 0:
    case 1:
      title = `Buổi ${time} thật tuyệt vời, bạn muốn ghi lại những câu chuyện của ${time} này chứ?`;
      break;
    case 2:
      title = `Một buổi ${time} thật thoải mái phải không?. Bạn có gì muốn ghi lại không?`;
      break;
    case 3:
    case 4:
      title = `Buổi ${time} nay bạn thấy không ổn hả?. Bạn muốn ghi lại những gì bạn đang cảm thấy chứ?`;
      break;
  }

  const navigation = useNavigation();

  return (
    <View className="my-4">
      <STText className="text-center text-blue-500">{title}</STText>
      <Button
        mode="contained"
        className="mt-3"
        onPress={() => navigation.navigate('DiaryScreen')}>
        Viết thêm nhật ký
      </Button>
    </View>
  );
};
