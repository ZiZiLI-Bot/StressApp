import axiosClient from './axiosClient';

const DiaryApi = {
  getById: id => {
    const url = `/notion/profile/${id}`;
    return axiosClient.get(url);
  },
  createDiary: data => {
    const url = '/notion/create';
    return axiosClient.post(url, data);
  },
  deleteDiary: id => {
    const url = `/notion/delete/${id}`;
    return axiosClient.delete(url);
  },
  updateDiary: data => {
    const url = '/notion/update';
    return axiosClient.put(url, data);
  },
};

export default DiaryApi;
