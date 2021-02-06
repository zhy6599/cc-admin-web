<template>
  <q-page class="cc-admin column">
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
        selection="multiple"
        :selected.sync="selected"
      >
        <template #top-left>
          <div class="row no-wrap">
            <div class="row items-center justify-between">
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
              <q-btn
                outline
                class="q-ml-xl"
                type="a"
                target="_blank"
                :href="'/baby/word/study'"
                color="primary"
                icon="mdi-image-edit-outline"
                label="开始学习"
              >
                <q-tooltip>开始学习</q-tooltip>
              </q-btn>
              <q-btn
                outline
                class="q-ml-xl"
                type="a"
                target="_blank"
                :href="'/baby/word/card'"
                color="primary"
                icon="mdi-image-edit-outline"
                label="卡片学习"
              >
                <q-tooltip>开始学习</q-tooltip>
              </q-btn>
              <q-btn
                outline
                class="q-ml-xl"
                type="a"
                target="_blank"
                :href="'/baby/word/vertical'"
                color="primary"
                icon="mdi-image-edit-outline"
                label="竖状卡片"
              >
                <q-tooltip>开始学习</q-tooltip>
              </q-btn>
            </div>
          </div>
        </template>
        <template #top-right="table">
          <q-btn-group outline>
            <q-btn outline icon="add" color="primary" no-wrap label="新建字词" @click="add" />
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

        <template #body-cell-opt="props">
          <q-td :props="props" :auto-width="true">
            <q-btn flat round dense color="primary" icon="edit" @click="edit(props.row)">
              <q-tooltip>编辑</q-tooltip>
            </q-btn>
            <btn-del label="字词管理" @confirm="del(props.row)" />
          </q-td>
        </template>
      </q-table>
    </div>
    <q-dialog maximized flat persistent ref="dialog" position="right">
      <q-form @submit="submit" class="dialog_card column">
        <h5 class="view_title justify-between q-px-md">
          {{editType}}字词
          <q-btn dense outline round icon="clear" size="sm" v-close-popup />
        </h5>
        <q-scroll-area class="col">
          <div class="row q-col-gutter-x-md dialog_form q-pa-md">
            <div class="col-12">
              <h5>
                <q-icon name="star" color="red" />名称：
              </h5>
              <q-input
                outlined
                dense
                v-model="form.name"
                type="text"
                autofocus
                :rules="[requiredTest]"
              />
            </div>
            <div class="col-12">
              <h5>拼音：</h5>
              <q-input outlined dense v-model="form.pinyin" type="text" />
            </div>
            <div class="col-12">
              <h5>排序：</h5>
              <q-input outlined dense v-model="form.sortOrder" type="number" />
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
  name: 'BabyWord',
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
          name: 'name', align: 'left', label: '名称', field: 'name',
        },
        {
          name: 'pinyin', align: 'left', label: '拼音', field: 'pinyin',
        },
        {
          name: 'sortOrder', align: 'left', label: '排序', field: 'sortOrder',
        },
        {
          name: 'opt', align: 'center', label: '操作', field: 'id',
        },
      ],
      url: {
        list: '/baby/word/list',
        add: '/baby/word/add',
        edit: '/baby/word/edit',
        delete: '/baby/word/delete',
        deleteBatch: '/baby/word/deleteBatch',
        exportXlsUrl: '/baby/word/exportXls',
        importExcelUrl: '/baby/word/importExcel',
      },
    };
  },
  methods: {
    requiredTest,
    getDictLabel,
    addBefore() {
      this.form.sortOrder = 100;
      return true;
    },
    initDict() {
    },
  },
  mounted() {
    this.initDict();
  },
};
</script>

<style lang="stylus"></style>
