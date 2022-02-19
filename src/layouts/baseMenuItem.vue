<template>
  <div>
    <q-expansion-item
      :header-inset-level="calcLevel"
      v-for="menu in menuList.filter(v=>!v.hidden)"
      :key="menu.id"
      :icon="menu.meta.icon"
      :label="menu.meta.title"
      :header-style="headerStyleActive(menu)"
      :value="openMenu(menu)"
      :expand-icon-class="menu.children?'':'hide-icon'"
      :group="menu.id"
      @click="go(menu)"
    >
      <base-menu-item v-if="menu.children" :menuList="menu.children" :level="level+1" />
    </q-expansion-item>
  </div>
</template>

<script>
import { openURL, copyToClipboard, debounce } from 'quasar';

export default {
  name: 'base-menu-item',
  components: {},
  props: {
    menuList: Array,
    level: Number,
  },
  data() {
    return {
    };
  },
  watch: {},
  computed: {
    calcLevel() {
      if (this.level === 1) {
        return 0;
      }
      return 1 + (this.level - 1) * 0.2;
    },
  },
  methods: {
    go(u) {
      if (u.children) {
        return;
      }
      if (u.internalOrExternal) {
        openURL(u.path);
      } else if (u.path !== this.$route.path) {
        this.$router.push(u);
      }
    },
    headerStyleActive(item) {
      if (this.$route.path.startsWith(item.path)) {
        return {
          color: '#1890ff',
        };
      }
      return {};
    },
    openMenu(item) {
      if (this.$route.path.startsWith(item.path)) {
        return true;
      }
      return false;
    },
    itemStyleActive(item) {
      if (item.path === this.$route.path) {
        return {
          color: '#1890ff',
          backgroundColor: '#e6f7ff',
          borderRight: '0.2em solid #1890ff',
        };
      }
      return {};
    },
  },
  created() { },
  mounted() { },
};
</script>
<style lang="stylus"></style>
