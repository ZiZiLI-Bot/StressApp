import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import ForumAPI from '../helpers/API/ForumAPI';
import storage from '@react-native-firebase/storage';
import AuthApi from '../helpers/API/Auth.api';

const uploadImageToFirebase = async images => {
  const upload = images.map(async image => {
    const reference = storage().ref('images/' + image.id);
    await reference.putFile(image.path);
    return await storage()
      .ref('images/' + image.id)
      .getDownloadURL();
  });
  const ListImage = await Promise.all(upload);
  return ListImage;
};

const sortFunc = (a, b) => b.id - a.id;
const initialState = {
  Post: [],
  Comment: [],
  isLoadingPost: false,
  idLoadingComment: false,
};

export const ForumReducer = createSlice({
  name: 'forum',
  initialState,
  extraReducers: builder => {
    //getPostForum
    builder.addCase(getPostForum.pending, (state, action) => {
      state.isLoadingPost = true;
    });
    builder.addCase(getPostForum.fulfilled, (state, action) => {
      state.isLoadingPost = false;
      state.Post = action.payload;
    });
    builder.addCase(getPostForum.rejected, (state, action) => {
      state.isLoadingPost = false;
    });
    //getComment
    builder.addCase(getComment.pending, (state, action) => {
      state.idLoadingComment = true;
    });
    builder.addCase(getComment.fulfilled, (state, action) => {
      state.idLoadingComment = false;
      state.Comment.push(action.payload);
    });
    builder.addCase(getComment.rejected, (state, action) => {
      state.idLoadingComment = false;
    });
    //createPost
    builder.addCase(createPost.pending, (state, action) => {
      state.isLoadingPost = true;
    });
    builder.addCase(createPost.fulfilled, (state, action) => {
      state.isLoadingPost = false;
      state.Post.unshift(action.payload);
    });
    builder.addCase(createPost.rejected, (state, action) => {
      state.isLoadingPost = false;
    });
    //updatePost
    builder.addCase(updatePost.pending, (state, action) => {
      state.isLoadingPost = true;
    });
    builder.addCase(updatePost.fulfilled, (state, action) => {
      state.isLoadingPost = false;
      const index = state.Post.findIndex(item => item.id === action.payload.id);
      state.Post[index] = action.payload;
    });
    builder.addCase(updatePost.rejected, (state, action) => {
      state.isLoadingPost = false;
    });
  },
});

export const getPostForum = createAsyncThunk('forum/getPost', async id => {
  const res = await ForumAPI.getPostById(id);
  return res.data.sort(sortFunc);
});

export const getComment = createAsyncThunk('forum/getComment', async data => {
  const res = await ForumAPI.getCommentById(data.poster_id, data.parent_id);
  const CommentData = res.data.map(item => {
    return {
      [`parent${item.parent_id}`]: item,
    };
  });
  console.log(CommentData);
  return CommentData;
});

export const createPost = createAsyncThunk('forum/createPost', async data => {
  const imagesUpload = await uploadImageToFirebase(data.image);
  const profile = await AuthApi.getProfile(data.profile_id);
  const postData = {
    ...data,
    profile: profile.data,
    CreatedAt: new Date(),
    image: imagesUpload,
  };
  const res = await ForumAPI.createPost(postData);
  console.log(postData);
  return postData;
});

export const updatePost = createAsyncThunk('forum/updatePost', async data => {
  const res = await ForumAPI.updatePost(data);
  return data;
});
