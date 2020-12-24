<template>
  <desTabs :tabs="tabs" @selectPanel="setDesTab" />
</template>
<script>
import desTabs from 'components/tabpanel/index.vue';

export default {
  name: 'App',
  components: {
    desTabs,
  },
  data() {
    return {
      selectItem: '',
    };
  },
  methods: {
    setDesTab(val) { // 设置显示面板
      this.selectItem = val;
    },
  },
  computed: {
    tabs() {
      return this.$store.state.Rule.routeTabs;
    },
  },
};
</script>
