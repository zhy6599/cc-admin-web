<template>
  <div class="column justify-center">
    <q-btn class="col" outline @click="relatedSet" label="关联条件设置" icon-right="mdi-iframe-braces-outline" />
    <q-dialog v-model="showDialog" maximized flat persistent position="right">
      <q-form class="dialog_card column">
        <h5 class="view_title justify-between q-px-md">
          关联条件设置
          <q-btn dense outline round icon="clear" size="sm" v-close-popup />
        </h5>
        <div class="col column">
          <div class="col q-pa-md">
            <div
              class="row q-gutter-sm items-center"
              v-for="(item,index) in filterList"
              :key="index"
            >
              <div class="col">
                <q-select
                  dense
                  outlined
                  options-dense
                  v-model="item.column"
                  prefix="字段:"
                  class="q-my-sm"
                  :options="relatedColumnOptions"
                  option-label="name"
                  option-value="code"
                  emit-value
                  map-options
                  @input="changeColumn"
                />
              </div>
              <div class="col">
                <q-select
                  dense
                  outlined
                  options-dense
                  v-model="item.opt"
                  prefix="操作符:"
                  class="q-my-sm"
                  :options="optOptions"
                  emit-value
                  map-options
                />
              </div>
              <div class="col">
                <q-select
                  dense
                  outlined
                  options-dense
                  v-model="item.valueType"
                  prefix="值类型:"
                  class="q-my-sm"
                  :options="valueTypeOptions"
                  emit-value
                  map-options
                />
              </div>
              <div class="col">
                <q-input
                  v-if="item.valueType==='custom'"
                  dense
                  outlined
                  type="text"
                  class="q-my-sm"
                  v-model="item.defaultValue"
                  prefix="值:"
                  input-class="text-left"
                />
                <q-select
                  v-else
                  dense
                  outlined
                  options-dense
                  v-model="item.defaultValue"
                  prefix="对应字段:"
                  class="q-my-sm"
                  :options="currentColumns"
                  emit-value
                  map-options
                />
              </div>
              <div style="width:50px;">
                <q-input
                  dense
                  outlined
                  type="number"
                  class="q-my-sm"
                  v-model="item.group"
                  placeholder="查询组（同组and，不同组or）"
                  input-class="text-left"
                />
              </div>
              <div style="width:30px;">
                <q-btn dense round text-color="red" icon="delete" @click="deleteItem(index)" />
              </div>
            </div>
          </div>
        </div>
        <div class="text-center justify-end text-body2 q-pa-md text-orange">特殊说明:分组为0的过滤条件是必须满足的不然不显示数据；不同组之间是or；同组and；</div>
        <div class="row justify-end q-pa-md">
          <q-btn unelevated color="primary" class="on-right" label="添加查询" @click="add" />
          <q-btn unelevated color="primary" class="on-right" label="重置设置" @click="reset" />
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
import { optOptions } from 'components/generator/util';

export default {
  components: {},
  props: {
    relatedColumnOptions: {
      type: Array,
      required: false,
    },
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
      optOptions,
      showDialog: false,
      valueTypeOptions: [{ label: '自定义', value: 'custom' },
        { label: '匹配字段', value: 'related' }],
      currentColumns: [],
    };
  },
  watch: {},
  computed: {},
  methods: {
    relatedSet() { this.showDialog = true; },
    add() {
      this.filterList.push({ valueType: 'custom', opt: 'eq', group: 1 });
    },
    reset() { },
    save() {
      this.showDialog = false;
    },
    deleteItem(index) {
      this.filterList.splice(index, 1);
    },
    changeColumn(v) {
    },
  },
  created() { },
  mounted() {
    this.currentColumns = buildColumnListFromDrawingList(this.drawingList).filter((column) => column.field !== this.activeData.vModel).map((v) => ({
      ...v,
      value: v.field,
    }));
  },
};
</script>
<style lang="stylus"></style>
