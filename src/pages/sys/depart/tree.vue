<template>
  <div class="q-pa-md bg-white shadow-4">
    <q-splitter v-model="splitterModel" unit="px" horizontal>
      <template v-slot:before>
        <div class="row no-wrap items-center">
          <div class="text-subtitle1" v-if="$q.screen.gt.md">部门管理</div>
          <q-space />
          <div class="col row q-gutter-sm justify-end">
            <q-btn
              dense
              class="q-mx-xs"
              color="primary"
              icon="add"
              label="添加部门"
              @click="addCatalog()"
            />
            <q-btn
              dense
              class="q-mx-xs"
              color="primary"
              icon="add"
              label="添加下级"
              @click="addCatalog('son')"
            />
            <q-btn
              dense
              class="q-mx-xs"
              color="primary"
              icon="edit"
              label="修改"
              @click="updateCatalog()"
            />
            <q-btn
              dense
              class="q-mx-xs"
              color="negative"
              icon="delete"
              label="删除"
              :disable="selected ===''"
              @click="showConfirm()"
            />
          </div>
        </div>
      </template>
      <template v-slot:after>
        <q-tree
          ref="qTree"
          :nodes="allCatalogList"
          node-key="id"
          label-key="departName"
          selected-color="primary"
          :selected.sync="selected"
          @update:selected="select"
        />
      </template>
    </q-splitter>
    <q-dialog maximized flat persistent ref="dialogCatalog" position="right">
      <q-form @submit="submitCatalog" ref="popform" class="dialog_card column">
        <h5 class="view_title justify-between q-px-md">
          {{editType}}部门管理
          <q-btn dense outline round icon="clear" size="sm" v-close-popup />
        </h5>
        <q-scroll-area class="col">
          <div class="row q-col-gutter-x-md dialog_form q-pa-md">
            <div class="col-6">
              <h5>
                <q-icon name="star" color="red" />部门名称：
              </h5>
              <q-input
                outlined
                dense
                v-model="form.departName"
                type="text"
                :rules="[requiredTest]"
              />
            </div>
            <div v-if="addType === 'son'" class="col-6">
              <h5>上级部门：</h5>
              <q-select
                outlined
                dense
                emit-value
                v-model="form.parentId"
                map-options
                :options="sysDepart"
                :readonly="editType === '修改'"
              />
            </div>
            <div class="col-6">
              <h5>排序：</h5>
              <q-input outlined dense v-model="form.departOrder" type="number" />
            </div>
            <div class="col-12">
              <h5>描述：</h5>
              <q-input outlined dense v-model="form.description" type="text" />
            </div>
            <div class="col-6">
              <h5>部门类型：</h5>
              <q-btn-toggle class="q_b_toggle" v-model="form.orgType" :options="orgType" />
            </div>
            <div class="col-6">
              <h5>状态：</h5>
              <q-btn-toggle class="q_b_toggle" v-model="form.status" :options="departStatus" />
            </div>
            <div class="col-6">
              <h5>手机号：</h5>
              <q-input outlined dense v-model="form.mobile" type="text" :rules="[phoneTest]" />
            </div>
            <div class="col-6">
              <h5>传真：</h5>
              <q-input outlined dense v-model="form.fax" type="text" />
            </div>
            <div class="col-12">
              <h5>地址：</h5>
              <q-input outlined dense v-model="form.address" type="text" />
            </div>
            <div class="col-12">
              <h5>备注：</h5>
              <q-input outlined dense v-model="form.memo" type="text" />
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
import { requiredTest, phoneTest } from 'boot/inputTest';

export default {
  name: 'SysDepart',
  components: {
    confirm,
  },
  props: {
    type: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      form: {
        status: '1',
        orgType: '1',
        parentId: '',
        departOrder: 100,
      },
      addType: 'son',
      sysDepart: [],
      orgType: [{ value: '1', label: '公司' }, { value: '2', label: '部门' }, { value: '3', label: '岗位' }],
      departStatus: [{ value: '1', label: '启用' }, { value: '0', label: '不启用' }],
      delFlag: [{ value: '0', label: '正常' }, { value: '1', label: '已删除' }],
      splitterModel: 30,
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
          name: 'departName', align: 'left', label: '部门名称', field: 'departName',
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
    phoneTest,
    getDictLabel,
    initDict() {
      this.$axios.get('/sys/dictItem/selectItemsByDefId?defId=sysDepart').then((r) => {
        this.sysDepart = r;
      });
    },
    select(n) {
      if (n) {
        this.selected = n;
        const selNode = this.$refs.qTree.getNodeByKey(n);
        if (selNode.parentId) {
          const parentNode = this.$refs.qTree.getNodeByKey(selNode.parentId);
          selNode.parentName = parentNode.departName;
        }
        this.$emit('select', selNode);
      }
    },
    showConfirm() {
      this.confirmMsg = '确认删除条记录吗？';
      this.$refs.confirmDialog.show();
    },
    queryCatalog() {
      this.$axios.get('/sys/depart/queryTreeList').then(({ result }) => {
        this.catalogList = result;
        this.select(this.selected);
      }).finally(() => {
        this.loading = false;
      });
    },
    addCatalog(type) {
      this.addType = type;
      if (type === 'son') {
        if (!this.selected) {
          this.$warn('请先选择上级部门');
          return;
        }
        this.form.parentId = this.selected;
      } else {
        this.form.parentId = '';
      }
      this.editType = '新建';
      this.$refs.dialogCatalog.show();
      this.$nextTick(() => {
        this.$refs.popform.resetValidation();
      });
    },
    updateCatalog() {
      if (!this.selected) {
        this.$warn('请先要修改的部门');
        return;
      }
      this.form = this.$refs.qTree.getNodeByKey(this.selected);
      this.addType = this.form.parentId ? 'son' : 'parent';
      this.$refs.dialogCatalog.show();
      this.editType = '修改';
      this.$nextTick(() => {
        this.$refs.popform.resetValidation();
      });
    },
    submitCatalog() {
      this.loading = true;
      let a;
      const param = { ...this.form };
      if (this.editType === '修改') {
        a = this.$axios.put('/sys/depart/edit', param);
      } else {
        a = this.$axios.post('/sys/depart/add', param);
      }
      a.then((r) => {
        this.$info(r.message);
        this.$refs.dialogCatalog.hide();
      }).finally(() => {
        this.queryCatalog();
      });
    },
    delCatalog() {
      this.$axios.delete(`/sys/depart/delete?id=${this.selected}`).then((r) => {
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
        this.allCatalogList = this.catalogList;
        this.$nextTick(() => {
          // this.$refs.qTree.expandAll();
        });
      },
    },
  },
  mounted() {
    this.initDict();
    this.queryCatalog();
  },
};
</script>

<style lang="stylus"></style>
