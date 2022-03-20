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
        <template v-slot:top="table">
          <div class="row no-wrap full-width">
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
            <q-space />
            <q-btn-group outline>
              <q-btn outline icon="add" color="primary" no-wrap label="新建地图" @click="add" />
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
          </div>
        </template>
        <template #body-cell-opt="props">
          <q-td :props="props" :auto-width="true">
            <q-btn flat round dense color="primary" icon="edit" @click="edit(props.row)">
              <q-tooltip>编辑</q-tooltip>
            </q-btn>
            <btn-del label="地图管理" @confirm="del(props.row)" />
          </q-td>
        </template>
      </q-table>
    </div>
    <q-dialog maximized flat persistent ref="dialog" position="right">
      <q-form @submit="submit" class="dialog_card column">
        <h5 class="view_title justify-between q-px-md">
          {{editType}}地图管理
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
              <h5>地图轮廓：</h5>
              <q-input outlined dense v-model="form.json" type="textarea" />
            </div>
            <div class="col-12">
              <h5>视觉映射：</h5>
              <q-input outlined dense v-model="form.visualMap" type="textarea" />
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
import { IndexMixin } from 'boot/mixins';
import { getDictLabel } from 'boot/dictionary';
import confirm from 'components/confirm';
import { requiredTest } from 'boot/inputTest';

export default {
  name: 'BiMap',
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
          name: 'opt', align: 'center', label: '操作', field: 'opt',
        },
      ],
      url: {
        list: '/bi/map/list',
        add: '/bi/map/add',
        edit: '/bi/map/edit',
        delete: '/bi/map/delete',
        deleteBatch: '/bi/map/deleteBatch',
        exportXlsUrl: '/bi/map/exportXls',
        importExcelUrl: '/bi/map/importExcel',
      },
    };
  },
  methods: {
    requiredTest,
    getDictLabel,
    initDict() {
    },
    edit(p) {
      this.loading = true;
      this.$info('地图文件较大，请耐心等待！');
      return this.$axios.get(`/bi/map/queryById?id=${p.id}`).then(({ result }) => {
        this.form = {
          ...result,
        };
        this.$refs.dialog.show();
      }).finally(() => {
        this.loading = false;
      });
    },
  },
  mounted() {
    this.initDict();
  },
};
</script>

<style lang="stylus"></style>
