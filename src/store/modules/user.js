let t;
try {
  t = JSON.parse(localStorage.userInfo);
} catch (err) {
  t = {};
}

export default {
  namespaced: true,
  state: {
    info: t,
    authorization: localStorage.Authorization || '',
  },
  getters: {},
  mutations: {
    updateInfo(s, v) {
      localStorage.userInfo = JSON.stringify(v);
      s.info = v;
    },
    updateAuthorization(s, v) {
      localStorage.Authorization = v;
      s.authorization = v;
    },
    clear(s) {
      delete localStorage.userInfo;
      s.info = {};
      delete localStorage.Authorization;
      s.authorization = '';
    },
  },
  actions: {},
};
