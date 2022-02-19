<template>
  <div>
    <template v-if="!menuInfo.hidden">
      <q-expansion-item
        expand-separator
        v-if="menuInfo.children&&menuInfo.children.filter(v=>!v.hidden)"
        :icon="menuInfo.meta.icon"
        :label="menuInfo.meta.title"
        :header-style="headerStyleActive(menuInfo)"
        :value="openMenu(menuInfo)"
        :header-inset-level="initLevel"
        group="mainitem"
      >
        <cc-menu-item
          v-for="u in menuInfo.children"
          :key="u.id"
          :menuInfo="u"
          :init-level="initLevel + 0.2"
        />
      </q-expansion-item>
      <q-item
        v-else
        clickable
        v-ripple
        expand-icon-class="hide-icon"
        @click="go(menuInfo)"
        :style="itemStyleActive(menuInfo)"
        :inset-level="initLevel"
        group="mainitem"
      >
        <q-item-section avatar>
          <q-icon :name="menuInfo.meta.icon" />
        </q-item-section>
        <q-item-section>{{menuInfo.meta.title}}</q-item-section>
      </q-item>
    </template>
  </div>
</template>

<script>
import { openURL } from 'quasar';

export default {
  name: 'cc-menu-item',
  props: {
    menuInfo: Object,
    initLevel: Number,
  },
  data() {
    return {

    };
  },
  created() {

  },
  mounted() {

  },
  methods: {

    go(u) {
      if (u.internalOrExternal) {
        openURL(u.path);
      } else if (u.path !== this.$route.path) { this.$router.push(u); }
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
};
</script>

<style scoped lang="stylus"></style>
