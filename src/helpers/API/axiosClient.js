import axios from 'axios';
import qs from 'qs';
import {getData} from '../Store';

const axiosClient = axios.create({
  baseURL: 'http://tuanhung.site:19000/api/v1/',
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
    if (response.data.success) {
      return response.data;
    } else {
      console.error('Error:', response.data.message);
      return null;
    }
  },
  error => {
    console.error(error.response);
    return null;
  },
);
export default axiosClient;
