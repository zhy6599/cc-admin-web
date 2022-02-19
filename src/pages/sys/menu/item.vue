<template>
  <q-tr v-show="menu.parent.expand">
    <q-td key="index" :props="props" :auto-width="true">
      <q-btn
        dense
        round
        flat
        v-if="menu.children"
        :icon="menu.expand ? 'mdi-minus' : 'mdi-plus'"
        @click="toggleExpand(menu)"
      />
    </q-td>
    <q-td :style="paddingLeft">{{ menu.name }}</q-td>
    <q-td :auto-width="true" key="icon" :props="props">
      <q-icon :name="menu.icon" size="sm" color="t-grey" />
    </q-td>
    <q-td :auto-width="true">{{getDictLabel(menuType,menu.menuType)}}</q-td>
    <q-td class="ellipsis url-class" key="url">
      <div class="text-left" style="white-space: normal;">{{ menu.url }}</div>
    </q-td>
    <q-td class="ellipsis url-class" key="component">{{ menu.component }}</q-td>
    <q-td key="sortNo" :props="props" :auto-width="true">{{ menu.sortNo }}</q-td>
    <q-td key="opt" :props="props" :auto-width="true">
      <q-btn flat round dense color="primary" icon="edit" @click.stop="edit(menu)">
        <q-tooltip>编辑</q-tooltip>
      </q-btn>
      <q-btn flat round dense color="primary" icon="add" @click.stop="addChild(menu)">
        <q-tooltip>添加</q-tooltip>
      </q-btn>
      <btn-del label="删除" @confirm="del(menu)" />
    </q-td>
  </q-tr>
</template>

<script>
import { getter, formatter, getDictLabel } from 'boot/dictionary';

export default {
  name: 'menu-item',
  components: {},
  props: {
    menu: {
      type: Object,
      required: true,
    },
    props: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      menuType: formatter('menuType'),
      icons: getter('icon'),
    };
  },
  watch: {},
  computed: {
    paddingLeft() {
      if (this.menu.level > 1) {
        return {
          paddingLeft: `${(this.menu.level - 1) * 40}px`,
        };
      }
      return {};
    },
  },
  methods: {
    addChild(menu) {
      this.$emit('addChild', menu);
    },
    edit(menu) {
      this.$emit('edit', menu);
    },
    del(menu) {
      this.$emit('del', menu);
    },
    getDictLabel,
    toggleExpand(menu) {
      this.$emit('toggleExpand', menu);
    },
  },
  created() { },
  mounted() {

  },
};
</script>
<style lang="stylus">
.url-class
  width 350px
</style>
