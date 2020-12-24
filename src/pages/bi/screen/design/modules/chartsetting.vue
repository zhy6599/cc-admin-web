<template>
  <div class="col q-ma-xs column">
    <q-card class="col column q-pa-xs no-wrap">
      <div class="text-subtitle1 text-center q-py-sm">图表设置</div>
      <q-separator class="q-mb-sm" />
      <div class="chart-sel-tabs full-width">
        <q-tabs dense v-model="config.type" class="text-grey" active-color="primary">
          <q-tab v-for="t in tabs" :key="t.name" :name="t.name" :icon="t.icon">
            <q-tooltip>{{t.label}}</q-tooltip>
          </q-tab>
        </q-tabs>
      </div>
      <q-tabs
        v-model="chartSettingTab"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="justify"
      >
        <q-tab name="data" label="数据" />
        <q-tab name="style" label="样式" />
      </q-tabs>
      <q-separator />
      <q-tab-panels class="chart-dim-set" v-model="chartSettingTab" animated>
        <q-tab-panel name="data">
          <div class="text-body2 q-pt-sm">维度</div>
          <draggable
            class="dotted w_l_g_cat"
            animation="200"
            v-model="config.cols"
            ghostClass="drag-ing"
            draggable=".drag-item"
            :group="{name:'cols',put:checkDrag('cols','modelCat')}"
            @add="dragAdd($event,'cols')"
            @end="moveEnd($event,'cols')"
          >
            <div
              v-for="v in config.cols"
              :key="v.name"
              :class="checkClass(v)"
              class="rounded-borders row no-wrap justify-between items-center drag-item"
            >
              <q-btn round dense flat :icon="sort(v.sort).icon" @click="changeSort(v)">
                <q-tooltip>排序方式：{{sort(v.sort).label}}</q-tooltip>
              </q-btn>
              <span>
                {{v|cut(20)}}
                <q-popup-edit v-model="v.field.alias" title="设置别名">
                  <q-input dense autofocus v-model="v.field.alias" debounce="999" :label="v.name" />
                </q-popup-edit>
                <q-tooltip>{{v.name}}</q-tooltip>
              </span>
              <q-btn round dense flat icon="close" @click="del(v,'category')">
                <q-tooltip>移除数据</q-tooltip>
              </q-btn>
            </div>
            <div class="drag-no" v-if="!config.cols.length&&config.draging.type!=='modelCat'">
              <q-icon name="mdi-cursor-default-click" size="24px" />拖拽
              <b class="text-tertiary">维度</b>获取数据
            </div>
          </draggable>
          <div class="text-body2 q-pt-sm">指标</div>
          <draggable
            class="dotted w_l_g_val"
            animation="200"
            v-model="config.rows"
            ghostClass="drag-ing"
            draggable=".drag-item"
            :group="{name:'rows',put:checkDrag('rows','modelVal')}"
            @add="dragAdd($event,'rows')"
            @end="moveEnd($event,'rows')"
          >
            <div
              v-for="v in config.rows"
              :key="v.name"
              :class="checkClass(v)"
              class="rounded-borders row no-wrap justify-between items-center drag-item"
            >
              <q-btn round dense flat :icon="leftRight(v.leftRight).icon"
              @click="changeLeftRight(v)">
                <q-tooltip>坐标轴位置：{{leftRight(v.leftRight).label}}</q-tooltip>
              </q-btn>
              <div class="row no-wrap justify-between items-center" style="width:190px">
                <span>
                  {{v|cut(10)}}
                  <q-popup-edit v-model="v.field.alias" title="设置别名">
                    <q-input
                      dense
                      autofocus
                      v-model="v.field.alias"
                      debounce="999"
                      :label="v.name"
                    />
                  </q-popup-edit>
                  <q-tooltip>{{v.name}}</q-tooltip>
                </span>
                <q-select
                  dense
                  emit-value
                  map-options
                  borderless
                  v-model="v.agg"
                  :options="calculateType"
                  dropdown-icon="mdi-calculator-variant"
                >
                  <q-tooltip>计算方式</q-tooltip>
                </q-select>
              </div>
              <q-btn round dense flat icon="close" @click="del(v,'value')">
                <q-tooltip>移除数据</q-tooltip>
              </q-btn>
            </div>
            <div class="drag-no" v-if="!config.rows.length&&config.draging.type!=='modelVal'">
              <q-icon name="mdi-cursor-default-click" size="24px" />拖拽
              <b class="text-tertiary">指标</b>获取数据
            </div>
          </draggable>
          <div class="text-body2 q-pt-sm">排序</div>
          <draggable
            class="dotted w_l_g_cat"
            animation="200"
            v-model="config.orders"
            ghostClass="drag-ing"
            draggable=".drag-item"
            :group="{name:'orders',put:checkDrag('all','modelCat')}"
            @add="dragAdd($event,'orders')"
            @end="moveEnd($event,'orders')"
          >
            <div
              v-for="v in config.orders"
              :key="v.name"
              :class="checkClass(v)"
              class="rounded-borders row no-wrap justify-between items-center drag-item"
            >
              <q-btn round dense flat :icon="sort(v.sort).icon" @click="changeSort(v)">
                <q-tooltip>排序方式：{{sort(v.sort).label}}</q-tooltip>
              </q-btn>
              <div class="row justify-between items-center" style="width:190px">
                <span>
                  {{v|cut(13)}}
                  <q-tooltip>{{v.name}}</q-tooltip>
                </span>
              </div>
              <q-btn round dense flat icon="close" @click="del(v,'orders')">
                <q-tooltip>移除数据</q-tooltip>
              </q-btn>
            </div>
            <div class="drag-no" v-if="!config.orders.length&&!config.draging.type">
              <q-icon name="mdi-cursor-default-click" size="24px" />
              拖拽<b class="text-tertiary"> 字段 </b>排序
            </div>
          </draggable>
          <div class="text-body2 q-pt-sm">配置</div>
          <q-input
            dense
            filled
            v-model="config.length"
            type="number"
            :readonly="!config.slice"
            :debounce="999"
            prefix="数据数量："
            suffix="条"
            class="q-my-sm"
            input-class="text-right"
          >
            <template #append>
              <q-toggle v-model="config.slice" />
            </template>
          </q-input>
          <q-input
            dense
            filled
            v-model="config.interval"
            mask="######"
            :readonly="!config.loop"
            :debounce="999"
            prefix="定时刷新："
            suffix="秒"
            class="q-my-sm"
            input-class="text-right"
          >
            <template #append>
              <q-toggle v-model="config.loop" />
            </template>
          </q-input>
          <q-field v-if="config.loop" stack-label>
            <template v-slot:control>
              <q-toggle v-model="config.showLoop" label="显示定时" />
            </template>
          </q-field>
        </q-tab-panel>

        <q-tab-panel name="style">
          <q-list>
            <configbar :config="config" v-if="config.type === 'bar'"/>
            <q-expansion-item
              dense
              dense-toggle
              expand-separator
              label="标题设置"
            >
              <q-card>
                <q-card-section>
                  <q-toggle
                    label="显示标题"
                    v-model="config.title.show"
                  />
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
                      <q-icon name="colorize" class="cursor-pointer"
                        :style="{color:config.title.textStyle.color}">
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
                      <q-icon name="colorize" class="cursor-pointer"
                        :style="{color:config.title.subtextStyle.color}">
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
              dense
              dense-toggle
              expand-separator
              label="X轴设置"
            >
              <q-card>
                <q-card-section>
                  <q-toggle
                    label="显示X轴"
                    v-model="config.xAxis.show"
                  />
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
                      <q-icon name="colorize" class="cursor-pointer"
                        :style="{color:config.xAxis.nameTextStyle.color}">
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

                  <q-toggle
                    label="显示刻度"
                    v-model="config.xAxis.axisLabel.show"
                  />
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
                      <q-icon name="colorize" class="cursor-pointer"
                        :style="{color:config.xAxis.axisLabel.color}">
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
              dense
              dense-toggle
              expand-separator
              label="Y轴设置"
            >
              <q-card>
                <q-card-section>
                  <q-toggle
                    label="显示左轴"
                    v-model="config.yAxis.master.show"
                  />
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
                  <q-toggle
                    label="显示右轴"
                    v-model="config.yAxis.slave.show"
                  />
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
                </q-card-section>
              </q-card>
            </q-expansion-item>
            <q-expansion-item
              dense
              dense-toggle
              expand-separator
              label="图例设置"
            >
              <q-card>
                <q-card-section>
                  <q-toggle
                    label="显示图例"
                    v-model="config.legend.show"
                  />
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
                      <q-icon name="colorize" class="cursor-pointer"
                        :style="{color:config.legend.textStyle.color}">
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
                      <q-slider v-model="config.series.center.x" :min="0" :max="100"/>
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
                      <q-slider v-model="config.series.center.y" :min="0" :max="100"/>
                    </template>
                  </q-field>
                </q-card-section>
              </q-card>
            </q-expansion-item>
            <q-expansion-item
              v-if="config.type !== 'pie'"
              dense
              dense-toggle
              expand-separator
              label="绘图网格"
            >
              <q-card>
                <q-card-section>
                  <q-field
                    dense
                    borderless
                    prefix="顶部："
                    :suffix="config.grid.top+'%'"
                    class="q-my-sm"
                  >
                    <template v-slot:control>
                      <q-slider v-model="config.grid.top" :min="0" :max="50"/>
                    </template>
                  </q-field>
                  <q-field
                    dense
                    borderless
                    prefix="左侧："
                    :suffix="config.grid.left+'%'"
                    class="q-my-sm"
                  >
                    <template v-slot:control>
                      <q-slider v-model="config.grid.left" :min="0" :max="50"/>
                    </template>
                  </q-field>
                  <q-field
                    dense
                    borderless
                    prefix="右侧："
                    :suffix="config.grid.right+'%'"
                    class="q-my-sm"
                  >
                    <template v-slot:control>
                      <q-slider v-model="config.grid.right" :min="0" :max="50"/>
                    </template>
                  </q-field>
                  <q-field
                    dense
                    borderless
                    prefix="底部："
                    :suffix="config.grid.bottom+'%'"
                    class="q-my-sm"
                  >
                    <template v-slot:control>
                      <q-slider v-model="config.grid.bottom" :min="0" :max="50"/>
                    </template>
                  </q-field>
                </q-card-section>
              </q-card>
            </q-expansion-item>
            <q-expansion-item
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
                      <q-icon name="colorize" class="cursor-pointer"
                        :style="{color:config.colors[idx]}">
                        <q-popup-proxy transition-show="scale" transition-hide="scale">
                          <q-color :default-value="config.colors[idx]"
                          @change="(value)=>{$set(config.colors,idx,value)}" />
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-field>
                </q-card-section>
              </q-card>
            </q-expansion-item>
          </q-list>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </div>
</template>

<script>

import {
  columnToIcon, sortType, leftRightType, calculateType, themeMap, chartTypes, themeOptions,
  leftAlignOptions, topAlignOptions, orientOptions, fontWeightOptions, fontStyleOptions,
  topBottomOptions,
} from 'boot/datatype';
import draggable from 'vuedraggable';
import configbar from './widgets/config/bar';

export default {
  name: 'chartsetting',
  components: {
    draggable,
    configbar,
  },
  data() {
    return {
      chartSettingTab: 'data',
      loading: false,
      themes: [],
      calculateType,
      sortType,
      leftRightType,
      themeMap,
      themeOptions,
      leftAlignOptions,
      topAlignOptions,
      orientOptions,
      fontWeightOptions,
      fontStyleOptions,
      topBottomOptions,
      widget: {
        id: -1,
        config: '',
        description: '',
        name: '',
        publish: true,
        type: 1,
        viewId: null,
      },
      views: [],
      model: [],
      sortables: [],
      tabs: chartTypes,
    };
  },
  props: {
    config: {
      type: Object,
      required: false,
    },
  },
  mounted() {
    this.getViews();
  },
  methods: {
    changeTheme(value) {
      this.config.colors = this.themeMap[value];
    },
    clone() {
      return {
        name: this.uid(),
        field: {
          alias: '',
        },
      };
    },
    changeSort(v) {
      if (v.sort === 'desc') {
        this.$set(v, 'sort', undefined);
      } else {
        this.$set(v, 'sort', 'desc');
      }
    },
    sort(val) {
      return sortType.find((v) => v.value === val);
    },
    leftRight(val) {
      return leftRightType.find((v) => v.value === val);
    },
    changeLeftRight(v) {
      if (v.leftRight === '0') {
        this.$set(v, 'leftRight', '1');
        v.leftRight = '1';
      } else if (v.leftRight === '1') {
        this.$set(v, 'leftRight', undefined);
      } else {
        this.$set(v, 'leftRight', '1');
      }
    },
    getViews() {
      return this.$axios.get('/bi/view/listAll')
        .then(({ result }) => {
          this.views = result.map((v) => ({
            label: v.name,
            value: v.id,
          }));
        });
    },
    confirmGetModel() {
      if ((this.config.cols && this.config.cols.length)
        || (this.config.rows && this.config.rows.length)) {
        this.$q.dialog({
          title: '切换视图',
          message: '切换视图将清空维度和指标列表，确认切换？',
          cancel: true,
          ok: {
            color: 'primary',
          },
        }).onOk(() => {
          Object.assign(this.config, {
            cols: [],
            rows: [],
            viewId: this.widget.viewId,
          });
          this.getModel();
        }).onCancel(() => {
          this.widget.viewId = this.config.viewId;
        });
      } else {
        this.config.viewId = this.widget.viewId;
        this.getModel();
      }
    },
    getWidget() {
      return this.$axios.get(`/bi/chart/queryById?id=${this.$route.query.id}`)
        .then(({ result }) => {
          this.config = JSON.parse(result.config);
          this.widget = result;
        }).catch(() => {
          this.$router.replace('/analysis');
        });
    },
    getModel() {
      this.loading = true;
      return this.$axios.get(`/bi/view/queryById?id=${this.config.viewId}`)
        .then(({ result }) => {
          this.model = Object.entries(JSON.parse(result.model)).map(([name, v]) => ({
            name,
            type: v.modelType,
            visualType: v.visualType,
            icon: columnToIcon(v.visualType),
            check: false,
          }));
        }).finally(() => {
          this.loading = false;
        });
    },
    del(t, type) {
      if (type === 'value') {
        this.config.rows = this.config.rows.filter((v) => v.name !== t.name);
      } else if (type === 'orders') {
        this.config.orders = this.config.orders.filter((v) => v.name !== t.name);
      } else if (type === 'colors') {
        this.config.colors = this.config.colors.filter((v) => v.name !== t.name);
      } else {
        this.config.cols = this.config.cols.filter((v) => v.name !== t.name);
      }
    },
    checkClass({ name, type }) {
      const c = [];
      if (this.config.draging.data.some((d) => d.name === name)) {
        c.push('drag-ing');
      }
      if (type === 'value') {
        c.push('bg-positive');
      }
      if (type === 'category') {
        c.push('bg-light-blue');
      }
      return c;
    },
    uid() {
      return Math.floor((1 + Math.random()) * 0x10000).toString(16)
        + Math.floor((9 + Math.random()) * 0x10000).toString(16);
    },
    checkDrag(a, b) {
      return a === 'all' || (this.config.draging.type === b
        && this.config.draging.data.some((v) => !this.config[a].some((d) => d.name === v.name)));
    },
    translate({ name, visualType, type }, tp) {
      const t = {
        name,
        visualType,
        type,
        field: {
          alias: '',
          desc: '',
          useExpression: false,
        },
        format: {
          formatType: 'default',
        },
      };
      if (tp === 'rows') {
        t.agg = '';
        t.chart = {};
      }
      return t;
    },
    dragAdd(e, type) {
      const list = this.config.draging.data
        .filter((v) => !this.config[type].some((d) => d.name === v.name));
      this.config[type].splice(
        e.newIndex,
        1,
        ...list.map((v) => this.translate(v, type)),
      );
    },
    cloneStart(e, type) {
      const list = this[type];
      this.config.draging = {
        type,
        data: list.some((v) => v.check) ? list.filter((v) => v.check) : [list[e.oldIndex]],
      };
    },
    cloneEnd() {
      this.config.draging = {
        type: '',
        data: [],
      };
    },
    moveEnd({
      originalEvent, from, to, oldIndex,
    }, v) {
      if (from === to) {
        const {
          x, y, width, height,
        } = from.getBoundingClientRect();
        if (originalEvent.pageX < x
          || originalEvent.pageX > (x + width)
          || originalEvent.pageY < y
          || originalEvent.pageY > (y + height)) {
          this.config[v].splice(oldIndex, 1);
        }
      }
    },
  },
  filters: {
    cut(v, l) {
      let val = '';
      if (v.field.alias) {
        val = `${v.field.alias}:${v.name}`;
      } else {
        val = v.name;
      }
      return val.length < l ? val : `${val.slice(0, l)}…`;
    },
  },
  watch: {
    config: {
      deep: true,
      handler() {
      },
    },
  },
};
</script>

<style lang="stylus">
@import '~src/css/quasar.variables.styl';
.chart-dim-set
  .q-tab-panel
    padding: 6px
.chart-sel-tabs
  background #fff
  border-left 1px solid $ash
  .q-tabs
    border-bottom 1px solid $ash
    .q-tabs__content
      flex-wrap wrap
    .q-tab
      padding 0
      min-height 40px
    .q-tab__content
      min-width 50
.dotted
  border 1px $ash dashed
  min-height 50px
  margin 0 0 9px 0
  padding 9px 4px
  >div
    color #fff
    font-size 14px
    margin 0 0 9px 0
    >span
      padding 0 9px
    &:last-child
      margin 0
    &.drag-ing
      opacity .4
    &.drag-no
      line-height 30px
      text-align center
      color $grey
    .q-field__native,.q-select__dropdown-icon
      color #fff
  .w_l_val
  .w_l_cat
    color $black
    .q-checkbox
      display none
.modelCat
  .w_l_g_cat
    background $primary-light
.modelVal
  .w_l_g_val
    background $positive-light
.w_l_g_theme
  div
    position relative
    border-radius 99px
    padding 4px
    margin 4px
    border 2px #fff solid
    transition border-color .4s ease-in
    &.v-choosing,&:hover
      border-color $primary
  i
    display block
    width 45px
    height 45px
    border 9px solid
    border-radius 99px
    cursor pointer
</style>
