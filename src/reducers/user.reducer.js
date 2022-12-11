import messaging from '@react-native-firebase/messaging';
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

const uploadImageByCropImage = async image => {
  const reference = storage().ref('images/' + image.id);
  await reference.putFile(image.path);
  const url = await storage()
    .ref('images/' + image.id)
    .getDownloadURL();
  return url;
};

const initialState = {
  profileId: null,
  tokenDevice: null,
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
        state.tokenDevice = action.payload?.tokenDevice;
        state.profileId = action.payload?.id;
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
        state.tokenDevice = action.payload?.tokenDevice;
        state.profileId = action.payload?.id;
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
      })
      //System Login with JWT
      .addCase(SYloginJWT.pending, state => {
        state.isLoading = true;
      })
      .addCase(SYloginJWT.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLogin = true;
        state.userId = action.payload?.userId;
        state.profileId = action.payload?.id;
        state.tokenDevice = action.payload?.tokenDevice;
        state.name = action.payload?.name;
        state.email = action.payload?.email;
        state.phone = action.payload?.phone;
        state.avatar = action.payload?.avatar;
        state.newUser = action.payload?.newUser;
        state.real_name = action.payload?.real_name;
        state.allUsers = action.payload?.allUsers;
      })
      .addCase(SYloginJWT.rejected, state => {
        state.isLoading = false;
        state.isLogin = false;
      })
      //System Logout
      .addCase(SYlogout.pending, state => {
        state.isLoading = true;
      })
      .addCase(SYlogout.fulfilled, state => {
        state.isLoading = false;
        state.isLogin = false;
        state.userId = null;
        state.profileId = null;
        state.tokenDevice = null;
        state.name = null;
        state.email = null;
        state.phone = null;
        state.avatar = null;
        state.newUser = false;
        state.real_name = null;
        state.allUsers = [];
      })
      .addCase(SYlogout.rejected, state => {
        state.isLoading = false;
        state.isLogin = false;
      })
      .addCase(updateProfile.pending, state => {
        state.isLoading = true;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.name = action.payload?.name;
        state.phone = action.payload?.phone;
        state.real_name = action.payload?.real_name;
      })
      .addCase(updateAvatar.fulfilled, (state, action) => {
        state.isLoading = false;
        state.avatar = action.payload?.avatar;
      });
  },
});

export const SYlogin = createAsyncThunk('user/login/system', async data => {
  const res = await AuthApi.login(data);
  await messaging().registerDeviceForRemoteMessages();
  const tokenDevice = await messaging().getToken();
  if (res) {
    await storeData('token', res.token);
    const userData = await AuthApi.getUserById(res.userId);
    const allUsers = await AuthApi.getAllUsers();
    if (!userData) {
      const MissData = {
        isLogin: false,
      };
      const overWriteData = {...data, userId: res.userId, tokenDevice};
      navigationRef.navigate('UpdateInfo', {data: overWriteData});
      return MissData;
    } else {
      if (tokenDevice !== userData.state) {
        const updateDeviceToken = {
          id: userData.data.id,
          state: tokenDevice,
        };
        const res = AuthApi.updateProfile(updateDeviceToken);
        console.log('res', res, 'update', updateDeviceToken);
      }
      const fullData = {
        isLogin: true,
        allUsers: allUsers.data,
        tokenDevice: tokenDevice,
        ...userData.data,
      };
      return fullData;
    }
  }
});

export const SYupdate = createAsyncThunk('user/update/system', async data => {
  const AvatarURL = await uploadImageToFirebase(data.avatar);
  const allUsers = await AuthApi.getAllUsers();
  const userData = {
    ...data,
    tokenDevice: data.state,
    avatar: AvatarURL,
    allUsers: allUsers.data,
  };
  console.log('userData', userData);
  const res = await AuthApi.updateInfo(userData);
  if (res) {
    return userData;
  }
});

export const SYloginJWT = createAsyncThunk('user/login/jwt', async data => {
  const res = await AuthApi.loginJWT(data);
  await messaging().registerDeviceForRemoteMessages();
  const tokenDevice = await messaging().getToken();
  if (res) {
    await storeData('token', res.token);
    const userData = await AuthApi.getUserById(res.userId);
    const allUsers = await AuthApi.getAllUsers();
    if (!userData) {
      const MissData = {
        isLogin: false,
      };
      const overWriteData = {...data, userId: res.userId, tokenDevice};
      navigationRef.navigate('UpdateInfo', {data: overWriteData});
      return MissData;
    } else {
      if (tokenDevice !== userData.state) {
        const updateDeviceToken = {
          id: userData.data.id,
          state: tokenDevice,
        };
        const res = AuthApi.updateProfile(updateDeviceToken);
        console.log('res', res, 'update', updateDeviceToken);
      }
      const fullData = {
        isLogin: true,
        allUsers: allUsers.data,
        tokenDevice: tokenDevice,
        ...userData.data,
      };
      return fullData;
    }
  }
  return null;
});

export const SYlogout = createAsyncThunk('user/logout', async () => {
  await storeData('token', '');
  return initialState;
});

export const updateProfile = createAsyncThunk(
  '/user/update/profile',
  async data => {
    const res = await AuthApi.updateProfile(data);
    return res.data;
  },
);

export const updateAvatar = createAsyncThunk(
  '/user/update/avatar',
  async data => {
    console.log('data', data);
    const urlImage = await uploadImageByCropImage(data.avatar);
    const dataImage = {
      id: data.profileId,
      avatar: urlImage,
    };
    const res = await AuthApi.updateProfile(dataImage);
    return res.data;
  },
);
