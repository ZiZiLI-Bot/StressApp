import storage from '@react-native-firebase/storage';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import AuthApi from '../helpers/API/Auth.api';
import {storeData} from '../helpers/Store';
import {navigationRef} from '../navigation';

const uploadImageToFirebase = async image => {
  if (image.uri) {
    const reference = storage().ref('images/' + image.fileName);
    await reference.putFile(image.uri);
    const url = await storage()
      .ref('images/' + image.fileName)
      .getDownloadURL();
    return url;
  } else {
    return image;
  }
};

const initialState = {
  userId: null,
  name: null,
  real_name: null,
  email: null,
  phone: null,
  avatar: null,
  newUser: false,
  isLogin: false,
  isLoading: false,
  error: null,
  allUsers: [],
};

export const UserReducer = createSlice({
  name: 'user',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(SYlogin.pending, state => {
        state.isLoading = true;
      })
      .addCase(SYlogin.fulfilled, (state, action) => {
        console.log('fulfilled', action);
        state.isLoading = false;
        state.isLogin = action.payload.isLogin;
        state.userId = action.payload?.userId;
        state.name = action.payload?.name;
        state.email = action.payload?.email;
        state.phone = action.payload?.phone;
        state.avatar = action.payload?.avatar;
        state.newUser = action.payload?.newUser;
        state.real_name = action.payload?.real_name;
        state.allUsers = action.payload?.allUsers;
      })
      .addCase(SYlogin.rejected, state => {
        console.log('rejected');
        state.isLoading = false;
        state.isLogin = false;
      })
      //System Update Info
      .addCase(SYupdate.pending, state => {
        state.isLoading = true;
      })
      .addCase(SYupdate.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLogin = true;
        state.userId = action.payload?.userId;
        state.name = action.payload?.name;
        state.email = action.payload?.email;
        state.phone = action.payload?.phone;
        state.avatar = action.payload?.avatar;
        state.newUser = action.payload?.newUser;
        state.real_name = action.payload.data?.real_name;
        state.allUsers = action.payload?.allUsers;
      })
      .addCase(SYupdate.rejected, state => {
        state.isLoading = false;
        state.isLogin = false;
      });
  },
});

export const SYlogin = createAsyncThunk('user/login/system', async data => {
  const res = await AuthApi.login(data);
  await storeData('token', JSON.stringify(res.token));
  const userData = await AuthApi.getUserById(res.userId);
  const allUsers = await AuthApi.getAllUsers();
  if (!userData.data) {
    const MissData = {
      isLogin: false,
      email: data.email,
      userId: res.userId,
    };
    navigationRef.navigate('UpdateInfo', {data});
    return MissData;
  } else {
    const fullData = {
      isLogin: true,
      allUsers: allUsers.data,
      ...userData.data,
    };
    return fullData;
  }
});

export const SYupdate = createAsyncThunk('user/update/system', async data => {
  const AvatarURL = await uploadImageToFirebase(data.avatar);
  const allUsers = await AuthApi.getAllUsers();
  const userData = {
    ...data,
    avatar: AvatarURL,
    allUsers: allUsers.data,
  };
  const res = await AuthApi.updateInfo(userData);
  console.log(res);
  return userData;
});
