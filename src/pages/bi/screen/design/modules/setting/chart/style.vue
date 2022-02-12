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
            type="text"
            v-model="config.title.paddingTxt"
            prefix="内边距："
            class="q-my-sm"
            input-class="text-left"
            @input="setTitlePadding"
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
          <q-toggle label="显示轴线" v-model="config.xAxis.axisLine.show" />
          <q-input
            dense
            filled
            type="number"
            v-model="config.xAxis.axisLine.lineStyle.width"
            prefix="轴线线宽："
            class="q-my-sm"
            input-class="text-left"
          />
          <q-input
            dense
            filled
            prefix="轴线颜色："
            class="q-my-sm"
            input-class="text-left"
            v-model="config.xAxis.axisLine.lineStyle.color"
          >
            <template v-slot:append>
              <q-icon
                name="colorize"
                class="cursor-pointer"
                :style="{color:config.xAxis.axisLine.lineStyle.color}"
              >
                <q-popup-proxy transition-show="scale" transition-hide="scale">
                  <q-color v-model="config.xAxis.axisLine.lineStyle.color" />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
          <q-select
            dense
            filled
            options-dense
            v-model="config.xAxis.axisLine.lineStyle.type"
            prefix="轴线类型："
            class="q-my-sm"
            :options="borderTypeOptions"
            emit-value
            map-options
          />
          <q-toggle label="显示刻度：" v-model="config.xAxis.axisTick.show" />
          <q-input
            dense
            filled
            type="number"
            v-model="config.xAxis.axisTick.length"
            prefix="刻度长度："
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
      label="Y左轴设置"
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
          <q-input
            dense
            filled
            type="number"
            v-model="config.yAxis.master.nameRotate"
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
            v-model="config.yAxis.master.nameTextStyle.color"
          >
            <template v-slot:append>
              <q-icon
                name="colorize"
                class="cursor-pointer"
                :style="{color:config.yAxis.master.nameTextStyle.color}"
              >
                <q-popup-proxy transition-show="scale" transition-hide="scale">
                  <q-color v-model="config.yAxis.master.nameTextStyle.color" />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
          <q-select
            dense
            filled
            options-dense
            v-model="config.yAxis.master.nameTextStyle.fontWeight"
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
            v-model="config.yAxis.master.nameTextStyle.fontStyle"
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
            v-model="config.yAxis.master.nameTextStyle.fontSize"
            prefix="字体大小："
            class="q-my-sm"
            input-class="text-left"
          />
          <q-toggle label="显示轴线" v-model="config.yAxis.master.axisLine.show" />
          <q-input
            dense
            filled
            type="number"
            v-model="config.yAxis.master.axisLine.lineStyle.width"
            prefix="轴线线宽："
            class="q-my-sm"
            input-class="text-left"
          />
          <q-input
            dense
            filled
            prefix="轴线颜色："
            class="q-my-sm"
            input-class="text-left"
            v-model="config.yAxis.master.axisLine.lineStyle.color"
          >
            <template v-slot:append>
              <q-icon
                name="colorize"
                class="cursor-pointer"
                :style="{color:config.yAxis.master.axisLine.lineStyle.color}"
              >
                <q-popup-proxy transition-show="scale" transition-hide="scale">
                  <q-color v-model="config.yAxis.master.axisLine.lineStyle.color" />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
          <q-select
            dense
            filled
            options-dense
            v-model="config.yAxis.master.axisLine.lineStyle.type"
            prefix="轴线类型："
            class="q-my-sm"
            :options="borderTypeOptions"
            emit-value
            map-options
          />
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
          <q-toggle label="显示分隔线" v-model="config.yAxis.master.splitLine.show" />
          <q-input
            dense
            filled
            type="number"
            v-model="config.yAxis.master.splitLine.lineStyle.width"
            prefix="分隔线宽："
            class="q-my-sm"
            input-class="text-left"
          />
          <q-input
            dense
            filled
            prefix="分隔线颜色："
            class="q-my-sm"
            input-class="text-left"
            v-model="config.yAxis.master.splitLine.lineStyle.color"
          >
            <template v-slot:append>
              <q-icon
                name="colorize"
                class="cursor-pointer"
                :style="{color:config.yAxis.master.splitLine.lineStyle.color}"
              >
                <q-popup-proxy transition-show="scale" transition-hide="scale">
                  <q-color v-model="config.yAxis.master.splitLine.lineStyle.color" />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
          <q-select
            dense
            filled
            options-dense
            v-model="config.yAxis.master.splitLine.lineStyle.type"
            prefix="分隔线类型："
            class="q-my-sm"
            :options="borderTypeOptions"
            emit-value
            map-options
          />
          <q-toggle label="显示刻度：" v-model="config.yAxis.master.axisTick.show" />
          <q-input
            dense
            filled
            type="number"
            v-model="config.yAxis.master.axisTick.length"
            prefix="刻度长度："
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
      label="Y右轴设置"
    >
      <q-card>
        <q-card-section>
          <q-toggle label="显示右轴" v-model="config.yAxis.slave.show" />
          <q-toggle
            v-if="config.type === 'bar'" label="右轴折线图" v-model="config.yAxis.slave.asLine" />
          <q-toggle
            v-if="config.type === 'bar'" label="面积显示：" v-model="config.series.line.showArea" />
          <q-toggle
            v-if="config.type === 'bar'" label="显示圆点：" v-model="config.series.line.showSymbol" />
          <q-toggle
            v-if="config.type === 'bar'" label="平滑曲线：" v-model="config.series.line.smooth" />
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
          <q-input
            dense
            filled
            type="number"
            v-model="config.yAxis.slave.nameRotate"
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
            v-model="config.yAxis.slave.nameTextStyle.color"
          >
            <template v-slot:append>
              <q-icon
                name="colorize"
                class="cursor-pointer"
                :style="{color:config.yAxis.slave.nameTextStyle.color}"
              >
                <q-popup-proxy transition-show="scale" transition-hide="scale">
                  <q-color v-model="config.yAxis.slave.nameTextStyle.color" />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
          <q-select
            dense
            filled
            options-dense
            v-model="config.yAxis.slave.nameTextStyle.fontWeight"
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
            v-model="config.yAxis.slave.nameTextStyle.fontStyle"
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
            v-model="config.yAxis.slave.nameTextStyle.fontSize"
            prefix="字体大小："
            class="q-my-sm"
            input-class="text-left"
          />
          <q-toggle label="显示轴线" v-model="config.yAxis.slave.axisLine.show" />
          <q-input
            dense
            filled
            type="number"
            v-model="config.yAxis.slave.axisLine.lineStyle.width"
            prefix="轴线线宽："
            class="q-my-sm"
            input-class="text-left"
          />
          <q-input
            dense
            filled
            prefix="轴线颜色："
            class="q-my-sm"
            input-class="text-left"
            v-model="config.yAxis.slave.axisLine.lineStyle.color"
          >
            <template v-slot:append>
              <q-icon
                name="colorize"
                class="cursor-pointer"
                :style="{color:config.yAxis.slave.axisLine.lineStyle.color}"
              >
                <q-popup-proxy transition-show="scale" transition-hide="scale">
                  <q-color v-model="config.yAxis.slave.axisLine.lineStyle.color" />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
          <q-select
            dense
            filled
            options-dense
            v-model="config.yAxis.slave.axisLine.lineStyle.type"
            prefix="轴线类型："
            class="q-my-sm"
            :options="borderTypeOptions"
            emit-value
            map-options
          />
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
          <q-toggle label="显示分隔线" v-model="config.yAxis.slave.splitLine.show" />
          <q-input
            dense
            filled
            type="number"
            v-model="config.yAxis.slave.splitLine.lineStyle.width"
            prefix="分隔线宽："
            class="q-my-sm"
            input-class="text-left"
          />
          <q-input
            dense
            filled
            prefix="分隔线颜色："
            class="q-my-sm"
            input-class="text-left"
            v-model="config.yAxis.slave.splitLine.lineStyle.color"
          >
            <template v-slot:append>
              <q-icon
                name="colorize"
                class="cursor-pointer"
                :style="{color:config.yAxis.slave.splitLine.lineStyle.color}"
              >
                <q-popup-proxy transition-show="scale" transition-hide="scale">
                  <q-color v-model="config.yAxis.slave.splitLine.lineStyle.color" />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
          <q-select
            dense
            filled
            options-dense
            v-model="config.yAxis.slave.splitLine.lineStyle.type"
            prefix="分隔线类型："
            class="q-my-sm"
            :options="borderTypeOptions"
            emit-value
            map-options
          />
          <q-toggle label="显示刻度：" v-model="config.yAxis.slave.axisTick.show" />
          <q-input
            dense
            filled
            type="number"
            v-model="config.yAxis.slave.axisTick.length"
            prefix="刻度长度："
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
    <q-expansion-item dense dense-toggle expand-separator label="绘图网格">
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
    <q-expansion-item dense dense-toggle expand-separator label="自定义设置">
      <q-card>
        <q-card-section>
          <q-input
            dense
            filled
            :debounce="600"
            v-model="config.options"
            input-class="text-left"
            type="textarea"
          />
        </q-card-section>
      </q-card>
    </q-expansion-item>
  </q-list>
</template>

<script>
import {
  leftRightType, themeOptions, themeMap, borderTypeOptions,
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
      borderTypeOptions,
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
    parsePadding(str) {
      try {
        return parseInt(str, 10);
      } catch (e) {
        return 0;
      }
    },
    setTitlePadding() {
      const paddingArray = this.config.title.paddingTxt.split(',');
      if (paddingArray.length === 4) {
        this.config.title.padding = [
          this.parsePadding(paddingArray[0]),
          this.parsePadding(paddingArray[1]),
          this.parsePadding(paddingArray[2]),
          this.parsePadding(paddingArray[3]),
        ];
      }
    },
  },
};
</script>

<style scoped lang="stylus"></style>
