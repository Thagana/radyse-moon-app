import axios from 'axios';
import configs from '../config/config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import getPushToken from '../utils/getToken';

let baseURL = '';

const instance = axios.create({
  validateStatus: status => {
    let correct = false;

    if (status >= 200 && status < 300) {
      correct = true;
    } else if (
      status === 401 ||
      status === 400 ||
      status === 403 ||
      status === 503 ||
      status === 422
    ) {
      correct = true;
    }

    return correct;
  },
});

instance.interceptors.request.use(
  async config => {
    const user = (await AsyncStorage.getItem('token')) || '';
    baseURL = `${configs.APPLICATION_URL}`;
    const token = user;

    if (config.url && config.url.charAt(0) === '/') {
      config.url = `${baseURL}${config.url}`;
    }

    if (config.headers) {
      config.headers.authorization = `Bearer ${token}`;
      config.headers.fcm_token = await getPushToken();
      config.headers.token_title = 'MOBILE';
    }

    return config;
  },
  error => Promise.reject(error),
);

export default instance;
