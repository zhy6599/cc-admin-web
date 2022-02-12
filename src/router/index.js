import Vue from 'vue';
import VueRouter from 'vue-router';
import { staticRouters } from 'boot/routes';

Vue.use(VueRouter);

const createRouter = () => {
  const vueRouter = new VueRouter({
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

  staticRouters.forEach((r) => {
    vueRouter.addRoute(r);
  });

  let title = '';
  vueRouter.beforeEach((to, from, next) => {
    if (to.meta.title && to.meta.title !== title) {
      title = to.meta.title;
      document.title = (title ? `${title} — ` : '') + process.env.PRODUCT_NAME;
    }
    next();
  });

  return vueRouter;
};

const router = createRouter();

export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher;
}

export default router;
