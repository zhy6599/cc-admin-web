<template>
  <div id="q-app">
    <q-ajax-bar />
    <router-view />
  </div>
</template>
<script>
import { goLogin } from 'boot/api';
import routes from 'boot/routes';

const imTr=(r) => r.map((v) => ({
  ...v,
  component: () => import(`pages/${v.component}`),
  children: v.children? imTr(v.children):null,
}));

export default {
  name: 'App',
  methods: {
    initRouteTabs(menu,path) {
      menu.forEach(element => {
        if(element.path===path) {
          this.$store.commit('Rule/addRouteTabs',{ name: element.meta.title,path });
        }
        if(element.children&&element.children.length>0) {
          this.initRouteTabs(element.children,path);
        }

      });
    },
    getRule() {
      this.$axios.get('/sys/permission/getUserPermissionByToken?token='+this.$store.state.User.authorization).then(({ result: { menu,auth,isDefault } }) => {
        menu=routes;
        isDefault=`${window.location.pathname+window.location.search}`;
        if(isDefault!=='/home') {
          if(`${window.location.pathname+window.location.search}`==='/') {
            isDefault=menu[0].path
          } else {
            this.$store.commit('Rule/addRouteTabs',{ name: '首页',path: '/home/dashboard' });
          }
        }
        this.$store.commit('Rule/updateRoutes',menu);
        this.$store.commit('Rule/updateAuth',auth);
        this.initRouteTabs(menu,isDefault);
        menu=imTr(menu);
        this.$router.addRoutes([{
          path: '/',
          component: () => import('layouts'),
          redirect: `${isDefault||menu[0].path}`,
          children: menu,
        },{
          path: "/screen/design",
          component: () => import('pages/bi/screen/design')
        },{
          path: "/view",
          component: () => import('pages/bi/screen/design/view')
        },{
          path: "/viewfull",
          component: () => import('pages/bi/screen/design/viewfull')
        },{
          path: "/baby/word/study",
          component: () => import('pages/baby/word/study')
        },{
          path: "/baby/word/card",
          component: () => import('pages/baby/word/card')
        },{
          path: "/baby/word/vertical",
          component: () => import('pages/baby/word/vertical')
        },{
          path: '*',
          redirect: `${menu[0].path}`,
        }]);
      }).catch((e) => {
        goLogin();
      });
    },
  },
  mounted() {
    if(this.$store.state.User.authorization) {
      this.getRule();
    } else {
      goLogin();
    }
  },
};
</script>
