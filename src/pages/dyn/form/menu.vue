<template>
  <div class="column q-pa-md bg-white shadow-4" style="min-width:280px;">
      <q-scroll-area class="col">
      <q-splitter
        v-model="splitterModel"
        horizontal
      >
        <template v-slot:before>
          <div class=" row no-wrap">
            <b class="text-subtitle1">{{name}}</b>
            <q-space />
            <q-btn flat round dense color="primary" icon="add" @click="addMenu()">
              <q-tooltip>新建</q-tooltip>
            </q-btn>
            <q-btn flat round dense color="primary" icon="edit"
            :disable="selected ===''" @click="updateMenu()">
              <q-tooltip>修改</q-tooltip>
            </q-btn>
            <q-btn flat round dense color="negative" icon="mdi-delete-empty"
            :disable="selected ===''" @click="showConfirm()">
              <q-tooltip>删除</q-tooltip>
            </q-btn>
          </div>
        </template>
        <template v-slot:after>
          <q-tree
            ref="qTree"
            :nodes="allMenuList"
            node-key="key"
            label-key="label"
            selected-color="primary"
            :selected.sync="selected"
            @update:selected="select"
          />
        </template>
      </q-splitter>
    </q-scroll-area>
  </div>
</template>

<script>
import { getDictLabel } from 'boot/dictionary';
import { requiredTest } from 'boot/inputTest';

export default {
  name: 'SysMenu',
  components: {
  },
  props: {
    type: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: false,
      default: '分类目录',
    },
    allMenuList: {
      type: Array,
      required: true,
      default: () => {},
    },
  },
  data() {
    return {
      splitterModel: 15,
      checking: false,
      loading: false,
      selected: '',
      confirmMsg: '',
      editType: '',
      MenuList: [],
      Menu: {
        id: 0,
        name: '',
        type: '',
        parentId: '0',
      },
      columns: [
        {
          name: 'index',
          align: 'center',
          label: '序号',
          field: 'index',
        },
        {
          name: 'name', align: 'left', label: '名称', field: 'name',
        },
        {
          name: 'parentId', align: 'left', label: '上级编号', field: 'parentId',
        },
        {
          name: 'type', align: 'left', label: '类别', field: 'type',
        },
        {
          name: 'opt', align: 'center', label: '操作', field: 'opt',
        },
      ],
    };
  },
  methods: {
    requiredTest,
    getDictLabel,
    select(n) {
      this.$emit('select', n);
    },
    initDict() {
    },
    showConfirm() {
      this.confirmMsg = '确认删除条记录吗？';
      this.$refs.confirmDialog.show();
    },
    queryMenuList() {
      this.$axios.get('/sys/permission/queryTreeList?menuType=0').then(({ result }) => {
        const { treeList } = result;
        this.allMenuList = treeList;
      }).finally(() => {
        this.loading = false;
        this.$nextTick(() => {
          this.$refs.qTree.expandAll();
        });
      });
    },
  },
  watch: {
  },
  mounted() {
  },
};
</script>

<style lang="stylus"></style>
