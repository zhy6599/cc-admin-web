<template>
  <div class="bi-toolbar">
    <ul>
      <li>
        <q-icon name="font_download" size="md" />
        <p class="tool-icon">表格</p>
      </li>
      <li>
        <q-icon name="font_download" size="md" />
        <p class="tool-icon">表格</p>
      </li>
    </ul>
  </div>
</template>
<script>

export default {
  name: 'App',
  components: {
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

<style lang="stylus">
.bi-toolbar {
  ul {
    list-style: none;
    cursor: pointer;

    li {
      float: left;
      text-align: center;
      width: 60px;

      .tool-icon {
        word-wrap: break-word;
        word-break: normal;
      }
    }
  }
}
</style>
