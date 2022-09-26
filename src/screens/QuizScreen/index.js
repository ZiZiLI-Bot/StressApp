import React, {useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {useSelector} from 'react-redux';
import {Button, RadioButton} from 'react-native-paper';
import STText from '../../components/STComponents/STText';
import {SafeAreaView} from 'react-native-safe-area-context';
import BackIcon from '../../components/BackIcon/BackIcon';
import {useNavigation} from '@react-navigation/native';

const dataQuiz = [
  {
    id: 0,
    question: 'Câu hỏi 1',
    title: 'Bài đánh giá dành cho độ tuổi từ 14 trở lên, Đúng hay sai?',
    options: [
      {id: 0, title: 'Hello', point: 4},
      {id: 1, title: 'Hello', point: 4},
      {id: 2, title: 'Hello', point: 4},
      {id: 3, title: 'Hello', point: 4},
    ],
  },
  {
    id: 1,
    question: 'Câu hỏi 2',
    title: 'Test',
    options: [
      {id: 0, title: 'Hello', point: 4},
      {id: 1, title: 'Hello', point: 4},
      {id: 2, title: 'Hello', point: 4},
      {id: 3, title: 'Hello', point: 4},
    ],
  },
  {
    id: 2,
    question: 'Câu hỏi 3',
    title: 'Test',
    options: [
      {id: 0, title: 'Hello', point: 4},
      {id: 1, title: 'Hello', point: 4},
      {id: 2, title: 'Hello', point: 4},
      {id: 3, title: 'Hello', point: 4},
    ],
  },
  {
    id: 3,
    question: 'Câu hỏi 4',
    title: 'Test',
    options: [
      {id: 0, title: 'Hello', point: 4},
      {id: 1, title: 'Hello', point: 4},
      {id: 2, title: 'Hello', point: 4},
      {id: 3, title: 'Hello', point: 4},
    ],
  },
];

export default function QuizScreen() {
  const [start, setStart] = useState(false);
  const height = useSelector(state => state.screenDimensions.height);
  const navigate = useNavigation();
  return (
    <SafeAreaView className="p-4 bg-white" style={{minHeight: height}}>
      <BackIcon onPress={() => navigate.goBack()} className="mb-4" />
      {!start ? <PreViewQuiz startQuiz={setStart} /> : <Quiz data={dataQuiz} />}
    </SafeAreaView>
  );
}

const PreViewQuiz = ({startQuiz}) => {
  return (
    <View>
      <STText className="text-2xl mt-6 font-bold text-black text-center">
        Bài test thang đánh giá lo âu - trầm cảm
      </STText>
      <STText className="text-center text-lg mt-2 text-black">
        Stress (Dass 21)
      </STText>
      <STText className="text-center mt-2 text-gray-500">
        Bài đánh giá dành cho độ tuổi từ 14 trở lên
      </STText>
      <STText className="mt-6 text-black text-lg">
        Hay đọc mỗi câu và chọn một trong những lựa chọn phù hợp nhất với tình
        trạng mà bạn đang gặp phải trong suốt tuần qua. Không có câu trả lời
        đúng hay sai. Và đừng dừng lại quá lâu ở bất kỳ một câu hỏi nào.
      </STText>
      <STText className="mt-4 text-black text-lg">
        Các câu trả lời của bạn sẽ được hệ thống lưu lại và đánh giá để đưa ra
        các tư vấn phù hợp với bạn.
      </STText>
      <TouchableOpacity onPress={() => startQuiz(true)}>
        <Button mode="contained" className="mt-6">
          Bắt đầu làm bài đánh giá
        </Button>
      </TouchableOpacity>
    </View>
  );
};

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [checked, setChecked] = useState(0);
  const [point, setPoint] = useState(0);
  const nextQuiz = () => {
    setPoint(pre => dataQuiz[currentQuestion].options[checked].point + pre);
    setChecked(0);
    setCurrentQuestion(currentQuestion + 1);
  };
  return (
    <View>
      {dataQuiz.map(
        data =>
          currentQuestion === data.id && (
            <View key={data.title}>
              <STText className="text-lg font-bold text-black">
                {data.question}
              </STText>
              <STText className="text-lg text-black mt-2">{data.title}</STText>
              <View className="mt-4">
                {data.options.map(item => (
                  <TouchableOpacity
                    className="flex-row items-center my-2"
                    key={item.id}
                    onPress={() => setChecked(item.id)}>
                    <RadioButton
                      value={item.id}
                      status={checked === item.id ? 'checked' : 'unchecked'}
                    />
                    <STText className="text-lg text-black">{item.title}</STText>
                  </TouchableOpacity>
                ))}
              </View>
              <Button mode="contained" className="mt-4" onPress={nextQuiz}>
                Next
              </Button>
            </View>
          ),
      )}
      {currentQuestion === dataQuiz.length && (
        <View>
          <STText className="text-2xl mt-3 font-bold text-black text-center">
            Hoàn thành bài test thang đánh giá lo âu - trầm cảm
          </STText>
          <STText className="text-black text-lg mt-6">
            Kết quả khảo sát của bạn đã được hệ thống ghi nhận. Cảm ơn bạn đã
            tham gia khảo sát.
          </STText>
          <STText className="text-black text-lg">
            Dựa vào kết quả khảo sát vừa rồi, chúng tôi có thể đưa ra các đánh
            gia sau:
          </STText>
        </View>
      )}
    </View>
  );
};
