<template>
  <q-page class="column">
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
        :rows-per-page-options="[100]"
        :loading="loading"
        :grid="$q.screen.xs"
        :selection="$q.screen.xs?'none':'multiple'"
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
          </q-btn-group>
        </template>

        <template #body-cell-opt="props">
          <q-td :props="props" :auto-width="true">
            <q-btn flat round dense color="warning" icon="mdi-login" @click.stop>
              <q-tooltip>用户下线</q-tooltip>
              <q-menu auto-close anchor="center left" self="center right">
                <div class="row no-wrap items-center q-pa-sm">
                  <span class="text-no-wrap">
                    用户下线？
                  </span>
                  <q-btn
                    flat
                    round
                    dense
                    color="warning"
                    icon="mdi-login"
                    @click="officeLine(props.row)"
                  >
                    <q-tooltip>确认下线</q-tooltip>
                  </q-btn>
                </div>
              </q-menu>
            </q-btn>
          </q-td>
        </template>
      </q-table>
    </div>
    <q-dialog maximized flat persistent ref="dialog" position="right">
      <q-form @submit="submit" class="dialog_card column">
        <h5 class="view_title justify-between q-px-md">
          {{editType}}在线用户
          <q-btn dense outline round icon="clear" size="sm" v-close-popup />
        </h5>
        <q-scroll-area class="col">
          <div class="row q-col-gutter-x-md dialog_form q-pa-md">
            <div class="col-12">
              <h5>用户账号：</h5>
              <q-input outlined dense v-model="form.id" type="text" />
            </div>
            <div class="col-12">
              <h5>用户姓名：</h5>
              <q-input outlined dense v-model="form.name" type="text" />
            </div>
            <div class="col-12">
              <h5>IP：</h5>
              <q-input outlined dense v-model="form.ip" type="text" />
            </div>
            <div class="col-12">
              <h5>IP地址：</h5>
              <q-input outlined dense v-model="form.ipAddress" type="text" />
            </div>
            <div class="col-12">
              <h5>浏览器：</h5>
              <q-input outlined dense v-model="form.explorer" type="text" />
            </div>
            <div class="col-12">
              <h5>登录时间：</h5>
              <q-field outlined dense v-model="form.loginTime">
                <template v-slot:control>{{form.loginTime}}</template>
                <template v-slot:append>
                  <q-btn flat dense round color="primary" icon="schedule">
                    <q-popup-proxy>
                      <div class="row">
                        <q-date flat square v-model="form.loginTime" mask="YYYY-MM-DD HH:mm:ss" />
                        <q-time flat square v-model="form.loginTime" mask="YYYY-MM-DD HH:mm:ss" />
                      </div>
                    </q-popup-proxy>
                  </q-btn>
                </template>
              </q-field>
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
  name: 'SysOnlineUser',
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
          name: 'id', align: 'left', label: '用户账号', field: 'id',
        },
        {
          name: 'name', align: 'left', label: '用户姓名', field: 'name',
        },
        {
          name: 'ip', align: 'left', label: 'IP', field: 'ip',
        },
        {
          name: 'ipAddress', align: 'left', label: 'IP地址', field: 'ipAddress',
        },
        {
          name: 'browser', align: 'left', label: '浏览器', field: 'browser',
        },
        {
          name: 'os', align: 'left', label: '操作系统', field: 'os',
        },
        {
          name: 'loginTime', align: 'left', label: '登录时间', field: 'loginTime',
        },
        {
          name: 'opt', align: 'center', label: '操作', field: 'id',
        },
      ],
      url: {
        list: '/sys/onlineUser/list',
        add: '/sys/onlineUser/add',
        edit: '/sys/onlineUser/edit',
        delete: '/sys/onlineUser/delete',
        deleteBatch: '/sys/onlineUser/deleteBatch',
        exportXlsUrl: '/sys/onlineUser/exportXls',
        importExcelUrl: '/sys/onlineUser/importExcel',
      },
    };
  },
  methods: {
    getDictLabel,
    initDict() {
    },
    officeLine() {
      this.$error('权限不足');
    },
  },
  mounted() {
    this.initDict();
  },
};
</script>

<style lang="stylus"></style>
