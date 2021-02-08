import ellipsisvalue from 'components/ellipsisvalue';

export const IndexMixin = {
  components: {
    ellipsisvalue,
  },
  data() {
    return {
      loading: false,
      importing: false,
      exporting: false,
      confirmMsg: '',
      selected: [],
      list: [],
      form: {},
      emptyForm: {},
      searchForm: {},
      key: '',
      catalog: '',
      pagination: {
        page: 1,
        rowsPerPage: 10,
        rowsNumber: 99,
      },
      editType: '',
      uploadUrl: `${process.env.SERVER_URL}/quasarUpload`,
      group: [],
    };
  },
  methods: {
    queryParam() {
      return {};
    },
    beforeQuery() {
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
        this.list = r.result.records.map((v, i) => {
          if (r.result.current > 1) {
            v.index = (r.result.current - 1) * r.result.size + (i + 1);
          } else {
            v.index = i + 1;
          }
          return v;
        });
        this.pagination.rowsNumber = r.result.total;
      }).finally(() => {
        this.loading = false;
      });
    },
    reset() {
      this.form = { ...this.emptyForm };
    },
    del({ id }) {
      this.loading = true;
      return this.$axios.delete(this.url.delete, { params: { id } }).then((r) => {
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
      this.$refs.confirmDialog.show();
    },
    deleteBatch() {
      this.loading = true;
      const ids = [];
      this.selected.forEach(({ id }) => { ids.push(id); });
      return this.$axios.delete(this.url.deleteBatch, { params: { ids: ids.join(',') } }).then((r) => {
        this.$info(r.message);
        this.selected = [];
      }).finally(() => {
        this.query();
      });
    },
    addBefore() {
      return true;
    },
    ellipsis(value, vlength = 25) {
      if (!value) {
        return '';
      }
      if (value.length > vlength) {
        return `${value.slice(0, vlength)}...`;
      }
      return value;
    },
    add() {
      this.editType = '新建';
      this.reset();
      if (this.addBefore()) {
        this.$refs.dialog.show();
      }
      this.addAfter();
    },
    addAfter() {

    },
    editBefore() {
      return true;
    },
    edit(p) {
      if (this.editBefore(p)) {
        this.editType = '编辑';
        this.form = {
          ...p,
        };
        this.$refs.dialog.show();
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
    submit() {
      let q;
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
    searchReset() {
      this.searchForm = {};
      this.query();
    },
  },
  mounted() {
    this.searchForm = {};
    this.query();
  },
  created() {
    this.columns.forEach(({ name }) => {
      this.group.push(name);
      this.emptyForm[name] = null;
    });
  },
  computed: {
    importExcelUrlFull() {
      return process.env.BASE_URL + this.url.importExcelUrl;
    },
  },

};
