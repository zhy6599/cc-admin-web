export default {
  namespaced: true,
  state: {
    routes: [],
    auth: [],
    routeTabs: [],
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
      s.routeTabs.push(v);
    },
    removeRouteTabs(s, p) {
      s.routeTabs.splice(s.routeTabs.findIndex((r) => r.path === p), 1);
    },
  },
  actions: {},
};
