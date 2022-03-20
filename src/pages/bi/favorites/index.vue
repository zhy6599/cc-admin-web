<template>
  <q-page class="cc-admin row">
    <viewcatalog
      class="q-mt-sm q-mb-sm q-ml-sm"
      type="BiFavorites"
      @select="selectCatalog"
      v-if="this.$q.screen.gt.md"
    />
    <div class="col bg-white shadow-2 q-pa-md q-ma-sm">
      <div class="row">
        <q-item class="col-3 items-center">
          <q-item-label>名称：</q-item-label>
          <q-item-section>
            <q-input dense outlined v-model="searchForm.name"></q-input>
          </q-item-section>
        </q-item>
        <q-item class="col-3 items-center">
          <q-item-label>类型：</q-item-label>
          <q-item-section>
            <q-select
              outlined
              dense
              emit-value
              v-model="searchForm.type"
              map-options
              :options="chartTypes"
            />
          </q-item-section>
        </q-item>
        <q-item class="col-3 items-center">
          <q-item-section>
            <div>
              <q-btn
                unelevated
                class="q-mr-sm no-border-radius"
                color="primary"
                icon="search"
                label="查询"
                :loading="loading"
                @click="query()"
              />
              <q-btn
                no-wrap
                outline
                unelevated
                class="q-mr-sm no-border-radius"
                color="secondary"
                icon="refresh"
                label="重置"
                @click="searchReset"
              />
              <q-btn-dropdown
                v-model="showQuery"
                persistent
                dense
                flat
                color="primary"
                :label="tableLabel"
                @before-show="show"
                @before-hide="hide"
              ></q-btn-dropdown>
            </div>
          </q-item-section>
        </q-item>
      </div>
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
        <template v-slot:top="table">
          <div class="row no-wrap full-width">
            <q-space />
            <q-btn-group outline>
              <q-btn outline icon="add" no-wrap color="primary" label="新建" @click="add" />
              <q-btn
                outline
                color="primary"
                label="切换全屏"
                no-wrap
                v-if="$q.screen.gt.md"
                @click="table.toggleFullscreen"
                :icon="table.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
              />
              <q-btn-dropdown
                outline
                color="primary"
                label="自选列"
                icon="view_list"
                no-wrap
                v-if="$q.screen.gt.md"
              >
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
                outline
                no-wrap
                v-if="$q.screen.gt.sm"
                label="导入"
                icon="mdi-cloud-upload-outline"
                :loading="importing"
                color="primary"
                @click="importExcel"
              >
                <q-uploader
                  auto-upload
                  ref="excelUploader"
                  :max-files="1"
                  class="hidden"
                  :url="importExcelUrlFull"
                  field-name="file"
                  :headers="[{name: 'authorization', value: $store.state.User.authorization}]"
                  @uploaded="importedExcel"
                />
              </q-btn>
              <q-btn
                outline
                no-wrap
                v-if="$q.screen.gt.sm"
                :loading="exporting"
                label="导出"
                icon="mdi-cloud-download-outline"
                color="primary"
                @click="exportExcel('收藏夹')"
              />
              <q-btn
                :disable="selected.length === 0"
                outline
                no-wrap
                v-if="$q.screen.gt.md"
                color="primary"
                label="批量删除"
                @click="showConfirm()"
                icon="mdi-delete-variant"
              />
            </q-btn-group>
          </div>
        </template>
        <template #body-cell-type="props">
          <q-td key="type" :props="props">{{getDictLabel(chartTypes,props.row.type) }}</q-td>
        </template>
        <template #body-cell-opt="props">
          <q-td :props="props" :auto-width="true">
            <q-btn flat round dense color="primary" icon="edit" @click="edit(props.row)">
              <q-tooltip>编辑</q-tooltip>
            </q-btn>
            <btn-del label="收藏夹" @confirm="del(props.row)" />
          </q-td>
        </template>
      </q-table>
    </div>
    <q-dialog maximized flat persistent ref="dialog" position="right">
      <q-form @submit="submit" class="dialog_card column">
        <h5 class="view_title justify-between q-px-md">
          {{editType}}收藏夹
          <q-btn dense outline round icon="clear" size="sm" v-close-popup />
        </h5>
        <q-scroll-area class="col">
          <div class="row q-col-gutter-x-md dialog_form q-pa-md">
            <div class="col-12">
              <h5>名称：</h5>
              <q-input outlined dense v-model="form.name" type="text" />
            </div>
            <div class="col-12">
              <h5>类型：</h5>
              <q-select
                outlined
                dense
                emit-value
                v-model="form.type"
                map-options
                :options="chartTypes"
              />
            </div>
            <div class="col-12">
              <h5>配置信息：</h5>
              <q-input outlined dense v-model="form.config" type="textarea" />
            </div>
            <div class="col-12">
              <h5>分类目录：</h5>
              <catalogselect :form.sync="form" type="BiFavorites" />
            </div>
          </div>
        </q-scroll-area>
        <div class="row justify-end q-pa-md">
          <q-btn outline color="primary" icon="mdi-close-thick" label="关闭" v-close-popup />
          <q-btn class="q-mx-sm" color="primary" icon="mdi-check-bold" label="提交" type="submit" />
        </div>
      </q-form>
    </q-dialog>
    <confirm ref="confirmDialog" :msg="confirmMsg" @confirm="deleteBatch()" />
  </q-page>
</template>

<script>
import { chartList } from 'boot/datatype';
import { IndexMixin } from 'boot/mixins';
import { getDictLabel } from 'boot/dictionary';
import confirm from 'components/confirm';
import catalogselect from 'components/catalogselect';
import viewcatalog from 'components/viewcatalog';

export default {
  name: 'BiFavorites',
  mixins: [IndexMixin],
  components: {
    confirm,
    viewcatalog,
    catalogselect,
  },
  data() {
    return {
      chartList,
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
          name: 'type', align: 'left', label: '类型', field: 'type',
        },
        {
          name: 'catalogId_dictText', align: 'left', label: '分类目录', field: 'catalogId_dictText',
        },
        {
          name: 'opt', align: 'center', label: '操作', field: 'opt',
        },
      ],
      headers: [{ name: 'Authorization', value: localStorage.Authorization }],
      uploadUrl: `${process.env.SERVER_URL}${process.env.BASE_URL}/sys/common/upload`,
      imgUrl: `${process.env.SERVER_URL}${process.env.BASE_URL}/sys/common/static`,
      url: {
        list: '/bi/favorites/list',
        add: '/bi/favorites/add',
        edit: '/bi/favorites/edit',
        delete: '/bi/favorites/delete',
        deleteBatch: '/bi/favorites/deleteBatch',
        exportXlsUrl: '/bi/favorites/exportXls',
        importExcelUrl: '/bi/favorites/importExcel',
      },
    };
  },
  methods: {
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
  computed: {
    chartTypes() {
      const types = [];
      this.chartList.forEach(((chart) => {
        types.push({ value: chart.type, label: chart.name });
      }));
      types.push({ value: 'complex', label: '多个组件' });

      return types;
    },
  },
  mounted() {
    this.initDict();
  },
};
</script>

<style lang="stylus"></style>
