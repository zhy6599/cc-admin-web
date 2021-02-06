import Vue from 'vue';
import axios from 'axios';
import { Notify } from 'quasar';

const notify = (msg) => Notify.create({
  message: msg,
  color: 'negative',
});

export const goLogin = () => {
  if (!window.location.pathname.startsWith('/login')) {
    delete localStorage.Authorization;
    setTimeout(() => {
      window.location.replace(`/login/${encodeURIComponent(
        window.location.pathname + window.location.search + window.location.hash,
      )}`);
    });
  }
};

export const NeedLoginCode = [401, 402, 403];

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
            msg = '服务器正在重启或者已经挂了！';
          } else {
            msg = `${response.data.status} - ${response.data.message}`;
          }
        } else {
          msg = `${response.status} - `;
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
            case 402:
            case 403:
              msg += '权限不足';
              goLogin();
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

Vue.prototype.$downFile = downFile;

export const uploadFile = (url, parameter) => a({
  url,
  data: parameter,
  method: 'post',
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});
