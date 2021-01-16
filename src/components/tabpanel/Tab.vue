<template>
  <li :class="{'active': isActive(tabData), 'loading': tabData.loading}">
    {{tabData.name}}
    <span v-if="allowClose" class="btn-close" @click.stop="close">&times;</span>
  </li>
</template>
<script>
export default {
  props: {
    tabData: Object,
  },
  computed: {
    allowClose() {
      return this.tabData.path !== '/home/dashboard';
    },
  },
  methods: {
    close() {
      this.$emit('close', this.tabData);
    },
    isActive(tabData) {
      return this.$route.path === tabData.path;
    },
  },
};
</script>
