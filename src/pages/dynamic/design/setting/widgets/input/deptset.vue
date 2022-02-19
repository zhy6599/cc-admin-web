<template>
  <div class="column justify-center">
    <q-btn
      class="col"
      outline
      @click="userSet"
      :label="moudleName+'设置'"
      icon-right="mdi-iframe-braces-outline"
    />
    <q-select
        dense
        outlined
        options-dense
        v-model="activeData.config.relatedForm"
        prefix="关联表单："
        class="q-my-sm"
        :options="relatedFormOptions"
        option-label="name"
        option-value="id"
        emit-value
        map-options
        @input="changeRelatedForm"
      />
      <q-select
        dense
        outlined
        options-dense
        v-model="activeData.config.relatedColumn"
        :prefix="moudleName+'字段：'"
        class="q-my-sm"
        :options="relatedColumnOptions"
        option-label="name"
        option-value="code"
        emit-value
        map-options
      />
      <relatedfilter :activeData="activeData" :filterList="activeData.config.relatedFilter" :relatedColumnOptions="relatedColumnOptions" :drawingList="drawingList" />
    <q-dialog v-model="showDialog" maximized flat persistent position="right">
      <q-form class="dialog_card column">
        <h5 class="view_title justify-between q-px-md">
          {{moudleName+'设置'}}
          <q-btn dense outline round icon="clear" size="sm" v-close-popup />
        </h5>
        <div class="col column">
          <div class="col column q-pa-md">
            <q-card class="col column">
              <q-tabs
                v-model="tab"
                dense
                class="text-grey"
                active-color="primary"
                indicator-color="primary"
                align="left"
                narrow-indicator
                @input="init"
              >
                <q-tab v-show="activeData.config.inputType==='user'" name="user" label="用户" />
                <q-tab v-show="activeData.config.inputType==='user' || activeData.config.inputType==='dept'" name="dept" label="部门" />
                <q-tab v-show="activeData.config.inputType==='user'" name="role" label="角色" />
                <q-tab v-show="activeData.config.inputType==='user' || activeData.config.inputType==='dept'" name="dynamic" label="动态" />
              </q-tabs>

              <q-separator />

              <div class="col row fit q-mt-sm q-col-gutter-x-md dialog_form">
                <div class="col column">
                  <q-toolbar class="column-select-toolbar bg-primary text-white shadow-2">
                    <q-toolbar-title class="text-subtitle2">未选择</q-toolbar-title>
                  </q-toolbar>
                  <q-scroll-area class="col text-center">
                    <q-list class="column" bordered separator>
                      <q-item class="bg-grey-2">
                        <q-item-section>编号</q-item-section>
                        <q-item-section>名称</q-item-section>
                      </q-item>
                      <q-item
                        v-for="item in unSelectList"
                        :key="item.code"
                        clickable
                        v-ripple
                        :active="selected === item"
                        @click="selected = item"
                        @dblclick="select()"
                      >
                        <q-item-section>{{item.code}}</q-item-section>
                        <q-item-section>{{ellipsis(item.name,8)}}</q-item-section>
                      </q-item>
                    </q-list>
                  </q-scroll-area>
                </div>
                <div class="column justify-center">
                  <q-btn flat color="primary" @click="unselect()" icon="mdi-arrow-left" />
                  <q-btn flat color="primary" @click="unselectAll()" icon="mdi-arrow-left-thick" />
                  <q-btn flat color="primary" @click="select()" icon="mdi-arrow-right" />
                  <q-btn flat color="primary" @click="selectAll()" icon="mdi-arrow-right-thick" />
                </div>
                <div class="col column">
                  <q-toolbar class="bg-primary text-white shadow-2">
                    <q-toolbar-title class="text-subtitle2">已选择</q-toolbar-title>
                  </q-toolbar>
                  <q-scroll-area class="col text-center">
                    <q-list class="column" bordered separator>
                      <q-item class="bg-grey-2">
                        <q-item-section>编号</q-item-section>
                        <q-item-section>名称</q-item-section>
                      </q-item>
                      <q-item
                        v-for="item in selectList"
                        :key="item.code"
                        clickable
                        v-ripple
                        :active="selected === item"
                        @click="selected = item"
                        @dblclick="unselect()"
                      >
                        <q-item-section>{{item.code}}</q-item-section>
                        <q-item-section>{{ellipsis(item.name,8)}}</q-item-section>
                      </q-item>
                    </q-list>
                  </q-scroll-area>
                </div>
              </div>
            </q-card>
          </div>
        </div>
        <div class="row justify-end q-pb-md q-pr-md">
          <q-space />
          <q-btn outline color="primary" label="关闭" v-close-popup />
          <q-btn unelevated color="primary" class="on-right" label="保存" @click="save" />
        </div>
      </q-form>
    </q-dialog>
  </div>
</template>

<script>
import { buildColumnListFromDrawingList } from 'components/generator';
import relatedfilter from 'pages/dynamic/design/setting/widgets/input/relatedfilter';
import { ellipsis } from 'boot/datatype';

export default {
  components: { relatedfilter },
  props: {
    activeData: {
      type: Object,
      required: false,
    },
    formConf: {
      type: Object,
      required: false,
    },
    drawingList: {
      type: Array,
      required: false,
    },
    filterList: {
      type: Array,
      required: false,
    },
  },
  data() {
    return {
      tab: 'dept',
      showDialog: false,
      relatedFormOptions: [],
      relatedColumnOptions: [],
      userList: [],
      roleList: [],
      deptList: [],
      dynamicList: [],
      selected: '',
      selectList: [],
      unSelectList: [],
    };
  },
  methods: {
    ellipsis,
    userSet() { this.showDialog = true; },
    reset() {
    },
    changeRelatedForm(v) {
      if (v) {
        this.$axios.get(`/dyn/form/queryDbEntityById?id=${v}`).then(({ result }) => {
          this.relatedColumnOptions = result.dynColumnList;
        }).finally(() => {
          this.loading = false;
        });
      }
    },
    save() {
      this.showDialog = false;
    },
    select() {
      if (this.selected !== '') {
        const item = this.unSelectList.find((data) => this.selected === data);
        if (item) {
          this.unSelectList.splice(this.unSelectList
            .findIndex((data) => this.selected === data), 1);
          this.selectList.push(item);
        }
      }
    },
    unselect() {
      if (this.selected !== '') {
        const item = this.selectList.find((data) => this.selected === data);
        if (item) {
          this.selectList.splice(this.selectList.findIndex((data) => item === data), 1);
          this.unSelectList.push(item);
        }
      }
    },
    selectAll() {
      if (this.unSelectList.length > 0) {
        this.selectList = this.selectList.concat(this.unSelectList);
        this.unSelectList = [];
      }
    },
    unselectAll() {
      if (this.selectList.length > 0) {
        this.unSelectList = this.unSelectList.concat(this.selectList);
        this.selectList = [];
        this.activeData.config[`${this.tab}List`] = [];
      }
    },
    init() {
      this.selectList = this.activeData.config[`${this.tab}List`];
      this.unSelectList = this[`${this.tab}List`].filter((data) => this.selectList.filter((select) => select.id === data.id).length === 0);
    },
  },
  created() { },
  mounted() {
    this.$axios.get('/dyn/form/userRoleDeptList').then(({ result }) => {
      this.userList = result.user;
      this.roleList = result.role;
      this.deptList = result.dept;
      const name = this.activeData.config.inputType === 'dept' ? '当前部门' : '当前用户';
      this.dynamicList = [{ id: 'current', code: 'current', name }];
      this.init();
    });
    this.$axios.get('/dyn/form/list?pageNo=1&pageSize=1000').then(({ result }) => {
      this.relatedFormOptions = result.records;
    }).finally(() => {
      this.loading = false;
    });
    if (this.activeData.config.relatedForm) {
      this.changeRelatedForm(this.activeData.config.relatedForm);
    }
  },
  computed: {
    moudleName() {
      return this.activeData.config.inputType === 'dept' ? '部门' : '用户';
    },
  },
};
</script>
<style lang="stylus"></style>
