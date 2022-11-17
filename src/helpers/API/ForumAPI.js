import axiosClient from './axiosClient';

const ForumAPI = {
  getForums: async () => {
    const url = '/society/all';
    return await axiosClient.get(url);
  },
  getPostById: async id => {
    const url = `/poster/filter/${id}`;
    return await axiosClient.get(url);
  },
};

export default ForumAPI;
