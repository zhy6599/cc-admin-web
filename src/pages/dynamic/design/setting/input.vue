<template>
  <div>
    <q-list
      bordered
      class="rounded-borders q-my-sm"
      v-if="activeData.config.layout!=='rowFormItem'"
    >
      <q-expansion-item
        icon="mdi-iframe-outline"
        dense
        default-opened
        dense-toggle
        expand-separator
        label="输入设置"
      >
        <q-card>
          <q-card-section>
            <q-select
              dense
              outlined
              options-dense
              v-if="activeData.config.tag==='q-btn'"
              v-model="activeData.config.btnAction"
              prefix="操作类型："
              class="q-my-sm"
              :options="btnActionOptions"
              emit-value
              map-options
              @input="changeBtnAction"
            />
            <q-input
              dense
              outlined
              type="text"
              v-if="activeData.label!==undefined"
              v-model="activeData.label"
              prefix="标签内容："
              class="q-my-sm"
              input-class="text-left"
            />
            <defaultvalue :activeData="activeData" :formConf="formConf" :drawingList="drawingList" v-if="activeData.config.hasDefault!==false"/>
            <defaulttable :activeData="activeData" :formConf="formConf" :drawingList="drawingList" v-if="activeData.config.tag ==='table'"/>
            <q-input
              v-if="activeData.maxlength!==undefined"
              dense
              outlined
              type="text"
              class="q-my-sm"
              v-model="activeData.maxlength"
              prefix="最大长度："
              suffix="个字符"
              input-class="text-left"
            />
            <q-input
              prefix="最小值："
              v-if="activeData.min!==undefined"
              dense
              outlined
              v-model="activeData.min"
              type="number"
              :debounce="999"
              class="q-my-sm"
            />
            <q-input
              prefix="最大值："
              v-if="activeData.max!==undefined"
              dense
              outlined
              v-model="activeData.max"
              type="number"
              :debounce="999"
              class="q-my-sm"
            />
            <q-input
              prefix="步长："
              v-if="activeData.step!==undefined"
              dense
              outlined
              v-model="activeData.step"
              type="number"
              :debounce="999"
              class="q-my-sm"
            />
            <q-toggle
              label="是否只读"
              v-if="activeData.readonly!==undefined"
              v-model="activeData.readonly"
            />
            <q-toggle
              label="是否禁用"
              v-if="activeData.disable!==undefined"
              v-model="activeData.disable"
            />
            <q-toggle
              label="能否清空"
              v-if="activeData.clearable!==undefined"
              v-model="activeData.clearable"
            />
            <q-toggle
              label="输入统计"
              v-if="activeData.counter!==undefined"
              v-model="activeData.counter"
            />
            <q-toggle
              label="获取焦点"
              v-if="activeData.autofocus!==undefined"
              v-model="activeData.autofocus"
            />
            <q-toggle
              label="自动增长"
              v-if="activeData.autogrow!==undefined"
              v-model="activeData.autogrow"
            />
            <q-toggle
              label="多选"
              v-if="activeData.multiple!==undefined"
              v-model="activeData.multiple"
              @input="changeMultiple"
            />
            <q-toggle
              label="水平显示"
              v-if="activeData.inline!==undefined"
              v-model="activeData.inline"
            />
          </q-card-section>
          <q-card-section v-if="activeData.config.optionSourceType!==undefined">
            <optionformset :activeData="activeData" :formConf="formConf" :drawingList="drawingList"/>
          </q-card-section>
          <q-card-section v-if="activeData.config.logicList!==undefined">
            <logincformset :activeData="activeData" :formConf="formConf" :drawingList="drawingList" :logicList="activeData.config.logicList"/>
          </q-card-section>
          <q-card-section v-if="activeData.config.inputType==='user'">
            <userset :activeData="activeData" :formConf="formConf" :drawingList="drawingList"/>
          </q-card-section>
          <q-card-section v-if="activeData.config.inputType==='dept'">
            <deptset :activeData="activeData" :formConf="formConf" :drawingList="drawingList"/>
          </q-card-section>

        </q-card>
      </q-expansion-item>
    </q-list>
  </div>
</template>

<script>
import { asyncer } from 'boot/dictionary';
import defaultvalue from './widgets/input/defaultvalue';
import defaulttable from './widgets/input/defaulttable';
import optionformset from './widgets/input/optionformset';
import logincformset from './widgets/input/logincformset';
import userset from './widgets/input/userset';
import deptset from './widgets/input/deptset';

export default {
  components: {
    defaultvalue, defaulttable, optionformset, userset, deptset, logincformset,
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
      btnActionOptions: [
        { label: '保存数据', value: 'save' },
        { label: '关闭窗口', value: 'close' },
      ],
    };
  },
  watch: {},
  computed: {},
  methods: {
    changeBtnAction(v) {
      if (v === 'save') {
        this.activeData.label = '保存';
        this.activeData.color = 'primary';
      }
      if (v === 'close') {
        this.activeData.label = '关闭';
        this.activeData.color = 'grey';
      }
    },
    changeMultiple(v) {
      if (v) {
        this.activeData.config.defaultValue = [];
      } else {
        this.activeData.config.defaultValue = '';
      }
    },
    getDefaultValueType(config) {
      if (config.tag === 'q-slider') {
        return 'number';
      }
      return 'text';
    },
  },
  created() { },
  mounted() { },
};
</script>
<style lang="stylus"></style>
