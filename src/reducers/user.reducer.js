import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import AuthApi from '../helpers/API/Auth.api';
import FacebookLogin from '../helpers/SocialLogin/FacebookLogin';
import GoogleLogin from '../helpers/SocialLogin/GoogleLogin';
import {storeData} from '../helpers/Store';

const initialState = {
  userId: null,
  name: null,
  email: null,
  phone: null,
  avatar: null,
  newUser: false,
  isLogin: false,
  isLoading: false,
};

export const UserReducer = createSlice({
  name: 'user',
  initialState,
  extraReducers: builder => {
    builder
      // Google Login
      .addCase(GGlogin.pending, state => {
        console.log('pending');
        state.isLoading = true;
      })
      .addCase(GGlogin.fulfilled, (state, action) => {
        console.log('fulfilled', action);
        state.isLoading = false;
        state.isLogin = true;
        state.name = action.payload.additionalUserInfo.profile.name;
        state.email = action.payload.additionalUserInfo.profile.email;
        state.phone = action.payload.user._user.phoneNumber;
        state.avatar = action.payload.additionalUserInfo.profile.picture;
        state.newUser = action.payload.additionalUserInfo.isNewUser;
      })
      .addCase(GGlogin.rejected, state => {
        console.log('rejected');
        state.isLoading = false;
        state.isLogin = false;
      })
      // Facebook Login
      .addCase(FBlogin.pending, state => {
        console.log('pending');
        state.isLoading = true;
      })
      .addCase(FBlogin.fulfilled, (state, action) => {
        console.log('fulfilled', action);
        state.isLoading = false;
        state.isLogin = true;
        state.name = action.payload.additionalUserInfo.profile.name;
        state.email = action.payload.additionalUserInfo.profile.email;
        state.phone = action.payload.user._user.phoneNumber;
        state.avatar =
          action.payload.additionalUserInfo.profile.picture.data.url;
        state.newUser = action.payload.additionalUserInfo.isNewUser;
      })
      .addCase(FBlogin.rejected, state => {
        console.log('rejected');
        state.isLoading = false;
        state.isLogin = false;
      })
      //System Login
      .addCase(SYlogin.pending, state => {
        console.log('pending');
        state.isLoading = true;
      })
      .addCase(SYlogin.fulfilled, (state, action) => {
        console.log('fulfilled', action);
        state.isLoading = false;
        state.isLogin = true;
        state.name = action.payload.data.name;
        state.email = action.payload.data.email;
        state.phone = action.payload.data.phone;
        state.avatar = action.payload.data.avatar;
        state.newUser = action.payload.data.newUser;
      })
      .addCase(SYlogin.rejected, state => {
        console.log('rejected');
        state.isLoading = false;
        state.isLogin = false;
      });
  },
});

export const GGlogin = createAsyncThunk('user/login/google', async () => {
  const res = await GoogleLogin();
  console.log(res);
  return res;
});

export const FBlogin = createAsyncThunk('user/login/facebook', async () => {
  const res = await FacebookLogin();
  console.log(res);
  return res;
});

export const SYlogin = createAsyncThunk('user/login/system', async data => {
  const res = await AuthApi.login(data);
  await storeData('token', JSON.stringify(res.token));
  const userData = await AuthApi.getUserById(1);
  return userData;
});
