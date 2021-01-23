<template>
  <q-page class="cc-admin column q-pa-sm">
    <div class="col column bg-white shadow-2 q-pa-md">
      <div class="row no-wrap">
        <b class="text-h6">数据源目录</b>
        <q-space />

        <q-btn-group outline>
          <q-btn outline icon="add" color="primary" label="新建目录" @click="addCatalog()" />
          <q-btn
            outline
            icon="edit"
            :disable="selectedCatalog ===''"
            color="primary"
            label="修改目录"
            @click="updateCatalog()"
          />
          <q-btn
            :disable="selectedCatalog ===''"
            outline
            color="primary"
            label="删除目录"
            @click="showConfirm()"
            icon="mdi-delete-empty"
          />
        </q-btn-group>
      </div>
      <q-scroll-area style="height: calc(100vh - 200px);">
        <q-tree
          ref="qTree"
          :nodes="allCatalogList"
          node-key="id"
          label-key="name"
          selected-color="primary"
          :selected.sync="selectedCatalog"
          default-expand-all
        />
      </q-scroll-area>
    </div>
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
                dense autofocus
                v-model="catalog.name"
                type="text"
                clearable
                :rules="[requiredTest]"
              />
            </div>
          </div>
        </q-scroll-area>
        <div class="row justify-end q-pa-md">
          <q-btn outline color="primary" label="取消" v-close-popup />
          <q-btn unelevated color="primary" class="on-right" label="提交" type="submit" />
        </div>
      </q-form>
    </q-dialog>
    <confirm ref="confirmDialog" :msg="confirmMsg" @confirm="delCatalog()" />
  </q-page>
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
  data() {
    return {
      checking: false,
      loading: false,
      confirmMsg: '',
      editType: '',
      selectedCatalog: '',
      selected: [],
      catalogList: [],
      allCatalogList: [],
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
          name: 'opt', align: 'center', label: '操作', field: 'id',
        },
      ],
    };
  },
  methods: {
    requiredTest,
    getDictLabel,
    initDict() {
    },
    showConfirm() {
      this.confirmMsg = '确认删除条记录吗？';
      this.$refs.confirmDialog.show();
    },
    queryCatalog() {
      this.$axios.get('/sys/catalog/treeList?type=').then(({ result }) => {
        this.catalogList = result;
      }).finally(() => {
        this.loading = false;
      });
    },
    addCatalog() {
      this.catalog.name = '';
      if (this.selectedCatalog) {
        this.catalog.parentId = this.selectedCatalog;
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
      this.$axios.get(`/sys/catalog/queryById?id=${this.selectedCatalog}`).then(({ result }) => {
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
      }).finally(() => {
        this.queryCatalog();
      });
    },
    delCatalog() {
      this.$axios.delete(`/sys/catalog/delete?id=${this.selectedCatalog}`).then((r) => {
        this.$info(r.message);
      }).finally(() => {
        this.queryCatalog();
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
