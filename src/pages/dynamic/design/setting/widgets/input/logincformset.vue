<template>
  <div class="column justify-center">
    <q-btn class="col" outline @click="logicSet" label="逻辑表单设置" icon-right="mdi-iframe-braces-outline" />
    <q-dialog v-model="showDialog" maximized flat persistent position="right">
      <q-form class="dialog_card column">
        <h5 class="view_title justify-between q-px-md">
          逻辑表单设置
          <q-btn dense outline round icon="clear" size="sm" v-close-popup />
        </h5>
        <div class="col column">
          <div class="col q-pa-md">
            <div
              class="row q-gutter-sm items-center"
              v-for="(item,index) in logicList"
              :key="index"
            >
              <div class="col">
                <q-select
                  dense
                  outlined
                  options-dense
                  v-model="item.value"
                  prefix="选项值:"
                  class="q-my-sm"
                  :options="activeData.options"
                  option-label="label"
                  option-value="value"
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
                  v-model="item.hideColumnList"
                  prefix="隐藏字段:"
                  class="q-my-sm"
                  :options="currentColumns"
                  multiple
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
          <q-btn unelevated color="primary" class="on-right" label="添加设置" @click="add" />
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
    drawingList: {
      type: Array,
      required: false,
    },
    logicList: {
      type: Array,
      required: false,
    },
  },
  data() {
    return {
      showDialog: false,
      currentColumns: [],
      form: {},
    };
  },
  watch: {},
  computed: {},
  methods: {
    logicSet() { this.showDialog = true; },
    add() {
      this.logicList.push({ value: '', hideColumnList: [] });
    },
    reset() { },
    save() {
      this.showDialog = false;
    },
    deleteItem(index) {
      this.logicList.splice(index, 1);
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
    // 默认值需要根据设置来获取
    const v = this.activeData.config.optionSourceType;
    if (v === 'form' || v === 'subForm') {
      this.$axios.post(`/dyn/form/queryOptionDataList?dynFormId=${this.activeData.config.optionForm}&inputField=${this.activeData.vModel}`, { dynFormId: this.$route.query.id }).then(({ result }) => {
        if (result && result.length > 0) {
          this.activeData.options = result.map((m) => ({ label: m[this.activeData.config.optionLabel], value: m[this.activeData.config.optionValue] }));
        } else {
          this.activeData.options = [];
        }
      }).finally(() => {
      });
    }
  },
};
</script>
<style lang="stylus"></style>
