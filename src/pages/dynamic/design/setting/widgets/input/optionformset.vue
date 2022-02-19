<template>
  <div>
    <div class="text-caption">选项值设置</div>
    <q-separator class="q-my-sm" />
    <q-select
      dense
      outlined
      options-dense
      v-model="activeData.config.optionSourceType"
      prefix="选项类型："
      class="q-my-sm"
      :options="optionSourceTypeOptions"
      emit-value
      map-options
      @input="changeOptionSourceType"
    />
    <q-input
      prefix="系统字典："
      v-if="activeData.config.optionSourceType==='dict'"
      outlined
      v-model="activeData.config.sysDicName"
      dense
      readonly
      @click="selectDict()"
    >
      <template #append>
        <q-btn
          v-if="activeData.config.sysDicName !=''"
          flat
          round
          icon="mdi-close-circle-outline"
          color="primary"
          @click="clearDict()"
        >
          <q-tooltip>清空</q-tooltip>
        </q-btn>
      </template>
    </q-input>
    <div v-if="activeData.config.optionSourceType==='custom'">
      <div
        class="row no-wrap items-center q-gutter-xs q-mb-xs"
        v-for="option in activeData.options"
        :key="option.value"
      >
        <div>
          <q-icon size="sm" name="mdi-format-list-bulleted-square" />
        </div>
        <div class="col">
          <q-input dense outlined type="text" v-model="option.label" />
        </div>
        <div class="col">
          <q-input dense outlined type="text" v-model="option.value" />
        </div>
        <div>
          <q-btn
            round
            flat
            dense
            icon="mdi-close-circle-outline"
            color="negative"
            @click="deleteOptions(option.value)"
          />
        </div>
      </div>
      <div class="q-mt-sm">
        <q-btn dense flat text-color="light-blue-13" label="新增一行" icon="add" @click="addOptions" />
      </div>
    </div>
    <div v-if="activeData.config.optionSourceType==='form'||activeData.config.optionSourceType==='subForm'">
      <q-select
        dense
        outlined
        options-dense
        v-model="activeData.config.optionForm"
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
        v-if="activeData.config.optionSourceType==='subForm'"
        v-model="activeData.config.optionSubForm"
        prefix="关联子表单："
        class="q-my-sm"
        :options="relatedSubFormOptions"
        option-label="name"
        option-value="id"
        emit-value
        map-options
        @input="changeRelatedSubForm"
      />
      <q-select
        dense
        outlined
        options-dense
        v-model="activeData.config.optionValue"
        prefix="值字段："
        class="q-my-sm"
        :options="relatedColumnOptions"
        option-label="name"
        option-value="code"
        emit-value
        map-options
      />
      <q-select
        dense
        outlined
        options-dense
        v-model="activeData.config.optionLabel"
        prefix="名称字段："
        class="q-my-sm"
        :options="relatedColumnOptions"
        option-label="name"
        option-value="code"
        emit-value
        map-options
      />
      <relatedfilter
        :activeData="activeData"
        :relatedColumnOptions="relatedColumnOptions"
        :drawingList="drawingList"
        :filterList="activeData.config.optionFilter"
      />
    </div>
    <dictselect ref="dictselect" @doSelDic="doSelDic" />
  </div>
</template>

<script>
import draggableItem from 'pages/dynamic/design/draggableitem';
import dictselect from 'pages/dynamic/design/setting/widgets/dictselect';
import relatedfilter from 'pages/dynamic/design/setting/widgets/input/relatedfilter';

export default {
  components: { dictselect, relatedfilter },
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
      optionSourceTypeOptions: [
        { label: '自定义', value: 'custom' },
        { label: '数据字典', value: 'dict' },
        { label: '关联其他表单', value: 'form' },
        { label: '关联其他子表单', value: 'subForm' },
        { label: '数据联动', value: 'linkData' },
      ],
      relatedFormOptions: [],
      relatedSubFormOptions: [],
      relatedColumnOptions: [],
    };
  },
  watch: {},
  computed: {},
  methods: {
    clearDict() {
      this.activeData.config.sysDicCode = '';
      this.activeData.config.sysDicName = '';
    },
    selectDict() {
      this.$refs.dictselect.showDialog = true;
    },
    doSelDic(id, name) {
      this.activeData.config.sysDicCode = id;
      this.activeData.config.sysDicName = name;
      // 字典项要重新加载
      this.$axios.get('/sys/dictItem/selectItemsByDictCode', { params: { dictCode: id } }).then((r) => {
        this.activeData.options = r;
      });
    },
    addOptions() {
      this.activeData.options.push({ label: '选项', value: '值' });
    },
    deleteOptions(v) {
      this.activeData.options = this.activeData.options.filter((o) => o.value !== v);
    },
    changeOptionSourceType(source) {
      const v = this.activeData.config.optionSourceType;
      if (v !== 'custom') {
        if (!this.initForm) {
          this.activeData.options = [];
        }
        // 这里需要根据类型来加载到底是表单还是子表单
        if (v === 'form' || v === 'subForm') {
          this.$axios.get('/dyn/form/list?pageNo=1&pageSize=1000').then(({ result }) => {
            this.relatedFormOptions = result.records;
          }).finally(() => {
            this.loading = false;
            // 如果是表单，那么这里就用主表中的字段
            this.changeRelatedForm(source);
          });
        }
      }
    },
    getDefaultValueType(config) {
      if (config.tag === 'q-slider') {
        return 'number';
      }
      return 'text';
    },
    // 初始化表单选项
    changeRelatedForm(source) {
      // 这说明用户把页签切换到表单或者子表单了。那么应该把设置都清空
      if (source) {
        this.activeData.config.optionSubForm = '';
        this.relatedSubFormOptions = [];
        this.relatedColumnOptions = [];
        this.activeData.config.optionLabel = '';
        this.activeData.config.optionValue = '';
      }
      const v = this.activeData.config.optionForm;
      if (v) {
        this.$axios.get(`/dyn/form/queryDbEntityById?id=${v}`).then(({ result }) => {
          if (this.activeData.config.optionSourceType === 'subForm') {
            // 如果是子表单，那么就应该把子表单列出来让用户选择
            // 选择了主表单，那么下面的子表单应该给人家了。
            if (result.subDynEntityList && result.subDynEntityList.length > 0) {
              this.relatedSubFormOptions = result.subDynEntityList;
              this.changeRelatedSubForm();
            } else {
              this.relatedSubFormOptions = [];
            }
          } else {
            this.relatedColumnOptions = result.dynColumnList;
          }
        }).finally(() => {
          this.loading = false;
        });
      }
    },
    // 初始化子表单选项
    changeRelatedSubForm() {
      const v = this.activeData.config.optionSubForm;
      if (v) {
        this.relatedSubFormOptions.forEach((sub) => {
          if (sub.id === v) {
            this.relatedColumnOptions = sub.dynColumnList;
          }
        });
      }
    },
  },
  created() { },
  mounted() {
    // 页面加载完成就需要重新初始化表单设置数据
    this.changeOptionSourceType();
  },
};
</script>
<style lang="stylus"></style>
