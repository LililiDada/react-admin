import axios from "axios";
// cookies
import { getToken, getUsername } from "./cookies";
import { message } from "antd";
// 第一步，创建实例
const service = axios.create({
  baseURL: process.env.REACT_APP_API,
  timeout: 5000,
});

// 第二步，请求拦截
service.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    config.headers["Token"] = getToken();
    config.headers["Username"] = getUsername();
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 第三步，响应拦截
service.interceptors.response.use(
  function (response) {
    // 对响应数据做些什么
    const data = response.data;
    if (data.resCode !== 0) {
      message.info(data.message);
      return Promise.reject(response);
    } else {
      return response;
    }
  },
  function (error) {
    // 对响应错误做些什么
    return Promise.reject(error);
  }
);

export default service;
