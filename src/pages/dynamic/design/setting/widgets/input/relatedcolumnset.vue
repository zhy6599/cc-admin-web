<template>
  <div class="column justify-center">
    <q-btn class="col" outline @click="relatedColumnSet" label="关联字段设置" icon-right="mdi-table-cog" />
    <q-dialog v-model="showDialog" maximized flat persistent position="right">
      <q-form class="dialog_card column">
        <h5 class="view_title justify-between q-px-md">
          关联字段设置
          <q-btn dense outline round icon="clear" size="sm" v-close-popup />
        </h5>
        <div class="col column">
          <div class="col q-pa-md">
            <div
              class="row q-gutter-sm items-center"
              v-for="(item,index) in relatedColumnList"
              :key="index"
            >
              <div class="col">
                <q-select
                  dense
                  outlined
                  options-dense
                  v-model="item.column"
                  prefix="关联字段:"
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
                  v-model="item.subColumn"
                  prefix="子表单字段:"
                  class="q-my-sm"
                  :options="currentColumns"
                  emit-value
                  map-options
                />
              </div>
              <div style="width:30px;">
                <q-btn dense round text-color="red" icon="delete" @click="deleteItem(index)" />
              </div>
            </div>
          </div>
        </div>
        <div class="row justify-end q-pa-md">
          <q-btn unelevated color="primary" class="on-right" label="添加关联字段" @click="add" />
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
    relatedColumnList: {
      type: Array,
      required: false,
    },
  },
  data() {
    return {
      showDialog: false,
      valueTypeOptions: [{ label: '自定义', value: 'custom' },
        { label: '匹配字段', value: 'related' }],
      currentColumns: [],
    };
  },
  watch: {},
  computed: {},
  methods: {
    relatedColumnSet() {
      this.currentColumns = buildColumnListFromDrawingList(this.activeData.config.children).map((v) => ({
        ...v,
        value: v.field,
      }));
      this.showDialog = true;
    },
    add() {
      this.relatedColumnList.push({ valueType: 'custom', opt: 'eq', group: 1 });
    },
    reset() { },
    save() {
      this.showDialog = false;
    },
    deleteItem(index) {
      this.relatedColumnList.splice(index, 1);
    },
    changeColumn(v) {
    },
  },
  created() { },
  mounted() {
  },
};
</script>
<style lang="stylus"></style>
