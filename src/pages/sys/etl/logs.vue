<template>
  <q-page class="cc-admin">
    <div class="col bg-white shadow-2 q-pa-md">
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
        <template v-slot:top="table">
          <div class="row no-wrap full-width">
            <q-space />
            <q-btn-group outline>
              <q-btn outline icon="refresh" no-wrap color="primary" label="刷新"
                                :loading="loading"
                                @click="query()"/>
              <q-btn
                outline
                color="primary"
                label="切换全屏"
                no-wrap
                v-if="$q.screen.gt.md"
                @click="table.toggleFullscreen"
                :icon="table.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
              />
              <q-btn-dropdown
                outline
                color="primary"
                label="自选列"
                icon="view_list"
                no-wrap
                v-if="$q.screen.gt.md"
              >
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
              <q-btn
                outline
                no-wrap
                v-if="$q.screen.gt.sm"
                :loading="exporting"
                label="导出"
                icon="mdi-cloud-download-outline"
                color="primary"
                @click="exportExcel('数据同步日志')"
              />
            </q-btn-group>
          </div>
        </template>
        <template #body-cell-status="props">
          <q-td key="status" :props="props">{{getDictLabel(runStatus,props.row.status) }}</q-td>
        </template>
      </q-table>
    </div>
  </q-page>
</template>

<script>
import { IndexMixin } from 'boot/mixins';
import { getDictLabel } from 'boot/dictionary';

export default {
  name: 'DataEtlLog',
  mixins: [IndexMixin],
  props: {
    etlId: {
      type: String,
      required: true,
    },
  },
  components: {
  },
  data() {
    return {
      columns: [
        {
          name: 'startTime', align: 'left', label: '开始时间', field: 'startTime',
        },
        {
          name: 'endTime', align: 'left', label: '结束时间', field: 'endTime',
        },
        {
          name: 'status', align: 'left', label: '运行状态', field: 'status',
        },
        {
          name: 'errorMsg', align: 'left', label: '失败原因', field: 'errorMsg',
        },
        {
          name: 'readCount', align: 'left', label: '读取条数', field: 'readCount',
        },
        {
          name: 'writeCount', align: 'left', label: '写入条数', field: 'writeCount',
        },
      ],
      runStatus: [{ value: 'failed', label: '失败' }, { value: 'running', label: '运行中' }, { value: 'success', label: '成功' }],
      showQuery: true,
      headers: [{ name: 'Authorization', value: localStorage.Authorization }],
      uploadUrl: `${process.env.SERVER_URL}${process.env.BASE_URL}/sys/common/upload`,
      imgUrl: `${process.env.SERVER_URL}${process.env.BASE_URL}/sys/common/static`,
      url: {
        list: '/data/etlLog/list',
        add: '/data/etlLog/add',
        edit: '/data/etlLog/edit',
        delete: '/data/etlLog/delete',
        deleteBatch: '/data/etlLog/deleteBatch',
        exportXlsUrl: '/data/etlLog/exportXls',
        importExcelUrl: '/data/etlLog/importExcel',
      },
    };
  },
  methods: {
    getDictLabel,
    initDict() {
    },
    queryParam() {
      return { etlId: this.etlId };
    },
    beforeQuery() {
      if (!this.etlId) {
        this.$error('未找到etl编号');
        return false;
      }
      return true;
    },
  },
  mounted() {
    this.initDict();
  },
};
</script>

<style lang="stylus"></style>
