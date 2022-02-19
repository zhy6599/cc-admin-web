<template>
  <div class="row">
    <q-btn class="col" outline @click="show" label="表达式设置" icon-right="mdi-iframe-braces-outline" />
    <q-dialog maximized flat persistent ref="dialog" position="right">
      <q-form @submit="submit" class="dialog_card column">
        <h5 class="view_title justify-between q-px-md">
          表达式设置
          <q-btn dense outline round icon="clear" size="sm" v-close-popup />
        </h5>
        <q-scroll-area class="col">
          <div class="column q-col-gutter-x-md q-ma-md">
            <q-btn-group flat class="q-my-xs">
              <q-btn dense icon="mdi-plus" @click="insertContent(' + ')" />
              <q-btn dense icon="mdi-minus" @click="insertContent(' - ')" />
              <q-btn dense icon="mdi-window-close" @click="insertContent(' * ')" />
              <q-btn dense icon="mdi-slash-forward" @click="insertContent(' / ')" />
              <q-btn dense icon="mdi-equal" @click="insertContent(' = ')" />
              <q-btn dense icon="mdi-code-tags" @click="insertContent(' <> ')" />
              <q-btn dense icon="mdi-greater-than" @click="insertContent(' > ')" />
              <q-btn dense icon="mdi-greater-than-or-equal" @click="insertContent(' >= ')" />
              <q-btn dense icon="mdi-less-than" @click="insertContent(' < ')" />
              <q-btn dense icon="mdi-less-than-or-equal" @click="insertContent(' <= ')" />
              <q-btn dense icon="mdi-code-parentheses" @click="insertContent(' () ')" />
              <q-btn dense icon="mdi-code-brackets" @click="insertContent(' [] ')" />
              <q-btn dense icon="mdi-drag-vertical-variant" @click="insertContent(' || ')" />
              <q-btn dense label="," @click="insertContent(' , ')" />
              <q-btn dense label="''" @click="insertContent(' \'\' ')" />
              <q-btn dense label="AND" @click="insertContent(' and ')" />
              <q-btn dense label="OR" @click="insertContent(' or ')" />
              <q-btn dense label="NOT" @click="insertContent(' not ')" />
              <q-btn dense label="IN" @click="insertContent(' in ')" />
              <q-btn dense label="LIKE" @click="insertContent(' like ')" />
            </q-btn-group>
            <q-input
              ref="cndInput"
              outlined
              dense
              v-model="condition"
              class="q-pb-sm"
              type="textarea"
            />
            <div class="col">
              <q-tabs v-model="setTable" dense no-caps inline-label align="left">
                <q-tab name="column" label="数据" />
                <q-tab name="func" label="函数" />
              </q-tabs>
              <q-separator />
              <q-tab-panels v-model="setTable" animated>
                <q-tab-panel name="column">
                  <q-table
                    flat
                    hide-bottom
                    color="primary"
                    class="cross_table q-ma-xs"
                    separator="cell"
                    :data="dataList"
                    :columns="columnList"
                    :rows-per-page-options="[100]"
                    row-key="code"
                    virtual-scroll
                  >
                    <template v-slot:body="props">
                      <q-tr :props="props" @dblclick="selectColumn(props.row)"
                      style="cursor:pointer;">
                        <q-td key="code" :props="props">
                          {{
                          props.row.code
                          }}
                        </q-td>
                        <q-td key="name" :props="props">
                          {{
                          props.row.name
                          }}
                        </q-td>
                        <q-td key="dataType" :props="props">
                          {{
                          props.row.dataType
                          }}
                        </q-td>
                      </q-tr>
                    </template>
                  </q-table>
                </q-tab-panel>
                <q-tab-panel name="func">
                  <q-table
                    :data="funcDataList"
                    :columns="funcColumnList"
                    row-key="type"
                  >
                    <template v-slot:header="props">
                      <q-tr :props="props">
                        <q-th auto-width />
                        <q-th
                          v-for="col in props.cols"
                          :key="col.name"
                          :props="props"
                        >{{ col.label }}</q-th>
                      </q-tr>
                    </template>

                    <template v-slot:body="props">
                      <q-tr :props="props">
                        <q-td style="width:30px;">
                          <q-btn
                            size="sm"
                            round
                            dense
                            @click="props.expand = !props.expand"
                            :icon="props.expand ? 'remove' : 'add'"
                          />
                        </q-td>
                        <q-td>{{props.key}}</q-td>
                        <q-td />
                        <q-td />
                        <q-td />
                      </q-tr>
                      <q-tr
                        v-show="props.expand"
                        colspan="100%"
                        v-for="func in props.row.functions"
                        :key="func.expression"
                        class="cursor-pointer"
                        @dblclick="selectFunc(func)"
                      >
                        <q-td style="width:30px;" />
                        <q-td auto-width>{{ func.expression }}</q-td>
                        <q-td auto-width>{{ func.remark }}</q-td>
                        <q-td auto-width>{{ func.help }}</q-td>
                        <q-td>{{ func.returnType }}</q-td>
                      </q-tr>
                    </template>
                  </q-table>
                </q-tab-panel>
              </q-tab-panels>
            </div>
          </div>
        </q-scroll-area>
        <div class="row justify-end q-pa-md">
          <q-btn outline color="primary" label="取消" v-close-popup />
          <q-btn unelevated color="primary" class="on-right" label="提交" type="submit" />
        </div>
      </q-form>
    </q-dialog>
  </div>
</template>

<script>
import { funcDataList } from 'boot/functions';
import { buildDbColumnListFromDrawingList } from 'components/generator';

export default {
  props: {
    activeData: {
      type: Object,
      required: false,
    },
    formConf: {
      type: Object,
      required: false,
    },
    drawingList: {
      type: Array,
      required: false,
    },
  },
  data() {
    return {
      condition: '',
      loading: false,
      setTable: 'column',
      columnList: [
        {
          name: 'code',
          align: 'center',
          label: '字段名',
          field: 'code',
        },
        {
          name: 'name', align: 'left', label: '中文名', field: 'name',
        },
        {
          name: 'dataType', align: 'left', label: '数据类型', field: 'dataType',
        },
      ],
      funcDataList,
      funcColumnList: [
        {
          name: 'type',
          align: 'left',
          label: '函数名称',
          field: 'type',
        },
        {
          name: 'remark',
          align: 'left',
          label: '功能说明',
          field: 'remark',
        },
        {
          name: 'example',
          align: 'left',
          label: '示例',
          field: 'example',
        },
        {
          name: 'returnType',
          align: 'left',
          label: '返回类型',
          field: 'returnType',
        },
      ],
    };
  },
  methods: {
    show() {
      this.condition = this.activeData.config.expression;
      this.$refs.dialog.show();
    },
    submit() {
      this.activeData.config.expression = this.condition;
      this.$refs.dialog.hide();
    },
    selectColumn(col) {
      this.insertContent(`$[${col.code}]`);
    },
    selectFunc(func) {
      this.insertContent(func.expression);
    },
    insertContent(value) {
      const cndInput = this.$refs.cndInput.$el.querySelector('textarea');
      const txt = this.condition || '';
      const startPos = cndInput.selectionStart || txt.length;
      const endPos = cndInput.selectionEnd || txt.length;
      const result = txt.substring(0, startPos) + value + txt.substring(endPos);
      this.condition = result;
      cndInput.focus();
      this.$nextTick(() => {
        let adjust = 0;
        if (value === ' () ' || value === ' [] ' || value === ' \'\' ') {
          adjust = 2;
        }
        cndInput.selectionStart = startPos + value.length - adjust;
        cndInput.selectionEnd = startPos + value.length - adjust;
      });
    },
  },
  computed: {
    dataList() {
      const cols = buildDbColumnListFromDrawingList(this.drawingList).filter((v) => v.code !== this.activeData.vModel);
      return cols;
    },

  },
  mounted() {
  },
};
</script>

<style>
</style>
