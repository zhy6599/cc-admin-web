<template>
  <div>
    <div class="text-caption">默认值设置</div>
    <q-separator class="q-my-sm" />
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
    <div v-if="activeData.config.defaultType === 'custom'">
      <q-toggle
        v-if="typeof(activeData.config.defaultValue)==='boolean'"
        v-model="activeData.config.defaultValue"
        label="默认值"
      />
      <q-input
        v-else
        dense
        outlined
        :type="getDefaultValueType(activeData.config)"
        class="q-my-sm"
        v-model="activeData.config.defaultValue"
        prefix="默认值："
        input-class="text-left"
      />
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
      <q-select
        dense
        outlined
        options-dense
        v-model="activeData.config.relatedColumn"
        prefix="关联字段："
        class="q-my-sm"
        :options="relatedColumnOptions"
        option-label="name"
        option-value="code"
        emit-value
        map-options
      />
      <relatedfilter :activeData="activeData" :filterList="activeData.config.relatedFilter" :relatedColumnOptions="relatedColumnOptions" :drawingList="drawingList" />
    </div>
    <div v-if="activeData.config.defaultType === 'calc'">
      <expression :activeData="activeData" :drawingList="drawingList" />
    </div>
  </div>
</template>

<script>
import draggableItem from 'pages/dynamic/design/draggableitem';
import relatedfilter from 'pages/dynamic/design/setting/widgets/input/relatedfilter';
import expression from 'pages/dynamic/design/setting/widgets/input/expression';

export default {
  components: { relatedfilter, expression },
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
      defaultTypeOptions: [
        { label: '自定义', value: 'custom' },
        { label: '关联已有数据', value: 'related' },
        { label: '通过公式计算', value: 'calc' },
      ],
      relatedFormOptions: [],
      relatedColumnOptions: [],
    };
  },
  watch: {},
  computed: {},
  methods: {
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
