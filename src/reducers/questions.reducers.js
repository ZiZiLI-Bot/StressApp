import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import QuestionsApi from '../helpers/API/QuestionsAPI';

const initialState = {
  listQuestions: [],
  isLoading: false,
};

export const questionsReducer = createSlice({
  name: 'questions',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(getListQuestions.pending, state => {
        state.isLoading = true;
      })
      .addCase(getListQuestions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.listQuestions = action.payload;
      })
      .addCase(getListQuestions.rejected, state => {
        state.isLoading = false;
      });
  },
});

export const getListQuestions = createAsyncThunk(
  'questions/getAllQuestions',
  async () => {
    const res = await QuestionsApi.getListQuestions();
    if (res) {
      return res.data;
    }
  },
);
