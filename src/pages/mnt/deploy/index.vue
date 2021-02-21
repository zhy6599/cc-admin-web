<template>
  <q-page class="cc-admin row">
    <viewcatalog
      class="q-mt-sm q-mb-sm q-ml-sm"
      type="MntDeploy"
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
        <template v-slot:top>
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
                @click="exportExcel('部署管理')"
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
              <q-btn
                outline
                no-wrap
                v-if="$q.screen.gt.sm"
                label="系统还原"
                icon="mdi-restore"
                :loading="importing"
                color="primary"
                :disable="selected.length === 0"
                @click="sysRestore"
              />
              <q-btn
                outline
                no-wrap
                v-if="$q.screen.gt.sm"
                label="状态查询"
                icon="mdi-resistor-nodes"
                :loading="importing"
                color="primary"
                :disable="selected.length === 0"
                @click="serviceStatus"
              />
              <q-btn
                outline
                no-wrap
                v-if="$q.screen.gt.sm"
                label="启动"
                icon="mdi-play-circle-outline"
                :loading="importing"
                color="primary"
                :disable="selected.length === 0"
                @click="serviceStart"
              />
              <q-btn
                outline
                no-wrap
                v-if="$q.screen.gt.sm"
                label="停止"
                icon="mdi-stop-circle-outline"
                :loading="importing"
                color="primary"
                :disable="selected.length === 0"
                @click="serviceStop"
              />
              <q-btn
                outline
                no-wrap
                v-if="$q.screen.gt.sm"
                label="重启"
                icon="mdi-restart"
                :loading="importing"
                color="primary"
                :disable="selected.length === 0"
                @click="serviceRestart"
              />
              <q-btn
                outline
                no-wrap
                v-if="$q.screen.gt.sm"
                label="一键部署"
                icon="mdi-rivet"
                :loading="importing"
                color="primary"
                :disable="selected.length === 0"
                @click="deploy"
              >
                <q-uploader
                  auto-upload
                  ref="deployUploader"
                  :max-files="1"
                  class="hidden"
                  :url="importExcelUrlFull"
                  field-name="file"
                  :headers="[{name: 'authorization', value: $store.state.User.authorization}]"
                  @uploaded="importedDeploy"
                />
              </q-btn>
            </q-btn-group>
          </div>
        </template>
        <template #body-cell-appId="props">
          <q-td key="appId" :props="props">{{getDictLabel(mntApp,props.row.appId) }}</q-td>
        </template>
        <template #body-cell-serverId="props">
          <q-td key="serverId" :props="props">{{getDictLabel(mntServer,props.row.serverId) }}</q-td>
        </template>
        <template #body-cell-opt="props">
          <q-td :props="props" :auto-width="true">
            <q-btn flat round dense color="primary" icon="edit" @click="edit(props.row)">
              <q-tooltip>编辑</q-tooltip>
            </q-btn>
            <btn-del label="部署管理" @confirm="del(props.row)" />
          </q-td>
        </template>
      </q-table>
    </div>
    <q-dialog maximized flat persistent ref="dialog" position="right">
      <q-form @submit="submit" class="dialog_card column">
        <h5 class="view_title justify-between q-px-md">
          {{editType}}部署管理
          <q-btn dense outline round icon="clear" size="sm" v-close-popup />
        </h5>
        <q-scroll-area class="col">
          <div class="row q-col-gutter-x-md dialog_form q-pa-md">
            <div class="col-12">
              <h5>
                <q-icon name="star" color="red" />名称：
              </h5>
              <q-input outlined dense v-model="form.name" type="text" :rules="[requiredTest]" />
            </div>
            <div class="col-12">
              <h5>
                <q-icon name="star" color="red" />应用：
              </h5>
              <q-select
                outlined
                dense
                emit-value
                v-model="form.appId"
                map-options
                :options="mntApp"
              />
            </div>
            <div class="col-12">
              <h5>
                <q-icon name="star" color="red" />服务器：
              </h5>
              <q-select
                outlined
                dense
                emit-value
                v-model="form.serverId"
                map-options
                :options="mntServer"
              />
            </div>
            <div class="col-12">
              <h5>分类目录：</h5>
              <catalogselect :form.sync="form" type="MntDeploy" />
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
  </q-page>
</template>

<script>
import { IndexMixin } from 'boot/mixins';
import { getDictLabel } from 'boot/dictionary';
import confirm from 'components/confirm';
import { requiredTest } from 'boot/inputTest';
import catalogselect from 'components/catalogselect';
import viewcatalog from 'components/viewcatalog';

export default {
  name: 'MntDeploy',
  mixins: [IndexMixin],
  components: {
    confirm,
    viewcatalog,
    catalogselect,
  },
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
          name: 'name', align: 'left', label: '名称', field: 'name',
        },
        {
          name: 'appId', align: 'left', label: '应用', field: 'appId',
        },
        {
          name: 'serverId', align: 'left', label: '服务器', field: 'serverId',
        },
        {
          name: 'catalogId_dictText', align: 'left', label: '分类目录', field: 'catalogId_dictText',
        },
        {
          name: 'opt', align: 'center', label: '操作', field: 'id',
        },
      ],
      mntApp: [],
      mntServer: [],
      showQuery: true,
      headers: [{ name: 'Authorization', value: localStorage.Authorization }],
      uploadUrl: `${process.env.SERVER_URL}${process.env.BASE_URL}/sys/common/upload`,
      imgUrl: `${process.env.SERVER_URL}${process.env.BASE_URL}/sys/common/static`,
      url: {
        list: '/mnt/deploy/list',
        add: '/mnt/deploy/add',
        edit: '/mnt/deploy/edit',
        delete: '/mnt/deploy/delete',
        deleteBatch: '/mnt/deploy/deleteBatch',
        exportXlsUrl: '/mnt/deploy/exportXls',
        importExcelUrl: '/mnt/deploy/importExcel',
        serviceStatus: '/mnt/deploy/serviceStatus',
        serviceStart: '/mnt/deploy/serviceStart',
        serviceStop: '/mnt/deploy/serviceStop',
      },
    };
  },
  methods: {
    requiredTest,
    addBefore() {
      this.form.catalogId = this.catalog;
      return true;
    },
    selectCatalog(n) {
      this.catalog = n;
      this.query();
    },
    getDictLabel,
    initDict() {
      this.$axios.get('/sys/dictItem/selectItemsByDefId?defId=mntApp').then((r) => {
        this.mntApp = r;
      });
      this.$axios.get('/sys/dictItem/selectItemsByDefId?defId=mntServer').then((r) => {
        this.mntServer = r;
      });
    },
    deploy() {
      this.$refs.keyFileUploader.pickFiles();
    },
    importedDeploy({ xhr }) {
      this.$refs.keyFileUploader.removeUploadedFiles();
      const { response } = xhr;
      const res = JSON.parse(response);
      if (res.success) {
        this.form.keyFile = res.message;
      } else {
        this.$error(res.message);
      }
    },
    sysRestore() {
      this.$refs.sysRestore.dialog = true;
    },
    serviceStart() {
      const ids = [];
      this.selected.forEach(({ id }) => { ids.push(id); });
      return this.$axios.get(this.url.serviceStart, { params: { ids: ids.join(',') } }).then((r) => {
        this.$info(r.message, true);
      }).finally(() => {
      });
    },
    serviceStop() {
      const ids = [];
      this.selected.forEach(({ id }) => { ids.push(id); });
      return this.$axios.get(this.url.serviceStop, { params: { ids: ids.join(',') } }).then((r) => {
        this.$info(r.message, true);
      }).finally(() => {
      });
    },
    serviceRestart() {

    },
    serviceStatus() {
      const ids = [];
      this.selected.forEach(({ id }) => { ids.push(id); });
      return this.$axios.get(this.url.serviceStatus, { params: { ids: ids.join(',') } }).then((r) => {
        this.$info(r.message, true);
      }).finally(() => {
      });
    },
  },
  mounted() {
    this.initDict();
  },
};
</script>

<style lang="stylus"></style>
