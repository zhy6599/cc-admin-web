<template>
  <q-expansion-item dense dense-toggle expand-separator label="图形设置">
    <q-card>
      <q-card-section>
        <q-select
          dense
          filled
          options-dense
          v-model="config.series.maps.id"
          prefix="地图设置："
          class="q-my-sm"
          :options="biMap"
          emit-value
          map-options
        />
        <q-field dense borderless prefix="缩放比例：">
          <template v-slot:control>
            <q-slider v-model="config.series.maps.zoom" :min="1" :max="50" />
          </template>
        </q-field>
        <q-toggle label="标签显示：" v-model="config.series.maps.label.show" />
        <q-input
          dense
          filled
          prefix="标签颜色："
          class="q-my-sm"
          input-class="text-left"
          v-model="config.series.maps.label.color"
        >
          <template v-slot:append>
            <q-icon name="colorize" class="cursor-pointer"
              :style="{color:config.series.maps.label.color}">
              <q-popup-proxy transition-show="scale" transition-hide="scale">
                <q-color v-model="config.series.maps.label.color" />
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
        <q-input
          dense
          filled
          prefix="地图区域边框颜色："
          class="q-my-sm"
          input-class="text-left"
          v-model="config.series.maps.itemStyle.borderColor"
        >
          <template v-slot:append>
            <q-icon name="colorize" class="cursor-pointer"
              :style="{color:config.series.maps.itemStyle.borderColor}">
              <q-popup-proxy transition-show="scale" transition-hide="scale">
                <q-color v-model="config.series.maps.itemStyle.borderColor" />
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
        <q-input
          dense
          filled
          type="number"
          v-model="config.series.maps.itemStyle.borderWidth"
          prefix="地图区域边框宽度："

          input-class="text-left"
        />
        <q-select
          dense
          filled
          options-dense
          v-model="config.series.maps.itemStyle.borderType"
          prefix="边框类型："
          class="q-my-sm"
          :options="borderTypeOptions"
          emit-value
          map-options
        />
        <q-field dense borderless prefix="地图区域透明度：">
          <template v-slot:control>
            <q-slider v-model="config.series.maps.itemStyle.opacity" :min="0" :max="100" />
          </template>
        </q-field>
      </q-card-section>
    </q-card>
  </q-expansion-item>
</template>

<script>
import { borderTypeOptions } from 'boot/datatype';

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
      borderTypeOptions,
      biMap: [
      ],
    };
  },
  watch: {},
  computed: {},
  methods: {
    initDict() {
      this.$axios.get('/sys/dictItem/selectItemsByDefId?defId=biMap').then((r) => {
        this.biMap = r;
      });
    },
  },
  created() { },
  mounted() {
    this.initDict();
  },
};
</script>
<style lang="stylus"></style>
