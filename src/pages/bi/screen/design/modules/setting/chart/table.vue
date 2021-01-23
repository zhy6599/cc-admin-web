<template>
  <div>
    <q-toggle label="水平显示" v-model="config.table.horizontal" />
    <q-toggle label="开启跑马灯" v-model="config.table.loop" />
    <q-toggle label="轮流反向" v-model="config.table.alternate" />
    <q-input
      dense
      filled
      type="number"
      v-model="config.table.scrolldelay"
      prefix="滚动时间间隔："
      class="q-my-sm"
      input-class="text-left"
    />
    <q-select
      dense
      filled
      options-dense
      v-model="config.table.direction"
      prefix="滚动方向："
      class="q-my-sm"
      :options="directionOptions"
      emit-value
      map-options
    />
    <q-expansion-item
      dense
      dense-toggle
      expand-separator
      label="表头设置"
    >
      <q-card>
        <q-card-section>
          <q-toggle label="显示表头" v-model="config.table.tableHead.show" />
          <q-input
            dense
            filled
            prefix="字体颜色："
            class="q-my-sm"
            input-class="text-left"
            v-model="config.table.tableHead.color"
          >
            <template v-slot:append>
              <q-icon
                name="colorize"
                class="cursor-pointer"
                :style="{color:config.table.tableHead.color}"
              >
                <q-popup-proxy transition-show="scale" transition-hide="scale">
                  <q-color v-model="config.table.tableHead.color" />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
          <q-input
            dense
            filled
            prefix="背景颜色："
            class="q-my-sm"
            input-class="text-left"
            v-model="config.table.tableHead.backgroundColor"
          >
            <template v-slot:append>
              <q-icon
                name="colorize"
                class="cursor-pointer"
                :style="{color:config.table.tableHead.backgroundColor}"
              >
                <q-popup-proxy transition-show="scale" transition-hide="scale">
                  <q-color v-model="config.table.tableHead.backgroundColor" />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
          <q-select
            dense
            filled
            options-dense
            v-model="config.table.tableHead.fontWeight"
            prefix="字体粗细："
            class="q-my-sm"
            :options="fontWeightOptions"
            emit-value
            map-options
          />
          <q-input
            dense
            filled
            type="number"
            v-model="config.table.tableHead.fontSize"
            prefix="字体大小："
            class="q-my-sm"
            input-class="text-left"
          />
          <q-select
            dense
            filled
            options-dense
            v-model="config.table.tableHead.textAlign"
            prefix="对齐方式："
            class="q-my-sm"
            :options="leftAlignOptions"
            emit-value
            map-options
          />
          <q-input
            dense
            filled
            type="number"
            v-model="config.table.tableHead.borderWidth"
            prefix="边框宽度："
            class="q-my-sm"
            input-class="text-left"
          />
          <q-select
            dense
            filled
            options-dense
            v-model="config.table.tableHead.borderStyle"
            prefix="边框样式："
            class="q-my-sm"
            :options="borderTypeOptions"
            clearable
            emit-value
            map-options
          />
          <q-input
            dense
            filled
            prefix="边框颜色："
            class="q-my-sm"
            input-class="text-left"
            v-model="config.table.tableHead.borderColor"
          >
            <template v-slot:append>
              <q-icon
                name="colorize"
                class="cursor-pointer"
                :style="{color:config.table.tableHead.borderColor}"
              >
                <q-popup-proxy transition-show="scale" transition-hide="scale">
                  <q-color v-model="config.table.tableHead.borderColor" />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
          <q-field dense borderless prefix="透明度：">
            <template v-slot:control>
              <q-slider v-model="config.table.tableHead.opacity" :min="0" :max="100" />
            </template>
          </q-field>
        </q-card-section>
      </q-card>
    </q-expansion-item>

    <q-expansion-item
      dense
      dense-toggle
      expand-separator
      label="表体设置"
    >
      <q-card>
        <q-card-section>
          <q-input
            dense
            filled
            prefix="字体颜色："
            class="q-my-sm"
            input-class="text-left"
            v-model="config.table.tableBody.color"
          >
            <template v-slot:append>
              <q-icon
                name="colorize"
                class="cursor-pointer"
                :style="{color:config.table.tableBody.color}"
              >
                <q-popup-proxy transition-show="scale" transition-hide="scale">
                  <q-color v-model="config.table.tableBody.color" />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
          <q-input
            dense
            filled
            prefix="背景颜色："
            class="q-my-sm"
            input-class="text-left"
            v-model="config.table.tableBody.backgroundColor"
          >
            <template v-slot:append>
              <q-icon
                name="colorize"
                class="cursor-pointer"
                :style="{color:config.table.tableBody.backgroundColor}"
              >
                <q-popup-proxy transition-show="scale" transition-hide="scale">
                  <q-color v-model="config.table.tableBody.backgroundColor" />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
          <q-select
            dense
            filled
            options-dense
            v-model="config.table.tableBody.fontWeight"
            prefix="字体粗细："
            class="q-my-sm"
            :options="fontWeightOptions"
            emit-value
            map-options
          />
          <q-input
            dense
            filled
            type="number"
            v-model="config.table.tableBody.fontSize"
            prefix="字体大小："
            class="q-my-sm"
            input-class="text-left"
          />
          <q-select
            dense
            filled
            options-dense
            v-model="config.table.tableBody.textAlign"
            prefix="对齐方式："
            class="q-my-sm"
            :options="leftAlignOptions"
            emit-value
            map-options
          />
          <q-input
            dense
            filled
            type="number"
            v-model="config.table.tableBody.borderWidth"
            prefix="边框宽度："
            class="q-my-sm"
            input-class="text-left"
          />
          <q-select
            dense
            filled
            options-dense
            v-model="config.table.tableBody.borderStyle"
            prefix="边框样式："
            class="q-my-sm"
            :options="borderTypeOptions"
            clearable
            emit-value
            map-options
          />
          <q-input
            dense
            filled
            prefix="边框颜色："
            class="q-my-sm"
            input-class="text-left"
            v-model="config.table.tableBody.borderColor"
          >
            <template v-slot:append>
              <q-icon
                name="colorize"
                class="cursor-pointer"
                :style="{color:config.table.tableBody.borderColor}"
              >
                <q-popup-proxy transition-show="scale" transition-hide="scale">
                  <q-color v-model="config.table.tableBody.borderColor" />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
          <q-field dense borderless prefix="透明度：">
            <template v-slot:control>
              <q-slider v-model="config.table.tableBody.opacity" :min="0" :max="100" />
            </template>
          </q-field>
        </q-card-section>
      </q-card>
    </q-expansion-item>
  </div>
</template>

<script>
import { borderTypeOptions, leftAlignOptions, fontWeightOptions } from 'boot/datatype';

export default {
  components: {
  },
  props: {
    config: {
      type: Object,
      required: false,
    },
  },
  data() {
    return {
      fontWeightOptions,
      leftAlignOptions,
      borderTypeOptions,
      directionOptions: [
        { label: '左', value: 'left' },
        { label: '右', value: 'right' },
        { label: '上', value: 'up' },
        { label: '下', value: 'down' },
      ],
    };
  },
  created() {

  },
  mounted() {

  },
  methods: {

  },
};
</script>

<style scoped lang="stylus"></style>
