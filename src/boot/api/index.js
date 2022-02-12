import Vue from 'vue';
import axios from 'axios';
import { Notify } from 'quasar';

const notify = (msg) => Notify.create({
  message: msg,
  color: 'negative',
});

export const goLogin = () => {
  window.location.replace('#/login');
};

export const NeedLoginCode = [401, 402, 403];
// 手机打包这里需要更换下 baseURL: process.env.SERVER_URL + u,
export const createBase = (u = '') => {
  const a = axios.create({
    baseURL: u,
  });
  a.defaults.transformRequest.push((data, headers) => {
    if (localStorage.Authorization) {
      headers.Authorization = localStorage.Authorization;
    }
    return data;
  });
  a.interceptors.response.use(
    (r) => {
      if (r.data) {
        if (r.data.code && r.data.code !== 200) {
          if (r.data.message) {
            notify(`${r.data.code} - ${r.data.message}`);
          }
          if (NeedLoginCode.some((v) => v === r.data.code)) {
            goLogin();
          }
          return Promise.reject(r);
        }
        return r.data;
      }
      return r;
    },
    ({ response }) => {
      let msg = '未知错误';
      if (response) {
        if (response.data) {
          if (!response.data.status) {
            msg = '服务器无响应，请联系管理员！';
          } else {
            msg = `${response.data.message}`;
          }
        } else {
          msg = '';
          switch (response.status) {
            case -1:
              msg += '连接失败';
              break;
            case 500:
              msg += '内部错误';
              break;
            case 404:
              msg += '页面不存在';
              break;
            case 401:
              msg += '登录超时，请重新登录';
              goLogin();
              break;
            case 403:
              msg += '权限不足';
              break;
            default:
              msg += '未知错误';
          }
        }
      }
      notify(msg);
      return Promise.reject(response);
    },
  );
  a.createBase = (url = '') => createBase(url);
  return a;
};

export const a = createBase(process.env.BASE_URL);
Vue.prototype.$axios = a;

export const downFile = (url, data) => a({
  url,
  method: 'GET',
  params: data,
  responseType: 'blob',
});

export const exportFile = (url, data) => a({
  url,
  method: 'POST',
  data,
  responseType: 'blob',
});

Vue.prototype.$downFile = downFile;
Vue.prototype.$exportFile = exportFile;

export const uploadFile = (url, parameter) => a({
  url,
  data: parameter,
  method: 'post',
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});
