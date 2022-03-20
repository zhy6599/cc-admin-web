<template>
  <q-page class="cc-admin row">
    <viewcatalog
      class="col-md-2 q-mt-sm q-mb-sm q-ml-sm"
      v-if="this.$q.screen.gt.md"
      type="2"
      @select="selectCatalog"
    />
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
              <q-btn outline icon="add" color="primary" no-wrap label="新建" @click="add" />
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
              <q-btn
                :disable="selected.length === 0"
                outline
                label="批量删除"
                no-wrap
                v-if="$q.screen.gt.sm"
                color="primary"
                @click="showConfirm()"
                icon="mdi-delete-variant"
              />
            </q-btn-group>
          </div>
        </template>
        <template #body-cell-dbUrl="props">
          <q-td key="dbUrl" :props="props">
            <ellipsisvalue :value="props.row.dbUrl" :length="40" />
          </q-td>
        </template>
        <template #body-cell-dbType="props">
          <q-td key="dbType" :props="props">{{getDictLabel(databaseType,props.row.dbType) }}</q-td>
        </template>
        <template #body-cell-opt="props">
          <q-td :props="props" :auto-width="true">
            <q-btn flat round dense color="primary" icon="mdi-key" @click="change(props.row)">
              <q-tooltip>重置密码</q-tooltip>
            </q-btn>
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
            <btn-del label="数据源管理" @confirm="del(props.row)" />
          </q-td>
        </template>
      </q-table>
    </div>
    <q-dialog ref="changePassWord" maximized flat persistent position="right">
      <q-form @submit="changePassWord" class="dialog_card">
        <div class="view_title justify-between q-px-md">
          修改密码
          <q-btn dense outline round size="sm" icon="clear" v-close-popup />
        </div>
        <div class="row q-col-gutter-x-md dialog_form q-pa-md">
          <div class="col-6">
            <h5>
              <q-icon name="star" color="red" />密码：
            </h5>
            <q-input
              outlined
              dense
              type="password"
              v-model="password"
              :rules="[v => !!v || '不可以为空']"
            />
          </div>
          <div class="col-6">
            <h5>
              <q-icon name="star" color="red" />确认密码：
            </h5>
            <q-input
              outlined
              dense
              type="password"
              v-model="confirmpassword"
              :rules="[v => !!v || '不可以为空']"
              :error="!isValid"
            >
              <template v-slot:error>两次输入密码不一致！</template>
            </q-input>
          </div>
        </div>
        <div class="row justify-end q-pa-md">
          <q-btn outline color="primary" icon="mdi-close-thick" label="关闭" v-close-popup />
          <q-btn class="q-mx-sm" color="primary" icon="mdi-check-bold" label="提交" type="submit" />
        </div>
      </q-form>
    </q-dialog>
    <q-dialog maximized flat persistent ref="dialog" position="right">
      <q-form @submit="submit" class="dialog_card column">
        <h5 class="view_title justify-between q-px-md">
          {{editType}}数据源管理
          <q-btn dense outline round icon="clear" size="sm" v-close-popup />
        </h5>
        <q-scroll-area class="col">
          <div class="row q-col-gutter-x-md dialog_form q-pa-md">
            <div class="col-6">
              <h5>
                <q-icon name="star" color="red" />数据源名称：
              </h5>
              <q-input outlined dense v-model="form.name" type="text" :rules="[requiredTest]" />
            </div>
            <div class="col-6">
              <h5>分类目录：</h5>
              <catalogselect :form.sync="form" type="2" />
            </div>
            <div class="col-12">
              <h5>备注：</h5>
              <q-input outlined dense v-model="form.remark" type="textarea" />
            </div>
            <div class="col-6">
              <h5>
                <q-icon name="star" color="red" />数据库类型：
              </h5>
              <q-select
                outlined
                dense
                emit-value
                map-options
                v-model="form.dbType"
                :options="databaseType"
                @input="changeDbType"
              />
            </div>
            <div class="col-6">
              <h5>
                <q-icon name="star" color="red" />驱动类：
              </h5>
              <q-input outlined dense v-model="form.dbDriver" type="text" :rules="[requiredTest]" />
            </div>
            <div class="col-6">
              <h5>
                <q-icon name="star" color="red" />数据源地址：
              </h5>
              <q-input outlined dense v-model="form.dbUrl" type="text" :rules="[requiredTest]" />
            </div>
            <div class="col-6">
              <h5>
                <q-icon name="star" color="red" />SCHEMA：
              </h5>
              <q-input outlined dense v-model="form.dbName" type="text" :rules="[requiredTest]" />
            </div>
            <div class="col-6">
              <h5>
                <q-icon name="star" color="red" />用户名：
              </h5>
              <q-input
                outlined
                dense
                v-model="form.dbUsername"
                type="text"
                :rules="[requiredTest]"
              />
            </div>
            <div class="col-6" v-if="!form.id">
              <h5>密码：</h5>
              <div class="row no-wrap">
                <q-input class="col" outlined dense v-model="form.dbPassword" type="password" />
              </div>
            </div>
          </div>
        </q-scroll-area>
        <div class="row justify-end q-pa-md">
          <q-btn color="primary" label="测试" @click="testConnection" />
          <q-space />
          <q-btn outline color="primary" icon="mdi-close-thick" label="关闭" v-close-popup />
          <q-btn class="q-mx-sm" color="primary" icon="mdi-check-bold" label="提交" type="submit" />
        </div>
      </q-form>
    </q-dialog>
    <confirm ref="confirmDialog" :msg="confirmMsg" @confirm="deleteBatch()" />
  </q-page>
</template>

<script>
import ellipsisvalue from 'components/ellipsisvalue';
import { IndexMixin } from 'boot/mixins';
import { getDictLabel } from 'boot/dictionary';
import confirm from 'components/confirm';
import catalogselect from 'components/catalogselect';
import viewcatalog from 'components/viewcatalog';
import { requiredTest } from 'boot/inputTest';

export default {
  name: 'SysDataSource',
  mixins: [IndexMixin],
  components: {
    confirm,
    viewcatalog,
    catalogselect,
    ellipsisvalue,
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
          name: 'name', align: 'left', label: '数据源名称', field: 'name',
        },
        {
          name: 'catalogId_dictText', align: 'left', label: '分类目录', field: 'catalogId_dictText',
        },
        {
          name: 'dbType', align: 'left', label: '数据库类型', field: 'dbType',
        },
        {
          name: 'dbUrl', align: 'left', label: '数据源地址', field: 'dbUrl',
        },
        {
          name: 'opt', align: 'center', label: '操作', field: 'opt',
        },
      ],
      databaseType: [{ value: 'MySQL', label: 'MySQL' }, { value: 'Oracle', label: 'Oracle' }, { value: 'SqlServer', label: 'SqlServer' }],
      url: {
        list: '/sys/dataSource/list',
        add: '/sys/dataSource/add',
        edit: '/sys/dataSource/edit',
        changePassword: '/sys/dataSource/changePassword',
        copy: '/sys/dataSource/copy',
        delete: '/sys/dataSource/delete',
        deleteBatch: '/sys/dataSource/deleteBatch',
        exportXlsUrl: '/sys/dataSource/exportXls',
        importExcelUrl: '/sys/dataSource/importExcel',
      },
      selectDataSource: {},
      password: '',
      confirmpassword: '',
    };
  },
  methods: {
    requiredTest,
    getDictLabel,
    change(row) {
      this.password = '';
      this.confirmpassword = '';
      this.selectDataSource = row;
      this.$refs.changePassWord.show();
    },
    changePassWord() {
      this.$axios.put(this.url.changePassword, {
        dbPassword: this.password,
        id: this.selectDataSource.id,
      }).then((r) => {
        this.$info(r.message);
        this.$refs.changePassWord.hide();
      });
    },
    testConnection() {
      this.$axios.post('/sys/dataSource/testConnection', this.form).then((r) => {
        if (r.success) {
          this.$info(r.message);
        } else {
          this.$error(r.message);
        }
      }).finally(() => {
        this.loading = false;
      });
    },
    addBefore() {
      this.form.catalogId = this.catalog;
      return true;
    },
    selectCatalog(n) {
      this.catalog = n;
      this.query();
    },
    changeDbType(val) {
      if (val === 'Mysql') {
        this.form.dbDriver = 'com.mysql.jdbc.Driver';
        this.form.dbUrl = 'jdbc:mysql://127.0.0.1:3306/cc-admin?characterEncoding=UTF-8&useUnicode=true&useSSL=false&serverTimezone=UTC';
      }
      if (val === 'Oracle') {
        this.form.dbDriver = 'oracle.jdbc.driver.OracleDriver';
        this.form.dbUrl = 'jdbc:oracle:thin:@127.0.0.1:1521:cc-admin';
      }
      if (val === 'SqlServer') {
        this.form.dbDriver = 'com.microsoft.sqlserver.jdbc.SQLServerDriver';
        this.form.dbUrl = 'jdbc:sqlserver://127.0.0.1:1433;DatabaseName=cc-admin';
      }
    },
  },
  mounted() {
  },
  watch: {
  },
  computed: {
    isValid() {
      return this.confirmpassword === this.password;
    },
  },
};
</script>

<style lang="stylus"></style>
