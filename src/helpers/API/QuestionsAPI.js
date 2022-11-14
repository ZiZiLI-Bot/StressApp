import axiosClient from './axiosClient';

const QuestionsApi = {
  getListQuestions: () => {
    const url = '/question-group/all';
    return axiosClient.get(url);
  },
  getQuestionsById: id => {
    const url = `/question-group/${id}`;
    return axiosClient.get(url);
  },
};

export default QuestionsApi;
