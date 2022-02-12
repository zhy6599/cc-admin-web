/**
 * 一些特殊的路由设置，例如打开就需要全屏
 */
export const staticRouters = [
  {
    path: '/screen/design',
    component: () => import('pages/bi/screen/design'),
    meta: {
      title: '电子报告-设计器',
    },
  }, {
    path: '/viewfull',
    component: () => import('pages/bi/screen/design/viewfull'),
    meta: {
      title: '电子报告-查看',
    },
  }, {
    path: '/baby/word/study',
    component: () => import('pages/baby/word/study'),
  }, {
    path: '/baby/word/card',
    component: () => import('pages/baby/word/card'),
  }, {
    path: '/baby/word/vertical',
    component: () => import('pages/baby/word/vertical'),
  }, {
    path: '/view',
    component: () => import('pages/bi/screen/design/view'),
    meta: {
      title: '电子报告-查看',
    },
  },
];
