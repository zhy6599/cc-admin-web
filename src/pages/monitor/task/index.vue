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
          </div>
        </template>
        <template #top-right="table">
          <q-btn-group outline>
            <q-btn
              outline
              icon="add"
              color="primary"
              label="新建"
              @click="add"
            />
            <q-btn
              outline
              color="primary"
              label="切换全屏"
              @click="table.toggleFullscreen"
              :icon="table.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
            />
            <q-btn-dropdown
              outline
              color="primary"
              label="自选列"
              icon="view_list"
            >
              <q-list>
                <q-item
                  tag="label"
                  v-for="item in columns"
                  :key="item.name"
                >
                  <q-item-section avatar>
                    <q-checkbox
                      v-model="group"
                      :val="item.name"
                    />
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

        <template #body-cell-status="props">
          <q-td
            key="status"
            :props="props"
          >
            {{getDictLabel(quartzStatus,props.row.status) }}
          </q-td>
        </template>
        <template #body-cell-opt="props">
          <q-td
            :props="props"
            width="120"
          >
            <q-btn
              flat
              round
              dense
              color="primary"
              icon="edit"
              @click="edit(props.row)"
            >
              <q-tooltip>编辑</q-tooltip>
            </q-btn>
            <btn-del
              label=""
              @confirm="del(props.row)"
            />
          </q-td>
        </template>
      </q-table>
    </div>
    <q-dialog
      maximized
      flat
      persistent
      ref="dialog"
      position="right"
    >
      <q-form
        @submit="submit"
        class="dialog_card column"
      >
        <h5 class="view_title justify-between q-px-md">
          {{editType}}
          <q-btn
            dense
            outline
            round
            icon="clear"
            size="sm"
            v-close-popup
          />
        </h5>
        <q-scroll-area class="col">
          <div class="row q-col-gutter-x-md dialog_form q-pa-md">
            <div class="col-12">
              <h5>
                <q-icon
                  name="star"
                  color="red"
                /> 任务类名：</h5>
              <q-input
                outlined
                dense
                v-model="form.jobClassName"
                type="text"
                clearable
                :rules="[requiredTest]"
              />
            </div>
            <div class="col-12">
              <h5>
                <q-icon
                  name="star"
                  color="red"
                /> cron表达式：</h5>
              <q-input
                outlined
                dense
                v-model="form.cronExpression"
                type="text"
                clearable
                :rules="[requiredTest]"
              />
            </div>
            <div class="col-12">
              <h5> 参数：</h5>
              <q-input
                outlined
                dense
                v-model="form.parameter"
                type="text"
                clearable
              />
            </div>
            <div class="col-12">
              <h5> 描述：</h5>
              <q-input
                outlined
                dense
                v-model="form.description"
                type="text"
                clearable
              />
            </div>
            <div class="col-12">
              <h5>
                <q-icon
                  name="star"
                  color="red"
                /> 状态：</h5>
              <q-select
                outlined
                dense
                emit-value
                v-model="form.status"
                map-options
                :options="quartzStatus"
                clearable
              />
            </div>
          </div>
        </q-scroll-area>
        <div class="row justify-end q-pa-md">
          <q-btn
            outline
            color="primary"
            label="取消"
            v-close-popup
          />
          <q-btn
            unelevated
            color="primary"
            class="on-right"
            label="提交"
            type="submit"
          />
        </div>
      </q-form>
    </q-dialog>
    <confirm
      ref="confirmDialog"
      :msg="confirmMsg"
      @confirm="deleteBatch()"
    />
  </q-page>
</template>

<script>
import { IndexMixin } from 'boot/mixins';
import { getDictLabel } from 'boot/dictionary';
import confirm from 'components/confirm';
import { requiredTest } from 'boot/inputTest';

export default {
  name: 'SysQuartzJob',
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
          name: 'jobClassName', align: 'left', label: '任务类名', field: 'jobClassName',
        },
        {
          name: 'cronExpression', align: 'left', label: 'cron表达式', field: 'cronExpression',
        },
        {
          name: 'parameter', align: 'left', label: '参数', field: 'parameter',
        },
        {
          name: 'description', align: 'left', label: '描述', field: 'description',
        },
        {
          name: 'status', align: 'left', label: '状态', field: 'status',
        },
        {
          name: 'opt', align: 'center', label: '操作', field: 'id',
        },
      ],
      quartzStatus: [{ value: -1, label: '停止' }, { value: 0, label: '正常' }],
      url: {
        list: '/sys/quartzJob/list',
        add: '/sys/quartzJob/add',
        edit: '/sys/quartzJob/edit',
        delete: '/sys/quartzJob/delete',
        deleteBatch: '/sys/quartzJob/deleteBatch',
        exportXlsUrl: '/sys/quartzJob/exportXls',
        importExcelUrl: '/sys/quartzJob/importExcel',
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
