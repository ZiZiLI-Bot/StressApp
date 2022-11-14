import {configureStore} from '@reduxjs/toolkit';
import logger from 'redux-logger';
import {DiaryReducer} from '../../reducers/diary.reducers';
import {questionsReducer} from '../../reducers/questions.reducers';
import {ScreenDimensionsReduces} from '../../reducers/ScreenDimensions.reduces';
import {UserReducer} from '../../reducers/user.reducer';

export default configureStore({
  reducer: {
    user: UserReducer.reducer,
    screenDimensions: ScreenDimensionsReduces.reducer,
    diary: DiaryReducer.reducer,
    questions: questionsReducer.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(logger),
});
