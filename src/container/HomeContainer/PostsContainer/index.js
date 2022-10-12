import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {Button, Card} from 'react-native-paper';
import Icon from 'react-native-vector-icons/AntDesign';
import STText from '../../../components/STComponents/STText';

const data = [
  {
    id: 0,
    title: 'Các Tác Hại Của Mạng Xã Hội Đến Sức Khỏe Tinh Thần',
    date: Date.now(),
    imageLabel:
      'https://bacsitamly.vn/wp-content/uploads/2022/01/loi-ich-tac-hai-mang-xa-hoi-768x402.jpg',
    content:
      'Mặc dù biết rằng bên cạnh những ưu điểm nổi bật, tác hại của mạng xã hội cũng khiến chúng ta phải đối mặt với nhiều thách thức. Tuy nhiên, chúng ta vẫn muốn kết nối vào mạng xã hội hoặc thậm chí là truy cập vào mạng không kể ngày đêm, vô tình trở thành “nô lệ của điện thoại” mà không hề hay biết. Thực ra, lý do nhiều người yêu thích mạng xã hội và phụ thuộc vào mạng cũng vô cùng dễ hiểu. Thông thường, các nền tảng này đều được thiết kế với đa dạng các chức năng để thu hút được sự chú ý của bạn. Điều đó khiến bạn luôn nghĩ đến mạng xã hội để truy cập, đọc các thông tin, trao đổi với bạn bè. Nhìn chung, tâm lý của mỗi người chúng ta đều thích giải trí hơn là học và làm việc. Việc sử dụng mạng xã hội nhiều có thể tác động đến trí não, cách bạn suy nghĩ và quan trọng hơn là muốn tâm lý cần được truy cập để giải tỏa sự căng thẳng, đây được gọi là hiện tượng “nghiện mạng xã hội”.',
  },
  {
    id: 2,
    title: 'Rối loạn do sử dụng chất kích thích',
    date: Date.now(),
    imageLabel:
      'https://recmiennam.com/wp-content/uploads/2020/10/anh-buon-1.jpg',
    content:
      'Các rối loạn liên quan đến sử dụng chất kích thích bao gồm các kiểu hành vi bệnh lý liên quan đến việc sử dụng chất (ví dụ bệnh nhân tiếp tục sử dụng một chất mặc dù gặp vấn đề nghiệm trọng liên quan đến việc sủ dụng chất đó) rối loạn sử dụng chất',
  },
  {
    id: 3,
    title: 'Rối Loạn Dạng Cơ Thể (BDD) Là Gì? Triệu Chứng Và Cách Điều Trị',
    date: Date.now(),
    imageLabel:
      'https://bacsitamly.vn/wp-content/uploads/2022/01/roi-loan-dang-co-the-la-gi-3-e1642354716646.jpg',
    content:
      'Rối loạn dạng cơ thể là một dạng rối loạn tâm thần, ảnh hưởng trực tiếp đến cuộc sống của người bệnh. Cụ thể, những người gặp phải các rối loạn này sẽ không thể ngừng suy nghĩ về một hoặc nhiều khiếm khuyết trong đặc điểm ngoại hình của bản thân. Những khiếm khuyết đó có thể rất nhỏ, người khác không thể nhìn thấy hoặc không quan tâm nhưng người bị rối loạn này luôn cảm thấy xấu hổ, lo lắng, thậm chí là không muốn ra ngoài tiếp xúc với xã hội. Người bị rối loạn dạng cơ thể sẽ tập trung sự quan tâm nhiều vào ngoại hình, hình ảnh của bản thân trong mắt người khác. Họ luôn tìm đến sự hoàn hảo về ngoại hình và không bao giờ cảm thấy thỏa mãn với vẻ ngoài của bản thân. Chính điều này khiến người bệnh có những hành vi lặp đi lặp lại như quan sát mình trong gương có thể liên tục trong vài giờ mà không thấy chán. Điều này sẽ gây ảnh hưởng lớn đến sức khỏe tinh thần của người bệnh cũng như những người xung quanh nhưng không thể tự có cách giải quyết hiệu quả. Hội chứng này sẽ tệ hại hơn khi người bị rối loạn dạng cơ thể cố gắng tìm hiểu về những phương pháp làm đẹp, thẩm mỹ để chỉnh sửa khuyết điểm trong mắt mình. Chỉnh sửa liên tục có thể dẫn đến biến dạng cơ thể mà người đó không nhận ra, biến “lợn lành thành lợn què” như ông cha ta đã nói trước đây.  ',
  },
  {
    id: 4,
    title: 'Top 9 Cách Tập Trung Học Giúp Cải Thiện Năng Suất Và Hiệu Quả',
    date: Date.now(),
    imageLabel:
      'https://bacsitamly.vn/wp-content/uploads/2022/04/pexels-photo-1326947-1024x683.webp',
    content:
      'Các chuyên gia nghiên cứu tâm lý học quản lý, người ta cho rằng việc tự tạo nên một “nghi thức” chính là cách tập trung học tương đối hiệu quả bạn nên áp dụng. Cụ thể, bạn cần tạo ra thói quen này mỗi ngày trước khi bắt đầu học để làm tăng sự tập trung. Những nghi thức này có thể là việc bạn dọn dẹp bàn học, tìm kiếm các tài liệu liên quan đến môn học trước khi ngồi vào bàn, xây dựng danh sách bài tập cần hoàn thiện trước khi học… Những nghi thức trước khi học sẽ giúp bạn chuẩn bị tốt nhất cho quá trình học tập, giúp bạn không bị phân tâm, mất tập trung trong quá trình học. Chẳng hạn, nếu bạn không chuẩn bị trước tài liệu thì sẽ phải mất thời gian để tìm kiếm trong lúc học, làm ảnh hưởng đến hiệu quả học.',
  },
];

export default function PostContainer() {
  const navigation = useNavigation();
  return (
    <View className="mt-4">
      <TouchableOpacity className="flex-row justify-between items-center">
        <STText font="bold" className="text-2xl text-black">
          Bài viết mới nhất
        </STText>
        <Icon name="right" size={20} color="black" style={{marginRight: 10}} />
      </TouchableOpacity>
      <ScrollView
        horizontal
        contentContainerStyle={{paddingHorizontal: 2, paddingVertical: 5}}
        showsHorizontalScrollIndicator={true}
        className="mt-3">
        {data.map((item, index) => (
          <TouchableOpacity
            key={index + item.id}
            onPress={() => navigation.navigate('PostScreen', {item})}>
            <PostCard item={item} />
          </TouchableOpacity>
        ))}
        <View className="rounded-sm flex justify-center items-center">
          <Button mode="text" className="text-base">
            Xem thêm ...
          </Button>
        </View>
      </ScrollView>
    </View>
  );
}

const PostCard = ({item}) => {
  return (
    <Card className="w-64 mr-4">
      <Card.Cover className="h-44" source={{uri: item.imageLabel}} />
      <Card.Title
        titleNumberOfLines={1}
        titleStyle={{
          fontSize: 18,
          marginBottom: 5,
        }}
        titleVariant="headlineLarge"
        subtitleNumberOfLines={3}
        title={item.title}
        subtitle={item.content}
      />
      <Card.Actions>
        <Button mode="text">Xem thêm ...</Button>
      </Card.Actions>
    </Card>
  );
};
