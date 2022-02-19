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
                @click="exportExcel('工作流实例')"
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
        <template #body-cell-flowType="props">
          <q-td key="flowType" :props="props">{{getDictLabel(flowType,props.row.flowType) }}</q-td>
        </template>
        <template #body-cell-extType="props">
          <q-td key="extType" :props="props">{{getDictLabel(extType,props.row.extType) }}</q-td>
        </template>
        <template #body-cell-status="props">
          <q-td key="status" :props="props">{{getDictLabel(flowStatus,props.row.status) }}</q-td>
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
              icon="mdi-content-copy"
              @click="copy(props.row)"
            >
              <q-tooltip>复制</q-tooltip>
            </q-btn>
            <btn-del label="工作流实例" @confirm="del(props.row)" />
          </q-td>
        </template>
      </q-table>
    </div>
    <q-dialog maximized flat persistent ref="dialog" position="right">
      <q-form @submit="submit" class="dialog_card column">
        <h5 class="view_title justify-between q-px-md">
          {{editType}}工作流实例
          <q-btn dense outline round icon="clear" size="sm" v-close-popup />
        </h5>
        <q-scroll-area class="col">
          <div class="row q-col-gutter-x-md dialog_form q-pa-md">
            <div class="col-12">
              <h5>编号：</h5>
              <q-input outlined dense v-model="form.id" type="text" />
            </div>
            <div class="col-12">
              <h5>流程类型：</h5>
              <q-select
                outlined
                dense
                emit-value
                v-model="form.flowType"
                map-options
                :options="flowType"
              />
            </div>
            <div class="col-12">
              <h5>额外类型：</h5>
              <q-select
                outlined
                dense
                emit-value
                v-model="form.extType"
                map-options
                :options="extType"
              />
            </div>
            <div class="col-12">
              <h5>发起人：</h5>
              <q-input outlined dense v-model="form.starter" type="text" />
            </div>
            <div class="col-12">
              <h5>处理人：</h5>
              <q-input outlined dense v-model="form.dealPerson" type="text" />
            </div>
            <div class="col-12">
              <h5>处理时间：</h5>
              <q-input outlined dense v-model="form.dealTime" type="text" />
            </div>
            <div class="col-12">
              <h5>处理动作：</h5>
              <q-input outlined dense v-model="form.action" type="text" />
            </div>
            <div class="col-12">
              <h5>处理意见：</h5>
              <q-input outlined dense v-model="form.dealMsg" type="text" />
            </div>
            <div class="col-12">
              <h5>当前节点：</h5>
              <q-input outlined dense v-model="form.node" type="text" />
            </div>
            <div class="col-12">
              <h5>当前人：</h5>
              <q-input outlined dense v-model="form.person" type="text" />
            </div>
            <div class="col-12">
              <h5>启动时间：</h5>
              <q-input outlined dense v-model="form.startTime" type="text" />
            </div>
            <div class="col-12">
              <h5>结束时间：</h5>
              <q-input outlined dense v-model="form.endTime" type="text" />
            </div>
            <div class="col-12">
              <h5>流程主体：</h5>
              <q-input outlined dense v-model="form.subject" type="text" />
            </div>
            <div class="col-12">
              <h5>主体描述：</h5>
              <q-input outlined dense v-model="form.description" type="text" />
            </div>
            <div class="col-12">
              <h5>状态：</h5>
              <q-select
                outlined
                dense
                emit-value
                v-model="form.status"
                map-options
                :options="flowStatus"
              />
            </div>
            <div class="col-12">
              <h5>上一节点：</h5>
              <q-input outlined dense v-model="form.preNode" type="text" />
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
  name: 'FlowProcess',
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
          name: 'id', align: 'left', label: '编号', field: 'id',
        },
        {
          name: 'flowType', align: 'left', label: '流程类型', field: 'flowType',
        },
        {
          name: 'extType', align: 'left', label: '额外类型', field: 'extType',
        },
        {
          name: 'starter', align: 'left', label: '发起人', field: 'starter',
        },
        {
          name: 'dealPerson', align: 'left', label: '处理人', field: 'dealPerson',
        },
        {
          name: 'dealTime', align: 'left', label: '处理时间', field: 'dealTime',
        },
        {
          name: 'action', align: 'left', label: '处理动作', field: 'action',
        },
        {
          name: 'dealMsg', align: 'left', label: '处理意见', field: 'dealMsg',
        },
        {
          name: 'node', align: 'left', label: '当前节点', field: 'node',
        },
        {
          name: 'person', align: 'left', label: '当前人', field: 'person',
        },
        {
          name: 'startTime', align: 'left', label: '启动时间', field: 'startTime',
        },
        {
          name: 'endTime', align: 'left', label: '结束时间', field: 'endTime',
        },
        {
          name: 'subject', align: 'left', label: '流程主体', field: 'subject',
        },
        {
          name: 'description', align: 'left', label: '主体描述', field: 'description',
        },
        {
          name: 'status', align: 'left', label: '状态', field: 'status',
        },
        {
          name: 'preNode', align: 'left', label: '上一节点', field: 'preNode',
        },
        {
          name: 'opt', align: 'center', label: '操作', field: 'opt',
        },
      ],
      flowType: [],
      extType: [],
      flowStatus: [],
      showQuery: true,
      headers: [{ name: 'Authorization', value: localStorage.Authorization }],
      uploadUrl: `${process.env.SERVER_URL}${process.env.BASE_URL}/sys/common/upload`,
      imgUrl: `${process.env.SERVER_URL}${process.env.BASE_URL}/sys/common/static`,
      url: {
        list: '/flow/process/list',
        add: '/flow/process/add',
        edit: '/flow/process/edit',
        copy:
          '/flow/process/copy',
        delete: '/flow/process/delete',
        deleteBatch: '/flow/process/deleteBatch',
        exportXlsUrl: '/flow/process/exportXls',
        importExcelUrl: '/flow/process/importExcel',
      },
    };
  },
  methods: {
    getDictLabel,
    initDict() {
      this.$axios.get('/sys/dictItem/selectItemsByDictCode?dictCode=flow_type').then((r) => {
        this.flowType = r;
      });
      this.$axios.get('/sys/dictItem/selectItemsByDictCode?dictCode=ext_type').then((r) => {
        this.extType = r;
      });
      this.$axios.get('/sys/dictItem/selectItemsByDictCode?dictCode=flow_status').then((r) => {
        this.flowStatus = r;
      });
    },
  },
  mounted() {
    this.initDict();
  },
};
</script>

<style lang="stylus"></style>
