<template>
  <q-page class="cc-admin">
    <div class="col bg-white shadow-2 q-pa-md q-ma-sm">
      <div class="row items-center justify-start q-mb-md">
        <q-item class="col-xl-2 col-md-3 col-sm-6 col-xs-12">
          <q-item-section class="col">
            <q-input
              outlined
              dense
              v-model="searchForm.id"
              type="text"
              class="col"
              prefix="公司编号："
            />
          </q-item-section>
        </q-item>
        <q-item class="col-xl-2 col-md-3 col-sm-6 col-xs-12">
          <q-item-section class="col">
            <q-input
              outlined
              dense
              v-model="searchForm.name"
              type="text"
              class="col"
              prefix="公司名称："
            />
          </q-item-section>
        </q-item>
        <q-item class="col-xl-2 col-md-3 col-sm-6 col-xs-12">
          <q-item-section class="col">
            <q-input
              outlined
              dense
              v-model="searchForm.userId"
              type="text"
              class="col"
              prefix="管理员账号："
            />
          </q-item-section>
        </q-item>
        <q-item class="col-xl-2 col-md-3 col-sm-6 col-xs-12">
          <q-item-section class="col">
            <q-input
              outlined
              dense
              v-model="searchForm.userName"
              type="text"
              class="col"
              prefix="管理员名称："
            />
          </q-item-section>
        </q-item>
        <q-item class="col-xl-2 col-md-3 col-sm-6 col-xs-12 q-pr-sm">
          <q-item-label class="col-12 text-right row no-wrap justify-center">
            <q-btn
              unelevated
              no-wrap
              label="查询"
              color="primary"
              class="q-mr-sm no-border-radius"
              :loading="loading"
              @click="query()"
            >
              <template v-slot:loading>
                <q-spinner-ios class="on-center" />
              </template>
            </q-btn>
            <q-btn
              outline
              no-wrap
              unelevated
              label="重置"
              class="q-mr-sm no-border-radius"
              color="secondary"
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
          </q-item-label>
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
        :rows-per-page-options="[10, 20, 50, 100]"
        :loading="loading"
        selection="multiple"
        :selected.sync="selected"
      >
        <template v-slot:top="table">
          <div class="row no-wrap full-width">
            <q-space />
            <q-btn-group outline>
              <q-btn
                outline
                icon="add"
                no-wrap
                color="primary"
                label="新建"
                @click="add"
              />
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
                      <q-item-label>{{ item.label }}</q-item-label>
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
                  :headers="[
                    {
                      name: 'authorization',
                      value: $store.state.User.authorization,
                    },
                  ]"
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
                @click="exportExcel('动态表单')"
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
        <template #body-cell-templateId="props">
          <q-td key="templateId" :props="props">
            {{ getDictLabel(sysDepart, props.row.templateId) }}
          </q-td>
        </template>
        <template #body-cell-opt="props">
          <q-td :props="props" :auto-width="true">
            <q-btn
              flat
              round
              dense
              color="primary"
              icon="edit"
              @click="edit(props.row)"
            >
              <q-tooltip>编辑</q-tooltip></q-btn
            >
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
            <btn-del label="动态表单" @confirm="del(props.row)" />
          </q-td>
        </template>
      </q-table>
    </div>
    <q-dialog maximized flat persistent ref="dialog" position="right">
      <q-form @submit="submit" class="dialog_card column">
        <h5 class="view_title justify-between q-px-md">
          {{ editType }}动态表单
          <q-btn dense outline round icon="clear" size="sm" v-close-popup />
        </h5>
        <q-scroll-area class="col">
          <div class="row q-col-gutter-x-md dialog_form q-pa-md">
            <div class="col-12">
              <h5><q-icon name="star" color="red" /> 公司编号：</h5>
              <q-input
                outlined
                dense
                v-model="form.id"
                type="text"
                :rules="[requiredTest]"
              />
            </div>
            <div class="col-12">
              <h5><q-icon name="star" color="red" /> 公司名称：</h5>
              <q-input
                outlined
                dense
                v-model="form.name"
                type="text"
                :rules="[requiredTest]"
              />
            </div>
            <div class="col-12">
              <h5><q-icon name="star" color="red" /> 管理员账号：</h5>
              <q-input
                outlined
                dense
                v-model="form.userId"
                type="text"
                :rules="[requiredTest]"
              />
            </div>
            <div class="col-12">
              <h5><q-icon name="star" color="red" /> 管理员名称：</h5>
              <q-input
                outlined
                dense
                v-model="form.userName"
                type="text"
                :rules="[requiredTest]"
              />
            </div>
            <div class="col-12">
              <h5><q-icon name="star" color="red" /> 模板id：</h5>
              <q-select
                outlined
                dense
                emit-value
                v-model="form.templateId"
                map-options
                :options="sysDepart"
              />
            </div>
          </div>
        </q-scroll-area>
        <div class="row justify-end q-pa-md">
          <q-btn outline color="primary" label="取消" v-close-popup />
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
    <confirm ref="confirmDialog" :msg="confirmMsg" @confirm="deleteBatch()" />
  </q-page>
</template>

<script>
import { IndexMixin } from 'boot/mixins';
import { getDictLabel } from 'boot/dictionary';
import confirm from 'components/confirm';
import { requiredTest } from 'boot/inputTest';

export default {
  name: 'SysCompany',
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
          name: 'id', align: 'left', label: '公司编号', field: 'id',
        },
        {
          name: 'name', align: 'left', label: '公司名称', field: 'name',
        },
        {
          name: 'userId', align: 'left', label: '管理员账号', field: 'userId',
        },
        {
          name: 'userName', align: 'left', label: '管理员名称', field: 'userName',
        },
        {
          name: 'templateId', align: 'left', label: '模板id', field: 'templateId',
        },
        {
          name: 'opt', align: 'center', label: '操作', field: 'opt',
        },
      ],
      sysDepart: [],
      showQuery: true,
      headers: [{ name: 'Authorization', value: localStorage.Authorization }],
      uploadUrl: `${process.env.SERVER_URL}${process.env.BASE_URL}/sys/common/upload`,
      imgUrl: `${process.env.SERVER_URL}${process.env.BASE_URL}/sys/common/static`,
      url: {
        list: '/sys/company/list',
        add: '/sys/company/add',
        edit: '/sys/company/edit',
        copy:
          '/sys/company/copy',
        delete: '/sys/company/delete',
        deleteBatch: '/sys/company/deleteBatch',
        exportXlsUrl: '/sys/company/exportXls',
        importExcelUrl: '/sys/company/importExcel',
      },
    };
  },
  methods: {
    requiredTest,
    getDictLabel,
    initDict() {
      this.$axios.get('/sys/dictItem/selectItemsByDefId?defId=sysDepart').then((r) => {
        this.sysDepart = r;
      });
    },
  },
  mounted() {
    this.initDict();
  },
};
</script>

<style lang="stylus"></style>
