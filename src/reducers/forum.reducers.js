import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import ForumAPI from '../helpers/API/ForumAPI';

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
      state.isLoading = true;
    });
    builder.addCase(getPostForum.fulfilled, (state, action) => {
      state.isLoading = false;
      state.Post = action.payload;
    });
    builder.addCase(getPostForum.rejected, (state, action) => {
      state.isLoading = false;
    });
    //getComment
    builder.addCase(getComment.pending, (state, action) => {
      state.idLoadingComment = true;
    });
    builder.addCase(getComment.fulfilled, (state, action) => {
      state.idLoadingComment = false;
      state.Comment = action.payload;
    });
    builder.addCase(getComment.rejected, (state, action) => {
      state.idLoadingComment = false;
    });
  },
});

export const getPostForum = createAsyncThunk('forum/getPost', async id => {
  const res = await ForumAPI.getPostById(id);
  return res.data;
});

export const getComment = createAsyncThunk(
  'forum/getComment',
  async (poster_id, parent_id) => {
    const res = await ForumAPI.getCommentById(poster_id, parent_id);
    return res.data;
  },
);
