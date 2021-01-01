<template>
  <q-expansion-item dense dense-toggle expand-separator label="图形设置">
    <q-card>
      <q-card-section>
        <q-field dense borderless prefix="仪表盘半径：">
          <template v-slot:control>
            <q-slider v-model="config.series.gauge.radius" :min="0" :max="100" label />
          </template>
        </q-field>
        <q-input
          dense
          filled
          type="number"
          v-model="config.series.gauge.startAngle"
          prefix="起始角度："
          class="q-my-sm"
          input-class="text-left"
        />
        <q-input
          dense
          filled
          type="number"
          v-model="config.series.gauge.endAngle "
          prefix="结束角度："
          class="q-my-sm"
          input-class="text-left"
        />
        <q-toggle label="显示数据标签：" v-model="config.series.gauge.showDataName" />
        <q-toggle label="显示数据：" v-model="config.series.gauge.detail.show" />
        <q-input
          dense
          filled
          v-model="config.series.gauge.detail.formatter "
          prefix="数据格式化："
          class="q-my-sm"
          input-class="text-left"
        />
        <q-field dense borderless prefix="数据偏移量X：">
          <template v-slot:control>
            <q-slider
              v-model="config.series.gauge.detail.offsetCenter.x"
              :min="-100"
              :max="100"
              label
            />
          </template>
        </q-field>
        <q-field v-if="config.series.gauge.detail.show" dense borderless prefix="数据偏移量Y：">
          <template v-slot:control>
            <q-slider
              v-model="config.series.gauge.detail.offsetCenter.y"
              :min="-100"
              :max="100"
              label
            />
          </template>
        </q-field>
        <q-input
          v-if="config.series.gauge.detail.show"
          dense
          filled
          prefix="字体颜色："
          class="q-my-sm"
          input-class="text-left"
          v-model="config.series.gauge.detail.color"
        >
          <template v-slot:append>
            <q-icon
              name="colorize"
              class="cursor-pointer"
              :style="{color:config.series.gauge.detail.color}"
            >
              <q-popup-proxy transition-show="scale" transition-hide="scale">
                <q-color v-model="config.series.gauge.detail.color" />
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
        <q-select
          v-if="config.series.gauge.detail.show"
          dense
          filled
          options-dense
          v-model="config.series.gauge.detail.fontWeight"
          prefix="字体粗细："
          class="q-my-sm"
          :options="fontWeightOptions"
          emit-value
          map-options
        />
        <q-select
          v-if="config.series.gauge.detail.show"
          dense
          filled
          options-dense
          v-model="config.series.gauge.detail.fontStyle"
          prefix="字体风格："
          class="q-my-sm"
          :options="fontStyleOptions"
          emit-value
          map-options
        />
        <q-input
          v-if="config.series.gauge.detail.show"
          dense
          filled
          type="number"
          v-model="config.series.gauge.detail.fontSize"
          prefix="字体大小："
          class="q-my-sm"
          input-class="text-left"
        />
        <q-toggle label="显示仪表盘轴线：" v-model="config.series.gauge.axisLine.show" />
        <q-input
          v-if="config.series.gauge.axisLine.show"
          dense
          filled
          type="number"
          v-model="config.series.gauge.axisLine.lineStyle.width"
          prefix="轴线宽度："
          class="q-my-sm"
          input-class="text-left"
        />
        <q-input
          v-if="config.series.gauge.axisLine.show"
          dense
          filled
          v-model="config.series.gauge.axisLine.lineStyle.color"
          prefix="轴线颜色："
          class="q-my-sm"
          input-class="text-left"
        />

        <q-toggle label="显示刻度标签：" v-model="config.series.gauge.axisLabel.show" />
        <q-toggle label="显示刻度：" v-model="config.series.gauge.axisTick.show" />
        <q-input
          v-if="config.series.gauge.axisLabel.show"
          dense
          filled
          type="number"
          v-model="config.series.gauge.axisTick.length"
          prefix="刻度长度："
          class="q-my-sm"
          input-class="text-left"
        />
        <q-toggle label="显示分割线：" v-model="config.series.gauge.splitLine.show" />
        <q-input
          v-if="config.series.gauge.splitLine.show"
          dense
          filled
          type="number"
          v-model="config.series.gauge.splitLine.length"
          prefix="分割线长度："
          class="q-my-sm"
          input-class="text-left"
        />
        <q-toggle label="显示指针：" v-model="config.series.gauge.pointer.show" />
        <q-field v-if="config.series.gauge.pointer.show" dense borderless prefix="指针长度：">
          <template v-slot:control>
            <q-slider v-model="config.series.gauge.pointer.length" :min="0" :max="100" label />
          </template>
        </q-field>
        <q-input
          v-if="config.series.gauge.pointer.show"
          dense
          filled
          type="number"
          v-model="config.series.gauge.pointer.width"
          prefix="指针宽度："
          class="q-my-sm"
          input-class="text-left"
        />
        <q-input
          v-if="config.series.gauge.pointer.show"
          dense
          filled
          prefix="指针颜色："
          class="q-my-sm"
          input-class="text-left"
          v-model="config.series.gauge.itemStyle.color"
        >
          <template v-slot:append>
            <q-icon
              name="colorize"
              class="cursor-pointer"
              :style="{color:config.series.gauge.itemStyle.color}"
            >
              <q-popup-proxy transition-show="scale" transition-hide="scale">
                <q-color v-model="config.series.gauge.itemStyle.color" />
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
        <q-field v-if="config.series.gauge.pointer.show" dense borderless prefix="指针透明度：">
          <template v-slot:control>
            <q-slider v-model="config.series.gauge.itemStyle.opacity" :min="0" :max="100" />
          </template>
        </q-field>
      </q-card-section>
    </q-card>
  </q-expansion-item>
</template>

<script>
import { fontStyleOptions, fontWeightOptions } from 'boot/datatype';

export default {
  name: 'configguage',
  props: {
    config: {
      type: Object,
      required: false,
    },
  },
  data() {
    return {
      fontWeightOptions, fontStyleOptions,
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
