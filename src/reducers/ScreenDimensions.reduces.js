import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  width: 0,
  height: 0,
};

export const ScreenDimensionsReduces = createSlice({
  name: 'screenDimensions',
  initialState,
  reducers: {
    setScreenDimensions: (state, action) => {
      state.width = action.payload.width;
      state.height = action.payload.height + 20;
    },
  },
});

export const {setScreenDimensions} = ScreenDimensionsReduces.actions;
