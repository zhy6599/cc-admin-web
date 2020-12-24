import ellipsisvalue from 'components/ellipsisvalue';

export const IndexMixin = {
  components: {
    ellipsisvalue,
  },
  data() {
    return {
      loading: false,
      confirmMsg: '',
      selected: [],
      list: [],
      form: {},
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
      this.form = {};
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
    uploaded({ xhr }) {
      const url = `${process.env.SERVER_URL}/download/${JSON.parse(xhr.responseText).message}`;
      this.form.imageUrl = url;
      this.fileList.push({
        label: xhr,
        url,
      });
      this.$refs.up.removeUploadedFiles();
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
    });
  },
};
