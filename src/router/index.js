import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

export default () => {
  const Router = new VueRouter({
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE,
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes: [{
      path: '/login/:from?',
      component: () => import('layouts/LoginLayout.vue'),
      children: [
        {
          path: '',
          component: () => import('pages/login.vue'),
          meta: {
            title: '登录',
          },
        },
      ],
      meta: {
        title: '登录',
      },
    }],
  });

  let title = '';
  Router.beforeEach((to, from, next) => {
    if (to.meta.title && to.meta.title !== title) {
      title = to.meta.title;
      document.title = (title ? `${title} — ` : '') + process.env.PRODUCT_NAME;
    }
    next();
  });

  return Router;
};
