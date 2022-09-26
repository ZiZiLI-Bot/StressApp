import {configureStore} from '@reduxjs/toolkit';
import logger from 'redux-logger';
import {ScreenDimensionsReduces} from '../../reducers/ScreenDimensions.reduces';
import {UserReducer} from '../../reducers/user.reducer';

export default configureStore({
  reducer: {
    user: UserReducer.reducer,
    screenDimensions: ScreenDimensionsReduces.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(logger),
});
