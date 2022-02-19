<template>
  <div class="table-select row justify-start">
    <q-dialog v-model="showDialog">
      <q-card class="table-select-dialog" style="width:850px;">
        <div class="row self-center bg-blue-grey-1">
          <div class="text-h6" style="line-height: 45px;padding-left: 16px;">选择字典</div>
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
              v-model="key"
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
                    :rows-per-page-options="[10, 20, 50, 100]"
                    :pagination.sync="pagination"
                    @request="query"
                  >
                    <template v-slot:body="props">
                      <q-tr
                        :props="props"
                        @click="selectDict(props.row.dictCode, props.row.dictName)"
                        style="cursor:pointer;"
                      >
                        <q-td key="index" :props="props">
                          {{
                          props.row.index
                          }}
                        </q-td>
                        <q-td key="dictName" :props="props">
                          {{
                          props.row.dictName
                          }}
                        </q-td>
                        <q-td key="description" :props="props">
                          {{
                          props.row.description
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
  </div>
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
      key: '',
      pagination: {
        page: 1,
        rowsPerPage: 10,
        rowsNumber: 99,
      },
      columns: [
        {
          name: 'index',
          label: '序号',
          align: 'center',
          field: 'index',
        },
        {
          name: 'dictName',
          align: 'center',
          label: '字典名称',
          field: 'dictName',
        },
        {
          name: 'description',
          align: 'center',
          label: '字典描述',
          field: 'description',
        },
      ],
    };
  },
  methods: {
    selectDict(code, name) {
      this.$emit('doSelDic', code, name);
      this.showDialog = false;
    },
    query(props) {
      if (props && props.pagination) {
        this.pagination = props.pagination;
      }
      this.loading = true;
      this.$axios.get(`/sys/dict/list?key=${this.key}&pageNo=${this.pagination.page}&pageSize=${this.pagination.rowsPerPage}`).then(({ result }) => {
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
