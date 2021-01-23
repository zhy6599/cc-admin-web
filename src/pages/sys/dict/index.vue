<template>
  <q-page class="cc-admin column q-pa-sm">
    <div class="col column bg-white shadow-2 q-pa-md">
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
                <q-btn outline icon="add" color="primary" label="新建数据字典" @click="add" />
                <q-btn
                  outline
                  color="primary"
                  label="切换全屏"
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
                @click.native="selectDict(props.row)"
              >
                <q-td key="index" :props="props">{{ props.row.index }}</q-td>
                <q-td key="dictName" :props="props">{{ props.row.dictName }}</q-td>
                <q-td key="dictCode" :props="props">{{ props.row.dictCode }}</q-td>
                <q-td key="description" :props="props">{{ props.row.description }}</q-td>
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
          <item :selectedDictArray="selected" />
        </template>
      </q-splitter>
    </div>
    <q-dialog maximized flat persistent ref="dialog" position="right">
      <q-form @submit="submit" class="dialog_card column">
        <h5 class="view_title justify-between q-px-md">
          {{ editType }}数据字典
          <q-btn dense outline round icon="clear" size="sm" v-close-popup />
        </h5>
        <q-scroll-area class="col">
          <div class="row q-col-gutter-x-md dialog_form q-pa-md">
            <div class="col-12">
              <h5>
                <q-icon name="star" color="red" />字典名称：
              </h5>
              <q-input outlined dense v-model="form.dictName" type="text" :rules="[requiredTest]" />
            </div>
            <div class="col-12">
              <h5>
                <q-icon name="star" color="red" />字典编码：
              </h5>
              <q-input outlined dense v-model="form.dictCode" type="text" :rules="[requiredTest]" />
            </div>
            <div class="col-12">
              <h5>描述：</h5>
              <q-input outlined dense v-model="form.description" type="textarea" :rules="[]" />
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
import { requiredTest, letterTest } from 'boot/inputTest';
import { IndexMixin } from 'boot/mixins';
import item from './item';

export default {
  name: 'SysDict',
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
          name: 'dictName',
          align: 'left',
          label: '字典名称',
          field: 'dictName',
        },
        {
          name: 'dictCode',
          align: 'left',
          label: '字典编码',
          field: 'dictCode',
        },
        {
          name: 'description',
          align: 'left',
          label: '描述',
          field: 'description',
        },
        {
          name: 'opt',
          align: 'center',
          label: '操作',
          field: 'opt',
        },
      ],
      url: {
        list: '/sys/dict/list',
        add: '/sys/dict/add',
        edit: '/sys/dict/edit',
        delete: '/sys/dict/delete',
        deleteBatch: '/sys/dict/deleteBatch',
        exportXlsUrl: '/sys/dict/exportXls',
        importExcelUrl: '/sys/dict/importExcel',
      },
    };
  },
  methods: {
    requiredTest,
    letterTest,
    selectDict(row) {
      this.selected.pop();
      this.selected.push(row);
    },
    delAfter() {
      this.selected.pop();
    },
  },
  computed: {
  },
  mounted() {
    this.query();
  },
};
</script>

<style lang="stylus"></style>
