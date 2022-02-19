<template>
  <q-scroll-area class="col q-ma-xs column">
    <q-card class="col column q-pa-xs no-wrap">
      <q-tabs
        v-model="curTab"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="justify"
      >
        <q-tab name="component" label="组件属性" />
        <q-tab name="form" label="表单属性" />
      </q-tabs>
      <q-separator />
      <q-tab-panels v-model="curTab" animated>
        <q-tab-panel name="component" v-if="activeData">
          <sub-widgets v-if="activeData.sub" :activeData="activeData" :formConf="formConf" />
          <db-widgets v-if="activeData.db" :activeData="activeData" :formConf="formConf" />
          <display-widgets :activeData="activeData" :formConf="formConf" />
          <input-widgets :activeData="activeData" :formConf="formConf" :drawingList="drawingList" />
          <reg-widgets :activeData="activeData" :formConf="formConf" />
        </q-tab-panel>
        <q-tab-panel name="form">
          <q-input
            dense
            outlined
            type="text"
            class="q-my-sm"
            v-model="formConf.tableId"
            prefix="表名："
            input-class="text-left"
          />
          <q-input
            dense
            outlined
            type="text"
            class="q-my-sm"
            v-model="formConf.tableName"
            prefix="表描述："
            input-class="text-left"
          />
          <q-btn-toggle
            v-model="formConf.labelPosition"
            spread
            dense
            options-dense
            outlined
            toggle-color="primary"
            color="white"
            text-color="primary"
            :options="[{label: '左对齐', value: 'left'},{label: '右对齐', value: 'right'},
            {label: '居中', value: 'center'},{label: '顶部对齐', value: 'top'}]"
          />
          <q-input
            dense
            outlined
            type="text"
            class="q-my-sm"
            v-if="formConf.labelWidth!==undefined"
            v-model="formConf.labelWidth"
            prefix="标题宽度："
            suffix="px"
            input-class="text-left"
          />
          <q-select
            dense
            outlined
            options-dense
            v-model="formConf.formSize"
            prefix="表单尺寸："
            class="q-my-sm"
            :options="formSizeOptions"
            emit-value
            map-options
          />
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </q-scroll-area>
</template>

<script>
import dbWidgets from 'pages/dynamic/design/setting/db';
import subWidgets from 'pages/dynamic/design/setting/sub';
import displayWidgets from 'pages/dynamic/design/setting/display';
import inputWidgets from 'pages/dynamic/design/setting/input';
import regWidgets from 'pages/dynamic/design/setting/reg';

export default {
  name: 'setting',
  components: {
    dbWidgets, displayWidgets, inputWidgets, regWidgets, subWidgets,
  },
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
  },
  data() {
    return {
      curTab: 'component',
      loading: false,
      formSizeOptions: [
        { label: '默认', value: 'dialog_card' },
        { label: '50%', value: 'dialog_half' },
        { label: '80%', value: 'dialog_large' },
        { label: '100%', value: 'dialog_full' },
      ],
    };
  },
  mounted() {
  },
  methods: {
  },
  watch: {
    activeData: {
      deep: true,
      handler() {
      },
    },
  },
};
</script>

<style lang="stylus">
@import '~src/css/quasar.variables.styl'

.chart-sel-tabs
  background #fff
  border-left 1px solid $ash
  .q-tabs
    border-bottom 1px solid $ash
    .q-tabscontent
      flex-wrap wrap
    .q-tab
      padding 0
      min-height 40px
    .q-tabcontent
      min-width 50
</style>
