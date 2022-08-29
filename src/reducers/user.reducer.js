import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import FacebookLogin from '../helpers/SocialLogin/FacebookLogin';
import GoogleLogin from '../helpers/SocialLogin/GoogleLogin';

const initialState = {
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

// export const {FBLOGIN_SUCCESS, GGLOGIN} = UserReducer.actions;

export default UserReducer.reducer;
