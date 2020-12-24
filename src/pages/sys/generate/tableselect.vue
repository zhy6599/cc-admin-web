<template>
  <q-dialog v-model="showDialog" maximized flat persistent position="right">
    <q-card class="dialog_card">
      <div class="row self-center bg-blue-grey-1">
        <div class="text-h6" style="line-height: 45px;padding-left: 16px;">从数据库导入表</div>
        <q-space />
        <q-btn dense flat icon="close" v-close-popup style="width: 45px;">
          <q-tooltip>Close</q-tooltip>
        </q-btn>
      </div>
      <q-card-section>
        <div class="row justify-between" style="padding-bottom: 16px;">
          <q-input
            dense
            clearable
            outlined
            class="qInput"
            placeholder="搜索"
            @input="query"
            v-model="filter"
            :debounce="500"
          >
            <template v-slot:append>
              <q-btn dense flat round icon="search" @click="query()" />
            </template>
          </q-input>
        </div>
        <div style="border: 1px solid #cacaca;">
          <div class="row justify-around" style="width:100%">
            <div class="col">
              <div style="height: 600px;">
                <q-table
                  class
                  flat
                  separator="cell"
                  :data="dataList"
                  row-key="id"
                  :loading="loading"
                  :columns="columns"
                  :rows-per-page-options="[10]"
                >
                  <template v-slot:body="props">
                    <q-tr :props="props" @click="subbmit(props.row.id)" style="cursor:pointer;">
                      <q-td key="index" :props="props">
                        {{
                        props.row.index
                        }}
                      </q-td>
                      <q-td key="id" :props="props">
                        {{
                        props.row.id
                        }}
                      </q-td>
                      <q-td key="name" :props="props">
                        {{
                        props.row.name
                        }}
                      </q-td>
                    </q-tr>
                  </template>
                </q-table>
              </div>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>

export default {
  name: 'table-select',
  props: {
    fieldData: Object,
  },
  components: {},
  data() {
    return {
      loading: false,
      dataList: [],
      showDialog: false,
      filter: '',
      pagination: {
        sortBy: 'id',
        page: 1,
        rowsPerPage: 10,
        rowsNumber: 10,
      },
      columns: [
        {
          name: 'index',
          label: '序号',
          align: 'center',
          field: 'index',
        },
        {
          name: 'id',
          align: 'center',
          label: '表名称',
          field: 'id',
        },
        {
          name: 'name',
          align: 'center',
          label: '表描述',
          field: 'name',
        },
      ],
    };
  },
  methods: {
    subbmit(tableName) {
      // 这里做保存不用发消息
      this.loading = true;
      this.$axios.get(`/generate/syncTableByName?tableName=${tableName}`)
        .then(({ result }) => {
          if (result) {
            this.$emit('syncTableByName', this.data);
            this.$info('同步成功');
          } else {
            this.$error('同步失败');
          }
        }).finally(() => {
          this.loading = false;
        });
      // this.showDialog = false;
    },
    query() {
      this.loading = true;
      this.pagination.page = 1;
      this.$axios.get('/generate/tableList', {
        params:
        {
          filter: this.filter,
          pageNo: this.pagination.page,
          pageSize: this.pagination.rowsPerPage,
        },
      })
        .then(({ result }) => {
          let index = 1;
          this.dataList = [];
          result.records.forEach((element) => {
            element.index = index;
            index += 1;
            this.dataList.push(element);
          });
          this.pagination.rowsNumber = result.total;
        }).finally(() => {
          this.loading = false;
        });
    },
  },
  mounted() {
    this.query();
  },
};
</script>
<style>
.table-select-dialog .qInput {
  height: 32px !important;
}
.table-select-dialog .qInput .q-field__control {
  height: 32px !important;
  min-height: 32px !important;
}
.table-select-dialog .qInput .q-field__control .q-field__control-container {
  height: 32px !important;
}
.table-select-dialog
  .qInput
  .q-field__control
  .q-field__control-container
  .q-field__native {
  min-height: 32px !important;
}
.table-select-dialog .qInput .q-field__append {
  height: 32px !important;
}
</style>
