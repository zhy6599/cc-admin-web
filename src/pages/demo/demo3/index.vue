<template>
  <q-page  class="row">
    <view-nav class="q-mt-sm q-mb-sm q-ml-sm" title="我的代办" v-model="proTypes"
      :selected.sync="proType" @select="query" v-if="this.$q.screen.gt.md"/>
    <div class="col bg-white shadow-2 q-pa-md q-ma-sm">
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
        :grid="$q.screen.xs"
        :selection="$q.screen.xs?'none':'multiple'"
        :selected.sync="selected"
      >
        <template #top-left>
          <div class="row no-wrap">
            <div class="row items-center">
              <q-input
                clearable
                outlined
                dense
                placeholder="请输入关键字搜索"
                class="on-left"
                @input="query"
                debounce="500"
                v-model="key"
              >
                <template #append>
                  <q-btn flat round icon="search" color="primary" @click="query" :loading="loading">
                    <q-tooltip>搜索</q-tooltip>
                  </q-btn>
                </template>
              </q-input>
            </div>
          </div>
        </template>
        <template #top-right="table">
          <q-btn-group outline>
            <q-btn outline icon="add" color="primary" no-wrap label="新建订单主表" @click="add" />
            <q-btn
              outline
              color="primary"
              label="切换全屏" no-wrap v-if="$q.screen.gt.md"
              @click="table.toggleFullscreen"
              :icon="table.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
            />
            <q-btn-dropdown outline color="primary" label="自选列"
            v-if="$q.screen.gt.md" icon="view_list">
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
              :disable="selected.length === 0"
              outline
              color="primary"
              label="批量删除"  no-wrap v-if="$q.screen.gt.sm"
              @click="showConfirm()"
              icon="mdi-delete-variant"
            />
          </q-btn-group>
        </template>

        <template #body-cell-ctype="props">
          <q-td key="ctype" :props="props">{{getDictLabel(demoOrderType,props.row.ctype) }}</q-td>
        </template>
        <template #body-cell-opt="props">
          <q-td :props="props" width="120">
            <q-btn flat round dense color="primary" icon="edit" @click="edit(props.row)">
              <q-tooltip>编辑</q-tooltip>
            </q-btn>
            <btn-del label="订单主表" @confirm="del(props.row)" />
          </q-td>
        </template>
      </q-table>
    </div>
    <q-dialog maximized flat persistent ref="dialog" position="right">
      <q-form @submit="submit" class="dialog_card column">
        <h5 class="view_title justify-between q-px-md">
          {{editType}}订单主表
          <q-btn dense outline round icon="clear" size="sm" v-close-popup />
        </h5>
        <q-scroll-area class="col">
          <div class="row q-col-gutter-x-md dialog_form q-pa-md">
            <div class="col-12">
              <h5>订单号：</h5>
              <q-input outlined dense v-model="form.orderCode" type="text" clearable />
            </div>
            <div class="col-12">
              <h5>订单类型：</h5>
              <q-select
                outlined
                dense
                emit-value
                v-model="form.ctype"
                map-options
                :options="demoOrderType"
                clearable
              />
            </div>
            <div class="col-12">
              <h5>订单日期：</h5>
              <q-field outlined dense v-model="form.orderDate">
                <template v-slot:control>{{form.orderDate}}</template>
                <template v-slot:append>
                  <q-btn flat dense round color="primary" icon="schedule">
                    <q-popup-proxy>
                      <div class="row">
                        <q-date flat square v-model="form.orderDate" mask="YYYY-MM-DD HH:mm:ss" />
                        <q-time flat square v-model="form.orderDate" mask="YYYY-MM-DD HH:mm:ss" />
                      </div>
                    </q-popup-proxy>
                  </q-btn>
                </template>
              </q-field>
            </div>
            <div class="col-12">
              <h5>订单金额：</h5>
              <q-input outlined dense v-model="form.orderMoney" type="number" clearable />
            </div>
            <div class="col-12">
              <h5>订单备注：</h5>
              <q-input outlined dense v-model="form.content" type="text" clearable />
            </div>
          </div>
        </q-scroll-area>
        <div class="row justify-end q-pa-md">
          <q-btn outline color="primary" label="取消" v-close-popup />
          <q-btn unelevated color="primary" class="on-right" label="提交" type="submit" />
        </div>
      </q-form>
    </q-dialog>
    <confirm ref="confirmDialog" :msg="confirmMsg" @confirm="deleteBatch()" />
  </q-page>
</template>

<script>
import { IndexMixin } from 'boot/mixins';
import { getDictLabel } from 'boot/dictionary';
import confirm from 'components/confirm';

export default {
  name: 'DemoOrderMain',
  mixins: [IndexMixin],
  components: {
    confirm,
  },
  data() {
    return {
      proType: {},
      proTypes: [{ label: '待处理事件', value: '1', tip: 10 }, { label: '处理完成事件', value: '2', tip: 25 }],
      columns: [
        {
          name: 'index',
          align: 'center',
          label: '序号',
          field: 'index',
        },
        {
          name: 'orderCode', align: 'left', label: '订单号', field: 'orderCode',
        },
        {
          name: 'ctype', align: 'left', label: '订单类型', field: 'ctype',
        },
        {
          name: 'orderDate', align: 'left', label: '订单日期', field: 'orderDate',
        },
        {
          name: 'orderMoney', align: 'left', label: '订单金额', field: 'orderMoney',
        },
        {
          name: 'content', align: 'left', label: '订单备注', field: 'content',
        },
        {
          name: 'opt', align: 'center', label: '操作', field: 'id',
        },
      ],
      demoOrderType: [{ value: '1', label: '红星二锅头' }, { value: '2', label: '牛栏山二锅头' }, { value: '3', label: '国窖1573' }, { value: '4', label: '散装陈酿' }],
      url: {
        list: '/demo/orderMain/list',
        add: '/demo/orderMain/add',
        edit: '/demo/orderMain/edit',
        delete: '/demo/orderMain/delete',
        deleteBatch: '/demo/orderMain/deleteBatch',
        exportXlsUrl: '/demo/orderMain/exportXls',
        importExcelUrl: '/demo/orderMain/importExcel',
      },
    };
  },
  methods: {
    getDictLabel,
    initDict() {
    },
  },
  mounted() {
    this.initDict();
  },
};
</script>

<style lang="stylus"></style>
