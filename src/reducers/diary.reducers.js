import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import DiaryApi from '../helpers/API/Diaryapi';

const initialState = {
  diary: [],
  isLoading: false,
};

const sort = array => {
  return array.sort((a, b) => b.CreatedAt - a.CreatedAt);
};

export const DiaryReducer = createSlice({
  name: 'diary',
  initialState,
  extraReducers: builder => {
    //get diary by id
    builder.addCase(getDiaryById.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getDiaryById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.diary = action.payload;
    });
    builder.addCase(getDiaryById.rejected, (state, action) => {
      state.isLoading = false;
    });
    //create diary
    builder.addCase(createDiary.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(createDiary.fulfilled, (state, action) => {
      state.isLoading = false;
      state.diary = [action.payload, ...state.diary];
    });
    builder.addCase(createDiary.rejected, (state, action) => {
      state.isLoading = false;
    });
    //update diary
    builder.addCase(updateDiary.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(updateDiary.fulfilled, (state, action) => {
      state.isLoading = false;
      state.diary = state.diary.map(item => {
        if (item.id === action.payload.id) {
          return action.payload;
        }
        return item;
      });
    });
    builder.addCase(updateDiary.rejected, (state, action) => {
      state.isLoading = false;
    });
  },
});

export const getDiaryById = createAsyncThunk('diary/getById', async data => {
  const res = await DiaryApi.getById(data);
  const dataSort = sort(res.data);
  return dataSort;
});

export const updateDiary = createAsyncThunk('diary/update', async data => {
  const res = await DiaryApi.updateDiary(data);
  return res.data;
});

export const createDiary = createAsyncThunk('diary/create', async data => {
  const res = await DiaryApi.createDiary(data);
  return res.data;
});
