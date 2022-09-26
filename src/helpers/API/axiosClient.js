import axios from 'axios';
import qs from 'qs';
import {getData} from '../Store';

const axiosClient = axios.create({
  baseURL: 'https://rescuse-emotional.up.railway.app/api/v1/',
  headers: {
    'content-type': 'application/json',
  },
  paramsSerializer: params => qs.stringify(params, {encodeValuesOnly: false}),
});

axiosClient.interceptors.request.use(async config => {
  let token;
  await getData('token').then(res => (token = res));
  if (token) {
    config.headers = {
      Authorization: JSON.parse(token),
    };
  }
  return config;
});

axiosClient.interceptors.response.use(
  response => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  error => {
    console.error(error.response);
    return error.response;
  },
);
export default axiosClient;
