<template>
  <q-page class="cc-admin column q-pa-sm">
    <div class="col column bg-white shadow-2 q-pa-md">
      <div class="row items-center justify-start q-mb-md">
        <q-item class="col-xl-2 col-md-3 col-sm-6 col-xs-12">
          <q-item-section class="col-3 text-right gt-sm">
            <q-item-label>日志类型：</q-item-label>
          </q-item-section>
          <q-select
            outlined
            dense
            emit-value
            v-model="searchForm.logType"
            map-options
            :options="logType"
            clearable
            class="col"
          />
        </q-item>
        <q-item class="col-xl-2 col-md-3 col-sm-6 col-xs-12">
          <q-item-section class="col-3 text-right gt-sm">
            <q-item-label>日志内容：</q-item-label>
          </q-item-section>
          <q-input
            outlined
            dense
            v-model="searchForm.logContent"
            type="text"
            clearable
            class="col"
          />
        </q-item>
        <q-item v-show="showQuery" class="col-xl-2 col-md-3 col-sm-6 col-xs-12">
          <q-item-section class="col-3 text-right gt-sm">
            <q-item-label>操作类型：</q-item-label>
          </q-item-section>
          <q-select
            outlined
            dense
            emit-value
            v-model="searchForm.operateType"
            map-options
            :options="operateType"
            clearable
            class="col"
          />
        </q-item>
        <q-item v-show="showQuery" class="col-xl-2 col-md-3 col-sm-6 col-xs-12">
          <q-item-section class="col-3 text-right gt-sm">
            <q-item-label>请求路径：</q-item-label>
          </q-item-section>
          <q-input
            outlined
            dense
            v-model="searchForm.requestUrl"
            type="text"
            clearable
            class="col"
          />
        </q-item>
        <q-item v-show="showQuery" class="col-xl-2 col-md-3 col-sm-6 col-xs-12">
          <q-item-section class="col-3 text-right gt-sm">
            <q-item-label>请求参数：</q-item-label>
          </q-item-section>
          <q-input
            outlined
            dense
            v-model="searchForm.requestParam"
            type="text"
            clearable
            class="col"
          />
        </q-item>
        <q-item v-show="showQuery" class="col-xl-2 col-md-3 col-sm-6 col-xs-12">
          <q-item-section class="col-3 text-right gt-sm">
            <q-item-label>耗时大于：</q-item-label>
          </q-item-section>
          <q-input
            outlined
            dense
            v-model="searchForm.costTime_begin"
            type="text"
            clearable
            class="col"
          />
        </q-item>
        <q-item class="col-xl-2 col-md-3 col-sm-6 col-xs-12">
          <q-item-section class="col-3 text-right gt-sm">
            <q-item-label>IP：</q-item-label>
          </q-item-section>
          <q-input
            outlined
            dense
            v-model="searchForm.ip"
            type="text"
            clearable
            class="col"
          />
        </q-item>
        <q-item class="col-xl-2 col-md-3 col-sm-6 col-xs-12 q-pr-sm">
          <q-item-label class="col-12 text-right">
            <q-btn
              unelevated
              label="查询"
              color="primary"
              class="q-mr-sm no-border-radius"
              :loading="loading"
              @click="query()"
            >
              <template v-slot:loading>
                <q-spinner-ios class="on-center" />
              </template>
            </q-btn>
            <q-btn
              outline
              unelevated
              label="重置"
              class="q-mr-sm no-border-radius"
              color="secondary"
              @click="searchReset"
            />
            <q-btn-dropdown
              v-model="showQuery"
              persistent
              dense
              flat
              color="primary"
              :label="tableLabel"
              @before-show="show"
              @before-hide="hide"
            ></q-btn-dropdown>
          </q-item-label>
        </q-item>
      </div>
      <q-table
        flat
        color="primary"
        class="cross_table"
        separator="cell"
        :columns="columns"
        :data="list"
        row-key="id"
        :pagination.sync="pagination"
        :visible-columns="group"
        @request="query"
        :rows-per-page-options="[10,20,50,100]"
        :loading="loading"
      >
        <template #top-right="table">
          <q-btn-group outline>
            <q-btn
              outline
              color="primary"
              label="切换全屏"
              @click="table.toggleFullscreen"
              :icon="table.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
            />
            <q-btn-dropdown outline color="primary" label="自选列" icon="view_list">
              <q-list>
                <q-item tag="label" v-for="item in columns" :key="item.name">
                  <q-item-section avatar>
                    <q-checkbox v-model="group" :val="item.name" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{item.label}}</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-btn-dropdown>
          </q-btn-group>
        </template>

        <template #body-cell-requestParam="props">
          <q-td key="requestParam" :props="props">
            <ellipsisvalue :value="props.row.requestParam" :length="10" />
          </q-td>
        </template>
        <template #body-cell-method="props">
          <q-td key="method" :props="props">
            <ellipsisvalue :value="props.row.method" :length="20" />
          </q-td>
        </template>
        <template #body-cell-logType="props">
          <q-td key="logType" :props="props">{{getDictLabel(logType,props.row.logType) }}</q-td>
        </template>
        <template #body-cell-operateType="props">
          <q-td
            key="operateType"
            :props="props"
          >{{getDictLabel(operateType,props.row.operateType) }}</q-td>
        </template>
      </q-table>
    </div>
  </q-page>
</template>

<script>
import { IndexMixin } from 'boot/mixins';
import { getDictLabel } from 'boot/dictionary';

export default {
  name: 'SysLog',
  mixins: [IndexMixin],
  data() {
    return {
      showQuery: true,
      tableLabel: '展开',
      columns: [
        {
          name: 'index',
          align: 'center',
          label: '序号',
          field: 'index',
        },
        {
          name: 'logType', align: 'left', label: '日志类型', field: 'logType',
        },
        {
          name: 'logContent', align: 'left', label: '日志内容', field: 'logContent',
        },
        {
          name: 'operateType', align: 'left', label: '操作类型', field: 'operateType',
        },
        {
          name: 'userid', align: 'left', label: '操作用户账号', field: 'userid',
        },
        {
          name: 'username', align: 'left', label: '操作用户名称', field: 'username',
        },
        {
          name: 'ip', align: 'left', label: 'IP', field: 'ip',
        },
        {
          name: 'ipAddress', align: 'left', label: 'IP地址', field: 'ipAddress',
        },
        {
          name: 'createTime', align: 'left', label: '操作时间', field: 'createTime',
        },
        {
          name: 'method', align: 'left', label: '请求java方法', field: 'method',
        },
        {
          name: 'requestUrl', align: 'left', label: '请求路径', field: 'requestUrl',
        },
        {
          name: 'requestParam', align: 'left', label: '请求参数', field: 'requestParam',
        },
        {
          name: 'costTime', align: 'left', label: '耗时', field: 'costTime',
        },
      ],
      logType: [{ value: 1, label: '登录日志' }, { value: 2, label: '操作日志' }],
      operateType: [{ value: 1, label: '查询' }, { value: 2, label: '添加' }, { value: 3, label: '修改' }, { value: 4, label: '删除' }, { value: 5, label: '导入' }, { value: 6, label: '导出' }],
      url: {
        list: '/sys/log/list',
      },
    };
  },
  methods: {
    show() {
      this.showQuery = true;
      this.tableLabel = '收起';
    },
    hide() {
      this.showQuery = false;
      this.tableLabel = '展开';
    },
    getDictLabel,
  },
};
</script>

<style lang="stylus"></style>
