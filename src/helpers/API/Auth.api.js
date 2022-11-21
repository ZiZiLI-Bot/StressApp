import axiosClient from './axiosClient';

const AuthApi = {
  login: async data => {
    const url = '/user/login';
    return await axiosClient.post(url, data);
  },
  getUserById: async id => {
    const url = `/profile/user/${id}`;
    return await axiosClient.get(url);
  },
  getProfile: async id => {
    const url = `/profile/${id}`;
    return await axiosClient.get(url);
  },
  getAllUsers: async () => {
    const url = '/profile/all';
    return await axiosClient.get(url);
  },
  updateInfo: async data => {
    const url = '/profile/create';
    return await axiosClient.post(url, data);
  },
  register: async data => {
    const url = '/user/create';
    return await axiosClient.post(url, data);
  },
  loginJWT: async data => {
    const url = `user/login/jwt?refToken=${data}`;
    const res = await axiosClient.post(url);
    return res;
  },
  updateProfile: async data => {
    const url = '/profile/update';
    return await axiosClient.put(url, data);
  },
};

export default AuthApi;
