<template>
  <q-expansion-item dense dense-toggle expand-separator label="图形设置">
    <q-card>
      <q-card-section>
        <q-toggle label="水平显示：" v-model="config.series.horizontal" />
        <q-toggle label="堆叠显示：" v-model="config.series.bar.stack" />
        <q-input
          dense
          filled
          type="number"
          v-model="config.series.bar.barWidth"
          prefix="柱条宽度："

          input-class="text-left"
        />
        <q-field dense borderless prefix="柱角半径：">
          <template v-slot:control>
            <q-slider v-model="config.series.bar.itemStyle.barBorderRadius" :min="0" :max="45" />
          </template>
        </q-field>
        <q-field dense borderless prefix="柱条透明度：">
          <template v-slot:control>
            <q-slider v-model="config.series.bar.itemStyle.opacity" :min="0" :max="100" />
          </template>
        </q-field>
        <q-toggle label="数值显示：" v-model="config.series.bar.itemStyle.show" />
        <q-select
          dense
          filled
          options-dense
          v-model="config.series.bar.itemStyle.position"
          prefix="数值位置："
          class="q-my-sm"
          :options="barItemStylePositions"
          emit-value
          map-options
        />
        <q-input
          dense
          filled
          prefix="数值颜色："
          class="q-my-sm"
          input-class="text-left"
          v-model="config.series.bar.itemStyle.color"
        >
          <template v-slot:append>
            <q-icon name="colorize" class="cursor-pointer"
              :style="{color:config.series.bar.itemStyle.color}">
              <q-popup-proxy transition-show="scale" transition-hide="scale">
                <q-color v-model="config.series.bar.itemStyle.color" />
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </q-card-section>
    </q-card>
  </q-expansion-item>
</template>

<script>
export default {
  name: 'configbar',
  components: {},
  props: {
    config: {
      type: Object,
      required: false,
    },
  },
  data() {
    return {
      barItemStylePositions: [
        { label: '自动', value: 'auto' },
        { label: '顶部', value: 'top' },
        { label: '置底', value: 'bottom' },
        { label: '内部', value: 'inside' },
        { label: '左侧', value: 'left' },
        { label: '右侧', value: 'right' },
        { label: '内左', value: 'insideLeft' },
        { label: '内右', value: 'insideRight' },
        { label: '内顶', value: 'insideTop' },
        { label: '内底', value: 'insideBottom' },
        { label: '内顶左', value: 'insideTopLeft' },
        { label: '内底左', value: 'insideBottomLeft' },
        { label: '内顶右', value: 'insideTopRight' },
        { label: '内底右', value: 'insideBottomRight' },
      ],
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
