/* eslint-disable no-eval */
import { isArray } from 'util';
import {
  exportDefault, titleCase, deepClone, joinArray, objToJSONStr,
} from 'components/utils/index';
import {
  buildSubColumnList,
} from 'components/generator/builder/subDataBuilder';

const units = {
  KB: '1024',
  MB: '1024 / 1024',
  GB: '1024 / 1024 / 1024',
};
let confGlobal;

/**
 * 组装js 【入口函数】
 * @param {Object} config 整个表单配置
 * @param {String} type 生成类型，文件或弹窗等
 */

// 在Created调用函数
function callInCreated(methodName, created) {
  created.push(`this.${methodName}()`);
}

// 混入处理函数
function mixinMethod(type) {
  const list = []; const
    minxins = {
      form: {
        save: `save() {
          this.${confGlobal.formModel}.dynFormId = this.$route.query.id;
          this.$axios.post('/dyn/form/saveData', this.${confGlobal.formModel}).then((r) => {
            this.$info(r.message);
            this.$emit('query');
          }).finally(() => {
            this.$emit('close');
          });
        },`,
        close: `close() {
          this.$emit('close');
        },`,
        handelConfirm: `handelConfirm() {
          this.$refs['${confGlobal.formRef}'].validate(valid => {
            if(!valid) return
            this.close()
          })
        },`,
      },
    };
  const methods = minxins[type];
  if (methods) {
    Object.keys(methods).forEach((key) => {
      list.push(methods[key]);
    });
  }

  return list;
}

// 构建data
function buildData(scheme, dataList, showList, methodList) {
  const { config } = scheme;
  if (scheme.vModel === undefined) return;
  const defaultValue = JSON.stringify(config.defaultValue);
  dataList.push(`${scheme.vModel}: ${defaultValue},`);
  showList.push(`${scheme.vModel}: true,`);
  methodList.push(`${scheme.vModel}Blur() {},`);
  methodList.push(`${scheme.vModel}Input() {},`);
}

// 构建options
function buildOptions(scheme, optionsList) {
  if (scheme.vModel === undefined) return;
  // el-cascader直接有options属性，其他组件都是定义在slot中，所以有两处判断
  let { options } = scheme;
  if (!options) options = scheme.slot.options;
  if (scheme.config.dataType === 'dynamic') { options = []; }
  const str = `${scheme.vModel}Options: ${JSON.stringify(options)},`;
  optionsList.push(str);
}

function buildProps(scheme, propsList) {
  const str = `${scheme.vModel}Props: ${JSON.stringify(scheme.props.props)},`;
  propsList.push(str);
}

// el-upload的BeforeUpload
function buildBeforeUpload(scheme) {
  const { config } = scheme;
  const unitNum = units[config.sizeUnit]; let rightSizeCode = ''; let acceptCode = ''; const
    returnList = [];
  if (config.fileSize) {
    rightSizeCode = `let isRightSize = file.size / ${unitNum} < ${config.fileSize}
    if(!isRightSize){
      this.$message.error('文件大小超过 ${config.fileSize}${config.sizeUnit}')
    }`;
    returnList.push('isRightSize');
  }
  if (scheme.accept) {
    acceptCode = `let isAccept = new RegExp('${scheme.accept}').test(file.type)
    if(!isAccept){
      this.$message.error('应该选择${scheme.accept}类型的文件')
    }`;
    returnList.push('isAccept');
  }
  const str = `${scheme.vModel}BeforeUpload(file) {
    ${rightSizeCode}
    ${acceptCode}
    return ${returnList.join('&&')}
  },`;
  return returnList.length ? str : '';
}

// el-upload的submit
function buildSubmitUpload(scheme) {
  const str = `submitUpload() {
    this.$refs['${scheme.vModel}'].submit()
  },`;
  return str;
}

function buildOptionMethod(methodName, model, methodList, scheme) {
  const { config } = scheme;
  const str = `${methodName}() {
    // 注意：this.$axios是通过Vue.prototype.$axios = axios挂载产生的
    this.$axios({
      method: '${config.method}',
      url: '${config.url}'
    }).then(resp => {
      var { data } = resp
      this.${model} = data.${config.dataPath}
    })
  },`;
  methodList.push(str);
}

// 构建组件属性
function buildAttributes(scheme, dataList, subDataList, showList, optionsList,
  methodList, propsList, uploadVarList, created) {
  const { config } = scheme;
  const { slot } = scheme;
  buildData(scheme, dataList, showList, methodList);

  // 特殊处理options属性
  if (scheme.options || (slot && slot.options && slot.options.length)) {
    buildOptions(scheme, optionsList);
    if (config.dataType === 'dynamic') {
      const model = `${scheme.vModel}Options`;
      const options = titleCase(model);
      const methodName = `get${options}`;
      buildOptionMethod(methodName, model, methodList, scheme);
      callInCreated(methodName, created);
    }
  }

  if (scheme.sub) {
    const { sub } = scheme;
    const { tableId } = sub;
    // 子表单要有自己的数据
    subDataList.push(`${tableId}_pagination: {page: 1,rowsPerPage: 10,rowsNumber: 99,}`);
    subDataList.push(`${tableId}_list: []`);
    // 子表单里面的空表单也要设默认值
    if (scheme.config.children && scheme.config.children.length > 0) {
      const subForm = {};
      scheme.config.children.forEach((child) => {
        if (child.db) {
          subForm[child.vModel] = (typeof (child.config.defaultValue) === 'undefined') ? null : child.config.defaultValue;
        }
      });
      subDataList.push(`${tableId}Form: ${objToJSONStr(subForm)}`);
      subDataList.push(`${tableId}EmptyForm: ${objToJSONStr(subForm)}`);
    }
    const columnList = buildSubColumnList(scheme.config);
    subDataList.push(`${tableId}_columns: [
        ${joinArray(columnList, ',', ',')}
      ]`);
  }

  // 处理props
  if (scheme.props && scheme.props.props) {
    buildProps(scheme, propsList);
  }

  // 构建子级组件属性
  if (config.children) {
    config.children.forEach((item) => {
      buildAttributes(item, dataList, subDataList, showList, optionsList,
        methodList, propsList, uploadVarList, created);
    });
  }
}
// js整体拼接
function buildexport(conf, type, data, subData, show, selectOptions, uploadVar, props, methods, created) {
  const str = `${exportDefault}{
  components: {},
  props: [],
  data () {
    return {
      ${conf.formModel}: {
        ${data}
      },
      ${subData},
      loading: false,
      showForm: {${show}},
      ${uploadVar}
      ${selectOptions}
      ${props}
    }
  },
  computed: {},
  watch: {},
  created () {
    ${created}
  },
  mounted () {},
  methods: {
    ${methods}
  }
}`;
  return str;
}

export function makeUpJs(config, type) {
  config = deepClone(config);
  confGlobal = config.formConf;
  const dataList = [];
  const subDataList = [];
  const showList = [];
  const optionsList = [];
  const propsList = [];
  const methodList = mixinMethod(type);
  const uploadVarList = [];
  const created = [];

  config.drawingList.forEach((el) => {
    buildAttributes(el, dataList, subDataList, showList, optionsList,
      methodList, propsList, uploadVarList, created);
  });

  const script = buildexport(
    confGlobal,
    type,
    dataList.join('\n'),
    joinArray(subDataList, ',', ''),
    showList.join('\n'),
    optionsList.join('\n'),
    uploadVarList.join('\n'),
    propsList.join('\n'),
    methodList.join('\n'),
    created.join('\n'),
  );
  confGlobal = null;
  return script;
}
