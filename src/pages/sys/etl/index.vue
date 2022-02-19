<template>
  <q-page class="cc-admin row">
    <viewcatalog
      class="q-mt-sm q-mb-sm q-ml-sm"
      type="DataEtl"
      @select="selectCatalog"
      v-if="this.$q.screen.gt.md"
    />
    <div class="col bg-white shadow-2 q-pa-md q-ma-sm">
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
        selection="multiple"
        :selected.sync="selected"
      >
        <template v-slot:top="table">
          <div class="row no-wrap full-width">
            <q-input
              clearable
              outlined
              dense
              placeholder="请输入关键字搜索"
              class="on-left"
              @input="query"
              debounce="500"
              v-model="key"
            >
              <template #append>
                <q-btn flat round icon="search" color="primary" @click="query" :loading="loading">
                  <q-tooltip>搜索</q-tooltip>
                </q-btn>
              </template>
            </q-input>
            <q-space />
            <q-btn-group outline>
              <q-btn outline icon="add" no-wrap color="primary" label="新建" @click="add" />
              <q-btn outline icon="sync" no-wrap color="primary" label="同步表结构" @click="syncTable"
                :disable="selected.length === 0"
                v-if="$q.screen.gt.md" />
              <q-btn outline icon="sync" no-wrap color="primary" label="同步数据库表结构"
                @click="syncDatabase"
                :disable="selected.length === 0"
                v-if="$q.screen.gt.md" />
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
                label="导入"
                icon="mdi-cloud-upload-outline"
                :loading="importing"
                color="primary"
                @click="importExcel"
              >
                <q-uploader
                  auto-upload
                  ref="excelUploader"
                  :max-files="1"
                  class="hidden"
                  :url="importExcelUrlFull"
                  field-name="file"
                  :headers="[{name: 'authorization', value: $store.state.User.authorization}]"
                  @uploaded="importedExcel"
                />
              </q-btn>
              <q-btn
                outline
                no-wrap
                v-if="$q.screen.gt.sm"
                :loading="exporting"
                label="导出"
                icon="mdi-cloud-download-outline"
                color="primary"
                @click="exportExcel('ETL工具')"
              />
              <q-btn
                :disable="selected.length === 0"
                outline
                no-wrap
                v-if="$q.screen.gt.md"
                color="primary"
                label="批量删除"
                @click="showConfirm()"
                icon="mdi-delete-variant"
              />
            </q-btn-group>
          </div>
        </template>
        <template #body-cell-name="props">
          <q-td key="name" :props="props">
            {{ellipsis(props.row.name,20)}}
            <q-tooltip>
              {{props.row.name}}
            </q-tooltip>
          </q-td>
        </template>
        <template #body-cell-sourceId="props">
          <q-td key="sourceId" :props="props">
            {{getDictLabel(sysDataSource,props.row.sourceId) }}
          </q-td>
        </template>
        <template #body-cell-distId="props">
          <q-td key="distId" :props="props">{{getDictLabel(sysDataSource,props.row.distId) }}</q-td>
        </template>
        <template #body-cell-autoMerge="props">
          <q-td key="autoMerge" :props="props">{{getDictLabel(yn,props.row.autoMerge) }}</q-td>
        </template>
        <template #body-cell-sourceTable="props">
          <q-td key="sourceTable" :props="props">
            {{ellipsis(props.row.sourceTable,15)}}
            <q-tooltip>
              {{props.row.sourceTable}}
            </q-tooltip>
          </q-td>
        </template>
        <template #body-cell-distTable="props">
          <q-td key="distTable" :props="props">
            {{ellipsis(props.row.distTable,15)}}
            <q-tooltip>
              {{props.row.distTable}}
            </q-tooltip>
          </q-td>
        </template>
        <template #body-cell-status="props">
          <q-td key="status" :props="props">
            <q-chip
              square
              size="sm"
              :color="props.row.status===0?'positive':'negative'"
              text-color="white"
            >{{getDictLabel(quartzStatus,props.row.status) }}</q-chip>
          </q-td>
        </template>
        <template #body-cell-opt="props">
          <q-td :props="props" :auto-width="true">
            <q-btn flat round dense color="primary" :loading="runTaskLoading"
            icon="mdi-ski" @click="runTask(props.row)">
              <q-tooltip>立即执行一次任务</q-tooltip>
            </q-btn>
            <q-btn
              v-if="props.row.status===-1"
              flat
              round
              dense
              color="positive"
              icon="mdi-play"
              @click="startStopJob(props.row.id,0)"
            >
              <q-tooltip>启动</q-tooltip>
            </q-btn>
            <q-btn
              v-if="props.row.status===0"
              flat
              round
              dense
              color="negative"
              icon="mdi-stop"
              @click="startStopJob(props.row.id,-1)"
            >
              <q-tooltip>停止</q-tooltip>
            </q-btn>
            <q-btn
              flat
              round
              dense
              color="primary"
              icon="mdi-content-copy"
              @click="copy(props.row)"
            >
              <q-tooltip>复制</q-tooltip>
            </q-btn>
            <q-btn flat round dense color="primary" icon="edit" @click="edit(props.row)">
              <q-tooltip>编辑</q-tooltip>
            </q-btn>
            <q-btn flat round dense color="primary" icon="mdi-text-box-outline"
            @click="logs(props.row)">
              <q-tooltip>查看运行日志</q-tooltip>
            </q-btn>
            <btn-del label="数据同步" @confirm="del(props.row)" />
          </q-td>
        </template>
      </q-table>
    </div>
    <q-dialog maximized flat persistent ref="etlLogs" position="right">
      <q-form @submit="submit" class="dialog_card column">
        <h5 class="view_title justify-between q-px-md">
          数据同步日志
          <q-btn dense outline round icon="clear" size="sm" v-close-popup />
        </h5>
        <q-scroll-area class="col">
          <etl-logs :etlId="etlId" />
        </q-scroll-area>
        <div class="row justify-end q-pa-md">
          <q-btn outline color="primary" label="关闭" v-close-popup />
        </div>
      </q-form>
    </q-dialog>
    <q-dialog maximized flat persistent ref="dialog" position="right">
      <q-form @submit="submit" class="dialog_card column">
        <h5 class="view_title justify-between q-px-md">
          {{editType}}数据同步
          <q-btn dense outline round icon="clear" size="sm" v-close-popup />
        </h5>
        <q-scroll-area class="col">
          <div class="row q-col-gutter-x-md dialog_form q-pa-md">
            <div class="col-12">
              <h5>
                <q-icon name="star" color="red" />名称：
              </h5>
              <q-input outlined dense v-model="form.name" type="text" :rules="[requiredTest]"
              :autofocus="true"/>
            </div>
            <div class="col-6">
              <h5>
                <q-icon name="star" color="red" />源数据源：
              </h5>
              <q-select
                outlined
                dense
                emit-value
                v-model="form.sourceId"
                map-options
                :options="sysDataSource"
              />
            </div>
            <div class="col-6">
              <h5>
                <q-icon name="star" color="red" />源表：
              </h5>
              <q-input
                outlined
                dense
                v-model="form.sourceTable"
                type="text"
                :rules="[requiredTest]"
              />
            </div>
            <div class="col-12">
              <h5>过滤条件：</h5>
              <q-input outlined dense v-model="form.cnd" type="text" />
            </div>
            <div class="col-6">
              <h5>
                <q-icon name="star" color="red" />目标数据源：
              </h5>
              <q-select
                outlined
                dense
                emit-value
                v-model="form.distId"
                map-options
                :options="sysDataSource"
              />
            </div>
            <div class="col-6">
              <h5>
                <q-icon name="star" color="red" />目标表：
              </h5>
              <q-input outlined dense v-model="form.distTable" type="text"
              :rules="[requiredTest]" />
            </div>
            <div class="col-6">
              <h5>
                <q-icon name="star" color="red" />每次条数：
              </h5>
              <q-input outlined dense v-model="form.maxRow" type="text" :rules="[requiredTest]" />
            </div>
            <div class="col-6">
              <h5>唯一字段：</h5>
              <q-input outlined dense v-model="form.uniqueColumns" type="text" />
            </div>
            <div class="col-6">
              <h5><q-icon name="star" color="red" />覆盖重复数据：</h5>
              <q-select
                outlined
                dense
                emit-value
                v-model="form.autoMerge"
                map-options
                :options="yn"
              />
            </div>
            <div class="col-6">
              <h5><q-icon name="star" color="red" />运行状态：</h5>
              <q-select
                outlined
                dense
                emit-value
                v-model="form.status"
                map-options
                :options="quartzStatus"
              />
            </div>
            <div class="col-6">
              <h5><q-icon name="star" color="red" />定时任务：</h5>
              <q-input outlined dense v-model="form.cron" type="text" :rules="[requiredTest]" />
            </div>
            <div class="col-6">
              <h5>目录编号：</h5>
              <catalogselect :form.sync="form" type="DataEtl" />
            </div>
          </div>
        </q-scroll-area>
        <div class="row justify-end q-pa-md">
          <q-btn outline color="primary" label="取消" v-close-popup />
          <q-btn unelevated color="primary" class="on-right" label="提交" type="submit" />
        </div>
      </q-form>
    </q-dialog>
    <confirm ref="confirmDialog" :msg="confirmMsg" @confirm="deleteBatch()" />
    <confirm ref="confirmSyncTable" :msg="'同步表结构会清空原来表数据，确认同步？'" :icon="'sync'"
    @confirm="doSyncTable()" />
    <confirm ref="confirmSyncDatabase" :msg="'数据库同步会删除同名表，确认同步？'" :icon="'sync'"
    @confirm="doSyncDatabase()" />
  </q-page>
</template>

<script>
import { IndexMixin } from 'boot/mixins';
import { getDictLabel } from 'boot/dictionary';
import confirm from 'components/confirm';
import { requiredTest } from 'boot/inputTest';
import catalogselect from 'components/catalogselect';
import viewcatalog from 'components/viewcatalog';
import etlLogs from './logs';

export default {
  name: 'DataEtl',
  mixins: [IndexMixin],
  components: {
    confirm,
    viewcatalog,
    catalogselect,
    etlLogs,
  },
  data() {
    return {
      etlId: '',
      runTaskLoading: false,
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
          name: 'sourceId', align: 'left', label: '源数据源', field: 'sourceId',
        },
        {
          name: 'sourceTable', align: 'left', label: '源表', field: 'sourceTable',
        },
        {
          name: 'distId', align: 'left', label: '目标数据源', field: 'distId',
        },
        {
          name: 'distTable', align: 'left', label: '目标表', field: 'distTable',
        },
        {
          name: 'status', align: 'left', label: '运行状态', field: 'status',
        },
        {
          name: 'cron', align: 'left', label: '定时任务', field: 'cron',
        },
        {
          name: 'opt', align: 'center', label: '操作', field: 'opt',
        },
      ],
      sysDataSource: [],
      yn: [{ value: '0', label: '否' }, { value: '1', label: '是' }],
      quartzStatus: [{ value: -1, label: '停止' }, { value: 0, label: '正常' }],
      showQuery: true,
      headers: [{ name: 'Authorization', value: localStorage.Authorization }],
      uploadUrl: `${process.env.SERVER_URL}${process.env.BASE_URL}/sys/common/upload`,
      imgUrl: `${process.env.SERVER_URL}${process.env.BASE_URL}/sys/common/static`,
      url: {
        syncTable: '/data/etl/syncTable',
        syncDatabase: '/data/etl/syncDatabase',
        startStopJob: '/data/etl/startStopJob',
        list: '/data/etl/list',
        add: '/data/etl/add',
        copy: '/data/etl/copy',
        runTask: '/data/etl/runTask',
        edit: '/data/etl/edit',
        delete: '/data/etl/delete',
        deleteBatch: '/data/etl/deleteBatch',
        exportXlsUrl: '/data/etl/exportXls',
        importExcelUrl: '/data/etl/importExcel',
      },
    };
  },
  methods: {
    requiredTest,
    runTask(row) {
      this.$q.dialog({
        title: '操作确认',
        message: '确定要执行一次同步？',
        cancel: true,
        persistent: true,
      }).onOk(() => {
        this.$axios.get(`${this.url.runTask}?id=${row.id}`).then((r) => {
          this.$info(r.message);
        });
      }).onCancel(() => {
      });
    },
    logs(row) {
      this.etlId = row.id;
      this.$refs.etlLogs.show();
    },
    syncTable() {
      this.$refs.confirmSyncTable.show();
    },
    syncDatabase() {
      this.$refs.confirmSyncDatabase.show();
    },
    doSyncTable() {
      this.loading = true;
      const ids = [];
      this.selected.forEach(({ id }) => { ids.push(id); });
      return this.$axios.post(`${this.url.syncTable}?ids=${ids.join(',')}`, { }).then((r) => {
        this.$info(r.message);
        this.selected = [];
      }).finally(() => {
        this.query();
      });
    },
    doSyncDatabase() {
      this.loading = true;
      const ids = [];
      this.selected.forEach(({ id }) => { ids.push(id); });
      return this.$axios.post(`${this.url.syncDatabase}?ids=${ids.join(',')}`, { }).then((r) => {
        this.$info(r.message);
        this.selected = [];
      }).finally(() => {
        this.query();
      });
    },
    addBefore() {
      this.form.catalogId = this.catalog;
      this.form.autoMerge = '1';
      this.form.maxRow = 200;
      this.form.status = 0;
      this.form.cron = '*/50 * * * * ?';
      return true;
    },
    selectCatalog(n) {
      this.catalog = n;
      this.query();
    },
    getDictLabel,
    initDict() {
      this.$axios.get('/sys/dictItem/selectItemsByDefId?defId=sysDataSource').then((r) => {
        this.sysDataSource = r;
      });
      this.$axios.get('/sys/dictItem/selectItemsByDefId?defId=sysDataSource').then((r) => {
        this.sysDataSource = r;
      });
    },
    startStopJob(id, status) {
      const optName = status === 0 ? '启动' : '停止';
      this.$q.dialog({
        title: '操作确认',
        message: `确定要${optName}该任务？`,
        cancel: true,
        persistent: true,
      }).onOk(() => {
        this.$axios.get(`${this.url.startStopJob}?id=${id}&status=${status}`).then((r) => {
          this.$info(r.message);
          this.query();
        });
      }).onCancel(() => {
      });
    },
    copy(p) {
      this.$q.dialog({
        title: '复制ETL配置信息',
        message: '请输入名称',
        prompt: {
          model: '',
          outlined: true,
          isValid: (val) => val.length > 2,
          type: 'text',
        },
        cancel: true,
        persistent: true,
      }).onOk((data) => {
        this.$axios.post(`${this.url.copy}?id=${p.id}&name=${data}`, {}).then((r) => {
          this.$info(r.message);
          this.query();
        });
      });
    },
  },
  mounted() {
    this.initDict();
  },
};
</script>

<style lang="stylus"></style>
