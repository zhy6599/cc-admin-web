<template>
  <q-list>
    <configbar :config="config" v-if="config.type === 'bar'" />
    <configline :config="config" v-if="config.type === 'line'" />
    <configscatter :config="config" v-if="config.type === 'scatter'" />
    <configpie :config="config" v-if="config.type === 'pie'" />
    <configgauge :config="config" v-if="config.type === 'gauge'" />
    <configmaps :config="config" v-if="config.type === 'maps'" />
    <configdonut :config="config" v-if="config.type === 'donut'" />
    <q-expansion-item dense dense-toggle expand-separator label="标题设置">
      <q-card>
        <q-card-section>
          <q-toggle label="显示标题" v-model="config.title.show" />
          <q-input
            dense
            filled
            v-model="config.title.text"
            prefix="标题："
            class="q-my-sm"
            input-class="text-left"
          />
          <q-input
            dense
            filled
            prefix="字体颜色："
            class="q-my-sm"
            input-class="text-left"
            v-model="config.title.textStyle.color"
          >
            <template v-slot:append>
              <q-icon
                name="colorize"
                class="cursor-pointer"
                :style="{color:config.title.textStyle.color}"
              >
                <q-popup-proxy transition-show="scale" transition-hide="scale">
                  <q-color v-model="config.title.textStyle.color" />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
          <q-select
            dense
            filled
            options-dense
            v-model="config.title.textStyle.fontWeight"
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
            v-model="config.title.textStyle.fontSize"
            prefix="字体大小："
            class="q-my-sm"
            input-class="text-left"
          />
          <q-select
            dense
            filled
            options-dense
            v-model="config.title.left"
            prefix="横向位置："
            class="q-my-sm"
            :options="leftAlignOptions"
            emit-value
            map-options
          />
          <q-select
            dense
            filled
            options-dense
            v-model="config.title.top"
            prefix="纵向位置："
            class="q-my-sm"
            :options="topAlignOptions"
            emit-value
            map-options
          />
          <q-input
            dense
            filled
            v-model="config.title.subtext"
            prefix="副标题："
            class="q-my-sm"
            input-class="text-left"
          />
          <q-input
            dense
            filled
            prefix="字体颜色："
            class="q-my-sm"
            input-class="text-left"
            v-model="config.title.subtextStyle.color"
          >
            <template v-slot:append>
              <q-icon
                name="colorize"
                class="cursor-pointer"
                :style="{color:config.title.subtextStyle.color}"
              >
                <q-popup-proxy transition-show="scale" transition-hide="scale">
                  <q-color v-model="config.title.subtextStyle.color" />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
          <q-select
            dense
            filled
            options-dense
            v-model="config.title.subtextStyle.fontWeight"
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
            v-model="config.title.subtextStyle.fontSize"
            prefix="字体大小："
            class="q-my-sm"
            input-class="text-left"
          />
        </q-card-section>
      </q-card>
    </q-expansion-item>

    <q-expansion-item
      v-if="config.type !== 'maps'"
      dense
      dense-toggle
      expand-separator
      label="X轴设置"
    >
      <q-card>
        <q-card-section>
          <q-toggle label="显示X轴" v-model="config.xAxis.show" />
          <q-input
            dense
            filled
            v-model="config.xAxis.name"
            prefix="X轴名称："
            class="q-my-sm"
            input-class="text-left"
          />
          <q-input
            dense
            filled
            type="number"
            v-model="config.xAxis.nameRotate"
            prefix="旋转角度："
            class="q-my-sm"
            input-class="text-left"
          />
          <q-select
            dense
            filled
            options-dense
            v-model="config.xAxis.position"
            prefix="X轴位置："
            class="q-my-sm"
            :options="topBottomOptions"
            emit-value
            map-options
          />
          <q-input
            dense
            filled
            prefix="字体颜色："
            class="q-my-sm"
            input-class="text-left"
            v-model="config.xAxis.nameTextStyle.color"
          >
            <template v-slot:append>
              <q-icon
                name="colorize"
                class="cursor-pointer"
                :style="{color:config.xAxis.nameTextStyle.color}"
              >
                <q-popup-proxy transition-show="scale" transition-hide="scale">
                  <q-color v-model="config.xAxis.nameTextStyle.color" />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
          <q-select
            dense
            filled
            options-dense
            v-model="config.xAxis.nameTextStyle.fontWeight"
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
            v-model="config.xAxis.nameTextStyle.fontStyle"
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
            v-model="config.xAxis.nameTextStyle.fontSize"
            prefix="字体大小："
            class="q-my-sm"
            input-class="text-left"
          />

          <q-toggle label="显示刻度" v-model="config.xAxis.axisLabel.show" />
          <q-input
            dense
            filled
            type="number"
            v-model="config.xAxis.axisLabel.rotate"
            prefix="旋转角度："
            class="q-my-sm"
            input-class="text-left"
          />
          <q-input
            dense
            filled
            prefix="字体颜色："
            class="q-my-sm"
            input-class="text-left"
            v-model="config.xAxis.axisLabel.color"
          >
            <template v-slot:append>
              <q-icon
                name="colorize"
                class="cursor-pointer"
                :style="{color:config.xAxis.axisLabel.color}"
              >
                <q-popup-proxy transition-show="scale" transition-hide="scale">
                  <q-color v-model="config.xAxis.axisLabel.color" />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
          <q-select
            dense
            filled
            options-dense
            v-model="config.xAxis.axisLabel.fontWeight"
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
            v-model="config.xAxis.axisLabel.fontStyle"
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
            v-model="config.xAxis.axisLabel.fontSize"
            prefix="字体大小："
            class="q-my-sm"
            input-class="text-left"
          />
        </q-card-section>
      </q-card>
    </q-expansion-item>

    <q-expansion-item
      v-if="config.type !== 'maps'"
      dense
      dense-toggle
      expand-separator
      label="Y轴设置"
    >
      <q-card>
        <q-card-section>
          <q-toggle label="显示左轴" v-model="config.yAxis.master.show" />
          <q-input
            dense
            filled
            v-model="config.yAxis.master.name"
            prefix="左轴名称："
            class="q-my-sm"
            input-class="text-left"
          />
          <q-input
            dense
            filled
            v-model="config.yAxis.master.unit"
            prefix="左轴单位："
            class="q-my-sm"
            input-class="text-left"
          />
          <q-toggle label="显示分隔线" v-model="config.yAxis.master.splitLine.show" />
          <q-input
            dense
            filled
            type="number"
            v-model="config.yAxis.master.axisLabel.rotate"
            prefix="旋转角度："
            class="q-my-sm"
            input-class="text-left"
          />
          <q-input
            dense
            filled
            prefix="字体颜色："
            class="q-my-sm"
            input-class="text-left"
            v-model="config.yAxis.master.axisLabel.color"
          >
            <template v-slot:append>
              <q-icon
                name="colorize"
                class="cursor-pointer"
                :style="{color:config.yAxis.master.axisLabel.color}"
              >
                <q-popup-proxy transition-show="scale" transition-hide="scale">
                  <q-color v-model="config.yAxis.master.axisLabel.color" />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
          <q-select
            dense
            filled
            options-dense
            v-model="config.yAxis.master.axisLabel.fontWeight"
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
            v-model="config.yAxis.master.axisLabel.fontStyle"
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
            v-model="config.yAxis.master.axisLabel.fontSize"
            prefix="字体大小："
            class="q-my-sm"
            input-class="text-left"
          />
          <q-toggle label="显示右轴" v-model="config.yAxis.slave.show" />
          <q-toggle label="右轴折线图" v-model="config.yAxis.slave.asLine" />
          <q-toggle label="面积显示：" v-model="config.series.line.showArea" />
          <q-toggle label="显示圆点：" v-model="config.series.line.showSymbol" />
          <q-toggle label="平滑曲线：" v-model="config.series.line.smooth" />
          <q-input
            dense
            filled
            v-model="config.yAxis.slave.name"
            prefix="右轴名称："
            class="q-my-sm"
            input-class="text-left"
          />
          <q-input
            dense
            filled
            v-model="config.yAxis.slave.unit"
            prefix="右轴单位："
            class="q-my-sm"
            input-class="text-left"
          />
          <q-toggle label="显示分隔线" v-model="config.yAxis.slave.splitLine.show" />
          <q-input
            dense
            filled
            type="number"
            v-model="config.yAxis.slave.axisLabel.rotate"
            prefix="旋转角度："
            class="q-my-sm"
            input-class="text-left"
          />
          <q-input
            dense
            filled
            prefix="字体颜色："
            class="q-my-sm"
            input-class="text-left"
            v-model="config.yAxis.slave.axisLabel.color"
          >
            <template v-slot:append>
              <q-icon
                name="colorize"
                class="cursor-pointer"
                :style="{color:config.yAxis.slave.axisLabel.color}"
              >
                <q-popup-proxy transition-show="scale" transition-hide="scale">
                  <q-color v-model="config.yAxis.slave.axisLabel.color" />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
          <q-select
            dense
            filled
            options-dense
            v-model="config.yAxis.slave.axisLabel.fontWeight"
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
            v-model="config.yAxis.slave.axisLabel.fontStyle"
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
            v-model="config.yAxis.slave.axisLabel.fontSize"
            prefix="字体大小："
            class="q-my-sm"
            input-class="text-left"
          />
        </q-card-section>
      </q-card>
    </q-expansion-item>
    <q-expansion-item
      v-if="config.type !== 'maps'"
      dense
      dense-toggle
      expand-separator
      label="图例设置"
    >
      <q-card>
        <q-card-section>
          <q-toggle label="显示图例" v-model="config.legend.show" />
          <q-select
            dense
            filled
            options-dense
            v-model="config.legend.left"
            prefix="横向位置："
            class="q-my-sm"
            :options="leftAlignOptions"
            emit-value
            map-options
          />
          <q-select
            dense
            filled
            options-dense
            v-model="config.legend.top"
            prefix="纵向位置："
            class="q-my-sm"
            :options="topAlignOptions"
            emit-value
            map-options
          />
          <q-select
            dense
            filled
            options-dense
            v-model="config.legend.orient"
            prefix="布局朝向："
            class="q-my-sm"
            :options="orientOptions"
            emit-value
            map-options
          />
          <q-input
            dense
            filled
            prefix="字体颜色："
            class="q-my-sm"
            input-class="text-left"
            v-model="config.legend.textStyle.color"
          >
            <template v-slot:append>
              <q-icon
                name="colorize"
                class="cursor-pointer"
                :style="{color:config.legend.textStyle.color}"
              >
                <q-popup-proxy transition-show="scale" transition-hide="scale">
                  <q-color v-model="config.legend.textStyle.color" />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
          <q-select
            dense
            filled
            options-dense
            v-model="config.legend.textStyle.fontWeight"
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
            v-model="config.legend.textStyle.fontStyle"
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
            v-model="config.legend.textStyle.fontSize"
            prefix="字体大小："
            class="q-my-sm"
            input-class="text-left"
          />
        </q-card-section>
      </q-card>
    </q-expansion-item>
    <q-expansion-item
      v-if="config.type === 'pie'||config.type === 'radar'"
      dense
      dense-toggle
      expand-separator
      label="中心点位置"
    >
      <q-card>
        <q-card-section>
          <q-field
            dense
            borderless
            prefix="X："
            :suffix="config.series.center.x+'%'"
            class="q-my-sm"
          >
            <template v-slot:control>
              <q-slider v-model="config.series.center.x" :min="0" :max="100" />
            </template>
          </q-field>
          <q-field
            dense
            borderless
            prefix="Y："
            :suffix="config.series.center.y+'%'"
            class="q-my-sm"
          >
            <template v-slot:control>
              <q-slider v-model="config.series.center.y" :min="0" :max="100" />
            </template>
          </q-field>
        </q-card-section>
      </q-card>
    </q-expansion-item>
    <q-expansion-item v-if="config.type !== 'pie'" dense dense-toggle expand-separator label="绘图网格">
      <q-card>
        <q-card-section>
          <q-field dense borderless prefix="顶部：" :suffix="config.grid.top+'%'" class="q-my-sm">
            <template v-slot:control>
              <q-slider v-model="config.grid.top" :min="0" :max="50" />
            </template>
          </q-field>
          <q-field dense borderless prefix="左侧：" :suffix="config.grid.left+'%'" class="q-my-sm">
            <template v-slot:control>
              <q-slider v-model="config.grid.left" :min="0" :max="50" />
            </template>
          </q-field>
          <q-field dense borderless prefix="右侧：" :suffix="config.grid.right+'%'" class="q-my-sm">
            <template v-slot:control>
              <q-slider v-model="config.grid.right" :min="0" :max="50" />
            </template>
          </q-field>
          <q-field dense borderless prefix="底部：" :suffix="config.grid.bottom+'%'" class="q-my-sm">
            <template v-slot:control>
              <q-slider v-model="config.grid.bottom" :min="0" :max="50" />
            </template>
          </q-field>
        </q-card-section>
      </q-card>
    </q-expansion-item>
    <q-expansion-item
      v-if="config.type !== 'maps'"
      dense
      dense-toggle
      expand-separator
      label="颜色设置"
    >
      <q-card>
        <q-card-section>
          <q-select
            dense
            filled
            options-dense
            v-model="config.theme"
            prefix="配色方案："
            class="q-my-sm"
            :options="themeOptions"
            @input="changeTheme"
            emit-value
            map-options
          />
          <q-field
            dense
            filled
            :prefix="rw.field.alias?rw.field.alias:rw.name+'：'"
            class="q-my-sm"
            input-class="text-left"
            v-for="(rw,idx) in config.rows"
            :key="rw.id"
          >
            <template v-slot:append>
              <q-icon name="colorize" class="cursor-pointer" :style="{color:config.colors[idx]}">
                <q-popup-proxy transition-show="scale" transition-hide="scale">
                  <q-color
                    :default-value="config.colors[idx]"
                    @change="(value)=>{$set(config.colors,idx,value)}"
                  />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-field>
        </q-card-section>
      </q-card>
    </q-expansion-item>
    <q-expansion-item dense dense-toggle expand-separator label="提示设置">
      <q-card>
        <q-card-section>
          <q-toggle label="显示提示" v-model="config.tooltip.show" />
          <q-input
            dense
            filled
            v-model="config.tooltip.formatter"
            prefix="提示模板："
            class="q-my-sm"
            input-class="text-left"
          />
        </q-card-section>
      </q-card>
    </q-expansion-item>
  </q-list>
</template>

<script>
import {
  leftRightType, themeOptions, themeMap,
  leftAlignOptions, topAlignOptions, orientOptions, fontWeightOptions, fontStyleOptions,
  topBottomOptions,
} from 'boot/datatype';
import configbar from './config/bar';
import configline from './config/line';
import configscatter from './config/scatter';
import configpie from './config/pie';
import configdonut from './config/donut';
import configgauge from './config/gauge';
import configmaps from './config/maps';

export default {
  components: {
    configbar,
    configscatter,
    configline,
    configpie,
    configgauge,
    configmaps,
    configdonut,
  },
  props: {
    config: {
      type: Object,
      required: false,
    },
  },
  data() {
    return {
      themeMap,
      leftRightType,
      themeOptions,
      leftAlignOptions,
      topAlignOptions,
      orientOptions,
      fontWeightOptions,
      fontStyleOptions,
      topBottomOptions,
    };
  },
  created() {

  },
  mounted() {

  },
  methods: {
    changeTheme(value) {
      this.config.colors = this.themeMap[value];
    },
  },
};
</script>

<style scoped lang="stylus"></style>