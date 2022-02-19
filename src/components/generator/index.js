import { makeUpJs } from 'components/generator/js';
import { makeUpCss } from 'components/generator/css';
import {
  makeUpHtml, vueTemplate, vueScript, cssStyle, makeUpTag,
} from 'components/generator/html';
// eslint-disable-next-line camelcase
import { js_beautify, css_beautify, html_beautify } from 'js-beautify';
import {
  beautifierConf, exportDefault, titleCase, deepClone, joinArray, unique, objToJSONStr,
} from 'components/utils/index';
import {
  buildOptions,
} from 'components/generator/builder/optionsBuilder';
import {
  buildBlurField,
} from 'components/generator/builder/blurFieldBuilder';
import {
  buildCalcMethod,
} from 'components/generator/builder/calcMethodBuilder';
import {
  buildBlurMethod,
} from 'components/generator/builder/blurMethodBuilder';
import {
  buildInputUserDeptField,
} from 'components/generator/builder/inputUserDeptFieldBuilder';
import {
  buildSubDataList,
} from 'components/generator/builder/subDataBuilder';

/**
 * 组装PreviewData对象。【入口函数】
 * @param {Object} config 整个表单配置
 * @param {String} type 生成类型，文件或弹窗等
 */
export function makeUpPreviewData(config, type) {
  if (!type) {
    type = 'form';
  }
  const htmlCode = html_beautify(makeUpHtml(config, type));
  const jsCode = js_beautify(makeUpJs(config, type));
  const cssCode = css_beautify(makeUpCss(config));
  return { htmlCode, jsCode, cssCode };
}

/**
 * 组装Vue对象。【入口函数】
 * @param {Object} config 整个表单配置
 * @param {String} type 生成类型，文件或弹窗等
 */
export function makeUpVueObject(config, type) {
  const { htmlCode, jsCode, cssCode } = makeUpPreviewData(config, type);
  const script = vueScript(htmlCode);
  const html = vueTemplate(jsCode);
  const css = cssStyle(cssCode);
  return { script, html, css };
}

/**
 * 组装PreviewData对象。【入口函数】
 * @param {Object} config 整个表单配置
 * @param {String} type 生成类型，文件或弹窗等
 */
export function makeUpVueCode(config, type) {
  const { script, html, css } = makeUpVueObject(config, type);
  return html + script + css;
}

/**
 * 组递归调用，用来实现查询项，如果遇到容器，表单等组件，会进一步递归子节点
 * @param {Object} draw 输入项配置
 * @param {Object} grid 表格配置信息
 * @param {Object} tagMap 查询表单tag
 */
function buildSearchItem(draw, grid, tagMap) {
  const searchKey = `search_${grid.index}`;
  if (draw.db) {
    grid.searchColumns.push({
      index: grid.index,
      vModel: draw.vModel,
      label: draw.config.label,
      opt: 'eq',
      defaultValue: '',
      group: 1,
    });
    grid.searchForm[searchKey] = draw.config.defaultValue || null;
    grid.allColumns.push({
      name: draw.vModel, align: 'center', label: draw.config.label, field: draw.vModel,
    });
    const el = deepClone(draw);
    if (el.type === 'textarea') {
      el.type = 'text';
    }
    el.vModel = searchKey;
    el.optionsKey = draw.vModel;
    tagMap[searchKey] = makeUpTag(el, 'searchForm');
    grid.index += 1;
  }
  if (draw.config && draw.config.children && draw.config.children.length > 0) {
    if (draw.config.tag === 'row') {
      draw.config.children.forEach((child) => { buildSearchItem(child, grid, tagMap); });
    } else if (draw.config.tag === 'table') {
      console.log('ttttttttttttttttttttttttttttttttt');
    }
  }
}
// 编译出查询列
export function buildSearchList(config, type) {
  const searchList = [];
  const { drawingList, formConf, grid } = config;
  const needInitSearch = false;
  if (!grid.searchColumns) {
    grid.searchColumns = [];
    grid.allColumns = [];
    grid.searchForm = {};
    grid.index = 0;
    const tagMap = {};
    drawingList.forEach((draw) => {
      buildSearchItem(draw, grid, tagMap);
    });
    grid.tagMap = tagMap;
  }
  // 搜索的时候因为一个字段是可以重复使用多次的，那么这里就必须支持一个字段对应多个搜索框
  grid.searchColumns.forEach((column) => {
    const searchKey = `search_${column.index}`;
    // 针对每一个查询条件，渲染出一个查询输入项
    // 这里需要根据实际情况渲染出表单输入控件
    searchList.push(`<q-item class="col-xl-2 col-md-3 col-sm-6 col-xs-12">
          <q-item-section class="col-4 text-right gt-sm">
            <q-item-label>${column.label}：</q-item-label>
          </q-item-section>
          <q-item-section class="col">
            ${grid.tagMap[searchKey]}
          </q-item-section>
        </q-item>`);
  });
  return searchList;
}

/**
 * 组递归调用，用来实现查询项，如果遇到容器，表单等组件，会进一步递归子节点
 * @param {Object} draw 输入项配置
 * @param {Object} form 表单配置信息
 * @param {Object} showForm 表单显示字段配置信息
 */
function buildEditFieldItem(draw, form, showForm) {
  if (draw.db) {
    form[draw.vModel] = (typeof (draw.config.defaultValue) === 'undefined') ? null : draw.config.defaultValue;
  }
  if (draw.vModel) {
    showForm[draw.vModel] = true;
  }
  if (draw.config && draw.config.children && draw.config.children.length > 0) {
    draw.config.children.forEach((child) => { buildEditFieldItem(child, form, showForm); });
  }
}
// 这里初始化表单并且把表单默认值设置好
function buildEditFieldList(config, type) {
  const { drawingList, formConf, grid } = config;
  const form = {};
  const showForm = {};
  drawingList.forEach((draw) => {
    buildEditFieldItem(draw, form, showForm);
  });
  grid.form = form;
  grid.showForm = showForm;
  grid.resetShowForm = showForm;
}
function buildTableTemplateItem(draw, tableTemplateList) {
  if (draw.options) {
    tableTemplateList.push(`<template #body-cell-${draw.vModel}="props">
          <q-td
            key="${draw.vModel}"
            :props="props"
          >{{getDictLabel(${draw.vModel}Options,props.row.${draw.vModel}) }}</q-td>
        </template>`);
  }
  if (draw.config && draw.config.children && draw.config.children.length > 0) {
    // 这里要注意如果是子表，那么这么处理就出错了，这里要有个分支，容器这么处理
    if (draw.config.tag === 'row') {
      draw.config.children.forEach((child) => { buildTableTemplateItem(child, tableTemplateList); });
    } else if (draw.config.tag === 'table') {
      console.log('ttttttttttttttttttttttttttttttttt');
    }
  }
}

// 做字典翻译等
function buildTableTemplateList(config, type) {
  const { drawingList, formConf, grid } = config;
  const tableTemplateList = [];
  const form = {};
  drawingList.forEach((draw) => {
    buildTableTemplateItem(draw, tableTemplateList);
  });
  return tableTemplateList;
}

/**
 * 最终代码是需要落地的，这里负责组织 html模板
 * @param {Object} config 整个表单配置
 * @param {String} type 生成类型，文件或弹窗等
 */
export function makeUpGridTemplate(config, type) {
  const searchList = buildSearchList(config, type);
  buildEditFieldList(config, type);
  const tableTemplateList = buildTableTemplateList(config, type);
  const formTemplate = makeUpHtml(config, type);
  const template = `<q-page class="cc-admin column">
    <div class="col bg-white shadow-2 q-pa-md q-ma-sm">
      <div class="row items-center justify-start q-mb-md">
        ${joinArray(searchList, '', '')}
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
        ${joinArray(tableTemplateList, '', '')}
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
      <q-form @submit="save" class="${config.formConf.formSize || 'dialog_card'} column">
        <h5 class="view_title justify-between q-px-md">
          {{editType}}动态表单
          <q-btn dense outline round icon="clear" size="sm" v-close-popup />
        </h5>
        <q-scroll-area class="col">
          <div class="row q-col-gutter-x-md dialog_form q-pa-md">
            ${formTemplate}
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
  </q-page>`;
  return template;
}

// 构建列信息--这里分几种情况，子表单、容器
function buildColumnItem(draw, grid) {
  if (draw.vModel && draw.db && draw.config.label) {
    grid.columns.push({
      name: draw.vModel, align: 'center', label: draw.config.label, field: draw.vModel,
    });
    grid.group.push(draw.vModel);
  }
  if (draw.config && draw.config.children && draw.config.children.length > 0) {
    // 这里要注意如果是子表，那么这么处理就出错了，这里要有个分支，容器这么处理
    if (draw.config.tag === 'row') {
      draw.config.children.forEach((child) => { buildColumnItem(child, grid); });
    } else if (draw.config.tag === 'table') {
      console.log('ttttttttttttttttttttttttttttttttt');
    }
  }
}

function buildDbColumnDraw(draw, columnList) {
  if (draw.vModel && draw.db && draw.config.label) {
    columnList.push({
      code: draw.vModel, name: draw.config.label, dataType: draw.db.dbType,
    });
  }
  if (draw.config && draw.config.children && draw.config.children.length > 0) {
    // 这里要注意如果是子表，那么这么处理就出错了，这里要有个分支，容器这么处理
    if (draw.config.tag === 'row') {
      draw.config.children.forEach((child) => { buildDbColumnDraw(child, columnList); });
    } else if (draw.config.tag === 'table') {
      console.log('ttttttttttttttttttttttttttttttttt');
    }
  }
}
// 构建数据库列信息根据配置字段，
export function buildDbColumnListFromDrawingList(drawingList) {
  const columnList = [];
  drawingList.forEach((draw) => {
    buildDbColumnDraw(draw, columnList);
  });
  return columnList;
}

// buildColumnItemFromDraw
function buildColumnItemFromDraw(draw, columnList) {
  if (draw.vModel && draw.db && draw.config.label) {
    columnList.push({
      name: draw.vModel, align: 'center', label: draw.config.label, field: draw.vModel,
    });
  }
  if (draw.config && draw.config.children && draw.config.children.length > 0) {
    // 这里要注意如果是子表，那么这么处理就出错了，这里要有个分支，容器这么处理
    if (draw.config.tag === 'row') {
      draw.config.children.forEach((child) => { buildColumnItemFromDraw(child, columnList); });
    } else if (draw.config.tag === 'table') {
      console.log('ttttttttttttttttttttttttttttttttt');
    }
  }
}
// 构建列信息根据配置字段，
export function buildColumnListFromDrawingList(drawingList) {
  const columnList = [];
  drawingList.forEach((draw) => {
    buildColumnItemFromDraw(draw, columnList);
  });
  return columnList;
}

// 构建列设置，
export function buildColumnList(config) {
  const columnList = [];
  columnList.push(`{
          name: 'index',
          align: 'center',
          label: '序号',
          field: 'index',
        }`);
  const { drawingList, formConf, grid } = config;
  if (!grid.columns) {
    grid.columns = [];
    grid.group = [];
    drawingList.forEach((draw) => {
      buildColumnItem(draw, grid);
    });
  }

  grid.columns.forEach((column) => {
    columnList.push(`{
              name: '${column.name}', align: 'left', label: '${column.label}', field: '${column.name}',
      }`);
  });
  columnList.push(`{
    name: 'opt', align: 'center', label: '操作', field: 'opt',
  }`);
  return columnList;
}

/**
 * 最终代码是需要落地的，这里负责组织 script脚本
 * @param {Object} config 整个表单配置
 * @param {String} type 生成类型，文件或弹窗等
 */
export function makeUpGridScript(config) {
  const { formConf, grid } = config;
  const configMap = {
    optionsList: [],
    initDictList: [],
    dataList: [],
    subFromList: [],
    subFromListInit: [],
    subFromListSet: [],
    calcDataIndexList: [],
    blurMethodList: [], // 失去焦点触发函数
    inputMethodList: [], // 值改变会引起逻辑字段隐藏
    inputFieldList: [], // 表单值发生变化的时候，逻辑字段隐藏列表
    calcMethodList: [], // 计算字段方法
    calcListForAdd: [], // 如果这个字段不依赖其他字段，那么新增的时候应该自动把结果计算出来
    blurFieldMap: [], // 这个负责统计哪些字段会触发
    calcFieldMap: [], // 计算字段列表
    watchList: [],
    inputUserDeptInit: [], // 用户字段初始化
  };
  const columnList = buildColumnList(config);
  buildSubDataList(config, configMap);

  config.drawingList.forEach((draw) => {
    buildInputUserDeptField(draw, configMap.inputUserDeptInit, '');
  });
  config.drawingList.forEach((draw) => {
    // 下面的方法实现是有问题的，需要根据上面这个的统计结果来写，哪个组件触发这个。
    buildBlurField(draw, configMap);
  });
  // 先把计算方法以及新增时需要触发的方法准备好。
  buildCalcMethod(configMap);
  config.drawingList.forEach((draw) => {
    buildOptions(draw, configMap);
    buildBlurMethod(draw, configMap);
  });
  configMap.dataList = unique(configMap.dataList);
  const script = `export default {
  name: 'DynForm${new Date().getTime()}',
  data() {
    return {
      ${joinArray(configMap.dataList, ',', ',')}
      ${joinArray(configMap.optionsList, ',', ',')}
      showDialog: false,
      showQuery: true,
      tableLabel: '展开',
      loading: false,
      importing: false,
      exporting: false,
      confirmMsg: '',
      selected: [],
      list: [],
      form: ${objToJSONStr(grid.form)},
      emptyForm: ${objToJSONStr(grid.form)},
      searchForm: ${objToJSONStr(grid.searchForm)},
      showForm: ${objToJSONStr(grid.showForm)},
      resetShowForm: ${objToJSONStr(grid.resetShowForm)},
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
        ${joinArray(columnList, ',', ',')}
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
    ${joinArray(configMap.blurMethodList, ',', ',')}
    ${joinArray(configMap.inputMethodList, ',', ',')}
    formEditInput() {
      this.showForm = { ...this.resetShowForm };
      ${joinArray(configMap.inputFieldList, '', '\n')}
    },
    
    ${joinArray(configMap.calcMethodList, ',', ',')}
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
    addSub(dataList,subForm) {
      dataList.push({...subForm});
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
      ${joinArray(configMap.initDictList, '', '')}
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
        ${joinArray(configMap.calcDataIndexList, '', '')}
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
      this.confirmMsg = \`确认删除这 \${this.selected.length} 条记录吗？\`;
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
      ${joinArray(configMap.subFromListInit, '', '')}
      ${joinArray(configMap.inputUserDeptInit, '', '')}
      this.formEditInput();
      return true;
    },
    add() {
      this.editType = '新建';
      if (this.addBefore()) {
        ${joinArray(configMap.calcListForAdd, '', '')}
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
          ${joinArray(configMap.subFromListSet, '', '')}
          ${joinArray(configMap.calcDataIndexList, '', '')}
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
          window.navigator.msSaveBlob(new Blob([data], { type: 'application/vnd.ms-excel' }), \`\${fileName}.xls\`);
        } else {
          const url = window.URL.createObjectURL(new Blob([data], { type: 'application/vnd.ms-excel' }));
          const link = document.createElement('a');
          link.style.display = 'none';
          link.href = url;
          link.setAttribute('download', \`\${fileName}.xls\`);
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
      ${joinArray(configMap.subFromList, '', '')}
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
    close(){
      this.$refs.dialog.hide();
    },
    searchReset() {
      this.searchForm = ${objToJSONStr(grid.searchForm)};
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
        this.$axios.post(\`\${this.url.copy}?id=\${p.id}&name=\${data}\`, {}).then((r) => {
          this.$info(r.message);
          this.query();
        });
      });
    },
    emailTest(v){
      let t = true;
      const p = /^([A-Za-z0-9_\\-.\\u4e00-\\u9fa5])+@([A-Za-z0-9_\\-.])+\\.([A-Za-z]{2,8})$/;
      if (v && !p.test(v)) {
        t = '请输入有效的电子邮件地址';
      }
      return t;
    },
    phoneTest(v){
      let t = true;
      const p = /^1[3-9]\\d{9}$/;
      if (v && !p.test(v)) {
        t = '请输入有效的网址手机号码';
      }
      return t;
    },
    numberTest(v){
      let t = true;
      const p = /^-?\\d*\\.?\\d+$/;
      if (v && !p.test(v)) {
        t = '只能输入数字';
      }
      return t;
    },
    letterTest(v){
      let t = true;
      const p = /^[a-zA-Z]*$/;
      if (v && !p.test(v)) {
        t = '只能输入字母';
      }
      return t;
    },
    hcodeTest(v){
      let t = true;
      const p = /^[1-9]\\d{5}(18|19|20)\\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\\d{3}[0-9Xx]$/;
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
    ${joinArray(configMap.watchList, ',', ',')}
  },
}`;
  return script;
}

/**
 * 最终代码是需要落地的，这里负责组织 css样式
 * @param {Object} config 整个表单配置
 * @param {String} type 生成类型，文件或弹窗等
 */
export function makeUpGridStyle(config) {
  return '';
}
