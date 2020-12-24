<template>
  <q-layout view="lhh lpR lff">
    <q-header class="bg-primary text-white">
      <q-toolbar>
        <q-btn flat icon="menu" @click="drawer=!drawer" />
        <q-toolbar-title class="text-caption">欢迎进入 cc-admin 企业级快速开发平台</q-toolbar-title>
        <q-btn flat round size="sm" icon="mdi-card-search-outline" @click="drawer=!drawer" />
        <q-btn flat round size="sm" icon="mdi-help-circle-outline" @click="drawer=!drawer" />
        <q-btn flat round size="sm" icon="mdi-bell-outline" @click="drawer=!drawer" />
        <q-btn icon="mdi-badge-account-horizontal" flat label="欢迎您，管理员">
          <q-menu transition-show="rotate" transition-hide="rotate">
            <q-list style="min-width: 100px">
              <q-item clickable>
                <q-item-section>个人中心</q-item-section>
              </q-item>
              <q-item clickable>
                <q-item-section>账户设置</q-item-section>
              </q-item>
              <q-separator />
              <q-item clickable>
                <q-item-section>密码修改</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
        <q-btn flat icon="mdi-power-standby" label="退出系统" @click="out" />
      </q-toolbar>
      <mainTabs :tabs="$store.state.Rule.routeTabs" @selectPanel="setDesTab" />
    </q-header>
    <q-drawer elevated v-model="drawer" behavior="desktop" :width="190" content-class="column">
      <q-btn flat class="ly-icon-btn bg-primary text-white">
        <q-icon name="mdi-bike-fast" class="q-mr-md"/>cc-admin
        <q-tooltip anchor="center right" self="center left">欢迎使用</q-tooltip>
      </q-btn>
      <q-scroll-area class="col main-menu">
        <q-list dense v-for="u in $store.state.Rule.routes" :key="u.id">
          <q-expansion-item
            expand-separator
            v-if="u.children&&u.children.filter(v=>!v.hidden)"
            :icon="u.meta.icon"
            :label="u.meta.title"
          >
            <q-expansion-item
              :header-inset-level="1"
              :label="s.meta.title"
              expand-icon-class="hide-icon"
              v-for="s in u.children&&u.children.filter(v=>!v.hidden)"
              :key="s.id"
              :to="s.path"
              active-class="bg-blue-2 text-primary"
            />
          </q-expansion-item>
          <q-expansion-item
            v-else
            :icon="u.meta.icon"
            :label="u.meta.title"
            expand-icon-class="hide-icon"
            :to="u.path"
            active-class="bg-blue-2 text-primary"
          />
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <keep-alive>
        <router-view />
      </keep-alive>
    </q-page-container>
  </q-layout>
</template>

<script>
import { goLogin } from 'boot/api';
import mainTabs from 'components/tabpanel/index.vue';

export default {
  name: 'IndexLayout',
  components: {
    mainTabs,
  },
  data() {
    return {
      selectItem: '',
      link: 'inbox',
      drawer: true,
      list: [],
    };
  },
  methods: {
    setDesTab(val) {
      this.selectItem = val;
    },
    out() {
      goLogin();
    },
    query() {
      return this.$a.getProjectUser().then((r) => {
        this.list = r.result;
      });
    },
    showDialog() {
      this.$refs.dialog.show();
      this.query();
    },
    select(t) {
      if (!t.isDefault) {
        this.$a.setProject({ projectId: t.projectId }).then((r) => {
          if (r.code === 200) {
            window.location.reload();
          }
        });
      }
    },
    go(u) {
      if (!u.children || !u.children.filter((v) => !v.hidden).length) {
        this.$router.push(`${u.path}`);
      }
    },
  },
  watch: {
    $route(to) {
      if (!this.$store.state.Rule.routeTabs.some((r) => r.path === to.path)) {
        this.$store.commit('Rule/addRouteTabs', { name: to.meta.title, path: to.path });
      }
    },
  },
};
</script>

<style lang="stylus">
.hide-icon {
  display: none;
}

.ly-icon-btn {
  line-height: 50px;
  height: 50px;
  border-bottom: 1px $sky solid;
  border-radius: 0;
}

.q-item__section--main ~ .q-item__section--side {
    padding-left: 0px;
}

.main-menu
  .q-item
    min-height 35px
</style>
