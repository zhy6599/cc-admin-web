<template>
  <div>
    <q-page class="cc-admin column">
      <div class="col bg-white shadow-2 q-pa-md q-ma-sm">
        <div class="row items-center justify-start q-mb-md">
          <q-item class="col-xl-2 col-md-3 col-sm-6 col-xs-12">
            <q-item-section class="col-4 text-right gt-sm">
              <q-item-label>学号：</q-item-label>
            </q-item-section>
            <q-item-section class="col">
              <q-input
                dense
                outlined
                v-model="searchForm.search_0"
                type="text"
                lazy-rules
                placeholder="请输入单行文本"
                clearable
              />
            </q-item-section>
          </q-item>
          <q-item class="col-xl-2 col-md-3 col-sm-6 col-xs-12 q-pr-sm">
            <q-item-label class="col-12 text-right row no-wrap justify-center">
              <q-btn
                unelevated
                no-wrap
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
                no-wrap
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
          selection="multiple"
          :selected.sync="selected"
        >
          <template v-slot:top="table">
            <div class="row no-wrap full-width">
              <q-space />
              <q-btn-group outline>
                <q-btn outline icon="add" no-wrap color="primary" label="新建" @click="add" />
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
                  @click="exportExcel('动态表单')"
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

          <template #body-cell-opt="props">
            <q-td :props="props" :auto-width="true">
              <q-btn flat round dense color="primary" icon="edit" @click="edit(props.row)">
                <q-tooltip>编辑</q-tooltip>
              </q-btn>
              <btn-del label="动态表单" @confirm="del(props.row)" />
            </q-td>
          </template>
        </q-table>
      </div>
      <q-dialog maximized flat persistent ref="dialog" position="right">
        <q-form @submit="save" class="dialog_card column">
          <h5 class="view_title justify-between q-px-md">
            {{editType}}动态表单
            <q-btn dense outline round icon="clear" size="sm" v-close-popup />
          </h5>
          <q-scroll-area class="col">
            <div class="row q-col-gutter-x-md dialog_form q-pa-md">
              <div class="col row">
                <div class="column col-12">
                  <q-table
                    flat
                    color="primary"
                    class="cross_table col"
                    separator="cell"
                    :columns="sub_test_filter_columns"
                    :data="sub_test_filter_list"
                    row-key="id"
                    :pagination.sync="sub_test_filter_pagination"
                    :rows-per-page-options="[10,20,50,100]"
                    :loading="loading"
                    hide-bottom
                  >
                    <template #body-cell-field104="props">
                      <q-td :props="props">
                        <q-input
                          dense
                          outlined
                          v-model="props.row.field104"
                          type="text"
                          @blur="field104Blur"
                          @input="field104Input"
                          lazy-rules
                          :rules="[val => val && val.length > 0 || '这是必填字段']"
                          placeholder="请输入单行文本"
                          clearable
                        />
                      </q-td>
                    </template>
                    <template #body-cell-field107="props">
                      <q-td :props="props">
                        <q-input
                          dense
                          outlined
                          v-model="props.row.field107"
                          type="text"
                          @blur="field107Blur"
                          @input="field107Input"
                          lazy-rules
                          :rules="[val => val && val.length > 0 || '这是必填字段']"
                          placeholder="请输入单行文本"
                          clearable
                        />
                      </q-td>
                    </template>
                    <template #body-cell-opt="props">
                      <q-td :props="props" :auto-width="true">
                        <btn-del label="子表" @confirm="delSub(sub_test_filter_list,props.row)" />
                      </q-td>
                    </template>
                  </q-table>
                  <div class="row q-gutter-sm q-pa-sm">
                    <q-btn
                      dense
                      flat
                      text-color="light-blue-13"
                      label="新增一行"
                      icon="add"
                      @click="addSub(sub_test_filter_list,sub_test_filterForm)"
                    />
                    <q-btn dense flat text-color="light-blue-13" label="批量导入" icon="mdi-import" />
                  </div>
                </div>

                <div class="drawing-item col-6" v-if="showForm.field108">
                  <div class="dynamic-form-item">
                    <div v-show="true" class="dynamic-form-item-label" style="width:100%;">
                      <q-icon name="star" color="red" v-show="true" />学号
                    </div>
                    <q-input
                      dense
                      outlined
                      v-model="form.field108"
                      type="text"
                      @blur="field108Blur"
                      @input="field108Input"
                      lazy-rules
                      :rules="[val => val && val.length > 0 || '这是必填字段']"
                      placeholder="请输入单行文本"
                      clearable
                    />
                  </div>
                </div>
              </div>
            </div>
          </q-scroll-area>
          <div class="row justify-end q-pa-md">
            <q-btn outline color="white" text-color="primary" label="取消" v-close-popup />
            <q-btn unelevated color="primary" class="on-right" label="提交" type="submit" />
          </div>
        </q-form>
      </q-dialog>
      <q-dialog v-model="showDialog" persistent>
        <q-card>
          <q-card-section class="row items-center q-ml-lg q-mt-lg" style="min-width: 400px;">
            <q-avatar icon="mdi-delete-variant" color="primary" text-color="white" />
            <span class="q-ml-md">{{confirmMsg}}</span>
          </q-card-section>

          <q-card-actions align="right">
            <q-btn outline label="取消" color="primary" v-close-popup />
            <q-btn label="确定" color="primary" @click="deleteBatch()" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </q-page>
  </div>
</template>
<script>
export default {
  name: 'DynForm1639560970618',
  data() {
    return {
      sub_test_filter_pagination: { page: 1, rowsPerPage: 10, rowsNumber: 99 },
      sub_test_filter_list: [],
      sub_test_filterForm: { field104: null, field107: null },
      sub_test_filterEmptyForm: { field104: null, field107: null },
      sub_test_filter_columns: [
        {
          name: 'index',
          align: 'center',
          label: '序号',
          field: 'index',
        }, {
          name: 'field104', align: 'left', label: '学号', field: 'field104',
        }, {
          name: 'field107', align: 'left', label: '姓名', field: 'field107',
        }, {
          name: 'opt', align: 'center', label: '操作', field: 'opt',
        },
      ],

      showDialog: false,
      showQuery: true,
      tableLabel: '展开',
      loading: false,
      importing: false,
      exporting: false,
      confirmMsg: '',
      selected: [],
      list: [],
      form: { field104: null, field107: null, field108: null },
      emptyForm: { field104: null, field107: null, field108: null },
      searchForm: { search_0: null },
      showForm: { field104: true, field107: true, field108: true },
      resetShowForm: { field104: true, field107: true, field108: true },
      key: '',
      catalog: '',
      pagination: {
        page: 1,
        rowsPerPage: 10,
        rowsNumber: 99,
      },
      editType: '',
      group: [],
      columns: [
        {
          name: 'index',
          align: 'center',
          label: '序号',
          field: 'index',
        }, {
          name: 'field108', align: 'left', label: '学号', field: 'field108',
        }, {
          name: 'opt', align: 'center', label: '操作', field: 'opt',
        },
      ],
      headers: [{ name: 'Authorization', value: localStorage.Authorization }],
      uploadUrl: '',
      imgUrl: '',
      url: {
        list: '/dyn/form/queryDataList',
        inputDataList: '/dyn/form/inputDataList',
        relatedDataList: '/dyn/form/queryRelatedDataList',
        optionDataList: '/dyn/form/queryOptionDataList',
        expression: '/dyn/form/expression',
        add: '/dyn/form/saveData',
        edit: '/dyn/form/saveData',
        copy: '/dyn/form/copyData',
        delete: '/dyn/form/deleteData',
        deleteBatch: '/dyn/form/deleteBatchData',
        queryDataById: '/dyn/form/queryDataById',
        exportXlsUrl: '/dyn/form/exportXlsData',
        importExcelUrl: '/dyn/form/importExcelData',
      },
    };
  },
  methods: {
    field104Blur() { },
    field107Blur() { },
    field108Blur() {
      this.$axios.post(`${this.url.relatedDataList}?dynFormId=ab9771b1bb968466f130770904a707b4&subTable=sub_test_filter&autoLoadData=Y`, this.form).then(({ result }) => {
        this.sub_test_filter_list = result.map((v) => ({ field104: v.field101, field107: v.field102 }));
        this.calcDataIndex(this.sub_test_filter_list);
      }).finally(() => {
      });
    },
    undefinedInput() {
    },
    field104Input() {
    },
    field107Input() {
    },
    field108Input() {
    },
    formEditInput() {
      this.showForm = { ...this.resetShowForm };
    },

    calcDataIndex(dataList) {
      dataList.map((v, i) => {
        v.index = i + 1;
        return v;
      });
    },
    delSub(dataList, row) {
      dataList.splice(dataList.findIndex((item) => item.id === row.id), 1);
      this.calcDataIndex(dataList);
    },
    addSub(dataList, subForm) {
      dataList.push({ ...subForm });
      this.calcDataIndex(dataList);
    },
    getDictLabel(data, key) {
      if (key instanceof Array) {
        const result = [];
        key.forEach((k) => {
          result.push((data.find((v) => Object.values(v).includes(k)) || {}).label || k);
        });
        return result.join(',');
      }
      return (data.find((v) => Object.values(v).includes(key)) || {}).label || key;
    },
    initDict() {

    },
    queryParam() {
      return { dynFormId: this.$route.query.id };
    },
    beforeQuery() {
      if (!this.$route.query.id) {
        this.$error('未找到表单编号');
        return false;
      }
      return true;
    },
    query(props) {
      if (!this.beforeQuery()) {
        return false;
      }
      if (props && props.pagination) {
        this.pagination = props.pagination;
      }
      this.loading = true;
      return this.$axios.get(this.url.list, {
        params:
        {
          ...this.queryParam(),
          ...this.searchForm,
          key: this.key,
          catalog: this.catalog,
          pageNo: this.pagination.page,
          pageSize: this.pagination.rowsPerPage,
        },
      }).then((r) => {
        if (!r.result || !r.result.records || r.result.records.length === 0) {
          this.list = [];
          this.pagination.rowsNumber = 0;
        } else {
          this.list = r.result.records.map((v, i) => {
            if (r.result.current > 1) {
              v.index = (r.result.current - 1) * r.result.size + (i + 1);
            } else {
              v.index = i + 1;
            }
            return v;
          });
          this.pagination.rowsNumber = r.result.total;
        }
      }).finally(() => {
        this.loading = false;
        this.calcDataIndex(this.sub_test_filter_list);
      });
    },
    del({ id }) {
      this.loading = true;
      return this.$axios.delete(this.url.delete, { params: { dynFormId: this.$route.query.id, id } }).then((r) => {
        this.$info(r.message);
        this.delAfter();
      }).finally(() => {
        this.query();
      });
    },
    delAfter() {

    },
    showConfirm() {
      this.confirmMsg = `确认删除这 ${this.selected.length} 条记录吗？`;
      this.showDialog = true;
    },
    deleteBatch() {
      this.loading = true;
      const ids = [];
      this.selected.forEach(({ id }) => { ids.push(id); });
      return this.$axios.delete(this.url.deleteBatch, { params: { dynFormId: this.$route.query.id, ids: ids.join(',') } }).then((r) => {
        this.$info(r.message);
        this.selected = [];
      }).finally(() => {
        this.query();
      });
    },
    addBefore() {
      this.form = { dynFormId: this.$route.query.id, ...this.emptyForm };

      this.$axios.post(`${this.url.relatedDataList}?dynFormId=ab9771b1bb968466f130770904a707b4&subTable=sub_test_filter&autoLoadData=Y`, this.form).then(({ result }) => {
        this.sub_test_filter_list = result.map((v) => ({ field104: v.field101, field107: v.field102 }));
        this.calcDataIndex(this.sub_test_filter_list);
      });
      this.calcDataIndex(this.sub_test_filter_list);

      this.formEditInput();
      return true;
    },
    add() {
      this.editType = '新建';
      if (this.addBefore()) {
        this.$refs.dialog.show();
      }
      this.addAfter();
    },
    addAfter() {

    },
    editBefore(p) {
      return true;
    },
    edit(p) {
      if (this.editBefore(p)) {
        this.editType = '编辑';
        this.$axios.get(this.url.queryDataById, { params: { dynFormId: this.$route.query.id, id: p.id } }).then(({ result }) => {
          this.form = {
            dynFormId: this.$route.query.id,
            ...result.form,
          };
          this.sub_test_filter_list = result.sub_test_filter_list || [];
          this.calcDataIndex(this.sub_test_filter_list);
          this.formEditInput();
          this.$refs.dialog.show();
        }).finally(() => {
        });
      }
      this.editAfter();
    },
    editAfter() {

    },
    importExcel() {
      this.$refs.excelUploader.pickFiles();
    },
    importedExcel({ xhr }) {
      this.$refs.excelUploader.removeUploadedFiles();
      const { response } = xhr;
      const res = JSON.parse(response);
      if (res.code === 200) {
        this.$info(res.message);
      } else {
        this.$error(res.message);
      }
      this.query();
    },
    exportExcel(fileName) {
      if (!fileName || typeof fileName !== 'string') {
        fileName = '导出文件';
      }
      this.exporting = true;
      this.$downFile(this.url.exportXlsUrl, {
        params:
        {
          ...this.queryParam(),
          ...this.searchForm,
          key: this.key,
          catalog: this.catalog,
          pageNo: 1,
          pageSize: 1000,
        },
      }).then((data) => {
        if (!data) {
          this.$message.warning('文件下载失败');
          return;
        }
        if (typeof window.navigator.msSaveBlob !== 'undefined') {
          window.navigator.msSaveBlob(new Blob([data], { type: 'application/vnd.ms-excel' }), `${fileName}.xls`);
        } else {
          const url = window.URL.createObjectURL(new Blob([data], { type: 'application/vnd.ms-excel' }));
          const link = document.createElement('a');
          link.style.display = 'none';
          link.href = url;
          link.setAttribute('download', `${fileName}.xls`);
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link); // 下载完成移除元素
          window.URL.revokeObjectURL(url); // 释放掉blob对象
        }
      }).finally(() => {
        this.exporting = false;
      });
    },

    delFile({ url }) {
      this.fileList = this.fileList.filter((v) => v.url !== url);
    },
    save() {
      let q;
      this.form.sub_test_filter_list = this.sub_test_filter_list;
      if (this.editType === '新建') {
        q = this.$axios.post(this.url.add, this.form);
      } else {
        q = this.$axios.put(this.url.edit, this.form);
      }
      return q.then((r) => {
        this.$info(r.message);
        this.$refs.dialog.hide();
      }).finally(() => {
        this.query();
      });
    },
    close() {
      this.$refs.dialog.hide();
    },
    searchReset() {
      this.searchForm = { search_0: null };
      this.query();
    },
    show() {
      this.showQuery = true;
      this.tableLabel = '收起';
    },
    hide() {
      this.showQuery = false;
      this.tableLabel = '展开';
    },
    copy(p) {
      this.$q.dialog({
        title: '复制',
        message: '请输新的名称',
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
    emailTest(v) {
      let t = true;
      const p = /^([A-Za-z0-9_\-.\u4e00-\u9fa5])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,8})$/;
      if (v && !p.test(v)) {
        t = '请输入有效的电子邮件地址';
      }
      return t;
    },
    phoneTest(v) {
      let t = true;
      const p = /^1[3-9]\d{9}$/;
      if (v && !p.test(v)) {
        t = '请输入有效的网址手机号码';
      }
      return t;
    },
    numberTest(v) {
      let t = true;
      const p = /^-?\d*\.?\d+$/;
      if (v && !p.test(v)) {
        t = '只能输入数字';
      }
      return t;
    },
    letterTest(v) {
      let t = true;
      const p = /^[a-zA-Z]*$/;
      if (v && !p.test(v)) {
        t = '只能输入字母';
      }
      return t;
    },
    hcodeTest(v) {
      let t = true;
      const p = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
      if (v && !p.test(v)) {
        t = '请输入有效的身份证号码';
      }
      return t;
    },
  },
  mounted() {
    this.addBefore();
    this.initDict();
    this.query();
  },
  created() {
    this.columns.forEach(({ name }) => {
      this.group.push(name);
    });
  },
  computed: {
    importExcelUrlFull() {
      return '';
    },
  },
  watch: {

  },
};
</script>
<style>
</style>
