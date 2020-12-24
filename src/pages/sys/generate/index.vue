<template>
  <q-page class="column q-pa-sm">
    <div class="col column view_card shadow-2 q-pa-md">
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
        <template #top-left>
          <div class="row no-wrap">
            <q-input
              clearable
              outlined
              dense
              placeholder="请输入关键字搜索"
              class="on-left"
              @input="query"
              debounce="500"
              v-model.trim="filter"
            >
              <template #append>
                <q-btn flat round icon="search" color="primary" @click="query" :loading="loading">
                  <q-tooltip>搜索</q-tooltip>
                </q-btn>
              </template>
            </q-input>
          </div>
        </template>
        <template #top-right="table">
          <q-btn-group outline>
            <q-btn
              outline
              icon="mdi-table-sync"
              color="primary"
              label="导入数据库表"
              @click="openTableSelect()"
            />
            <q-btn
              outline
              color="primary"
              label="切换全屏"
              @click="table.toggleFullscreen"
              :icon="table.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
            />
          </q-btn-group>
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
          <q-btn flat label="取消" color="grey-4" text-color="grey-6" v-close-popup />
          <q-btn flat label="确定" color="primary" @click="doSync" />
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
  name: 'DataSourceList',
  components: {
    btnDel,
    tableselect,
    design,
    config,
    preview,
  },
  data() {
    return {
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

.d_w_l_g_1 {
  .text-body1 {
    border-bottom: 1px solid $snow;
  }

  .q-field__control {
    padding-left: 9px !important;
  }

  .q-scrollarea {
    border-bottom: 1px solid $ash;
  }
}

.d_w_l_g_2 {
  background: #fff;
  border-left: 1px solid $ash;

  .q-tabs {
    border-bottom: 1px solid $ash;

    .q-tabs__content {
      flex-wrap: wrap;
    }

    .q-tab {
      padding: 0;
      min-height: 40px;
    }

    .q-tab__content {
      min-width: 0;
    }
  }
}

.delete-chart {
  display: block;
  position: absolute;
  right: 2px;
  top: 2px;
  color: lightsalmon;
  cursor: pointer;
}

.grid-item-select {
  flex: 1;
  border-style: dashed;
  border-width: 2px;
  border-color: #00bfff;
}

.grid-item-unselect {
  flex: 1;
  border-style: solid;
  border-width: 1px;
  border-color: #b8b6ba;
}

.chartIcon {
  font-size: 32px;
  color: #fff;
}

.gridBackground {
  backgroundImage: 'linear-gradient(90deg, #f2f2f2 10%, rgba(0, 0, 0, 0) 10%),
linear-gradient(#f2f2f2 10%, rgba(0, 0, 0, 0) 10%)';
}
</style>
