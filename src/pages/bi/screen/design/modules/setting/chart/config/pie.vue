<template>
  <q-expansion-item dense dense-toggle expand-separator label="图形设置">
    <q-card>
      <q-card-section>
        <q-toggle label="南丁格尔图：" v-model="config.series.pie.roseType" />
        <q-toggle label="放大动画：" v-model="config.series.pie.hoverAnimation" />
        <q-toggle label="防止标签重叠：" v-model="config.series.pie.avoidLabelOverlap" />
        <q-field dense borderless prefix="饼图半径：">
          <template v-slot:control>
            <q-range
              v-model="config.series.pie.radius"
              :min="0"
              :max="100"
            />
          </template>
        </q-field>
          <q-toggle label="显示标签" v-model="config.series.pie.label.show" />
          <q-input
            dense
            filled
            v-model="config.series.pie.label.formatter"
            prefix="标签模板："
            class="q-my-sm"
            input-class="text-left"
          />
          <q-select
            dense
            filled
            options-dense
            v-model="config.series.pie.label.position"
            prefix="标签位置："
            class="q-my-sm"
            :options="labelPositionOptions"
            emit-value
            map-options
          />
          <q-input
            dense
            filled
            prefix="字体颜色："
            class="q-my-sm"
            input-class="text-left"
            v-model="config.series.pie.label.color"
          >
            <template v-slot:append>
              <q-icon
                name="colorize"
                class="cursor-pointer"
                :style="{color:config.series.pie.label.color}"
              >
                <q-popup-proxy transition-show="scale" transition-hide="scale">
                  <q-color v-model="config.series.pie.label.color" />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
          <q-select
            dense
            filled
            options-dense
            v-model="config.series.pie.label.fontWeight"
            prefix="字体粗细："
            class="q-my-sm"
            :options="fontWeightOptions"
            emit-value
            map-options
          />
          <q-select
            dense
            filled
            options-dense
            v-model="config.series.pie.label.fontStyle"
            prefix="字体风格："
            class="q-my-sm"
            :options="fontStyleOptions"
            emit-value
            map-options
          />
          <q-input
            dense
            filled
            type="number"
            v-model="config.series.pie.label.fontSize"
            prefix="字体大小："
            class="q-my-sm"
            input-class="text-left"
          />
          <q-input
            dense
            filled
            type="number"
            v-model="config.series.pie.label.rotate"
            prefix="旋转角度："
            class="q-my-sm"
            input-class="text-left"
          />
          <q-select
            dense
            filled
            options-dense
            v-model="config.series.pie.label.align"
            prefix="水平对齐："
            class="q-my-sm"
            :options="leftAlignOptions"
            emit-value
            map-options
          />
          <q-select
            dense
            filled
            options-dense
            v-model="config.series.pie.label.verticalAlign"
            prefix="垂直对齐："
            class="q-my-sm"
            :options="topAlignOptions"
            emit-value
            map-options
          />
          <q-toggle label="显示引导线" v-model="config.series.pie.labelLine.show" />
          <q-toggle label="平滑" v-model="config.series.pie.labelLine.smooth" />
          <q-input
            dense
            filled
            type="number"
            v-model="config.series.pie.labelLine.length"
            prefix="引导线长度："
            class="q-my-sm"
            input-class="text-left"
          />
          <q-input
            dense
            filled
            type="number"
            v-model="config.series.pie.labelLine.length2"
            prefix="引导2线长度："
            class="q-my-sm"
            input-class="text-left"
          />
      </q-card-section>
    </q-card>
  </q-expansion-item>
</template>

<script>
import {
  fontWeightOptions, fontStyleOptions, leftAlignOptions, topAlignOptions, labelPositionOptions,
} from 'boot/datatype';

export default {
  name: 'configpie',
  components: {},
  props: {
    config: {
      type: Object,
      required: false,
    },
  },
  data() {
    return {
      leftAlignOptions, topAlignOptions, fontWeightOptions, fontStyleOptions, labelPositionOptions,
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
