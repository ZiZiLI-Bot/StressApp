import {configureStore} from '@reduxjs/toolkit';
import logger from 'redux-logger';
import {UserReducer} from '../../reducers/user.reducer';

export default configureStore({
  reducer: {
    user: UserReducer.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(logger),
});
