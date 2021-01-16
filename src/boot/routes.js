export default [
  {
    id: 10,
    path: '/home',
    component: 'home',
    meta: {
      title: '首页',
      icon: 'mdi-home-outline',
    },
  },
  {
    id: 100,
    path: '/sys',
    component: 'sys',
    redirect: '/sys/dict',
    meta: {
      title: '系统管理',
      icon: 'mdi-cog-outline',
    },
    children: [
      {
        id: 101,
        path: '/sys/user',
        component: 'sys/user',
        meta: {
          title: '用户管理',
          icon: 'mdi-account-box-outline',
        },
      },
      {
        id: 102,
        path: '/sys/role',
        component: 'sys/role',
        meta: {
          title: '角色管理',
          icon: 'mdi-card-account-details-star-outline',
        },
      },
      {
        id: 103,
        path: '/sys/position',
        component: 'sys/position',
        meta: {
          title: '职位管理',
          icon: 'mdi-card-account-details-outline',
        },
      },
      {
        id: 104,
        path: '/sys/catalog',
        component: 'sys/catalog',
        meta: {
          title: '分类目录',
          icon: 'mdi-file-tree-outline',
        },
      },
      {
        id: 105,
        path: '/sys/menu',
        component: 'sys/menu',
        meta: {
          title: '菜单管理',
          icon: 'mdi-menu',
        },
      },
      {
        id: 106,
        path: '/sys/datasource',
        component: 'sys/datasource',
        meta: {
          title: '多数据源',
        },
      },
      {
        id: 198,
        path: '/sys/dict',
        component: 'sys/dict',
        meta: {
          title: '字典管理',
          icon: 'mdi-book-open-outline',
        },
      },
      {
        id: 199,
        path: '/sys/generate',
        component: 'sys/generate',
        meta: {
          title: '代码生成',
          icon: 'mdi-cloud-print-outline',
        },
      }],
  },
  {
    id: 300,
    path: '/baby',
    component: 'baby',
    redirect: '/baby/word',
    meta: {
      title: '宝宝学习',
      icon: 'mdi-baby-face-outline',
    },
    children: [
      {
        id: 301,
        path: '/baby/word',
        component: 'baby/word',
        meta: {
          title: '字词管理',
        },
      },
      {
        id: 302,
        path: '/baby/studylog',
        component: 'baby/studylog',
        meta: {
          title: '学习记录',
        },
      }],
  },
  {
    id: 600,
    path: '/bi',
    component: 'bi',
    redirect: '/bi/view',
    meta: {
      title: '数据可视化',
      icon: 'mdi-chart-areaspline',
    },
    children: [
      {
        id: 603,
        path: '/bi/map',
        component: 'bi/map',
        meta: {
          title: '地图管理',
        },
      },
      {
        id: 601,
        path: '/bi/view',
        component: 'bi/view',
        meta: {
          title: '视图管理',
        },
      },
      {
        id: 602,
        path: '/bi/screen',
        component: 'bi/screen',
        meta: {
          title: '电子报告',
        },
      }],
  },
  {
    id: 700,
    path: '/monitor',
    component: 'monitor',
    redirect: '/monitor/datasource',
    meta: {
      title: '系统监控',
      icon: 'mdi-monitor-eye',
    },
    children: [
      {
        id: 701,
        path: '/sys/online',
        component: 'sys/online',
        meta: {
          title: '在线用户',
        },
      },
      {
        id: 702,
        path: '/sys/log',
        component: 'sys/log',
        meta: {
          title: '系统日志',
          icon: 'mdi-note-text-outline',
        },
      },
      {
        id: 799,
        path: '/monitor/task',
        component: 'monitor/task',
        meta: {
          title: '定时任务',
        },
      }],
  },
  {
    id: 800,
    path: '/demo',
    component: 'demo',
    redirect: '/demo',
    meta: {
      title: 'DEMO',
      icon: 'mdi-desktop-mac',
    },
    children: [
      {
        id: 801,
        path: '/demo/demo1',
        component: 'demo/demo1',
        meta: {
          title: 'DEMO1',
          icon: 'assignment_ind',
        },
      },
      {
        id: 802,
        path: '/demo/demo2',
        component: 'demo/demo2',
        meta: {
          title: '列过滤2',
          icon: 'assignment_ind',
        },
      },
      {
        id: 803,
        path: '/demo/demo3',
        component: 'demo/demo3',
        meta: {
          title: '左分类3',
          icon: 'assignment_ind',
        },
      },
      {
        id: 804,
        path: '/demo/demo4',
        component: 'demo/demo4',
        meta: {
          title: 'GridTree4',
          icon: 'assignment_ind',
        },
      },
      {
        id: 805,
        path: '/demo/demo5',
        component: 'demo/demo5',
        meta: {
          title: '主从表5',
          icon: 'assignment_ind',
        },
      },
      {
        id: 806,
        path: '/demo/demo6',
        component: 'demo/demo6',
        meta: {
          title: 'Echarts6',
          icon: 'assignment_ind',
        },
      },
      {
        id: 807,
        path: '/demo/demo7',
        component: 'demo/demo7',
        meta: {
          title: 'TabPanel7',
          icon: 'assignment_ind',
        },
      },
      {
        id: 808,
        path: '/demo/demo8',
        component: 'demo/demo8',
        meta: {
          title: 'Layout8',
          icon: 'assignment_ind',
        },
      },
      {
        id: 809,
        path: '/demo/demo9',
        component: 'demo/demo9',
        meta: {
          title: '字卡9',
          icon: 'assignment_ind',
        },
      },
      {
        id: 810,
        path: '/demo/demo10',
        component: 'demo/demo10',
        meta: {
          title: '布局10',
          icon: 'assignment_ind',
        },
      },
      {
        id: 811,
        path: '/demo/demo11',
        component: 'demo/demo11',
        meta: {
          title: '表格展开11',
          icon: 'assignment_ind',
        },
      },
      {
        id: 812,
        path: '/demo/demo12',
        component: 'demo/demo12',
        meta: {
          title: 'RouterTab12',
          icon: 'assignment_ind',
        },
      },
      {
        id: 813,
        path: '/demo/demo13',
        component: 'demo/demo13',
        meta: {
          title: '导航文字13',
          icon: 'assignment_ind',
        },
      },
      {
        id: 814,
        path: '/demo/demo14',
        component: 'demo/demo14',
        meta: {
          title: '环形图14',
          icon: 'assignment_ind',
        },
      },
      {
        id: 815,
        path: '/demo/demo15',
        component: 'demo/demo15',
        meta: {
          title: 'Echarts自定义15',
          icon: 'assignment_ind',
        },
      },
    ],
  },
];
