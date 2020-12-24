import Vue from 'vue';
import Vuex from 'vuex';

import User from './modules/user';
import Rule from './modules/Rule';

Vue.use(Vuex);

export default () => {
  const Store = new Vuex.Store({
    modules: {
      User,
      Rule,
    },
    strict: process.env.DEV,
  });

  return Store;
};
