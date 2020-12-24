<template>
  <q-page class="column q-pa-sm">
    <div class="col column view_card shadow-2 q-pa-md">
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
        <template #top-left>
          <div class="row no-wrap">
            <div class="row items-center">
              <q-input
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
            <q-btn outline icon="add" color="primary" label="新建" @click="add" />
            <q-btn
              outline
              color="primary"
              label="切换全屏"
              @click="table.toggleFullscreen"
              :icon="table.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
            />
            <q-btn-dropdown outline color="primary" label="自选列" icon="view_list">
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
              label="批量删除"
              @click="showConfirm()"
              icon="mdi-delete-variant"
            />
          </q-btn-group>
        </template>

        <template #body-cell-postRank="props">
          <q-td key="postRank" :props="props">
            {{getDictLabel(positionRank,props.row.postRank) }}
          </q-td>
        </template>
        <template #body-cell-opt="props">
          <q-td :props="props" :auto-width="true">
            <q-btn flat round dense color="primary" icon="edit" @click="edit(props.row)">
              <q-tooltip>编辑</q-tooltip>
            </q-btn>
            <btn-del label @confirm="del(props.row)" />
          </q-td>
        </template>
      </q-table>
    </div>
    <q-dialog maximized flat persistent ref="dialog" position="right">
      <q-form @submit="submit" class="dialog_card column">
        <h5 class="view_title justify-between q-px-md">
          {{editType}}
          <q-btn dense outline round icon="clear" size="sm" v-close-popup />
        </h5>
        <q-scroll-area class="col">
          <div class="row q-col-gutter-x-md dialog_form q-pa-md">
            <div class="col-12">
              <h5>
                <q-icon name="star" color="red" />职务编码：
              </h5>
              <q-input outlined dense v-model="form.code" type="text" :rules="[requiredTest]" />
            </div>
            <div class="col-12">
              <h5>
                <q-icon name="star" color="red" />职务名称：
              </h5>
              <q-input outlined dense v-model="form.name" type="text" :rules="[requiredTest]" />
            </div>
            <div class="col-12">
              <h5>职级：</h5>
              <q-select
                outlined
                dense
                emit-value
                v-model="form.postRank"
                map-options
                :options="positionRank"
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
    <confirm ref="confirmDialog" :msg="confirmMsg" @confirm="deleteBatch()" />
  </q-page>
</template>

<script>
import { IndexMixin } from 'boot/mixins';
import { getDictLabel } from 'boot/dictionary';
import confirm from 'components/confirm';
import { requiredTest } from 'boot/inputTest';

export default {
  name: 'SysPosition',
  mixins: [IndexMixin],
  components: {
    confirm,
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
          name: 'code', align: 'left', label: '职务编码', field: 'code',
        },
        {
          name: 'name', align: 'left', label: '职务名称', field: 'name',
        },
        {
          name: 'postRank', align: 'left', label: '职级', field: 'postRank',
        },
        {
          name: 'opt', align: 'center', label: '操作', field: 'id',
        },
      ],
      positionRank: [{ value: '1', label: '员级' }, { value: '2', label: '助级' }, { value: '3', label: '中级' }, { value: '4', label: '副高级' }, { value: '5', label: '正高级' }],
      url: {
        list: '/sys/position/list',
        add: '/sys/position/add',
        edit: '/sys/position/edit',
        delete: '/sys/position/delete',
        deleteBatch: '/sys/position/deleteBatch',
        exportXlsUrl: '/sys/position/exportXls',
        importExcelUrl: '/sys/position/importExcel',
      },
    };
  },
  methods: {
    requiredTest,
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
