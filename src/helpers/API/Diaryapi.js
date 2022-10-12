import axiosClient from './axiosClient';

const DiaryApi = {
  getById: async id => {
    const url = `/notion/profile/${id}`;
    return axiosClient.get(url);
  },
  createDiary: async data => {
    const url = '/notion/create';
    return axiosClient.post(url, data);
  },
  deleteDiary: async id => {
    const url = `/notion/delete/${id}`;
    return axiosClient.delete(url);
  },
  updateDiary: async data => {
    const url = '/notion/update';
    return axiosClient.put(url, data);
  },
};

export default DiaryApi;
