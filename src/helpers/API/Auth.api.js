import axiosClient from './axiosClient';

const AuthApi = {
  login: data => {
    const url = '/user/login';
    return axiosClient.post(url, data);
  },
  getUserById: id => {
    const url = `/profile/${id}`;
    return axiosClient.get(url);
  },
};

export default AuthApi;
