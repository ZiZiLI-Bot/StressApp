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
  getCommentById: async (poster_id, parent_id) => {
    const url = `/comment/filter?poster_id=${poster_id}&parent_id=${parent_id}`;
    return await axiosClient.get(url);
  },
};
export default ForumAPI;
