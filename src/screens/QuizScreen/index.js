/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState} from 'react';
import {Dimensions, Image, TouchableOpacity, View} from 'react-native';
import {useSelector} from 'react-redux';
import {Button, RadioButton} from 'react-native-paper';
import STText from '../../components/STComponents/STText';
import {SafeAreaView} from 'react-native-safe-area-context';
import BackIcon from '../../components/BackIcon/BackIcon';
import {useNavigation} from '@react-navigation/native';
import {useEffect} from 'react';
import {storeData} from '../../helpers/Store';
import QuestionsApi from '../../helpers/API/QuestionsAPI';
import Carousel from 'react-native-reanimated-carousel';

const sort = (a, b) => {
  return a.id - b.id;
};

const advertisement = [
  'https://xuonginhanoi.vn/files/to-toi-bao-hiem-nhan-tho-04.jpg',
  'https://xuonginhanoi.vn/files/to-toi-bao-hiem-nhan-tho-02(1).jpg',
  'https://bizweb.dktcdn.net/100/332/012/articles/mau-poster-quang-cao-phong-nha-khoa-dep.jpg',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-n9C9IJAX6A1_MAZ_xd4DtMQZvlqFJquU6rvl4OVK8EtCFNUfwcwv7h_UveWA92jaH7s&usqp=CAU',
];

export default function QuizScreen({route}) {
  const {item} = route.params;
  const [start, setStart] = useState(false);
  const height = useSelector(state => state.screenDimensions.height);
  const navigate = useNavigation();
  const [questions, setQuestions] = useState([]);
  const [resultJudge, setResultJudge] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getDataQuestions = async () => {
      setLoading(true);
      const data = await QuestionsApi.getQuestionsById(item.id);
      setResultJudge(data.data.judges.sort(sort));
      let dataQuiz = [];
      let answers = [];
      if (data.data) {
        data.data.answers?.map((item, index) => {
          answers.push({
            id: index,
            title: item.answer,
            point: item.score_stress,
          });
        });
        data.data.questions?.map((item, index) => {
          dataQuiz.push({
            id: index,
            question: `Câu hỏi ${index + 1}`,
            title: item.question,
            options: [...answers],
          });
        });
      }
      setQuestions(dataQuiz);
      setLoading(false);
    };
    getDataQuestions();
  }, []);

  return (
    <SafeAreaView className="p-4 bg-white" style={{minHeight: height}}>
      <BackIcon onPress={() => navigate.goBack()} className="mb-4" />
      {!start ? (
        <PreViewQuiz
          startQuiz={setStart}
          QuizPreview={item}
          loading={loading}
        />
      ) : (
        <Quiz dataQuiz={questions} resultJudge={resultJudge} />
      )}
    </SafeAreaView>
  );
}

const PreViewQuiz = ({startQuiz, QuizPreview, loading}) => {
  return (
    <View>
      <STText className="text-2xl mt-6 font-bold text-black text-center">
        Bài test thang đánh giá {QuizPreview.name}
      </STText>
      <STText className="text-center mt-2 text-gray-500">
        Bài đánh giá dành cho độ tuổi từ 14 trở lên
      </STText>
      <STText className="text-center mt-2 text-gray-500">
        {QuizPreview.overview}
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
        <Button
          mode="contained"
          className="mt-6"
          loading={loading}
          disabled={loading}>
          Bắt đầu làm bài đánh giá
        </Button>
      </TouchableOpacity>
    </View>
  );
};

const Quiz = ({dataQuiz, resultJudge}) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [checked, setChecked] = useState(0);
  const [point, setPoint] = useState(0);

  const resultQuiz = () => {
    let result = [
      {id: 1, resultQuiz: 'anxiety', result: null},
      {id: 2, resultQuiz: 'depess', result: null},
      {id: 3, resultQuiz: 'stress', result: null},
    ];
    resultJudge.map(item => {
      if (
        item.score_anxiety_max !== 9999 &&
        item.score_anxiety_min !== 9999 &&
        point >= item.score_anxiety_min &&
        point <= item.score_anxiety_max
      ) {
        result[0].result = item.advice_anxiety;
      }
      if (
        item.score_depess_max !== 9999 &&
        item.score_depess_min !== 9999 &&
        point >= item.score_depess_min &&
        point <= item.score_depess_max
      ) {
        result[1].result = item.advice_depess;
      }
      if (
        item.score_stress_max !== 9999 &&
        item.score_stress_min !== 9999 &&
        point >= item.score_stress_min &&
        point <= item.score_stress_max
      ) {
        result[2].result = item.advice_stress;
      }
    });
    const resultFilter = result.filter(item => item.result !== null);
    resultFilter.map(item => {
      if (item.resultQuiz === 'anxiety') {
        item.resultQuiz = 'Lo âu';
      }
      if (item.resultQuiz === 'depess') {
        item.resultQuiz = 'Trầm cảm';
      }
      if (item.resultQuiz === 'stress') {
        item.resultQuiz = 'Stress';
      }
    });
    return resultFilter;
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
                      className="text-lg text-black w-5/6">
                      {item.title}
                    </STText>
                  </TouchableOpacity>
                ))}
              </View>
              <Button mode="contained" className="mt-4" onPress={nextQuiz}>
                Next
              </Button>
              <View className="mt-32">
                <Carousel
                  loop
                  width={Dimensions.get('window').width}
                  autoPlay={true}
                  data={advertisement}
                  scrollAnimationDuration={1000}
                  renderItem={({item}) => (
                    <View>
                      <Image
                        source={{uri: item}}
                        resizeMode="cover"
                        className="w-full h-32"
                      />
                    </View>
                  )}
                />
              </View>
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
          {resultQuiz().map(item => (
            <View key={item.id}>
              <STText className="text-lg mt-6 text-black">
                Mức độ {item.resultQuiz} của bạn hiện tại:
              </STText>
              <STText className="text-lg text-blue-600">{item.result}</STText>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};
