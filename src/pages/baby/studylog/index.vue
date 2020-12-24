<template>
  <q-page class="column">
    <div class="col column view_card shadow-2 q-pa-md q-ma-sm">
      <div class="row items-center justify-start q-mb-md">
        <div class="row items-center q-mb-md col-3">
          <span class="q-ml-md">字词编号：</span>
          <q-select
            outlined
            dense
            emit-value
            v-model="searchForm.wordId"
            map-options
            :options="babyWord"
            class="col"
          />
        </div>
        <div class="row items-center q-mb-md col-3">
          <span class="q-ml-md">认识：</span>
          <q-select
            outlined
            dense
            emit-value
            v-model="searchForm.isKnow"
            map-options
            :options="yn"
            class="col"
          />
        </div>
        <div class="row items-center q-mb-md col-3 q-ml-md">
          <q-btn
            color="primary"
            label="搜索"
            icon="search"
            class="on-left"
            @click="query()"
            :loading="loading"
            unelevated
          />
          <q-btn label="重置" icon="search_off" color="primary" outline @click="searchReset" />
        </div>
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
        <template #top-right="table">
          <q-btn-group outline>
            <q-btn outline icon="add" color="primary" label="新建学习记录" @click="add" />
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

        <template #body-cell-wordId="props">
          <q-td key="wordId" :props="props">{{getDictLabel(babyWord,props.row.wordId) }}</q-td>
        </template>
        <template #body-cell-isKnow="props">
          <q-td key="isKnow" :props="props">
            <q-badge
              :color="props.row.isKnow==='1'?'green':'red'"
            >{{getDictLabel(yn,props.row.isKnow) }}</q-badge>
          </q-td>
        </template>
        <template #body-cell-opt="props">
          <q-td :props="props" :auto-width="true">
            <q-btn flat round dense color="primary" icon="edit" @click="edit(props.row)">
              <q-tooltip>编辑</q-tooltip>
            </q-btn>
            <btn-del label="学习记录" @confirm="del(props.row)" />
          </q-td>
        </template>
      </q-table>
    </div>
    <q-dialog maximized flat persistent ref="dialog" position="right">
      <q-form @submit="submit" class="dialog_card column">
        <h5 class="view_title justify-between q-px-md">
          {{editType}}学习记录
          <q-btn dense outline round icon="clear" size="sm" v-close-popup />
        </h5>
        <q-scroll-area class="col">
          <div class="row q-col-gutter-x-md dialog_form q-pa-md">
            <div class="col-12">
              <h5>字词编号：</h5>
              <q-select
                outlined
                dense
                emit-value
                v-model="form.wordId"
                map-options
                :options="babyWord"
              />
            </div>
            <div class="col-12">
              <h5>认识：</h5>
              <q-select outlined dense emit-value v-model="form.isKnow" map-options :options="yn" />
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
  name: 'BabyStudyLog',
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
          name: 'wordId', align: 'left', label: '字词编号', field: 'wordId',
        },
        {
          name: 'isKnow', align: 'left', label: '认识', field: 'isKnow',
        }, {
          name: 'createTime', label: '学习日期', field: 'createTime', align: 'center', sortable: true,
        },
        {
          name: 'opt', align: 'center', label: '操作', field: 'id',
        },
      ],
      babyWord: [],
      yn: [{ value: '0', label: '否' }, { value: '1', label: '是' }],
      url: {
        list: '/baby/studyLog/list',
        add: '/baby/studyLog/add',
        edit: '/baby/studyLog/edit',
        delete: '/baby/studyLog/delete',
        deleteBatch: '/baby/studyLog/deleteBatch',
        exportXlsUrl: '/baby/studyLog/exportXls',
        importExcelUrl: '/baby/studyLog/importExcel',
      },
    };
  },
  methods: {
    getDictLabel,
    initDict() {
      this.$axios.get('/sys/dictItem/selectItemsByDefId?defId=babyWord').then((r) => {
        this.babyWord = r;
      });
    },
  },
  mounted() {
    this.initDict();
  },
};
</script>

<style lang="stylus"></style>
