import axiosClient from './axiosClient';

const AuthApi = {
  login: data => {
    const url = '/user/login';
    return axiosClient.post(url, data);
  },
  getUserById: id => {
    const url = `/profile/user/${id}`;
    return axiosClient.get(url);
  },
  getAllUsers: () => {
    const url = '/profile/all';
    return axiosClient.get(url);
  },
  updateInfo: data => {
    const url = '/profile/create';
    return axiosClient.post(url, data);
  },
  register: data => {
    const url = '/user/create';
    return axiosClient.post(url, data);
  },
};

export default AuthApi;
