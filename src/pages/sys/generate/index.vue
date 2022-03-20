<template>
  <q-page class="cc-admin q-pa-sm">
    <div class="col bg-white shadow-2 q-pa-md">
      <q-table
        :data="list"
        row-key="id"
        flat
        color="primary"
        class="cross_table"
        separator="cell"
        :columns="columns"
        :loading="loading"
        :filter="filter"
        @request="query"
        :rows-per-page-options="[10,20,50]"
        :pagination.sync="pagination"
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
                <q-btn
                  flat
                  round
                  icon="search"
                  color="primary"
                  @click="query"
                  :loading="loading"
                >
                  <q-tooltip>搜索</q-tooltip>
                </q-btn>
              </template>
            </q-input>
            <q-space />
            <q-btn-group outline>
              <q-btn
                outline no-wrap
                icon="mdi-table-sync"
                color="primary"
                label="导入数据库表"
                @click="openTableSelect()"
              />
              <q-btn
                outline
                color="primary"
                label="切换全屏" no-wrap v-if="$q.screen.gt.md"
                @click="table.toggleFullscreen"
                :icon="table.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
              />
            </q-btn-group>
          </div>
        </template>

        <template v-slot:header="props">
          <q-tr :props="props" class="bg-grey-2">
            <q-th v-for="col in props.cols" :key="col.name" :props="props">{{ col.label }}</q-th>
          </q-tr>
        </template>
        <template #body-cell-isSync="table">
          <q-td class="text-center">
            <q-icon
              name="mdi-sync"
              v-if="table.row.isSync === '1'"
              style="font-size: 30px;"
              class="text-blue-12"
            >
              <q-tooltip>已同步</q-tooltip>
            </q-icon>
            <q-icon name="mdi-sync-off" v-else style="font-size: 30px;" class="text-red">
              <q-tooltip>未同步</q-tooltip>
            </q-icon>
            {{table.row.type}}
          </q-td>
        </template>
        <template #body-cell-do="table">
          <q-td class="text-center" :auto-width="true">
            <q-btn
              flat
              round
              dense
              color="primary"
              icon="mdi-image-edit-outline"
              @click="design(table)"
            >
              <q-tooltip>代码设计</q-tooltip>
            </q-btn>
            <q-btn
              flat
              round
              dense
              color="positive"
              icon="mdi-eye-outline"
              @click="viewCode(table)"
            >
              <q-tooltip>代码查看</q-tooltip>
            </q-btn>
            <q-btn
              flat
              round
              dense
              color="deep-purple-12"
              icon="mdi-cloud-download"
              @click="downCode(table)"
            >
              <q-tooltip>代码下载</q-tooltip>
            </q-btn>
            <q-btn
              flat
              round
              dense
              color="accent"
              icon="mdi-cloud-print-outline"
              @click="config(table)"
            >
              <q-tooltip>代码生成</q-tooltip>
            </q-btn>
            <q-btn
              flat
              round
              dense
              color="warning"
              icon="mdi-database-import"
              @click="syncTableToDb(table.row.id)"
            >
              <q-tooltip>同步到数据库</q-tooltip>
            </q-btn>
            <q-btn
              flat
              round
              dense
              color="indigo-7"
              icon="mdi-database-export"
              @click="syncTableToConfig(table.row.id)"
            >
              <q-tooltip>同步到配置信息</q-tooltip>
            </q-btn>
            <btn-del :label="table.row.name" @confirm="del(table)" />
          </q-td>
        </template>
      </q-table>
    </div>
    <q-dialog v-model="confirm" persistent>
      <q-card style="width:380px;">
        <q-card-section>
          <div>确认操作</div>
        </q-card-section>
        <q-card-section class="row items-center">
          <q-avatar
            class="q-ml-lg"
            size="md"
            icon="mdi-comment-alert-outline"
            color="primary"
            text-color="white"
          />
          <div class="q-ml-lg">数据库表将被删除重建!</div>
        </q-card-section>
        <q-card-actions align="right">
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
            @click="doSync"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <tableselect ref="tableselect" @syncTableByName="query" />
    <design ref="design" :id="id" @syncTableByName="query" />
    <config ref="config" :id="id" />
    <preview ref="preview" :id="id" />
  </q-page>
</template>

<script>
import btnDel from 'components/btndel';
import tableselect from './tableselect';
import design from './design';
import config from './config';
import preview from './preview';

export default {
  name: 'Generate',
  components: {
    btnDel,
    tableselect,
    design,
    config,
    preview,
  },
  data() {
    return {
      key: '',
      loading: false,
      checking: false,
      confirm: false,
      list: [],
      id: '',
      selectedCatalog: '',
      catalogList: [],
      allCatalogList: [],
      columns: [{
        name: 'name', label: '表名', field: 'name', align: 'center', sortable: true,
      }, {
        name: 'description', label: '表描述', field: 'description', align: 'center', sortable: true,
      }, {
        name: 'isSync', label: '同步状态', field: 'isSync', align: 'center', sortable: true,
      }, {
        name: 'createTime', label: '创建日期', field: 'createTime', align: 'center', sortable: true,
      }, {
        name: 'do', label: '操作', field: 'id', align: 'center',
      }],
      filter: '',
      pagination: {
        sortBy: 'name',
        page: 1,
        rowsPerPage: 10,
        rowsNumber: 10,
      },
      type: '',
    };
  },
  methods: {
    getDictLabel(value) {
      return value === '1' ? '是' : '否';
    },
    query(props) {
      if (props && props.pagination) {
        this.pagination = props.pagination;
      }
      // 字典列表
      this.loading = true;
      this.$axios.get(`/generate/list?filter=${this.filter}&pageNo=${this.pagination.page}&pageSize=${this.pagination.rowsPerPage}`).then(({ result }) => {
        this.list = result.records;
        this.pagination.rowsNumber = result.total;
      }).finally(() => {
        this.loading = false;
      });
    },
    openTableSelect() {
      this.$refs.tableselect.showDialog = true;
    },
    design(t) {
      this.id = t.row.id;
      this.$refs.design.show(this.id);
    },
    syncTableToDb(id) {
      this.id = id;
      this.confirm = true;
    },
    syncTableToConfig(id) {
      this.id = id;
      this.loading = true;
      this.$axios.get(`/generate/syncTableToConfig?id=${this.id}`).then((r) => {
        this.$info(r.message);
        if (r.success) {
          this.query();
        }
      }).finally(() => {
        this.loading = false;
      });
    },
    doSync() {
      this.confirm = false;
      this.loading = true;
      this.$axios.get(`/generate/syncTableToDb?id=${this.id}`).then((r) => {
        this.$info(r.message);
        if (r.success) {
          this.query();
        }
      }).finally(() => {
        this.loading = false;
      });
    },
    config(t) {
      this.id = t.row.id;
      this.$refs.config.show(this.id);
    },
    viewCode(t) {
      this.id = t.row.id;
      this.$refs.preview.show(this.id);
    },
    downCode(t) {
      const fileName = 'generate';
      this.exporting = true;
      this.$downFile(`/generate/downloadCode?id=${t.row.id}`).then((data) => {
        if (!data) {
          this.$message.warning('代码下载失败');
          return;
        }
        if (typeof window.navigator.msSaveBlob !== 'undefined') {
          window.navigator.msSaveBlob(new Blob([data], { type: 'application/octet-stream' }), `${fileName}.zip`);
        } else {
          const url = window.URL.createObjectURL(new Blob([data], { type: 'application/octet-stream' }));
          const link = document.createElement('a');
          link.style.display = 'none';
          link.href = url;
          link.setAttribute('download', `${fileName}.zip`);
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link); // 下载完成移除元素
          window.URL.revokeObjectURL(url); // 释放掉blob对象
        }
      }).finally(() => {
        this.exporting = false;
      });
    },
    open(t) {
      this.base = this.reset();
      if (t) {
        this.type = '修改';
        this.loading = true;
        this.$axios.get(`/generate/queryById?id=${t.row.id}`).then(({ result }) => {
          result.config = JSON.parse(result.config);
          this.base = result;
        }).finally(() => {
          this.loading = false;
        });
      } else {
        this.type = '新建';
        if (this.selectedCatalog) {
          this.base.catalogId = this.selectedCatalog;
        }
      }
      this.$refs.dialog.show();
      this.$nextTick(() => {
        this.$refs.popform.resetValidation();
      });
    },
    submit() {
      this.loading = true;
      let a;
      const param = { ...this.base };
      if (this.type === '修改') {
        a = this.$axios.put('/generate/edit', param);
      } else {
        a = this.$axios.post('/generate/add', param);
      }
      a.then((r) => {
        this.$info(r.message);
        this.$refs.dialog.hide();
      }).finally(() => {
        this.query();
      });
    },
    del({ row }) {
      this.$axios.delete(`/generate/delete?id=${row.id}`).then((r) => {
        this.$info(r.message);
      }).finally(() => {
        this.query();
      });
    },
  },
  watch: {
  },
  mounted() {
    this.query();
  },
};
</script>

<style lang="stylus">
@import '~src/css/quasar.variables.styl';

</style>
