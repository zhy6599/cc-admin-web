<template>
  <q-page class="cc-admin">
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
                @click="exportExcel('留言板')"
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
        <template #body-cell-opt="props">
          <q-td :props="props" :auto-width="true">
            <q-btn flat round dense color="primary" icon="edit" @click="edit(props.row)">
              <q-tooltip>编辑</q-tooltip>
            </q-btn>
            <btn-del label="留言板" @confirm="del(props.row)" />
          </q-td>
        </template>
      </q-table>
    </div>
    <q-dialog maximized flat persistent ref="dialog" position="right">
      <q-form @submit="submit" class="dialog_card column">
        <h5 class="view_title justify-between q-px-md">
          {{editType}}留言板
          <q-btn dense outline round icon="clear" size="sm" v-close-popup />
        </h5>
        <q-scroll-area class="col">
          <div class="row q-col-gutter-x-md dialog_form q-pa-md">
            <div class="col-12">
              <h5>帖子编号：</h5>
              <q-input outlined dense v-model="form.pid" type="text" />
            </div>
            <div class="col-12">
              <h5>留言：</h5>
              <q-input outlined dense v-model="form.name" type="text" />
            </div>
            <div class="col-12">
              <h5>点赞数：</h5>
              <q-input outlined dense v-model="form.upCount" type="number" />
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

export default {
  name: 'ProRemark',
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
          name: 'pid', align: 'left', label: '帖子编号', field: 'pid',
        },
        {
          name: 'name', align: 'left', label: '留言', field: 'name',
        },
        {
          name: 'upCount', align: 'left', label: '点赞数', field: 'upCount',
        },
        {
          name: 'opt', align: 'center', label: '操作', field: 'id',
        },
      ],
      showQuery: true,
      headers: [{ name: 'Authorization', value: localStorage.Authorization }],
      uploadUrl: `${process.env.SERVER_URL}${process.env.BASE_URL}/sys/common/upload`,
      imgUrl: `${process.env.SERVER_URL}${process.env.BASE_URL}/sys/common/static`,
      url: {
        list: '/pro/remark/list',
        add: '/pro/remark/add',
        edit: '/pro/remark/edit',
        delete: '/pro/remark/delete',
        deleteBatch: '/pro/remark/deleteBatch',
        exportXlsUrl: '/pro/remark/exportXls',
        importExcelUrl: '/pro/remark/importExcel',
      },
    };
  },
  methods: {
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
