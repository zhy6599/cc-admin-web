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
      <template #body-cell-status="props">
        <q-td :props="props">
          <q-badge
            @click.native="changeStatus(props.row)"
            :class="['cursor-pointer',props.value === 1?'bg-blue':'bg-grey']"
          >{{props.row.status === 1?'启用':'停用'}}</q-badge>
        </q-td>
      </template>
      <template #body-cell-opt="props">
        <q-td :props="props" :auto-width="true">
          <q-btn flat round dense color="primary" icon="edit" @click="edit(props.row)">
            <q-tooltip>编辑</q-tooltip>
          </q-btn>
          <btn-del label="字典列表" @confirm="del(props.row)" />
        </q-td>
      </template>
    </q-table>
    <q-dialog maximized flat persistent ref="dialog" position="right">
      <q-form @submit="submit" class="dialog_card column">
        <h5 class="view_title justify-between q-px-md">
          {{editType}}字典列表
          <q-btn dense outline round icon="clear" size="sm" v-close-popup />
        </h5>
        <q-scroll-area class="col">
          <div class="row q-col-gutter-x-md dialog_form q-pa-md">
            <div class="col-12">
              <h5>字典项文本：</h5>
              <q-input outlined dense v-model="form.itemText" type="text" autofocus
                :rules="[requiredTest]" />
            </div>
            <div class="col-12">
              <h5>字典项值：</h5>
              <q-input outlined dense v-model="form.itemValue" type="text"
              :rules="[requiredTest]" />
            </div>
            <div class="col-12">
              <h5>描述：</h5>
              <q-input outlined dense v-model="form.description" type="text" :rules="[]" />
            </div>
            <div class="col-12">
              <h5>排序：</h5>
              <q-input
                outlined
                dense
                v-model="form.sortOrder"
                type="number"
                :rules="[requiredTest]"
              />
            </div>
            <div class="col-12">
              <h5>状态：</h5>
              <q-toggle v-model="form.status" :true-value="1" :false-value="0" />
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
import { requiredTest } from 'boot/inputTest';
import { IndexMixin } from 'boot/mixins';

export default {
  name: 'SysDictItem',
  mixins: [IndexMixin],
  props: {
    selectedDictArray: Array,
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
          name: 'itemText', align: 'left', label: '字典项文本', field: 'itemText',
        },
        {
          name: 'itemValue', align: 'left', label: '字典项值', field: 'itemValue',
        },
        {
          name: 'sortOrder', align: 'left', label: '排序', field: 'sortOrder',
        },
        {
          name: 'status', align: 'left', label: '状态', field: 'status',
        },
        {
          name: 'opt',
          label: '操作',
          field: 'id',
          align: 'center',
        },
      ],
      url: {
        list: '/sys/dictItem/list',
        add: '/sys/dictItem/add',
        edit: '/sys/dictItem/edit',
        delete: '/sys/dictItem/delete',
        deleteBatch: '/sys/dictItem/deleteBatch',
        changeSysDictItemStatus: '/sys/dictItem/status',
        exportXlsUrl: '/sys/dictItem/exportXls',
        importExcelUrl: '/sys/dictItem/importExcel',
      },
    };
  },
  methods: {
    requiredTest,
    queryParam() {
      const sel = this.selectedDictArray[0];
      return {
        dictId: sel.id,
      };
    },
    beforeQuery() {
      return this.selectedDictArray.length === 1;
    },
    addBefore() {
      this.form.dictId = this.selectedDictArray[0].id;
      this.form.sortOrder = 100;
      this.form.status = 1;
      return true;
    },
    changeStatus(row) {
      this.$axios.put(this.url.changeSysDictItemStatus, row)
        .then((r) => {
          this.$retMsg(r);
        }).finally(() => {
          this.query();
        });
    },
  },
  watch: {
    selectedDictArray: {
      handler() {
        if (this.selectedDictArray.length === 1) {
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
