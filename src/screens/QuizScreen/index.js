/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {useSelector} from 'react-redux';
import {Button, RadioButton} from 'react-native-paper';
import STText from '../../components/STComponents/STText';
import {SafeAreaView} from 'react-native-safe-area-context';
import BackIcon from '../../components/BackIcon/BackIcon';
import {useNavigation} from '@react-navigation/native';
import {useEffect} from 'react';
import {storeData} from '../../helpers/Store';

const dataQuiz = [
  {
    id: 0,
    question: 'Câu hỏi 1',
    title: 'Ít hứng thú hoặc là không có niềm vui thích làm việc gì?',
    options: [
      {id: 0, title: 'Không lần nào cả', point: 0},
      {id: 1, title: 'Một vài ngày', point: 1},
      {id: 2, title: 'Nhiều hơn phân nữa số thời gian', point: 2},
      {id: 3, title: 'Gần như mỗi ngày', point: 3},
    ],
  },
  {
    id: 1,
    question: 'Câu hỏi 2',
    title: 'Cảm thấy chán nản kiệt sức, trầm cảm, hoặc tuyệt vọng?',
    options: [
      {id: 0, title: 'Không lần nào cả', point: 0},
      {id: 1, title: 'Một vài ngày', point: 1},
      {id: 2, title: 'Nhiều hơn phân nữa số thời gian', point: 2},
      {id: 3, title: 'Gần như mỗi ngày', point: 3},
    ],
  },
  {
    id: 2,
    question: 'Câu hỏi 3',
    title: 'Khó ngủ, ngủ không lâu hoặc ngủ quá nhiều',
    options: [
      {id: 0, title: 'Không lần nào cả', point: 0},
      {id: 1, title: 'Một vài ngày', point: 1},
      {id: 2, title: 'Nhiều hơn phân nữa số thời gian', point: 2},
      {id: 3, title: 'Gần như mỗi ngày', point: 3},
    ],
  },
  {
    id: 3,
    question: 'Câu hỏi 4',
    title: 'Cảm thấy mệt mỏi hoặc kém năng lực hoạt động',
    options: [
      {id: 0, title: 'Không lần nào cả', point: 0},
      {id: 1, title: 'Một vài ngày', point: 1},
      {id: 2, title: 'Nhiều hơn phân nữa số thời gian', point: 2},
      {id: 3, title: 'Gần như mỗi ngày', point: 3},
    ],
  },
  {
    id: 4,
    question: 'Câu hỏi 5',
    title: 'Ăn kém ngon hoặc ăn quá nhiều',
    options: [
      {id: 0, title: 'Không lần nào cả', point: 0},
      {id: 1, title: 'Một vài ngày', point: 1},
      {id: 2, title: 'Nhiều hơn phân nữa số thời gian', point: 2},
      {id: 3, title: 'Gần như mỗi ngày', point: 3},
    ],
  },
  {
    id: 5,
    question: 'Câu hỏi 6',
    title:
      'Cảm thấy mình tệ, cho rằng mình là người thất bại hoặc đã làm cho chính mình hay gia đình thất vọng',
    options: [
      {id: 0, title: 'Không lần nào cả', point: 0},
      {id: 1, title: 'Một vài ngày', point: 1},
      {id: 2, title: 'Nhiều hơn phân nữa số thời gian', point: 2},
      {id: 3, title: 'Gần như mỗi ngày', point: 3},
    ],
  },
  {
    id: 6,
    question: 'Câu hỏi 7',
    title: 'Khó tập trung làm việc gì, ví dụ như là đọc báo hay xem tivi',
    options: [
      {id: 0, title: 'Không lần nào cả', point: 0},
      {id: 1, title: 'Một vài ngày', point: 1},
      {id: 2, title: 'Nhiều hơn phân nữa số thời gian', point: 2},
      {id: 3, title: 'Gần như mỗi ngày', point: 3},
    ],
  },
  {
    id: 7,
    question: 'Câu hỏi 8',
    title:
      'Đi đứng hoặc nói năng chậm chạp đến nổi mọi người lưu ý. Hoặc ngược lại quá bồn chồn, đứng ngồi không yên cho nên bạn đã đi quanh quẩn nhiều hơn bình thường',
    options: [
      {id: 0, title: 'Không lần nào cả', point: 0},
      {id: 1, title: 'Một vài ngày', point: 1},
      {id: 2, title: 'Nhiều hơn phân nữa số thời gian', point: 2},
      {id: 3, title: 'Gần như mỗi ngày', point: 3},
    ],
  },
  {
    id: 8,
    question: 'Câu hỏi 9',
    title:
      'Có ý nghĩ làm điều gì đó gây đau đớn cho bản thân hoặc nghĩ rằng thà mình chết đi cho rồi',
    options: [
      {id: 0, title: 'Không lần nào cả', point: 0},
      {id: 1, title: 'Một vài ngày', point: 1},
      {id: 2, title: 'Nhiều hơn phân nữa số thời gian', point: 2},
      {id: 3, title: 'Gần như mỗi ngày', point: 3},
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
        Bài test thang đánh giá lo âu - trầm cảm PHQ-9
      </STText>
      <STText className="text-center text-lg mt-2 text-black">
        Stress (Dass 9)
      </STText>
      <STText className="text-center mt-2 text-gray-500">
        Bài đánh giá dành cho độ tuổi từ 14 trở lên
      </STText>
      <STText className="mt-6 text-black text-lg">
        Hãy cho chúng tôi biết, trong vòng 2 tuần vừa qua, có bao nhiêu lần bạn
        bị lo lắng buồn phiền vì những vấn đề được liệt kê dưới đây?
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
  const resultQuiz = () => {
    if (point <= 4) {
      return 'Bạn hoàn toàn bình thường';
    } else if (point <= 9) {
      return 'Bạn ở mức trầm cảm tối thiểu';
    } else if (point <= 14) {
      return 'Đây là mức trầm cảm nhẹ. Bạn nên tìm kiếm sự hỗ trợ';
    } else if (point <= 19) {
      return 'Đây là trầm cảm trung bình. Bạn nên tìm kiếm sự hỗ trợ';
    } else {
      return 'Chuẩn đoán kết quả trầm cảm nặng. Bạn nên đến gặp bác sĩ chuyên khoa sức khỏe tâm thần, chuyên gia tâm lý hoặc khám từ xa để được tư vấn và điều trị';
    }
  };
  useEffect(() => {
    const updateData = async () => {
      if (currentQuestion === dataQuiz.length) {
        const result = {
          test: 'Bài test thang đánh giá lo âu - trầm cảm PHQ-9',
          point,
        };
        const resultString = JSON.stringify(result);
        await storeData('resultQuiz', resultString);
      }
    };
    updateData();
  }, [currentQuestion]);
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
                    key={item.id}>
                    <RadioButton
                      value={item.id}
                      status={checked === item.id ? 'checked' : 'unchecked'}
                      onPress={() => setChecked(item.id)}
                    />
                    <STText
                      onPress={() => setChecked(item.id)}
                      className="text-lg text-black">
                      {item.title}
                    </STText>
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
            Hoàn thành bài test thang đánh giá lo âu - trầm cảm PHQ-9
          </STText>
          <STText className="text-black text-lg mt-6">
            Kết quả khảo sát của bạn đã được hệ thống ghi nhận. Cảm ơn bạn đã
            tham gia khảo sát.
          </STText>
          <STText className="text-black text-lg">
            Dựa vào kết quả khảo sát vừa rồi, chúng tôi có thể đưa ra các đánh
            gia sau:
          </STText>
          <View>
            <STText className="text-lg text-blue-600 mt-6">
              {resultQuiz()}
            </STText>
          </View>
        </View>
      )}
    </View>
  );
};
