export default {
  namespaced: true,
  state: {
    routes: [],
    auth: [],
    routeTabs: [{ name: '首页', path: '/home' }],
  },
  getters: {
    confirmAuth(s) {
      return (v) => s.auth.some((au) => au.action === v);
    },
  },
  mutations: {
    updateRoutes(s, v) {
      s.routes = v;
    },
    updateAuth(s, v) {
      s.auth = v;
    },
    addRouteTabs(s, v) {
      if (!s.routeTabs.find((r) => r.path === v.path)) {
        s.routeTabs.push(v);
      }
    },
    removeRouteTabs(s, p) {
      s.routeTabs.splice(s.routeTabs.findIndex((r) => r.path === p), 1);
    },
    clear(s) {
      s.routes = [];
      s.auth = [];
      s.routeTabs = [{ name: '首页', path: '/home' }];
    },
  },
  actions: {},
};
