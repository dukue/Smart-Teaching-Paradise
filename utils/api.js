// api.js
import axios from 'react-native-axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// 创建axios实例
const instance = axios.create({
  baseURL: 'http://124.223.107.207:3333', // 你的API域名
  timeout: 1000, // 请求超时时间
});

// 添加请求拦截器
instance.interceptors.request.use(config => {
 // 从localStorage获取Token
  const token = AsyncStorage.getItem('authToken');
  if (token) {
    // 将Token添加到请求头
    config.headers.Authorization = `Bearer ${token}`;
  }
    return config;
}, error => {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(response => {
  // 对响应数据做点什么
  return response;
}, error => {
  // 对响应错误做点什么
  return Promise.reject(error);
});

export default instance;