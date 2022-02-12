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
    getRule() {
      this.$axios.get('/sys/permission/getUserPermissionByToken?token='+this.$store.state.User.authorization).then(({ result: { menu,auth,isDefault } }) => {
        if(menu.length===0) {
          alert('您没有任何可供访问的菜单，请联系管理员');
        }
        this.$store.commit('Rule/updateRoutes',menu);
        this.$store.commit('Rule/updateAuth',auth);
        menu=imTr(menu);
        this.$router.addRoute({
          path: '/',
          component: () => import('layouts'),
          redirect: '/home',
          children: menu,
        });
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
  watch: {
    $route(to) {
      //登录页面不应该添加到路由导航里面
      if(!(to.path.indexOf('/login')===0)&&!this.$store.state.Rule.routeTabs.some((r) => r.path===to.path)) {
        this.$store.commit('Rule/addRouteTabs',{ name: to.meta.title,path: to.path });
      }
    },
  },
};
</script>
