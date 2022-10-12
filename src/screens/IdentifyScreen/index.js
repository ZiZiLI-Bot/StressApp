import React, {useEffect} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import STText from '../../components/STComponents/STText';
import {getData} from '../../helpers/Store';

export default function IdentifyScreen({navigation}) {
  const [data, setData] = React.useState();
  const resultQuiz = ({point}) => {
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
    const getPointQuiz = async () => {
      try {
        const pointQuiz = await getData('resultQuiz');
        setData(JSON.parse(pointQuiz));
      } catch (e) {
        setData(null);
      }
    };
    getPointQuiz();
  }, []);
  return (
    <SafeAreaView className="pt-3 px-4 bg-white h-full">
      <View className="w-full h-16 flex-row items-center justify-between">
        <STText font="bold" className="text-2xl text-black">
          Nhận định cơ bản
        </STText>
        <View>
          <TouchableOpacity
            className="bg-gray-200 w-12 h-12 flex justify-center items-center rounded-xl"
            onPress={() => navigation.openDrawer()}>
            <Icon name="menu-open" size={30} color="#5669ff" />
          </TouchableOpacity>
        </View>
      </View>
      <View className="mt-10">
        {data ? (
          <View>
            <STText className="text-black text-base">
              Thông qua kết quả các bài trắc nhiệm đánh giá trên hệ thống, Chúng
              tôi có thể có một vài kết luận về tình trạng tâm lý hiện tại của
              bạn:
            </STText>
            <STText className="text-black text-base mt-5">
              Dựa trên kết quả {data.test} có thể thấy:
            </STText>
            <STText className="text-base text-blue-600 mt-3">
              {resultQuiz({point: data.point})}
            </STText>
          </View>
        ) : (
          <STText className="text-black text-base">
            Chưa có kết quả đánh giá. Thực hiện một vài bài trắc nhiệm cá nhân
            để chúng tôi có thể đưa ra kết luận cho bạn
          </STText>
        )}
      </View>
    </SafeAreaView>
  );
}
