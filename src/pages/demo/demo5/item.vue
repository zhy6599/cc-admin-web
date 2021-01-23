<template>
  <div class="col column bg-white shadow-2 q-pl-md">
    <q-table
      flat
      color="primary"
      class="cross_table"
      separator="cell"
      :columns="columns"
      :data="list"
      row-key="id"
      :loading="loading"
      :rows-per-page-options="[10, 20, 50, 100]"
      :pagination.sync="pagination"
      @request="query"
    >
      <template #top-left>
        <div class="row no-wrap">
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
      </template>
      <template #top-right="table">
        <q-btn-group outline>
          <q-btn outline icon="add" color="primary" label="新建字典列表" @click="add" />
          <q-btn
            outline
            color="primary"
            label="切换全屏"
            @click="table.toggleFullscreen"
            :icon="table.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
          />
        </q-btn-group>
      </template>
      <template #body-cell-detailType="props">
        <q-td key="detailType" :props="props">
          {{getDictLabel(detailType,props.row.detailType) }}
        </q-td>
      </template>
      <template #body-cell-opt="props">
        <q-td :props="props" :auto-width="true">
          <q-btn flat round dense color="primary" icon="edit" @click="edit(props.row)">
            <q-tooltip>编辑</q-tooltip>
          </q-btn>
          <btn-del label="计划明细" @confirm="del(props.row)" />
        </q-td>
      </template>
    </q-table>
    <q-dialog maximized flat persistent ref="dialog" position="right">
      <q-form @submit="submit" class="dialog_card column">
        <h5 class="view_title justify-between q-px-md">
          {{editType}}计划明细
          <q-btn dense outline round icon="clear" size="sm" v-close-popup />
        </h5>
        <q-scroll-area class="col">
          <div class="row q-col-gutter-x-md dialog_form q-pa-md">
            <div class="col-12">
              <h5>
                <q-icon name="star" color="red" />明细名称：
              </h5>
              <q-input outlined dense v-model="form.name" type="text" :rules="[requiredTest]" />
            </div>
            <div class="col-12">
              <h5>备注：</h5>
              <q-input outlined dense v-model="form.remark" type="text" />
            </div>
            <div class="col-12">
              <h5>
                <q-icon name="star" color="red" />计划编号：
              </h5>
              <q-input outlined dense v-model="form.planId" type="text" :rules="[requiredTest]" />
            </div>
            <div class="col-12">
              <h5>
                <q-icon name="star" color="red" />明细类型：
              </h5>
              <q-select
                outlined
                dense
                emit-value
                v-model="form.detailType"
                map-options
                :options="detailType"
              />
            </div>
            <div class="col-12">
              <h5>
                <q-icon name="star" color="red" />实施月份：
              </h5>
              <q-input
                outlined
                dense
                v-model="form.executeMonth"
                type="text"
                :rules="[requiredTest]"
              />
            </div>
            <div class="col-12">
              <h5>
                <q-icon name="star" color="red" />执行状态：
              </h5>
              <q-input
                outlined
                dense
                v-model="form.executeState"
                type="text"
                :rules="[requiredTest]"
              />
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
import { IndexMixin } from 'boot/mixins';
import { getDictLabel } from 'boot/dictionary';
import { requiredTest } from 'boot/inputTest';

export default {
  name: 'DemoPlanDetail',
  mixins: [IndexMixin],
  components: {
  },
  props: {
    selectedArray: Array,
  },
  data() {
    return {
      columns: [
        {
          name: 'index',
          align: 'center',
          label: '序号',
          field: 'index',
        },
        {
          name: 'name', align: 'left', label: '明细名称', field: 'name',
        },
        {
          name: 'remark', align: 'left', label: '备注', field: 'remark',
        },
        {
          name: 'planId', align: 'left', label: '计划编号', field: 'planId',
        },
        {
          name: 'detailType', align: 'left', label: '明细类型', field: 'detailType',
        },
        {
          name: 'executeMonth', align: 'left', label: '实施月份', field: 'executeMonth',
        },
        {
          name: 'executeState', align: 'left', label: '执行状态', field: 'executeState',
        },
        {
          name: 'opt', align: 'center', label: '操作', field: 'id',
        },
      ],
      detailType: [{ value: '1', label: '核心系统' }, { value: '2', label: '信贷系统' }],
      url: {
        list: '/demo/planDetail/list',
        add: '/demo/planDetail/add',
        edit: '/demo/planDetail/edit',
        delete: '/demo/planDetail/delete',
        deleteBatch: '/demo/planDetail/deleteBatch',
        exportXlsUrl: '/demo/planDetail/exportXls',
        importExcelUrl: '/demo/planDetail/importExcel',
      },
    };
  },
  methods: {
    requiredTest,
    getDictLabel,
    initDict() {
    },
    queryParam() {
      const sel = this.selectedArray[0];
      return {
        planId: sel.id,
      };
    },
    beforeQuery() {
      return this.selectedArray.length === 1;
    },
    addBefore() {
      this.form.planId = this.selectedArray[0].id;
      return true;
    },
  },
  mounted() {
    this.initDict();
  },
  watch: {
    selectedArray: {
      handler() {
        if (this.selectedArray.length === 1) {
          this.key = '';
          this.query();
        } else {
          this.list = [];
        }
      },
      deep: true,
    },
  },
};
</script>

<style lang="stylus"></style>
