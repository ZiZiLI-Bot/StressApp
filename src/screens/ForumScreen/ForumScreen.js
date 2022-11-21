/* eslint-disable react-hooks/exhaustive-deps */
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  BackHandler,
  RefreshControl,
  TextInput as TextInputDefault,
  TouchableOpacity,
  View,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {
  ActivityIndicator,
  Avatar,
  Divider,
  IconButton,
  TextInput,
} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';
import BackIcon from '../../components/BackIcon/BackIcon';
import ImageListView from '../../components/ImageListView';
import STText from '../../components/STComponents/STText';
import ForumAPI from '../../helpers/API/ForumAPI';
import DayjsParse from '../../helpers/Dayjs';
import {getData, storeData} from '../../helpers/Store';
import {getPostForum, updatePost} from '../../reducers/forum.reducers';

export default function ForumScreen({route, navigation}) {
  const id = route.params.id;
  const dispatch = useDispatch();
  const [ListPostIsLike, setListPostIsLike] = useState([]);
  const [reset, setReset] = useState(false);

  useEffect(() => {
    dispatch(getPostForum(id));
    const getListLike = async () => {
      const ListLike = await getData('ListPostIsLike');
      console.log('getListLike', ListLike);
      if (ListLike !== null) {
        setListPostIsLike(ListLike);
      }
    };
    getListLike();
  }, [id, reset]);
  const user = useSelector(state => state.user);
  const post = useSelector(state => state.forum.Post);

  const sheetRef = useRef(null);
  const inputRef = useRef(null);
  const [openSheet, setOpenSheet] = useState(false);
  const [PostId, setPostId] = useState(null);
  const [textReply, setTextReply] = useState('');
  const snapPoints = useMemo(() => ['100%'], []);

  useEffect(() => {
    if (openSheet) {
      const backAction = () => {
        sheetRef.current.close();
        return true;
      };
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction,
      );
      return () => backHandler.remove();
    }
  }, [openSheet]);

  const handlePresentModalPress = useCallback(id => {
    setPostId(id);
    setOpenSheet(true);
    sheetRef.current?.present();
  }, []);

  const handleCloseSheet = useCallback(() => {
    setPostId(null);
    setOpenSheet(false);
  }, []);

  const handleLikePost = async post => {
    if (ListPostIsLike.indexOf(post.id) === -1) {
      const data = {
        ...post,
        like: post.like + 1,
      };
      dispatch(updatePost(data));
      const tempLikePost = [...ListPostIsLike, post.id];
      setListPostIsLike([...ListPostIsLike, post.id]);
      await storeData('ListPostIsLike', tempLikePost);
    } else {
      const data = {
        ...post,
        like: post.like - 1,
      };
      dispatch(updatePost(data));
      const tempLikePost = ListPostIsLike.filter(item => item !== post.id);
      setListPostIsLike(tempLikePost);
      await storeData('ListPostIsLike', tempLikePost);
    }
  };

  const handleSummitReply = async () => {
    const data = {
      content: textReply,
      has_child: false,
      parent_id: 0,
      poster_id: PostId,
      profile_id: user.profileId,
    };
    const res = await ForumAPI.createComment(data);
    console.log(res);
    if (res.success) {
      setReset(!reset);
      inputRef.current.clear();
    }
  };

  const onRefresh = () => {
    setReset(!reset);
  };

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
          <TouchableOpacity
            onPress={() => navigation.navigate('CreatePost', {socialId: id})}>
            <STText className="ml-3 text-black text-base">
              Bạn có điều gì muốn chia sẻ ?
            </STText>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={post.isLoadingPost}
            onRefresh={onRefresh}
          />
        }>
        {post.isLoadingPost ? (
          <PlaceholderPost />
        ) : (
          <View>
            {post.map(item => (
              <View key={item.id} className="bg-white rounded-lg my-2">
                <View className="flex-row py-2">
                  <Avatar.Image
                    size={50}
                    className="ml-2 overflow-hidden"
                    source={{uri: item.profile.avatar}}
                  />
                  <View>
                    <STText font="medium" className="ml-3 text-black text-base">
                      {item.profile.name}
                    </STText>
                    <STText className="ml-3 text-slate-500 text-sm">
                      {DayjsParse.dynamicsDate(item.CreatedAt)}
                    </STText>
                  </View>
                </View>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('ViewDetailPost', {data: item})
                  }>
                  <View className="my-2">
                    <STText className="ml-3 text-black text-base">
                      {item.content}
                    </STText>
                  </View>
                  {item.image && <ImageListView listImage={item.image} />}
                </TouchableOpacity>
                <Divider bold={true} />
                <View className="flex-row justify-center my-1">
                  <View className="flex-row justify-between w-11/12">
                    <TouchableOpacity
                      className="flex-row items-center"
                      onPress={() => handleLikePost(item)}>
                      {ListPostIsLike.includes(item.id) ? (
                        <Icon name="heart" size={26} color="red" />
                      ) : (
                        <Icon name="heart-outline" size={26} color="black" />
                      )}
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
                    {/* <TouchableOpacity className="flex-row items-center">
                      <Icon name="share-outline" size={26} color="black" />
                      <STText className="ml-2 text-black text-sm">
                        {item.share} Chia sẻ
                      </STText>
                    </TouchableOpacity> */}
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
          <BottomSheetScrollView>
            <View className="px-2">
              <View>
                <STText font="bold" className="text-center text-black text-2xl">
                  Bình luận
                </STText>
              </View>
              <CommentView
                poster_id={PostId}
                parent_id={0}
                reset={reset}
                profileId={user.profileId}
                onRefresh={onRefresh}
                level={0}
              />
            </View>
          </BottomSheetScrollView>
          <TextInput
            ref={inputRef}
            placeholder="Nhập bình luận ..."
            dense={true}
            className="text-black"
            onChangeText={text => setTextReply(text)}
            right={
              <TextInput.Icon
                name="send"
                iconColor="blue"
                disabled={textReply.length === 0 ? true : false}
                onPress={handleSummitReply}
              />
            }
          />
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </SafeAreaView>
  );
}

const CommentView = ({poster_id, parent_id, reset, profileId, onRefresh}) => {
  const [comment, setComment] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [idCommentChild, setIdCommentChild] = useState(null);
  const [showReply, setShowReply] = useState(NaN);
  const [textReply, setTextReply] = useState('');
  const [showCommentChild, setShowCommentChild] = useState([]);
  const inputRef = useRef(null);

  const handleCommentChild = id => {
    setIdCommentChild(id);
    if (showCommentChild.includes(id)) {
      setShowCommentChild(showCommentChild.filter(item => item !== id));
    } else {
      setShowCommentChild(prev => [...prev, id]);
    }
  };

  const handleShowReply = id => {
    if (showReply === id) {
      setShowReply(NaN);
    } else {
      setShowReply(id);
    }
  };
  useEffect(() => {
    const getCommentById = async () => {
      setIsLoading(true);
      const res = await ForumAPI.getCommentById(poster_id, parent_id);
      setComment(res.data);
      setIsLoading(false);
    };
    getCommentById();
    // return getCommentById();
  }, [poster_id, reset]);

  const handleSummitReply = async () => {
    const data = {
      poster_id: poster_id,
      parent_id: showReply,
      content: textReply,
      profile_id: profileId,
      has_child: false,
    };
    console.log(data);
    const res = await ForumAPI.createComment(data);
    if (res.success) {
      onRefresh();
      inputRef.current.clear();
      setShowReply(NaN);
    }
  };
  return (
    <View>
      {isLoading ? (
        <ActivityIndicator animating={true} className="mt-10" />
      ) : (
        <View>
          {comment.length > 0 ? (
            <View>
              {comment?.map(item => (
                <View key={item.id}>
                  <View className="flex-row my-2 items-end">
                    <Avatar.Image
                      size={45}
                      className="overflow-hidden"
                      source={{uri: item.profile.avatar}}
                    />
                    <View className="ml-3 bg-slate-100 p-2 rounded-xl">
                      <View className="flex-row items-center">
                        <STText font="medium" className="text-base text-black">
                          {item.profile.name}
                        </STText>
                        <STText className="ml-2 text-xs text-slate-500">
                          {DayjsParse.dynamicsDate(item.CreatedAt)}
                        </STText>
                      </View>
                      <STText className="text-base text-black">
                        {item.content}
                      </STText>
                    </View>
                    {item.has_child && (
                      <TouchableOpacity
                        className="ml-2 flex-row items-center"
                        onPress={() => handleCommentChild(item.id)}>
                        <STText className="text-xs text-gray-500">
                          Xem trả lời
                        </STText>
                        <Icon name="chevron-down" size={20} color="gray" />
                      </TouchableOpacity>
                    )}
                  </View>
                  <TouchableOpacity
                    className="ml-12"
                    onPress={() => handleShowReply(item.id)}>
                    <STText className="ml-3 text-xs text-black">Trả lời</STText>
                  </TouchableOpacity>
                  {showReply === item.id && (
                    <View className="mt-1 ml-12 w-52 flex-row bg-slate-100 items-center rounded-xl">
                      <TextInputDefault
                        ref={inputRef}
                        className="h-6 p-0 pl-2 w-40 text-black"
                        onChangeText={text => setTextReply(text)}
                      />
                      <IconButton
                        onPress={handleSummitReply}
                        size={16}
                        icon="send"
                        containerColor="blue"
                        iconColor="white"
                      />
                    </View>
                  )}
                  {showCommentChild.includes(item.id) && (
                    <View className="ml-8">
                      <CommentView
                        poster_id={poster_id}
                        parent_id={idCommentChild}
                        reset={reset}
                        profileId={profileId}
                        onRefresh={onRefresh}
                      />
                    </View>
                  )}
                </View>
              ))}
            </View>
          ) : (
            <View className="mt-5">
              <STText
                font="medium"
                className="text-center text-black text-base">
                Chưa có bình luận nào. Hãy là người đầu tiên chia sẻ suy nghĩ về
                bài viết này!
              </STText>
            </View>
          )}
        </View>
      )}
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
