<template>
  <div class="table-select row fit">
    <q-dialog v-model="showDialog" :maximized="true">
      <q-card class="dialog_card column">
        <div class="view_title justify-between q-px-md">
          代码设计
          <q-btn dense outline round size="sm" icon="clear" v-close-popup />
        </div>
        <q-scroll-area class="col">
          <div class="row q-col-gutter-md q-pa-sm">
            <div class="col-12 row q-col-gutter-md">
              <div class="col">
                <label>表名:</label>
                <q-input outlined dense no-error-icon v-model.trim="form.name" readonly />
              </div>
              <div class="col">
                <label>
                  <q-icon name="star" color="red" />表描述:
                </label>
                <q-input outlined dense no-error-icon v-model.trim="form.description" />
              </div>
              <div class="col">
                <label>主键类型:</label>
                <q-select
                  outlined
                  dense
                  options-dense
                  v-model="form.idType"
                  :options="idTypeOptions"
                  emit-value
                  map-options
                />
              </div>
              <div class="col">
                <label>表单风格:</label>
                <q-select
                  outlined
                  dense
                  options-dense
                  v-model="form.formType"
                  :options="formTypeOptions"
                  emit-value
                  map-options
                />
              </div>
              <div class="col">
                <label>简单查询:</label>
                <q-select
                  outlined
                  dense
                  options-dense
                  v-model="form.isSimpleQuery"
                  :options="isOptions"
                  emit-value
                  map-options
                />
              </div>
              <div class="col">
                <label>是否分页:</label>
                <q-select
                  outlined
                  dense
                  options-dense
                  v-model="form.isPage"
                  :options="isOptions"
                  emit-value
                  map-options
                />
              </div>
            </div>
            <div class="col-6 row q-col-gutter-md">
              <div class="col">
                <label>表单类型:</label>
                <q-select
                  outlined
                  dense
                  options-dense
                  v-model="form.tableType"
                  :options="tableTypeOptions"
                  emit-value
                  map-options
                />
              </div>
              <div v-if="form.tableType === 'main' || form.tableType === 'middle'" class="col">
                <label>显示样式:</label>
                <q-select
                  outlined
                  dense
                  options-dense
                  v-model="form.formStyle"
                  :options="styleOptions"
                  emit-value
                  map-options
                />
              </div>
            </div>
            <div class="col-6 row q-col-gutter-md">
              <div class="col">
                <label>是否树:</label>
                <q-select
                  outlined
                  dense
                  options-dense
                  v-model="form.isTree"
                  :options="isOptions"
                  emit-value
                  map-options
                />
              </div>
              <div v-if="form.isTree === '1'" class="col">
                <label>
                  <q-icon name="star" color="red" />树PID:
                </label>
                <q-input outlined dense no-error-icon v-model.trim="form.treePid" />
              </div>
              <div v-if="form.isTree === '1'" class="col">
                <label>
                  <q-icon name="star" color="red" />树名称字段:
                </label>
                <q-input outlined dense no-error-icon v-model.trim="form.treeNameField" />
              </div>
            </div>
          </div>

          <div class="q-gutter-y-md">
            <q-card>
              <q-tabs
                v-model="tab"
                dense
                class="text-grey"
                active-color="primary"
                indicator-color="primary"
                align="left"
                narrow-indicator
              >
                <q-tab name="database" label="数据库属性" />
                <q-tab name="pageSettings" label="页面属性" />
                <q-tab name="columnCheck" label="校验字段" />
                <q-tab name="relateCheck" label="关联设置" />
              </q-tabs>

              <q-separator />

              <q-tab-panels v-model="tab" animated>
                <q-tab-panel name="database">
                  <q-table
                    dense
                    :data="dbData"
                    :columns="dbColumns"
                    row-key="id"
                    separator="cell"
                    hide-bottom
                    :rows-per-page-options="[0]"
                  >
                    <template #top-right>
                      <q-btn color="primary" flat round icon="add" @click="addColumn()" dense />
                    </template>
                    <template v-slot:body="props">
                      <q-tr :props="props">
                        <q-td key="id" :props="props">
                          <q-input outlined v-model="props.row.id" dense autofocus />
                        </q-td>
                        <q-td key="name" :props="props">
                          <q-input outlined v-model="props.row.name" dense @input="changeName" />
                        </q-td>
                        <q-td key="length" :props="props">
                          <q-input outlined v-model="props.row.length" type="number" dense />
                        </q-td>
                        <q-td key="scale" :props="props">
                          <q-input outlined v-model="props.row.scale" type="number" dense />
                        </q-td>
                        <q-td key="defaultValue" :props="props">
                          <q-input outlined v-model="props.row.defaultValue" dense />
                        </q-td>
                        <q-td key="dataType" :props="props">
                          <q-select
                            outlined
                            dense
                            options-dense
                            v-model="props.row.dataType"
                            :options="dataTypeOptions"
                            emit-value
                            map-options
                          />
                        </q-td>
                        <q-td key="isPk" :props="props">
                          <q-toggle
                            v-model="props.row.isPk"
                            checked-icon="check"
                            color="green"
                            unchecked-icon="clear"
                            true-value="1"
                            false-value="0"
                          />
                        </q-td>
                        <q-td key="nullAble" :props="props">
                          <q-toggle
                            v-model="props.row.nullAble"
                            checked-icon="check"
                            color="green"
                            unchecked-icon="clear"
                            true-value="YES"
                            false-value="NO"
                          />
                        </q-td>
                        <q-td key="opt" :props="props">
                          <q-btn
                            flat
                            dense
                            round
                            icon="clear"
                            color="negative"
                            @click="delColumn(props.row.id)"
                          >
                            <q-tooltip>删除</q-tooltip>
                          </q-btn>
                        </q-td>
                      </q-tr>
                    </template>
                  </q-table>
                </q-tab-panel>

                <q-tab-panel name="pageSettings">
                  <q-table
                    dense
                    :visible-columns="pageGroup"
                    :data="pageData"
                    :columns="pageColumns"
                    row-key="id"
                    separator="cell"
                    hide-bottom
                    :rows-per-page-options="[0]"
                  >
                    <template v-slot:body="props">
                      <q-tr :props="props">
                        <q-td key="id" :props="props">
                          <q-input outlined v-model="props.row.id" readonly dense autofocus />
                        </q-td>
                        <q-td key="name" :props="props">
                          <q-input outlined v-model="props.row.name" dense @input="changeName" />
                        </q-td>
                        <q-td key="disForm" :props="props">
                          <q-toggle
                            v-model="props.row.disForm"
                            checked-icon="check"
                            color="green"
                            unchecked-icon="clear"
                            true-value="1"
                            false-value="0"
                          />
                        </q-td>
                        <q-td key="disList" :props="props">
                          <q-toggle
                            v-model="props.row.disList"
                            checked-icon="check"
                            color="green"
                            unchecked-icon="clear"
                            true-value="1"
                            false-value="0"
                          />
                        </q-td>
                        <q-td key="orderBy" :props="props">
                          <q-toggle
                            v-model="props.row.orderBy"
                            checked-icon="check"
                            color="green"
                            unchecked-icon="clear"
                            true-value="1"
                            false-value="0"
                          />
                        </q-td>
                        <q-td key="isReadonly" :props="props">
                          <q-toggle
                            v-model="props.row.isReadonly"
                            checked-icon="check"
                            color="green"
                            unchecked-icon="clear"
                            true-value="1"
                            false-value="0"
                          />
                        </q-td>
                        <q-td key="cmpType" :props="props">
                          <q-select
                            outlined
                            dense
                            options-dense
                            v-model="props.row.cmpType"
                            :options="cmpTypeOptions"
                            emit-value
                            map-options
                          />
                        </q-td>
                        <q-td key="cmpLength" :props="props">
                          <q-input outlined v-model="props.row.cmpLength" type="number" dense />
                        </q-td>
                        <q-td key="isSimple" :props="props">
                          <q-toggle
                            v-model="props.row.isSimple"
                            checked-icon="check"
                            color="green"
                            unchecked-icon="clear"
                            true-value="1"
                            false-value="0"
                          />
                        </q-td>
                        <q-td key="isQuery" :props="props">
                          <q-toggle
                            v-model="props.row.isQuery"
                            checked-icon="check"
                            color="green"
                            unchecked-icon="clear"
                            true-value="1"
                            false-value="0"
                          />
                        </q-td>
                        <q-td key="queryType" :props="props">
                          <q-select
                            outlined
                            dense
                            options-dense
                            v-model="props.row.queryType"
                            :options="queryTypeOptions"
                            emit-value
                            map-options
                          />
                        </q-td>
                        <q-td key="queryDefault" :props="props">
                          <q-input outlined v-model="props.row.queryDefault" dense />
                        </q-td>
                        <q-td key="mainTable" :props="props">
                          <q-input outlined v-model="props.row.mainTable" dense />
                        </q-td>
                        <q-td key="mainColumn" :props="props">
                          <q-input outlined v-model="props.row.mainColumn" dense />
                        </q-td>
                      </q-tr>
                    </template>
                  </q-table>
                </q-tab-panel>
                <q-tab-panel name="columnCheck">
                  <q-table
                    dense
                    :data="checkData"
                    :columns="checkColumns"
                    row-key="id"
                    separator="cell"
                    hide-bottom
                    :rows-per-page-options="[0]"
                  >
                    <template v-slot:body="props">
                      <q-tr :props="props">
                        <q-td key="id" :props="props">
                          <q-input outlined v-model="props.row.id" readonly dense autofocus />
                        </q-td>
                        <q-td key="name" :props="props">
                          <q-input
                            outlined
                            v-model="props.row.name"
                            dense
                            @input="changeName"
                          />
                        </q-td>
                        <q-td key="rule" :props="props">
                          <q-select
                            outlined
                            dense
                            options-dense
                            v-model="props.row.rule"
                            :options="ruleOptions"
                            emit-value
                            map-options
                          />
                        </q-td>
                        <q-td key="mustInput" :props="props">
                          <q-toggle
                            v-model="props.row.mustInput"
                            checked-icon="check"
                            color="green"
                            unchecked-icon="clear"
                            true-value="1"
                            false-value="0"
                          />
                        </q-td>
                        <q-td key="dynamicDic" :props="props">
                          <q-toggle
                            v-model="props.row.dynamicDic"
                            checked-icon="check"
                            color="green"
                            unchecked-icon="clear"
                            true-value="1"
                            false-value="0"
                          />
                        </q-td>
                        <q-td key="sysDicName" :props="props">
                          <q-input
                            outlined
                            v-model="props.row.sysDicName"
                            dense
                            readonly
                            @click="selectDict(props.row.id)"
                          >
                            <template #append>
                              <q-btn
                                v-if="props.row.sysDicName !=''"
                                flat
                                round
                                icon="mdi-close-circle-outline"
                                color="primary"
                                @click="clearDict(props.row.id)"
                                :loading="loading"
                              >
                                <q-tooltip>清空</q-tooltip>
                              </q-btn>
                            </template>
                          </q-input>
                        </q-td>
                        <q-td key="dicTable" :props="props">
                          <q-input outlined v-model="props.row.dicTable" dense clearable />
                        </q-td>
                        <q-td key="dicCode" :props="props">
                          <q-input outlined v-model="props.row.dicCode" dense clearable />
                        </q-td>
                        <q-td key="dicText" :props="props">
                          <q-input outlined v-model="props.row.dicText" dense clearable />
                        </q-td>
                      </q-tr>
                    </template>
                  </q-table>
                </q-tab-panel>
                <q-tab-panel name="relateCheck">
                  <q-table
                    dense
                    :data="relateData"
                    :columns="relateColumns"
                    row-key="id"
                    separator="cell"
                    hide-bottom
                    :rows-per-page-options="[0]"
                    :loading="loading"
                  >
                    <template v-slot:loading>
                      <q-inner-loading showing color="primary" />
                    </template>
                    <template v-slot:body="props">
                      <q-tr :props="props">
                        <q-td key="id" :props="props">
                          <q-input outlined v-model="props.row.id" readonly dense autofocus />
                        </q-td>
                        <q-td key="name" :props="props">
                          <q-input
                            outlined
                            v-model="props.row.name"
                            dense
                            @input="changeName"
                          />
                        </q-td>
                        <q-td key="mainTable" :props="props">
                          <q-select
                            outlined
                            dense
                            clearable
                            options-dense
                            v-model="props.row.mainTable"
                            :options="mainOptions"
                            emit-value
                            map-options
                            @input="selectMainTable"
                          />
                        </q-td>
                        <q-td key="mainColumn" :props="props">
                          <q-select
                            outlined
                            dense
                            options-dense
                            clearable
                            v-model="props.row.mainColumn"
                            :options="mainColumnOptions"
                            emit-value
                            map-options
                          />
                        </q-td>
                        <q-td key="slaveTable" :props="props">
                          <q-select
                            outlined
                            dense
                            clearable
                            options-dense
                            v-model="props.row.slaveTable"
                            :options="slaveOptions"
                            emit-value
                            map-options
                            @input="selectSlaveTable"
                          />
                        </q-td>
                        <q-td key="slaveColumn" :props="props">
                          <q-select
                            outlined
                            dense
                            clearable
                            options-dense
                            v-model="props.row.slaveColumn"
                            :options="slaveColumnOptions"
                            emit-value
                            map-options
                          />
                        </q-td>
                      </q-tr>
                    </template>
                  </q-table>
                </q-tab-panel>
              </q-tab-panels>
            </q-card>
          </div>
        </q-scroll-area>
        <q-card-actions align="right">
          <q-btn flat color="primary" dense v-close-popup>取消</q-btn>
          <q-btn color="primary" label="确定" type="submit" :loading="loading" @click="save()"
          dense />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <dictselect ref="dictselect" @doSelDic="doSelDic" />
  </div>
</template>

<script>
import dictselect from './dictselect';

export default {
  name: 'table-select',
  props: {
    fieldData: Object,
  },
  components: { dictselect },
  data() {
    return {
      id: '',
      tab: 'pageSettings',
      checkColumnId: '',
      generateForm: {},
      dbColumns: [
        {
          name: 'id',
          align: 'center',
          label: '字段名称',
          field: 'id',
        },
        {
          name: 'name',
          align: 'center',
          label: '字段备注',
          field: 'name',
        },
        {
          name: 'length',
          align: 'center',
          label: '字段长度',
          field: 'length',
        },
        {
          name: 'scale',
          align: 'center',
          label: '小数点',
          field: 'scale',
        },
        {
          name: 'defaultValue',
          align: 'center',
          label: '默认值',
          field: 'defaultValue',
        },
        {
          name: 'dataType',
          align: 'center',
          label: '字段类型',
          field: 'dataType',
        },
        {
          name: 'isPk',
          align: 'center',
          label: '主键',
          field: 'isPk',
        },
        {
          name: 'nullAble',
          align: 'center',
          label: '允许空值',
          field: 'nullAble',
        },
        {
          name: 'opt',
          align: 'center',
          label: '操作',
          field: 'opt',
        },
      ],
      dbData: [],
      pageColumns: [
        {
          name: 'id',
          align: 'center',
          label: '字段名称',
          field: 'id',
        },
        {
          name: 'name',
          align: 'center',
          label: '字段备注',
          field: 'name',
        },
        {
          name: 'disForm',
          align: 'center',
          label: '表单显示',
          field: 'disForm',
        },
        {
          name: 'disList',
          align: 'center',
          label: '列表显示',
          field: 'disList',
        },
        {
          name: 'orderBy',
          align: 'center',
          label: '是否排序',
          field: 'orderBy',
        },
        {
          name: 'isReadonly',
          align: 'center',
          label: '是否只读',
          field: 'isReadonly',
        },
        {
          name: 'cmpType',
          align: 'center',
          label: '控件类型',
          field: 'cmpType',
        },
        {
          name: 'cmpLength',
          align: 'center',
          label: '控件长度',
          field: 'cmpLength',
        },
        {
          name: 'isSimple',
          align: 'center',
          label: '简短查询',
          field: 'isSimple',
        },
        {
          name: 'isQuery',
          align: 'center',
          label: '是否查询',
          field: 'isQuery',
        },
        {
          name: 'queryType',
          align: 'center',
          label: '查询类型',
          field: 'queryType',
        },
        {
          name: 'queryDefault',
          align: 'center',
          label: '查询默认值',
          field: 'queryDefault',
        },
        {
          name: 'mainTable',
          align: 'center',
          label: '主表',
          field: 'mainTable',
        },
        {
          name: 'mainColumn',
          align: 'center',
          label: '主字段',
          field: 'mainColumn',
        },
      ],
      pageData: [],

      checkColumns: [
        {
          name: 'id',
          align: 'center',
          label: '字段名称',
          field: 'id',
        },
        {
          name: 'name',
          align: 'center',
          label: '字段备注',
          field: 'name',
        },
        {
          name: 'rule',
          align: 'center',
          label: '验证规则',
          field: 'rule',
        },
        {
          name: 'mustInput',
          align: 'center',
          label: '必输项',
          field: 'mustInput',
        },
        {
          name: 'dynamicDic',
          align: 'center',
          label: '动态字典',
          field: 'dynamicDic',
        },
        {
          name: 'sysDicName',
          align: 'center',
          label: '系统字典',
          field: 'sysDicName',
        },
        {
          name: 'dicTable',
          align: 'center',
          label: '字典表',
          field: 'dicTable',
        },
        {
          name: 'dicCode',
          align: 'center',
          label: '字典Code',
          field: 'dicCode',
        },
        {
          name: 'dicText',
          align: 'center',
          label: '字典Text',
          field: 'dicText',
        },
      ],
      checkData: [],
      relateColumns: [
        {
          name: 'id',
          align: 'center',
          label: '字段名称',
          field: 'id',
        },
        {
          name: 'name',
          align: 'center',
          label: '字段备注',
          field: 'name',
        },
        {
          name: 'mainTable',
          align: 'center',
          label: '主表',
          field: 'mainTable',
        },
        {
          name: 'mainColumn',
          align: 'center',
          label: '主表字段',
          field: 'mainColumn',
        },
        {
          name: 'slaveTable',
          align: 'center',
          label: '从表',
          field: 'slaveTable',
        },
        {
          name: 'slaveColumn',
          align: 'center',
          label: '从表字段',
          field: 'slaveColumn',
        },
      ],
      relateData: [],

      form: {
        id: null,
        name: null,
        tableType: 'single',
        mainTable: '',
        slaveTable: '',
        isSimpleQuery: '1',
        isPage: '1',
        idType: 'timestamp',
        relationType: '0',
        tabOrderNum: 1,
        formStyle: 'default',
        formType: '12',
        treePid: 'pid',
        treeNameField: 'name',
        isSync: '1',
      },
      styleOptions: [{ label: '默认', value: 'default' }, { label: '左右布局', value: 'leftRight' }, { label: '上下布局', value: 'topBottom' }],
      formTypeOptions: [{ label: '一列', value: '12' }, { label: '二列', value: '6' }, { label: '三列', value: '4' }, { label: '四列', value: '3' }],
      tableTypeOptions: [{ label: '单表', value: 'single' }, { label: '主表', value: 'main' }, { label: '附表', value: 'slave' }, { label: '中间表', value: 'middle' }, { label: '分类', value: 'catalog' }],
      idTypeOptions: [{ label: '时间戳序列', value: 'timestamp' }, { label: 'UID', value: 'uid' }, { label: '手工输入', value: 'input' }],
      isOptions: [{ label: '是', value: '1' }, { label: '否', value: '0' }],
      nullOptions: [{ label: '是', value: 'YES' }, { label: '否', value: 'NO' }],
      dataTypeOptions: [{ label: 'varchar', value: 'varchar' },
        { label: 'int', value: 'int' },
        { label: 'date', value: 'date' },
        { label: 'datetime', value: 'datetime' },
        { label: 'float', value: 'float' },
        { label: 'double', value: 'double' },
        { label: 'bit', value: 'bit' },
        { label: 'bool', value: 'bool' },
        { label: 'tiny int', value: 'tiny int' },
        { label: 'small int   small int' },
        { label: 'medium int   medium int ' },
        { label: 'big int', value: 'big int' },
        { label: 'decimal', value: 'decimal' },
        { label: 'char', value: 'char' },
        { label: 'tiny text   tiny text' },
        { label: 'text', value: 'text' },
        { label: 'medium text   medium text ' },
        { label: 'longtext', value: 'longtext' },
        { label: 'tiny blob   tiny blob' },
        { label: 'blob', value: 'blob' },
        { label: 'medium blob   medium blob ' },
        { label: 'long blob   long blob' },
        { label: 'timestamp   timestamp' },
        { label: 'time', value: 'time' },
        { label: 'year', value: 'year' },
        { label: 'binary', value: 'binary' },
        { label: 'varbinary   varbinary' },
        { label: 'enum', value: 'enum' },
        { label: 'set', value: 'set' },
        { label: 'geometry', value: 'geometry' },
        { label: 'point', value: 'point' },
        { label: 'multipoint   multipoint ' },
        { label: 'linestring   linestring ' },
        { label: 'multilinestring   multilinestring ' },
        { label: 'polygon', value: 'polygon' },
        { label: 'geometrycollection  geometrycollection' }],
      cmpTypeOptions: [{ label: '文本框', value: 'text' },
        { label: '数字框', value: 'number' },
        { label: '密码框', value: 'password' },
        { label: '多行文本', value: 'textarea' },
        { label: '下拉框', value: 'select' },
        { label: '单选', value: 'radio' },
        { label: '多选', value: 'checkbox' },
        { label: '开关', value: 'polygon' },
        { label: '日期（yyyy-MM-dd）', value: 'date' },
        { label: '日期（yyyy-MM-dd HH:mm:ss）', value: 'datetime' },
        { label: '文件', value: 'file' },
        { label: '图片', value: 'img' },
        { label: '下拉多选', value: 'selectmultiple' },
        { label: '下拉搜索', value: 'selectsearch' },
        { label: '弹框', value: 'popup' },
        { label: '字典', value: 'dict' },
        { label: '用户选择', value: 'userselect' },
        { label: '富文本', value: 'rich' }],
      ruleOptions: [
        { label: '唯一', value: 'number' },
        { label: '邮箱', value: 'emailTest' },
        { label: '手机号', value: 'phoneTest' },
        { label: '字母', value: 'letterTest' },
        { label: '数字', value: 'numberTest' },
        { label: '身份证号', value: 'hcodeTest' }],
      queryTypeOptions: [{ label: '普通查询', value: '0' }, { label: '范围查询', value: '1' }],
      sysGenerate: [],
      mainColumnOptions: [],
      slaveColumnOptions: [],
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
    addColumn() {
      this.dbData.push({
        isPk: '0', dataType: 'varchar', nullAble: 'YES', length: 50, name: '', scale: 0, id: '', position: 1,
      });
    },
    delColumn(id) {
      for (let i = 0; i < this.dbData.length; i += 1) {
        if (this.dbData[i].id === id) {
          this.dbData.splice(i, 1);
          break;
        }
      }
    },
    selectDict(id) {
      this.checkColumnId = id;
      this.$refs.dictselect.showDialog = true;
    },
    doSelDic(id, name) {
      this.checkData.forEach((columnCheck) => {
        if (columnCheck.id === this.checkColumnId) {
          columnCheck.sysDicCode = id;
          columnCheck.sysDicName = name;
        }
      });
      // 字段输入改为下拉框
      this.pageData.forEach((pageData) => {
        if (pageData.id === this.checkColumnId) {
          pageData.cmpType = 'select';
        }
      });
    },
    clearDict(id) {
      this.checkData.forEach((columnCheck) => {
        if (columnCheck.id === id) {
          columnCheck.sysDicCode = '';
          columnCheck.sysDicName = '';
        }
      });
      this.pageData.forEach((pageData) => {
        if (pageData.id === this.checkColumnId) {
          pageData.cmpType = 'text';
        }
      });
    },
    changeName() {
    },
    save() {
      this.loading = true;
      const content = {
        generateForm: this.generateForm,
        columnSchemaList: this.dbData,
        pageColumnList: this.pageData,
        columnCheckList: this.checkData,
        relateDataList: this.relateData,
      };
      this.form.content = JSON.stringify(content);
      this.$axios.put('/generate/edit', this.form)
        .then((res) => {
          if (res.success) {
            this.$emit('syncTableByName', this.data);
            this.$info('保存成功');
            this.showDialog = false;
          } else {
            this.$error('保存失败');
          }
        }).finally(() => {
          this.loading = false;
        });
    },
    subbmit(tableName) {
      // 这里做保存不用发消息
      this.$axios.get(`/generate/syncTableByName?tableName=${tableName}`)
        .then(({ result }) => {
          if (result) {
            this.$emit('syncTableByName', this.data);
            this.$info('同步成功');
          } else {
            this.$error('同步失败');
          }
        }).finally(() => {
        });
      // this.showDialog = false;
    },
    show(id) {
      this.id = id;
      this.query();
      this.initDict();
      this.showDialog = true;
    },
    query() {
      this.loading = true;
      this.pagination.page = 1;
      this.$axios.get(`/generate/queryById?id=${this.id}`)
        .then(({ result }) => {
          this.form.id = result.id;
          this.form.name = result.name;
          this.form.description = result.description;
          this.form.tableType = result.tableType;
          this.form.mainTable = result.mainTable;
          this.form.slaveTable = result.slaveTable;
          this.form.formStyle = result.formStyle;
          this.form.treePid = result.treePid;
          this.form.treeNameField = result.treeNameField;
          this.form.relationType = result.relationType;
          this.form.subTableStr = result.subTableStr;
          this.form.tabOrderNum = result.tabOrderNum;
          this.form.formType = result.formType;
          this.form.isSimpleQuery = result.isSimpleQuery;
          this.form.isPage = result.isPage;
          this.form.idType = result.idType;
          this.form.isSync = result.isSync;
          const contentObj = JSON.parse(result.content);
          this.dbData = contentObj.columnSchemaList;
          this.pageData = contentObj.pageColumnList;
          this.checkData = contentObj.columnCheckList;
          this.relateData = contentObj.relateDataList;
          this.generateForm = contentObj.generateForm;
        }).finally(() => {
          this.loading = false;
        });
    },
    initDict() {
      this.$axios.get('/generate/listAll').then(({ result }) => {
        this.sysGenerate = result;
      });
    },
    selectMainTable(v) {
      if (v) {
        this.loading = true;
        this.$axios.get(`/generate/queryColumns?id=${v}`).then(({ result }) => {
          this.mainColumnOptions = result;
        }).finally(() => {
          this.loading = false;
        });
      }
    },
    selectSlaveTable(v) {
      if (v) {
        this.loading = true;
        this.$axios.get(`/generate/queryColumns?id=${v}`).then(({ result }) => {
          this.slaveColumnOptions = result;
        }).finally(() => {
          this.loading = false;
        });
      }
    },
  },
  mounted() {
    this.initDict();
  },
  computed: {
    pageGroup() {
      const pageColumn = ['id', 'name', 'disForm', 'disList', 'orderBy', 'isReadonly', 'cmpType', 'cmpLength', 'isSimple', 'isQuery', 'queryType', 'queryDefault'];
      if (this.form.tableType === '2') {
        pageColumn.push('mainTable');
        pageColumn.push('mainColumn');
      }
      return pageColumn;
    },
    mainOptions() {
      return this.sysGenerate.filter((v) => v.tableType === 'main').map((m) => ({ label: m.description, value: m.id }));
    },
    slaveOptions() {
      return this.sysGenerate.filter((v) => v.tableType === 'slave').map((m) => ({ label: m.description, value: m.id }));
    },
  },
};
</script>
<style>
</style>
