<template>
  <q-list bordered class="rounded-borders">
    <q-expansion-item
      icon="mdi-beaker-outline"
      dense
      default-opened
      dense-toggle
      expand-separator
      label="外观设置"
    >
      <q-card>
        <q-card-section>
          <q-select
            dense
            outlined
            options-dense
            v-if="activeData.config.changeTag"
            v-model="activeData.type"
            prefix="组件类型："
            class="q-my-sm"
            :options="inputOptions"
            emit-value
            map-options
          />
          <q-input
            dense
            outlined
            type="text"
            class="q-my-sm"
            v-if="activeData.config.label!==undefined&&activeData.config.hideLabel!==true"
            v-model="activeData.config.label"
            prefix="标题："
            input-class="text-left"
            :readonly="!activeData.config.showLabel"
          >
            <template #append>
              <q-toggle v-model="activeData.config.showLabel" />
            </template>
          </q-input>
          <q-input
            dense
            outlined
            type="text"
            class="q-my-sm"
            v-if="activeData.config.label!==undefined"
            v-model="activeData.config.labelWidth"
            prefix="标题宽度："
            suffix="px"
            input-class="text-left"
          />
          <q-input
            dense
            outlined
            type="number"
            class="q-my-sm"
            v-if="activeData.labelWidth!==undefined"
            v-model="activeData.labelWidth"
            prefix="标题宽度："
            suffix="px"
            :debounce="500"
            input-class="text-left"
          />
          <q-input
            dense
            outlined
            type="text"
            class="q-my-sm"
            v-if="activeData.placeholder!==undefined"
            v-model="activeData.placeholder"
            prefix="占位提示："
            input-class="text-left"
          />
          <q-input
            dense
            outlined
            type="text"
            class="q-my-sm"
            v-if="activeData.hint!==undefined"
            v-model="activeData.hint"
            prefix="输入提示："
            input-class="text-left"
          >
            <template #append>
              <q-toggle v-model="activeData.hideHint" />
            </template>
          </q-input>
          <q-input
            dense
            outlined
            type="text"
            class="q-my-sm"
            v-if="activeData.mask!==undefined"
            v-model="activeData.mask"
            prefix="掩码："
            input-class="text-left"
          />
          <q-input
            dense
            outlined
            type="text"
            class="q-my-sm"
            v-if="activeData.fillMask!==undefined"
            v-model="activeData.fillMask"
            prefix="填充掩码："
            input-class="text-left"
          />
          <q-input
            dense
            outlined
            type="text"
            class="q-my-sm"
            v-if="activeData.prefix!==undefined"
            v-model="activeData.prefix"
            prefix="前缀："
            input-class="text-left"
          />
          <q-input
            dense
            outlined
            type="text"
            class="q-my-sm"
            v-if="activeData.suffix!==undefined"
            v-model="activeData.suffix"
            prefix="后缀："
            input-class="text-left"
          />
          <q-input
            dense
            outlined
            type="text"
            class="q-my-sm"
            v-if="activeData.icon!==undefined"
            v-model="activeData.icon"
            prefix="图标："
            input-class="text-left"
          />
          <q-input
            dense
            outlined
            type="text"
            class="q-my-sm"
            v-if="activeData.size!==undefined"
            v-model="activeData.size"
            prefix="尺寸："
            input-class="text-left"
          />
          <q-field dense borderless prefix="表单栅格："
          v-if="activeData.config.span!==undefined&&activeData.config.span!=='grow'">
            <template v-slot:control>
              <q-slider
                v-model="activeData.config.span"
                markers
                color="green"
                label
                :min="1"
                :max="12"
              />
            </template>
          </q-field>
          <q-field
            dense
            borderless
            prefix="布局模式："
            v-if="activeData.config.layout==='rowFormItem'&&activeData.layout!==undefined"
          >
            <template v-slot:control>
              <q-btn-toggle
                v-model="activeData.layout"
                spread
                no-caps
                unelevated
                toggle-color="primary"
                color="white"
                text-color="primary"
                style="border: 1px solid #027be3"
                :options="[
                            {label: 'default', value: 'default'},
                            {label: 'flex', value: 'flex'}
                          ]"
              />
            </template>
          </q-field>
          <q-select
            dense
            outlined
            options-dense
            v-if="activeData.direction!==undefined&&activeData.layout==='flex'"
            v-model="activeData.direction"
            class="q-my-sm"
            prefix="布局方向："
            :options="directionOptions"
            emit-value
            map-options
          />
          <q-select
            dense
            outlined
            options-dense
            v-if="activeData.wrap!==undefined&&activeData.layout==='flex'"
            v-model="activeData.wrap"
            class="q-my-sm"
            prefix="换行设置："
            :options="wrapOptions"
            emit-value
            map-options
          />
          <q-select
            dense
            outlined
            options-dense
            v-if="activeData.justify!==undefined&&activeData.layout==='flex'"
            v-model="activeData.justify"
            class="q-my-sm"
            prefix="水平排列："
            :options="justifyOptions"
            emit-value
            map-options
          />
          <q-select
            dense
            outlined
            v-if="activeData.align!==undefined&&activeData.layout==='flex'"
            options-dense
            prefix="垂直排列："
            v-model="activeData.align"
            class="q-my-sm"
            :options="alignOptions"
            emit-value
            map-options
          />
          <q-toggle
            label="标签常显"
            v-if="activeData.labelAlways!==undefined"
            v-model="activeData.labelAlways"
          />
          <q-toggle
            label="动态标签"
            v-if="activeData.config.tag==='q-slider'"
            v-model="activeData.label"
          />
          <q-toggle
            label="显示刻度"
            v-if="activeData.markers!==undefined"
            v-model="activeData.markers"
          />
          <q-toggle
            label="垂直显示"
            v-if="activeData.vertical!==undefined"
            v-model="activeData.vertical"
          />
          <q-toggle
            label="反转"
            v-if="activeData.reverse!==undefined"
            v-model="activeData.reverse"
          />
          <q-select
            dense
            outlined
            options-dense
            v-if="activeData.toggleColor!==undefined"
            v-model="activeData.toggleColor"
            prefix="选中背景颜色："
            class="q-my-sm"
            :options="colorOptions"
            emit-value
            map-options
          />
          <q-select
            dense
            outlined
            options-dense
            v-if="activeData.toggleTextColor!==undefined"
            v-model="activeData.toggleTextColor"
            prefix="选中文字颜色："
            class="q-my-sm"
            :options="colorOptions"
            emit-value
            map-options
          />
          <q-select
            dense
            outlined
            options-dense
            v-if="activeData.color!==undefined"
            v-model="activeData.color"
            prefix="颜色设置："
            class="q-my-sm"
            :options="colorOptions"
            emit-value
            map-options
          />
          <q-select
            dense
            outlined
            options-dense
            v-if="activeData.trackColor!==undefined"
            v-model="activeData.trackColor"
            prefix="进展颜色："
            class="q-my-sm"
            :options="colorOptions"
            emit-value
            map-options
          />
          <q-select
            dense
            outlined
            options-dense
            v-if="activeData.centerColor!==undefined"
            v-model="activeData.centerColor"
            prefix="中心颜色："
            class="q-my-sm"
            :options="colorOptions"
            emit-value
            map-options
          />
          <q-select
            dense
            outlined
            options-dense
            v-if="activeData.textColor!==undefined"
            v-model="activeData.textColor"
            prefix="文字颜色："
            class="q-my-sm"
            :options="colorOptions"
            emit-value
            map-options
          />
          <q-select
            dense
            outlined
            options-dense
            v-if="activeData.labelColor!==undefined"
            v-model="activeData.labelColor"
            prefix="标签颜色："
            class="q-my-sm"
            :options="colorOptions"
            emit-value
            map-options
          />
          <q-select
            dense
            outlined
            options-dense
            v-if="activeData.labelTextColor!==undefined"
            v-model="activeData.labelTextColor"
            prefix="标签文字颜色："
            class="q-my-sm"
            :options="colorOptions"
            emit-value
            map-options
          />
        </q-card-section>
      </q-card>
    </q-expansion-item>
  </q-list>
</template>

<script>
export default {
  components: {},
  props: {
    activeData: {
      type: Object,
      required: false,
    },
    formConf: {
      type: Object,
      required: false,
    },
  },
  data() {
    return {
      colorOptions: [{ label: '主要', value: 'primary' },
        { label: '次要', value: 'secondary' },
        { label: '强调', value: 'accent' },
        { label: '深色', value: 'dark' },
        { label: '成功', value: 'positive' },
        { label: '失败', value: 'negative' },
        { label: '信息', value: 'info' },
        { label: '警告', value: 'warning' },
        { label: '白色', value: 'white' },
        { label: '红色', value: 'red' },
        { label: '粉色', value: 'pink' },
        { label: '紫色', value: 'purple' },
        { label: '橘红', value: 'orange' },
        { label: '棕色', value: 'brown' },
        { label: '灰色', value: 'grey' }],
      inputOptions: [{ label: '单行文本', value: 'text' },
        { label: '密码框', value: 'password' }],
      wrapOptions: [
        {
          label: 'none',
          value: '',
        },
        {
          label: 'wrap',
          value: 'wrap',
        },
        {
          label: 'no-wrap',
          value: 'no-wrap',
        },
        {
          label: 'reverse-wrap',
          value: 'reverse-wrap',
        }],
      directionOptions: [
        {
          label: 'row',
          value: 'row',
        },
        {
          label: 'column',
          value: 'column',
        },
        {
          label: 'row reverse',
          value: 'row reverse',
        },
        {
          label: 'column reverse',
          value: 'column reverse',
        }],
      justifyOptions: [
        {
          label: 'justify-start',
          value: 'justify-start',
        },
        {
          label: 'justify-end',
          value: 'justify-end',
        },
        {
          label: 'justify-center',
          value: 'justify-center',
        },
        {
          label: 'justify-around',
          value: 'justify-around',
        },
        {
          label: 'justify-between',
          value: 'justify-between',
        },
        {
          label: 'justify-evenly',
          value: 'justify-evenly',
        }],
      alignOptions: [
        {
          label: 'items-start',
          value: 'items-start',
        },
        {
          label: 'items-end',
          value: 'items-end',
        },
        {
          label: 'items-center',
          value: 'items-center',
        },
        { label: 'items-stretch', value: 'items-stretch' },
        { label: 'items-baseline', value: 'items-baseline' }],
    };
  },
  watch: {},
  computed: {},
  methods: {},
  created() { },
  mounted() { },
};
</script>
<style lang="stylus"></style>
