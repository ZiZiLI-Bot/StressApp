import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import {useNavigation} from '@react-navigation/native';
import dayjs from 'dayjs';
import React, {useCallback, useMemo, useRef, useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {Avatar, Divider} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';
import BackIcon from '../../components/BackIcon/BackIcon';
import STText from '../../components/STComponents/STText';

export default function ForumScreen({route}) {
  const navigation = useNavigation();
  const data = route.params.data;
  const user = useSelector(state => state.user);

  const sheetRef = useRef(null);
  const [openSheet, setOpenSheet] = useState(false);
  const [commentData, setCommentData] = useState(null);
  const snapPoints = useMemo(() => ['60%', '100%'], []);

  const handlePresentModalPress = useCallback(dataComment => {
    setCommentData(dataComment);
    setOpenSheet(true);
    sheetRef.current?.present();
  }, []);

  const handleCloseSheet = useCallback(() => {
    setCommentData(null);
    setOpenSheet(false);
  }, []);

  return (
    <SafeAreaView className="h-full relative">
      <View className="flex-row items-center bg-white rounded-lg py-2">
        <BackIcon onPress={() => navigation.goBack()} className="ml-1" />
        <Avatar.Image
          size={50}
          source={{uri: user.avatar}}
          className="ml-4 overflow-hidden"
        />
        <STText className="ml-6 text-black text-base">
          Bạn có điều gì muốn chia sẻ ?
        </STText>
      </View>
      <ScrollView>
        {data.posts.map(item => (
          <View key={item.id} className="bg-white rounded-lg my-2">
            <View className="flex-row py-2">
              <Avatar.Image
                size={50}
                className="ml-2"
                source={{uri: item.avatar}}
              />
              <View>
                <STText className="ml-3 text-black text-base">
                  {item.author}
                </STText>
                <STText className="ml-3 text-black text-base">
                  {dayjs(item.date).format('HH:mm')}:{' '}
                  {dayjs(item.date).format('DD/MM/YYYY')}
                </STText>
              </View>
            </View>
            <View className="my-2">
              <STText className="ml-3 text-black text-base">
                {item.content}
              </STText>
            </View>
            <Divider bold={true} />
            <View className="flex-row justify-center my-1">
              <View className="flex-row justify-between w-11/12">
                <TouchableOpacity className="flex-row items-center">
                  <Icon name="heart-outline" size={26} color="black" />
                  <STText className="ml-2 text-black text-sm">
                    {item.likes} Thích
                  </STText>
                </TouchableOpacity>
                <TouchableOpacity
                  className="flex-row items-center"
                  onPress={() => handlePresentModalPress(item.comments)}>
                  <Icon name="comment-outline" size={26} color="black" />
                  <STText className="ml-2 text-black text-sm">
                    {item.comments.length} Bình luận
                  </STText>
                </TouchableOpacity>
                <TouchableOpacity className="flex-row items-center">
                  <Icon name="share-outline" size={26} color="black" />
                  <STText className="ml-2 text-black text-sm">
                    {item.re_posts} Chia sẻ
                  </STText>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
      <BottomSheetModalProvider>
        <BottomSheetModal
          ref={sheetRef}
          snapPoints={snapPoints}
          enablePanDownToClose={true}
          onDismiss={handleCloseSheet}>
          <BottomSheetView>
            <CommentView item={commentData} />
          </BottomSheetView>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </SafeAreaView>
  );
}

const CommentView = ({item}) => {
  return (
    <View className="px-2">
      <STText font="bold" className="text-center text-black text-2xl">
        Bình luận
      </STText>
      {item.map(comment => (
        <View key={comment.id} className="flex-row my-3 items-center">
          <Avatar.Image size={45} source={{uri: comment.avatar}} />
          <View className="ml-3">
            <View className="flex-row items-center">
              <STText className="text-base text-black">{comment.author}</STText>
              <STText className="ml-2 text-xs text-black">
                {dayjs(comment.date).format('HH:mm')}
              </STText>
            </View>
            <STText className="text-base text-black">{comment.content}</STText>
          </View>
        </View>
      ))}
    </View>
  );
};
