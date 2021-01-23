<template>
  <q-page class="cc-admin column q-pa-sm">
    <div class="col column bg-white shadow-2 q-pa-md">
      <div class="row items-center justify-start q-mb-md">
        <div class="row items-center q-mb-md col-3">
          <span class="q-ml-md">日志类型：</span>
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
        </div>
        <div class="row items-center q-mb-md col-3">
          <span class="q-ml-md">日志内容：</span>
          <q-input
            outlined
            dense
            v-model="searchForm.logContent"
            type="text"
            clearable
            class="col"
          />
        </div>
        <div class="row items-center q-mb-md col-3">
          <span class="q-ml-md">操作类型：</span>
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
        </div>
        <div class="row items-center q-mb-md col-3">
          <span class="q-ml-md">操作用户账号：</span>
          <q-input outlined dense v-model="searchForm.userid" type="text" clearable class="col" />
        </div>
        <div class="row items-center q-mb-md col-3">
          <span class="q-ml-md">操作用户名称：</span>
          <q-input outlined dense v-model="searchForm.username" type="text" clearable class="col" />
        </div>
        <div class="row items-center q-mb-md col-3">
          <span class="q-ml-md">请求java方法：</span>
          <q-input outlined dense v-model="searchForm.method" type="text" clearable class="col" />
        </div>
        <div class="row items-center q-mb-md col-3">
          <span class="q-ml-md">请求路径：</span>
          <q-input
            outlined
            dense
            v-model="searchForm.requestUrl"
            type="text"
            clearable
            class="col"
          />
        </div>
        <div class="row items-center q-mb-md col-3">
          <span class="q-ml-md">请求参数：</span>
          <q-input
            outlined
            dense
            v-model="searchForm.requestParam"
            type="text"
            clearable
            class="col"
          />
        </div>
        <div class="row items-center q-mb-md col-3">
          <span class="q-ml-md">请求类型：</span>
          <q-input
            outlined
            dense
            v-model="searchForm.requestType"
            type="text"
            clearable
            class="col"
          />
        </div>
        <div class="row items-center q-mb-md col-3">
          <span class="q-ml-md">耗时：</span>
          <q-input outlined dense v-model="searchForm.costTime" type="text" clearable class="col" />
        </div>
        <div class="row items-center q-mb-md col-3 q-ml-md">
          <q-btn
            color="primary"
            label="搜索"
            icon="search"
            class="on-left"
            @click="query()"
            :loading="loading"
            unelevated
          />
          <q-btn label="重置" icon="search_off" color="primary" outline @click="reset" />
        </div>
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
import ellipsisvalue from 'components/ellipsisvalue';
import { IndexMixin } from 'boot/mixins';
import { getDictLabel } from 'boot/dictionary';

export default {
  name: 'SysLog',
  components: {
    ellipsisvalue,
  },
  mixins: [IndexMixin],
  data() {
    return {
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
          name: 'method', align: 'left', label: '请求java方法', field: 'method',
        },
        {
          name: 'requestUrl', align: 'left', label: '请求路径', field: 'requestUrl',
        },
        {
          name: 'requestParam', align: 'left', label: '请求参数', field: 'requestParam',
        },
        {
          name: 'requestType', align: 'left', label: '请求类型', field: 'requestType',
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
    getDictLabel,
  },
};
</script>

<style lang="stylus"></style>
