import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import AuthApi from '../helpers/API/Auth.api';
import ForumAPI from '../helpers/API/ForumAPI';

const initialState = {
  ListForum: [],
  Post: [],
  isLoading: false,
};

export const ForumReducer = createSlice({
  name: 'forum',
  initialState,
  extraReducers: builder => {
    builder.addCase(getForum.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getForum.fulfilled, (state, action) => {
      state.isLoading = false;
      state.ListForum = action.payload;
    });
    builder.addCase(getForum.rejected, (state, action) => {
      state.isLoading = false;
    });
    //getPostForum
    builder.addCase(getPostForum.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getPostForum.fulfilled, (state, action) => {
      state.isLoading = false;
      state.Post = action.payload;
    });
    builder.addCase(getPostForum.rejected, (state, action) => {
      state.isLoading = false;
    });
  },
});

export const getForum = createAsyncThunk('forum/get', async () => {
  const res = await ForumAPI.getForums();
  return res.data;
});

export const getPostForum = createAsyncThunk('forum/getPost', async id => {
  const res = await ForumAPI.getPostById(id);
  console.log(res.data);
  // const data = Promise.all(
  //   res.data.map(async item => {
  //     const dataUserPost = await AuthApi.getProfile(item.profile_id);
  //     console.log(dataUserPost);
  //     return {
  //       ...item,
  //       dataUserPost: dataUserPost.data,
  //     };
  //   }),
  // );
  return res;
});
