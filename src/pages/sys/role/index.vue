<template>
  <q-page class="cc-admin q-pa-sm">
    <div class="col bg-white shadow-2 q-pa-md">
      <q-table
        flat
        row-key="id"
        color="primary"
        class="cross_table"
        separator="cell"
        :columns="columns"
        :data="list"
        :pagination.sync="pagination"
        :visible-columns="group"
        :rows-per-page-options="[10,20,50,100]"
        :loading="loading"
        selection="multiple"
        :selected.sync="selected"
        @request="query"
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
              <q-btn outline no-wrap icon="add" color="primary" label="新建角色" @click="add" />
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
                no-wrap
                v-if="$q.screen.gt.md"
                icon="view_list"
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
              <q-btn outline no-wrap v-if="$q.screen.gt.sm"
                label="导入" icon="mdi-cloud-upload-outline"
                :loading="importing"
                color="primary" @click="importExcel">
                <q-uploader auto-upload ref="excelUploader" :max-files="1" class="hidden"
                  :url="importExcelUrlFull" field-name="file"
                  :headers="[{name: 'authorization', value: $store.state.User.authorization}]"
                  @uploaded="importedExcel"/>
              </q-btn>
              <q-btn outline no-wrap v-if="$q.screen.gt.sm"
                :loading="exporting"
                label="导出" icon="mdi-cloud-download-outline" color="primary"
                @click="exportExcel('角色列表')"/>
              <q-btn
                :disable="selected.length === 0"
                outline
                color="primary"
                label="批量删除"
                no-wrap
                v-if="$q.screen.gt.sm"
                @click="showConfirm()"
                icon="mdi-delete-variant"
              />
            </q-btn-group>
          </div>
        </template>
        <template #body-cell-opt="props">
          <q-td :props="props" :auto-width="true">
            <q-btn flat round dense color="primary" icon="lock" @click="lock(props.row)">
              <q-tooltip>授权</q-tooltip>
            </q-btn>
            <q-btn flat round dense color="primary" icon="link" @click="link(props.row)">
              <q-tooltip>关联</q-tooltip>
            </q-btn>
            <q-btn flat round dense color="primary" icon="edit" @click="edit(props.row)">
              <q-tooltip>编辑</q-tooltip>
            </q-btn>
            <btn-del label="角色" @confirm="del(props.row)" />
          </q-td>
        </template>
      </q-table>
    </div>
    <q-dialog maximized flat persistent ref="dialog" position="right">
      <q-form @submit="submit" class="dialog_card column">
        <h5 class="view_title justify-between q-px-md">
          {{editType}}角色
          <q-btn dense outline round icon="clear" size="sm" v-close-popup />
        </h5>
        <q-scroll-area class="col">
          <div class="row q-col-gutter-x-md dialog_form q-pa-md">
            <div class="col-12">
              <h5>角色名称：</h5>
              <q-input outlined dense v-model="form.roleName" type="text" clearable  />
            </div>
            <div class="col-12">
              <h5>角色编码：</h5>
              <q-input outlined dense v-model="form.roleCode" type="text" clearable  />
            </div>
            <div class="col-12">
              <h5>描述：</h5>
              <q-input outlined dense v-model="form.description" type="text" clearable  />
            </div>
          </div>
        </q-scroll-area>
        <div class="row justify-end q-pa-md">
          <q-btn outline color="primary" label="取消" v-close-popup />
          <q-btn unelevated color="primary" class="on-right" label="提交" type="submit" />
        </div>
      </q-form>
    </q-dialog>

    <q-dialog class="quota" v-model="lockDialog" :position="'right'" maximized flat>
      <div class="addCompanyDialog dialog_card column">
        <h5 class="view_title justify-between q-px-md">
          角色权限配置
          <q-btn dense outline round icon="clear" size="sm" v-close-popup />
        </h5>

        <q-scroll-area class="col q-pa-md">
          <q-tree
            class="col-12"
            ref="treelist"
            :nodes="QueryTreeList"
            node-key="key"
            label-key="slotTitle"
            tick-strategy="strict"
            :ticked.sync="ticked"
          >
            <template #default-header="prop">
              <div class="row items-center">
                <div class>{{prop.node.slotTitle}}</div>
              </div>
            </template>
          </q-tree>
        </q-scroll-area>
        <div class="row justify-end q-pa-md">
          <q-btn outline color="primary" label="取消" v-close-popup />
          <q-btn unelevated color="primary" class="on-right" label="提交" @click="lockSubmit" />
        </div>
      </div>
    </q-dialog>

    <q-dialog maximized flat persistent v-model="linkDialog" position="right">
      <q-form @submit="submit" class="dialog_card column">
        <h5 class="view_title justify-between q-px-md">
          [{{selectedRole.roleName}}] -- 关联用户
          <q-btn dense outline round icon="clear" size="sm" v-close-popup />
        </h5>
        <q-scroll-area class="col q-pa-sm">
          <div class="q-pa-md">
            <slave :id="selectedRole.id" />
          </div>
        </q-scroll-area>
        <div class="row justify-end q-pa-md">
          <q-btn outline color="primary" label="关闭" v-close-popup />
        </div>
      </q-form>
    </q-dialog>
    <confirm ref="confirmDialog" :msg="confirmMsg" @confirm="deleteBatch()" />
  </q-page>
</template>

<script>
import confirm from 'components/confirm';
import { IndexMixin } from 'boot/mixins';
import slave from './slave';

export default {
  name: 'SysRole',
  mixins: [IndexMixin],
  components: {
    confirm,
    slave,
  },
  data() {
    return {
      splitterModel: 50,
      lockDialog: false,
      linkDialog: false,
      QueryTreeList: [],
      ticked: [],
      initializeIds: [],
      selectedRole: {},
      roleId: '',
      columns: [
        {
          name: 'index',
          align: 'center',
          label: '序号',
          field: 'index',
        },
        {
          name: 'roleName', align: 'left', label: '角色名称', field: 'roleName',
        },
        {
          name: 'roleCode', align: 'left', label: '角色编码', field: 'roleCode',
        },
        {
          name: 'description', align: 'left', label: '描述', field: 'description',
        },
        {
          name: 'opt', align: 'center', label: '操作', field: 'id',
        },
      ],
      url: {
        list: '/sys/role/list',
        add: '/sys/role/add',
        edit: '/sys/role/edit',
        delete: '/sys/role/delete',
        deleteBatch: '/sys/role/deleteBatch',
        exportXlsUrl: '/sys/role/exportXls',
        importExcelUrl: '/sys/role/importExcel',
      },
    };
  },

  methods: {
    lock(prop) {
      this.$axios.get('/sys/role/queryTreeList').then((res) => {
        if (res.success) {
          this.QueryTreeList = res.result.treeList;
          this.initializeIds = res.result.ids;
          this.$nextTick(() => {
            this.$refs.treelist.expandAll();
          });
        }
      });

      this.$axios.get('/sys/permission/queryRolePermission', {
        params: {
          roleId: prop.id,
        },
      }).then((resu) => {
        if (resu) {
          this.ticked = resu.result;
          this.initializeIds = resu.result;
        }
      });
      this.roleId = prop.id;
      this.lockDialog = true;
    },
    lockSubmit() {
      this.$axios.post('/sys/permission/saveRolePermission', {
        lastpermissionIds: this.initializeIds.join(),
        permissionIds: this.ticked.join(),
        roleId: this.roleId,
      }).then((res) => {
        this.$info(res.message);
        if (res) {
          this.lockDialog = false;
          this.query();
        }
      });
    },
    link(row) {
      this.selectedRole = row;
      this.linkDialog = true;
    },
  },

};
</script>

<style lang="stylus"></style>
