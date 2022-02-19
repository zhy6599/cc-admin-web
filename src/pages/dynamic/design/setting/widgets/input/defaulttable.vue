<template>
  <div>
    <div class="text-caption">默认值设置</div>
    <q-separator class="q-my-sm" />
    <q-toggle v-model="activeData.config.autoLoadData" label="自动加载数据" />
    <q-toggle v-model="activeData.config.showIndex" label="序号" />
    <q-toggle v-model="activeData.config.showDelete" label="删除" />
    <q-toggle v-model="activeData.config.showAdd" label="新增和导入" />
    <q-select
      dense
      outlined
      options-dense
      v-model="activeData.config.defaultType"
      prefix="默认内容："
      class="q-my-sm"
      :options="defaultTypeOptions"
      emit-value
      map-options
    />
    <div v-if="activeData.config.defaultType === 'custom'" class="column justify-center">
      <q-btn class="col" outline @click="defaultSet" label="设置默认内容" icon-right="mdi-dots-horizontal" />
    </div>
    <div v-if="activeData.config.defaultType === 'related'">
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
      <relatedcolumnset class="q-my-sm" :activeData="activeData" :relatedColumnList="activeData.config.relatedColumnList" :relatedColumnOptions="relatedColumnOptions" />
      <relatedfilter :activeData="activeData" :filterList="activeData.config.relatedFilter" :relatedColumnOptions="relatedColumnOptions" :drawingList="drawingList" />
    </div>
    <q-dialog v-model="showDefaultDialog" maximized flat persistent position="right">
      <q-form class="dialog_card column">
        <h5 class="view_title justify-between q-px-md">
          设置默认内容
          <q-btn dense outline round icon="clear" size="sm" v-close-popup />
        </h5>
        <div class="col column">
          <div class="col q-pa-md">
            <div
              class="row q-gutter-sm items-center"
              v-for="(item,index) in activeData.config.defaultValue"
              :key="index"
            >
              <div class="col" v-for="(child,index) in children" :key="index">
                <q-input
                  dense
                  outlined
                  type="text"
                  class="q-my-sm"
                  v-model="item[child.vModel]"
                  :prefix="child.config.label"
                  input-class="text-left"
                />
              </div>
              <div style="width:30px;">
                <q-btn dense round text-color="red" icon="delete" @click="deleteItem(index)" />
              </div>
            </div>
          </div>
        </div>
        <div class="row justify-end q-pa-md">
          <q-btn unelevated color="primary" class="on-right" label="添加一行" @click="add" />
          <q-btn unelevated color="primary" class="on-right" label="删除所有" @click="reset" />
          <q-space />
          <q-btn outline color="primary" label="关闭" v-close-popup />
          <q-btn unelevated color="primary" class="on-right" label="保存" @click="save" />
        </div>
      </q-form>
    </q-dialog>
  </div>
</template>

<script>
import draggableItem from 'pages/dynamic/design/draggableitem';
import relatedfilter from 'pages/dynamic/design/setting/widgets/input/relatedfilter';
import relatedcolumnset from 'pages/dynamic/design/setting/widgets/input/relatedcolumnset';

export default {
  components: { relatedfilter, relatedcolumnset },
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
      showDefaultDialog: false,
      defaultTypeOptions: [
        { label: '自定义', value: 'custom' },
        { label: '关联已有数据', value: 'related' },
        { label: '通过公式计算', value: 'calc' },
      ],
      children: [],
      relatedFormOptions: [],
      relatedColumnOptions: [],
    };
  },
  watch: {},
  computed: {},
  methods: {
    defaultSet() {
      this.children = this.activeData.config.children;
      this.showDefaultDialog = true;
    },
    add() {
      this.activeData.config.defaultValue.push({ });
    },
    reset() {
      this.activeData.config.defaultValue.push = [];
    },
    save() {
      this.showDefaultDialog = false;
    },
    deleteItem(index) {
      this.activeData.config.defaultValue.splice(index, 1);
    },
    getDefaultValueType(config) {
      if (config.tag === 'q-slider') {
        return 'number';
      }
      return 'text';
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
  },
  created() { },
  mounted() {
    this.$axios.get('/dyn/form/list?pageNo=1&pageSize=1000').then(({ result }) => {
      this.relatedFormOptions = result.records;
    }).finally(() => {
      this.loading = false;
    });
    if (this.activeData.config.relatedForm) {
      this.changeRelatedForm(this.activeData.config.relatedForm);
    }
  },
};
</script>
<style lang="stylus"></style>
