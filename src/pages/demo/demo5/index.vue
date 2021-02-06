<template>
  <q-page class="cc-admin q-pa-sm">
    <div class="col bg-white shadow-2 q-pa-md">
      <q-splitter v-model="splitterModel" separator-style="width: 0px;">
        <template v-slot:before>
          <q-table
            flat
            color="primary"
            class="cross_table"
            separator="cell"
            :columns="columns"
            :data="list"
            row-key="id"
            :rows-per-page-options="[10, 20, 50, 100]"
            :pagination.sync="pagination"
            @request="query"
            :loading="loading"
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
                    <q-btn
                      flat
                      round
                      icon="search"
                      color="primary"
                      @click="query"
                      :loading="loading"
                    >
                      <q-tooltip>搜索</q-tooltip>
                    </q-btn>
                  </template>
                </q-input>
              </div>
            </template>
            <template #top-right="table">
              <q-btn-group outline>
                <q-btn outline icon="add" color="primary" no-wrap label="新建审计计划" @click="add" />
                <q-btn
                  outline
                  color="primary"
                  label="切换全屏" no-wrap v-if="$q.screen.gt.md"
                  @click="table.toggleFullscreen"
                  :icon="table.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
                />
              </q-btn-group>
            </template>
            <template v-slot:body="props">
              <q-tr
                :props="props"
                :class="['cursor-pointer',
              (selected.length === 1 && selected[0].id === props.row.id)?'bg-cyan-3':'']"
                @click.native="selectData(props.row)"
              >
                <q-td key="index" :props="props">{{ props.row.index }}</q-td>
                <q-td key="name" :props="props">{{props.row.name}}</q-td>
                <q-td key="createOrg" :props="props">{{props.row.createOrg}}</q-td>
                <q-td key="planYear" :props="props">
                  {{getDictLabel(planYear,props.row.planYear) }}
                </q-td>
                <q-td key="planType" :props="props">
                  {{getDictLabel(planType,props.row.planType) }}
                </q-td>
                <q-td
                  key="plansTatus"
                  :props="props"
                >{{getDictLabel(planStatus,props.row.plansTatus) }}</q-td>
                <q-td key="opt" :props="props" :auto-width="true">
                  <q-btn flat round dense color="primary" icon="edit" @click="edit(props.row)">
                    <q-tooltip>编辑</q-tooltip>
                  </q-btn>
                  <btn-del label="数据字典" @confirm="del(props.row)" />
                </q-td>
              </q-tr>
            </template>
          </q-table>
        </template>
        <template v-slot:after>
          <item :selectedArray="selected" />
        </template>
      </q-splitter>
    </div>
    <q-dialog maximized flat persistent ref="dialog" position="right">
      <q-form @submit="submit" class="dialog_card column">
        <h5 class="view_title justify-between q-px-md">
          {{editType}}审计计划
          <q-btn dense outline round icon="clear" size="sm" v-close-popup />
        </h5>
        <q-scroll-area class="col">
          <div class="row q-col-gutter-x-md dialog_form q-pa-md">
            <div class="col-12">
              <h5>计划名称：</h5>
              <q-input outlined dense v-model="form.name" type="text" />
            </div>
            <div class="col-12">
              <h5>创建机构：</h5>
              <q-input outlined dense v-model="form.createOrg" type="text" />
            </div>
            <div class="col-12">
              <h5>计划年度：</h5>
              <q-select
                outlined
                dense
                emit-value
                v-model="form.planYear"
                map-options
                :options="planYear"
              />
            </div>
            <div class="col-12">
              <h5>计划类型：</h5>
              <q-select
                outlined
                dense
                emit-value
                v-model="form.planType"
                map-options
                :options="planType"
              />
            </div>
            <div class="col-12">
              <h5>计划状态：</h5>
              <q-select
                outlined
                dense
                emit-value
                v-model="form.plansTatus"
                map-options
                :options="planStatus"
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
  </q-page>
</template>

<script>
import { IndexMixin } from 'boot/mixins';
import { getDictLabel } from 'boot/dictionary';
import item from './item';

export default {
  name: 'DemoPlan',
  mixins: [IndexMixin],
  components: {
    item,
  },
  data() {
    return {
      splitterModel: 50,
      columns: [
        {
          name: 'index',
          align: 'center',
          label: '序号',
          field: 'index',
        },
        {
          name: 'name', align: 'left', label: '计划名称', field: 'name',
        },
        {
          name: 'createOrg', align: 'left', label: '创建机构', field: 'createOrg',
        },
        {
          name: 'planYear', align: 'left', label: '计划年度', field: 'planYear',
        },
        {
          name: 'planType', align: 'left', label: '计划类型', field: 'planType',
        },
        {
          name: 'plansTatus', align: 'left', label: '计划状态', field: 'plansTatus',
        },
        {
          name: 'opt', align: 'center', label: '操作', field: 'id',
        },
      ],
      planYear: [{ value: '2020', label: '2020年' }, { value: '2020', label: '2021年' }, { value: '2022', label: '2022年' }],
      planType: [{ value: '1', label: '年度计划' }, { value: '2', label: '新增计划' }],
      planStatus: [{ value: '1', label: '未启动' }, { value: '2', label: '执行中' }, { value: '3', label: '完成' }],
      url: {
        list: '/demo/plan/list',
        add: '/demo/plan/add',
        edit: '/demo/plan/edit',
        delete: '/demo/plan/delete',
        deleteBatch: '/demo/plan/deleteBatch',
        exportXlsUrl: '/demo/plan/exportXls',
        importExcelUrl: '/demo/plan/importExcel',
      },
    };
  },
  methods: {
    selectData(row) {
      this.selected.pop();
      this.selected.push(row);
    },
    delAfter() {
      this.selected.pop();
    },
    getDictLabel,
    initDict() {
    },
  },
  computed: {
  },
  mounted() {
    this.initDict();
    this.query();
  },
};
</script>

<style lang="stylus"></style>
