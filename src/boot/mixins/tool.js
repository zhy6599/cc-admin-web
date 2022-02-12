import ellipsisvalue from 'components/ellipsisvalue';

export const Tool = {
  components: {
    ellipsisvalue,
  },
  data() {
    return {
      toolColumnList: [],
    };
  },
  methods: {
    afterTableSelect(columnList) {
      this.toolColumnList = columnList;
    },
    tableSelect(row) {
      if (this.tool.table !== row.id) {
        this.tool.table = row.id;
        this.tool.tableName = row.name;
        if (this.tool.tableType === 'step') {
          this.$axios.get(`/data/model/stepColumns?step=${row.id}&modelId=${this.$route.query.id}`)
            .then(({ result }) => {
              this.tool.unSelectList = result;
              this.tool.selectList = [];

              this.tool.unSelectListSort = result;
              this.tool.selectListSort = [];
              this.tool.unSelectListSort.forEach((e) => {
                e.sort = 'asc';
              });

              this.tool.groupUnSelectList = result;
              this.tool.groupSelectList = [];
              this.tool.valueUnSelectList = result;
              this.tool.valueSelectList = [];
              this.afterTableSelect(result);
            });
        } else {
          this.$axios.get(`/data/column/list?entity=${row.id}&pageSize=100`)
            .then(({ result }) => {
              this.tool.unSelectList = result.records;
              this.tool.selectList = [];

              this.tool.unSelectListSort = result.records;
              this.tool.selectListSort = [];

              this.tool.groupUnSelectList = result.records;
              this.tool.groupSelectList = [];

              this.tool.valueUnSelectList = result.records;
              this.tool.valueSelectList = [];

              this.afterTableSelect(result.records);
            });
        }
        this.tool.columns = '';
        this.tool.condition = '';
      }
    },
    columnSelect(selectList, unSelectList) {
      this.tool.selectList = [];
      this.tool.unSelectList = [];
      unSelectList.forEach((element) => {
        this.tool.unSelectList.push(element);
      });
      const columnList = [];
      selectList.forEach((element) => {
        this.tool.selectList.push(element);
        columnList.push(element.code);
      });
      this.tool.columns = columnList.join(',');
    },
    saveCondition(condition) {
      this.tool.condition = condition;
    },
  },
  mounted() {
    if (this.step.toolConfig) {
      this.tool = JSON.parse(this.step.toolConfig);
    }
    if (this.stepList.length === 0) {
      this.tool.tableType = 'table';
    }
  },
  created() {
  },
  computed: {
  },
  watch: {
    tool: {
      deep: true,
      handler() {
        this.step.toolConfig = JSON.stringify(this.tool);
      },
    },
  },
};
