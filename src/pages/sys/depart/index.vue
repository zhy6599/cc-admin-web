<template>
  <q-page class="cc-admin row">
    <tree class="q-mt-sm q-mb-sm q-ml-sm" type="SysDepart" @select="selectCatalog" />
    <div class="col column cc-admin shadow-2 q-ma-sm">
      <div class="q-gutter-y-md col">
        <q-card class="full-height">
          <q-tabs
            v-model="tab"
            dense
            class="text-grey"
            active-color="primary"
            indicator-color="primary"
            align="left"
            narrow-indicator
          >
            <q-tab name="base" label="基本信息" />
            <q-tab name="author" label="权限信息" />
          </q-tabs>

          <q-separator />

          <q-tab-panels v-model="tab" animated>
            <q-tab-panel name="base">
              <div class="q-px-md">
                <q-card square flat class="q-gutter-y-md q-my-md q-py-sm">
                  <q-card-section>
                    <q-item-label class="text-body1">
                      <strong>基础信息</strong>
                    </q-item-label>
                    <q-item-label class="row q-gutter-y-md">
                      <div class="col col-sm-6 col-xs-12">部门名称：{{form.departName}}</div>
                      <div class="col col-md-4 col-sm-6 col-xs-12">描述：{{form.description}}</div>
                      <div class="col col-sm-6 col-xs-12">上级部门：{{form.parentName}}</div>
                      <div class="col col-sm-6 col-xs-12">部门编码：{{form.orgCode}}</div>
                      <div class="col col-sm-6 col-xs-12">
                        部门类型：{{ getDictLabel(orgType,form.orgType) }}
                      </div>
                      <div class="col col-sm-6 col-xs-12">
                        部门状态：{{ getDictLabel(departStatus,form.status) }}
                      </div>
                    </q-item-label>
                  </q-card-section>
                  <q-card-section>
                    <q-item-label class="text-body1">联系信息</q-item-label>
                    <q-separator spaced="15px" />
                    <q-item-label class="row q-gutter-y-md">
                      <div class="col col-md-4 col-sm-6 col-xs-12">手机号：{{form.mobile}}</div>
                      <div class="col col-md-4 col-sm-6 col-xs-12">传真：{{form.fax}}</div>
                      <div class="col col-md-4 col-sm-6 col-xs-12">地址：{{form.address}}</div>
                      <div class="col col-md-4 col-sm-6 col-xs-12">备注：{{form.memo}}</div>
                    </q-item-label>
                  </q-card-section>
                </q-card>
              </div>
            </q-tab-panel>

            <q-tab-panel name="author">
              <div class="addCompanyDialog dialog_card column">
                <q-scroll-area class="col q-pa-md">
                  <q-tree
                    class="col-12"
                    ref="treelist"
                    :nodes="QueryTreeList"
                    node-key="key"
                    label-key="slotTitle"
                    tick-strategy="strict"
                    :ticked.sync="ticked"
                  >
                    <template #default-header="prop">
                      <div class="row items-center">
                        <div class="">{{prop.node.slotTitle}}</div>
                      </div>
                    </template>
                  </q-tree>
                </q-scroll-area>
                <div class="row justify-end q-pa-md">
                  <q-btn
                    outline
                    color="primary"
                    label="取消"
                    v-close-popup
                  />
                  <q-btn
                    unelevated
                    color="primary"
                    class="on-right"
                    label="提交"
                    @click="lockSubmit"
                  />
                </div>
              </div>
            </q-tab-panel>
          </q-tab-panels>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import { getDictLabel } from 'boot/dictionary';
import { requiredTest, phoneTest } from 'boot/inputTest';
import tree from './tree';

export default {
  name: 'SysDepart',
  components: {
    tree,
  },
  data() {
    return {
      loading: false,
      tab: 'base',
      form: {
        departName: '',
        description: '',
        parentName: '',
        orgCode: '',
        orgType: '',
        status: '',
        mobile: '',
        fax: '',
        address: '',
        memo: '',
      },
      sysDepart: [],
      orgType: [{ value: '1', label: '公司' }, { value: '2', label: '部门' }, { value: '3', label: '岗位' }],
      departStatus: [{ value: '0', label: '不启用' }, { value: '1', label: '启用' }],
      delFlag: [{ value: '0', label: '正常' }, { value: '1', label: '已删除' }],
      QueryTreeList: [],
      ticked: [],
      initializeIds: [],
      lockDialog: false,
    };
  },
  methods: {
    requiredTest,
    phoneTest,
    selectCatalog(n) {
      this.form = { ...n };
      this.lock();
    },
    getDictLabel,
    initDict() {
      this.$axios.get('/sys/dictItem/selectItemsByDefId?defId=sysDepart').then((r) => {
        this.sysDepart = r;
      });
    },
    lock() {
      this.$axios.get('/sys/role/queryTreeList').then((res) => {
        if (res.success) {
          this.QueryTreeList = res.result.treeList;
          this.initializeIds = res.result.ids;
        }
      });

      this.$axios.get('/sys/permission/queryDepartPermission', {
        params: {
          departId: this.form.id,
        },
      }).then((resu) => {
        if (resu) {
          this.ticked = resu.result;
          this.initializeIds = resu.result;
        }
      });
      this.lockDialog = true;
    },
    lockSubmit() {
      this.$axios.post('/sys/permission/saveDepartPermission', {
        lastpermissionIds: this.initializeIds.join(),
        permissionIds: this.ticked.join(),
        departId: this.form.id,
      }).then((res) => {
        this.$info(res.message);
        if (res) {
          this.lockDialog = false;
        }
      });
    },
  },
  mounted() {
    this.initDict();
  },
  watch: {
    tab: {
      handler(n) {
        if (n === 'author') {
          this.$nextTick(() => {
            if (this.$refs.treelist) {
              this.$refs.treelist.expandAll();
            }
          });
        }
      },
    },
  },
};
</script>

<style lang="stylus"></style>
