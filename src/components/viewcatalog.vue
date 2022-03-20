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
            <q-btn flat round dense color="primary" icon="add" @click="addCatalog()">
              <q-tooltip>新建</q-tooltip>
            </q-btn>
            <q-btn flat round dense color="primary" icon="edit"
            :disable="selected ===''" @click="updateCatalog()">
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
            :nodes="allCatalogList"
            node-key="id"
            label-key="name"
            selected-color="primary"
            :selected.sync="selected"
            @update:selected="select"
          />
        </template>
      </q-splitter>
    </q-scroll-area>
    <q-dialog maximized flat persistent ref="dialogCatalog" position="right">
      <q-form @submit="submitCatalog" ref="popform" class="dialog_card column">
        <h5 class="view_title justify-between q-px-md">
          {{editType}}目录
          <q-btn dense outline round icon="clear" size="sm" v-close-popup />
        </h5>
        <q-scroll-area class="col">
          <div class="row q-col-gutter-x-md dialog_form q-pa-md">
            <div class="col-12">
              <h5>
                <q-icon name="star" color="red" />目录名称：
              </h5>
              <q-input
                outlined
                dense
                autofocus
                v-model="catalog.name"
                type="text"
                clearable
                :rules="[requiredTest]"
              />
            </div>
          </div>
        </q-scroll-area>
        <div class="row justify-end q-pa-md">
          <q-btn outline color="primary" icon="mdi-close-thick" label="关闭" v-close-popup />
          <q-btn class="q-mx-sm" color="primary" icon="mdi-check-bold" label="提交" type="submit" />
        </div>
      </q-form>
    </q-dialog>
    <confirm ref="confirmDialog" :msg="confirmMsg" @confirm="delCatalog()" />
  </div>
</template>

<script>
import { getDictLabel } from 'boot/dictionary';
import confirm from 'components/confirm';
import { requiredTest } from 'boot/inputTest';

export default {
  name: 'SysCatalog',
  components: {
    confirm,
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
  },
  data() {
    return {
      splitterModel: 15,
      checking: false,
      loading: false,
      selected: '',
      confirmMsg: '',
      editType: '',
      allCatalogList: [],
      catalogList: [],
      catalog: {
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
    queryCatalog() {
      this.$axios.get(`/sys/catalog/treeList?type=${this.type}`).then(({ result }) => {
        this.catalogList = result;
      }).finally(() => {
        this.loading = false;
        this.$nextTick(() => {
          this.$refs.qTree.expandAll();
        });
      });
    },
    addCatalog() {
      this.catalog.name = '';
      this.catalog.type = this.type;
      if (this.selected) {
        this.catalog.parentId = this.selected;
      } else {
        this.catalog.parentId = '0';
      }
      this.editType = '新建';
      this.$refs.dialogCatalog.show();
      this.$nextTick(() => {
        this.$refs.popform.resetValidation();
      });
    },
    updateCatalog() {
      this.editType = '修改';
      this.loading = true;
      this.$axios.get(`/sys/catalog/queryById?id=${this.selected}`).then(({ result }) => {
        this.catalog = result;
      }).finally(() => {
        this.loading = false;
      });
      this.$refs.dialogCatalog.show();
      this.$nextTick(() => {
        this.$refs.popform.resetValidation();
      });
    },
    submitCatalog() {
      this.loading = true;
      let a;
      const param = { ...this.catalog };
      if (this.editType === '修改') {
        a = this.$axios.put('/sys/catalog/edit', param);
      } else {
        a = this.$axios.post('/sys/catalog/add', param);
      }
      a.then((r) => {
        this.$info(r.message);
        this.$refs.dialogCatalog.hide();
        this.$refs.qTree.expandAll();
      }).finally(() => {
        this.queryCatalog();
      });
    },
    delCatalog() {
      this.$axios.delete(`/sys/catalog/delete?id=${this.selected}`).then((r) => {
        this.$info(r.message);
      }).finally(() => {
        this.queryCatalog();
        this.selected = '';
      });
    },
  },
  watch: {
    catalogList: {
      handler() {
        this.allCatalogList = [{
          id: '',
          name: '全部',
          children: this.catalogList,
        }];
        this.$nextTick(() => {
          this.$refs.qTree.expandAll();
        });
      },
    },
  },
  mounted() {
    this.queryCatalog();
  },
};
</script>

<style lang="stylus"></style>
