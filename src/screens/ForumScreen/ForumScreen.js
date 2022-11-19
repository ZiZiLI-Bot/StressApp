/* eslint-disable react-hooks/exhaustive-deps */
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import {useNavigation} from '@react-navigation/native';
import dayjs from 'dayjs';
import React, {useCallback, useMemo, useRef, useState} from 'react';
import {useEffect} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {Avatar, Divider} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';
import BackIcon from '../../components/BackIcon/BackIcon';
import STText from '../../components/STComponents/STText';
import {getComment, getPostForum} from '../../reducers/forum.reducers';

export default function ForumScreen({route, navigation}) {
  const id = route.params.id;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPostForum(id));
  }, [id]);
  const user = useSelector(state => state.user);
  const post = useSelector(state => state.forum.Post);
  const loading = useSelector(state => state.forum.isLoading);

  const sheetRef = useRef(null);
  const [openSheet, setOpenSheet] = useState(false);
  const [CommentId, setCommentId] = useState(null);
  const snapPoints = useMemo(() => ['100%'], []);

  const handlePresentModalPress = useCallback(id => {
    setCommentId(id);
    setOpenSheet(true);
    sheetRef.current?.present();
  }, []);

  const handleCloseSheet = useCallback(() => {
    setCommentId(null);
    setOpenSheet(false);
  }, []);

  return (
    <SafeAreaView className="h-full relative">
      <View className="flex-row items-center bg-white rounded-lg py-2">
        <BackIcon onPress={() => navigation.goBack()} className="ml-1" />
        <View className="flex-row flex-1 items-center">
          <Avatar.Image
            size={50}
            source={{uri: user.avatar}}
            className="ml-2 overflow-hidden"
          />
          <STText className="ml-3 text-black text-base">
            Bạn có điều gì muốn chia sẻ ?
          </STText>
        </View>
      </View>
      <ScrollView>
        {post.isLoadingPost ? (
          <PlaceholderPost />
        ) : (
          <View>
            {post.map(item => (
              <View key={item.id} className="bg-white rounded-lg my-2">
                <View className="flex-row py-2">
                  <Avatar.Image
                    size={50}
                    className="ml-2"
                    source={{uri: item.profile.avatar}}
                  />
                  <View>
                    <STText className="ml-3 text-black text-base">
                      {item.profile.name}
                    </STText>
                    <STText className="ml-3 text-black text-base">
                      {dayjs(item.UpdatedAt).format('HH:mm')} -{' '}
                      {dayjs(item.UpdatedAt).format('DD/MM/YYYY')}
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
                        {item.like} Thích
                      </STText>
                    </TouchableOpacity>
                    <TouchableOpacity
                      className="flex-row items-center"
                      onPress={() => handlePresentModalPress(item.id)}>
                      <Icon name="comment-outline" size={26} color="black" />
                      <STText className="ml-2 text-black text-sm">
                        Bình luận
                      </STText>
                    </TouchableOpacity>
                    <TouchableOpacity className="flex-row items-center">
                      <Icon name="share-outline" size={26} color="black" />
                      <STText className="ml-2 text-black text-sm">
                        {item.share} Chia sẻ
                      </STText>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
      <BottomSheetModalProvider>
        <BottomSheetModal
          ref={sheetRef}
          snapPoints={snapPoints}
          enablePanDownToClose={true}
          onDismiss={handleCloseSheet}>
          <BottomSheetView>
            <CommentView dispatch={dispatch} poster_id={CommentId} />
          </BottomSheetView>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </SafeAreaView>
  );
}

const CommentView = ({dispatch, poster_id}) => {
  useEffect(() => {
    dispatch(getComment(poster_id, 0));
  }, [poster_id]);
  const comment = useSelector(state => state.forum.Comment);
  console.log(comment);
  return (
    <View className="px-2">
      <STText font="bold" className="text-center text-black text-2xl">
        Bình luận
      </STText>
      {/* {item.map(comment => (
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
      ))} */}
    </View>
  );
};

const PlaceholderPost = () => {
  const list = [1, 2, 3];
  return (
    <View>
      {list.map(item => (
        <View key={item} className="w-full h-36 bg-white p-2 my-2">
          <SkeletonPlaceholder borderRadius={4}>
            <SkeletonPlaceholder.Item flexDirection="row" alignItems="center">
              <SkeletonPlaceholder.Item
                width={60}
                height={60}
                borderRadius={50}
              />
              <SkeletonPlaceholder.Item marginLeft={20}>
                <SkeletonPlaceholder.Item width={120} height={20} />
                <SkeletonPlaceholder.Item
                  marginTop={6}
                  width={80}
                  height={20}
                />
              </SkeletonPlaceholder.Item>
            </SkeletonPlaceholder.Item>
            <SkeletonPlaceholder.Item marginLeft={20} marginTop={10}>
              <SkeletonPlaceholder.Item width={240} height={20} />
              <SkeletonPlaceholder.Item
                width={240}
                height={20}
                marginTop={10}
              />
            </SkeletonPlaceholder.Item>
          </SkeletonPlaceholder>
        </View>
      ))}
    </View>
  );
};

const PlaceholderComment = () => {
  return (
    <View className="w-full h-36 bg-white p-2 my-2">
      <SkeletonPlaceholder borderRadius={4}>
        <SkeletonPlaceholder.Item flexDirection="row" alignItems="center">
          <SkeletonPlaceholder.Item width={60} height={60} borderRadius={50} />
          <SkeletonPlaceholder.Item marginLeft={20}>
            <SkeletonPlaceholder.Item width={120} height={20} />
            <SkeletonPlaceholder.Item marginTop={6} width={80} height={20} />
          </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder.Item>
        <SkeletonPlaceholder.Item marginLeft={20} marginTop={10}>
          <SkeletonPlaceholder.Item width={240} height={20} />
          <SkeletonPlaceholder.Item width={240} height={20} marginTop={10} />
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder>
    </View>
  );
};
