<template>
  <q-expansion-item dense dense-toggle expand-separator label="图形设置">
    <q-card>
      <q-card-section>
        <q-input
          dense
          filled
          type="number"
          v-model="config.series.donut.total"
          prefix="满环值："
          class="q-my-sm"
          input-class="text-left"
        />
        <q-input
          dense
          filled
          type="number"
          v-model="config.series.donut.width"
          prefix="圆环宽度："
          class="q-my-sm"
          input-class="text-left"
        />
        <q-input
          dense
          filled
          prefix="缺口颜色："
          class="q-my-sm"
          input-class="text-left"
          v-model="config.series.donut.noDataColor"
        >
          <template v-slot:append>
            <q-icon
              name="colorize"
              class="cursor-pointer"
              :style="{color:config.series.donut.noDataColor}"
            >
              <q-popup-proxy transition-show="scale" transition-hide="scale">
                <q-color v-model="config.series.donut.noDataColor" />
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
        <q-toggle label="显示标签：" v-model="config.series.donut.lable.show" />
        <q-input
          dense
          filled
          v-model="config.series.donut.lable.template"
          prefix="标签模板："
          class="q-my-sm"
          input-class="text-left"
        />
        <q-input
          dense
          filled
          prefix="标签颜色："
          class="q-my-sm"
          input-class="text-left"
          v-model="config.series.donut.lable.color"
        >
          <template v-slot:append>
            <q-icon
              name="colorize"
              class="cursor-pointer"
              :style="{color:config.series.donut.lable.color}"
            >
              <q-popup-proxy transition-show="scale" transition-hide="scale">
                <q-color v-model="config.series.donut.lable.color" />
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
        <q-select
          dense
          filled
          options-dense
          v-model="config.series.donut.lable.fontWeight"
          prefix="标签字体粗细："
          class="q-my-sm"
          :options="fontWeightOptions"
          emit-value
          map-options
        />
        <q-input
          dense
          filled
          type="number"
          v-model="config.series.donut.lable.fontSize"
          prefix="标签字体大小："
          class="q-my-sm"
          input-class="text-left"
        />
      </q-card-section>
    </q-card>
  </q-expansion-item>
</template>

<script>
import { fontWeightOptions } from 'boot/datatype';

export default {
  name: 'configdonut',
  props: {
    config: {
      type: Object,
      required: false,
    },
  },
  data() {
    return {
      fontWeightOptions,
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
