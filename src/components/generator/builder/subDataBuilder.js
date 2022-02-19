import { joinArray, objToJSONStr } from 'components/utils/index';

// 构建子表单数据
export function buildSubDataItem(draw, configMap) {
  const {
    subFromList, subFromListInit, subFromListSet, calcDataIndexList, dataList,
  } = configMap;
  if (draw.sub) {
    const { sub, config } = draw;
    const { tableId } = sub;
    // 子表单要有自己的数据
    dataList.push(`${tableId}_pagination: {page: 1,rowsPerPage: 10,rowsNumber: 99,}`);
    dataList.push(`${tableId}_list: []`);
    // 子表单里面的空表单也要设默认值
    if (config.children && config.children.length > 0) {
      const subForm = {};
      config.children.forEach((child) => {
        if (child.db) {
          subForm[child.vModel] = (typeof (child.config.defaultValue) === 'undefined') ? null : child.config.defaultValue;
        }
      });
      dataList.push(`${tableId}Form: ${objToJSONStr(subForm)}`);
      dataList.push(`${tableId}EmptyForm: ${objToJSONStr(subForm)}`);
    }
    subFromList.push(`this.form.${tableId}_list = this.${tableId}_list;`);

    if (config.defaultType === 'related') {
      const mapperArray = [];
      config.relatedColumnList.forEach((relatedColumn) => {
        mapperArray.push(`${relatedColumn.subColumn}:v.${relatedColumn.column}`);
      });
      const autoLoadData = config.autoLoadData ? 'Y' : 'N';
      // 子表单数据初始化这里的vModel应该没有值
      subFromListInit.push(`
        this.$axios.post(\`\${this.url.relatedDataList}?dynFormId=${config.relatedForm}&subTable=${draw.sub.tableId}&autoLoadData=${autoLoadData}\`, this.form).then(({ result }) => {
            this.${tableId}_list = result.map((v) => ({${joinArray(mapperArray, ',', '')}}));
            this.calcDataIndex(this.${tableId}_list);
          });
        `);
    } else {
      subFromListInit.push(`this.${tableId}_list =${JSON.stringify(config.defaultValue)};`);
    }
    subFromListInit.push(`this.calcDataIndex(this.${tableId}_list);`);
    subFromListSet.push(`this.${tableId}_list = result.${tableId}_list || [];`);
    calcDataIndexList.push(`this.calcDataIndex(this.${tableId}_list);`);
    const columnList = buildSubColumnList(config);
    dataList.push(`${tableId}_columns: [
        ${joinArray(columnList, ',', ',')}
      ]`);
  }
}

// 构建子表单列设置，
export function buildSubColumnList(config) {
  const columnList = [];
  if (config.showIndex) {
    columnList.push(`{
          name: 'index',
          align: 'center',
          label: '序号',
          field: 'index',
        }`);
  }
  const { children } = config;
  children.forEach((child) => {
    columnList.push(`{
              name: '${child.vModel}', align: 'left', label: '${child.config.label}', field: '${child.vModel}',
      }`);
  });
  if (config.showDelete) {
    columnList.push(`{
    name: 'opt', align: 'center', label: '操作', field: 'opt',
  }`);
  }
  return columnList;
}

// 构建子表单列表数据
export function buildSubDataList(config, configMap) {
  // 先把子表单都识别出来
  config.drawingList.forEach((draw) => {
    buildSubDataItem(draw, configMap);
  });
}
