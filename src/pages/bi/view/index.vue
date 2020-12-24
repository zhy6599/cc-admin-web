<template>
  <q-page class="row">
    <viewcatalog class="q-mt-sm q-mb-sm q-ml-sm" type="BiView" @select="selectCatalog" />
    <div class="col column view_card shadow-2 q-pa-md q-ma-sm">
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
                clearable
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
            <q-btn outline icon="add" color="primary" label="新建视图" @click="add" />
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

        <template #body-cell-viewSql="props">
          <q-td key="viewSql" :props="props">
            <ellipsisvalue :value="props.row.viewSql" :length="20" />
          </q-td>
        </template>

        <template #body-cell-model="props">
          <q-td key="model" :props="props">
            <ellipsisvalue :value="props.row.model" :length="20" />
          </q-td>
        </template>

        <template #body-cell-opt="props">
          <q-td :props="props" :auto-width="true">
            <q-btn flat round dense color="primary" icon="edit" @click="edit(props.row)">
              <q-tooltip>编辑</q-tooltip>
            </q-btn>
            <q-btn
              flat
              round
              dense
              color="primary"
              icon="mdi-image-edit-outline"
              @click="design(props.row)"
            >
              <q-tooltip>视图设计</q-tooltip>
            </q-btn>
            <btn-del label="视图" @confirm="del(props.row)" />
          </q-td>
        </template>
      </q-table>
    </div>
    <q-dialog maximized flat persistent ref="dialog" position="right">
      <q-form @submit="submit" class="dialog_card column">
        <h5 class="view_title justify-between q-px-md">
          {{editType}}视图
          <q-btn dense outline round icon="clear" size="sm" v-close-popup />
        </h5>
        <q-scroll-area class="col">
          <div class="row q-col-gutter-x-md dialog_form q-pa-md">
            <div class="col-12">
              <h5>
                <q-icon name="star" color="red" />名称：
              </h5>
              <q-input outlined dense v-model="form.name" type="text" :rules="[requiredTest]" />
            </div>
            <div class="col-12">
              <h5>描述：</h5>
              <q-input outlined dense v-model="form.description" type="text" />
            </div>
            <div class="col-12">
              <h5>目录编号：</h5>
              <catalogselect :form.sync="form" type="BiView" />
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
    <edit ref="edit" />
  </q-page>
</template>

<script>
import { IndexMixin } from 'boot/mixins';
import { getDictLabel } from 'boot/dictionary';
import confirm from 'components/confirm';
import { requiredTest } from 'boot/inputTest';
import catalogselect from 'components/catalogselect';
import viewcatalog from 'components/viewcatalog';
import edit from './edit';

export default {
  name: 'BiView',
  mixins: [IndexMixin],
  components: {
    edit,
    confirm,
    viewcatalog,
    catalogselect,
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
          name: 'description', align: 'left', label: '描述', field: 'description',
        },
        {
          name: 'catalogId_dictText', align: 'left', label: '目录编号', field: 'catalogId_dictText',
        },
        {
          name: 'viewSql', align: 'left', label: 'SQL', field: 'viewSql',
        },
        {
          name: 'model', align: 'left', label: '图形设置', field: 'model',
        },
        {
          name: 'variable', align: 'left', label: '参数', field: 'variable', format: (val) => this.ellipsis(val),
        },
        {
          name: 'config', align: 'left', label: '配置信息', field: 'config', format: (val) => this.ellipsis(val),
        },
        {
          name: 'opt', align: 'center', label: '操作', field: 'id',
        },
      ],
      url: {
        list: '/bi/view/list',
        add: '/bi/view/add',
        edit: '/bi/view/edit',
        delete: '/bi/view/delete',
        deleteBatch: '/bi/view/deleteBatch',
        exportXlsUrl: '/bi/view/exportXls',
        importExcelUrl: '/bi/view/importExcel',
      },
    };
  },
  methods: {
    requiredTest,
    design(t) {
      this.$refs.edit.show(t.id);
    },
    addBefore() {
      this.form.catalogId = this.catalog;
      return true;
    },
    selectCatalog(n) {
      this.catalog = n;
      this.query();
    },
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
