<template>
  <div class="col q-ma-xs column">
    <q-card class="col column q-pa-xs no-wrap">
      <div class="text-subtitle1 text-center q-py-sm">图层设置</div>
      <q-separator class="q-mb-sm" />
      <q-linear-progress stripe indeterminate v-if="loading" class="absolute-top" />
      <q-scroll-area class="col">
        <q-tabs
          v-model="layoutTab"
          dense
          class="text-grey"
          active-color="primary"
          indicator-color="primary"
          align="justify"
        >
          <q-tab name="layoutList" label="列表" />
          <q-tab name="layoutSetting" label="设置" />
          </q-tabs>
          <q-separator />
          <q-tab-panels
            class="chart-dim-set"
            v-model="layoutTab"
            animated
          >
            <q-tab-panel name="layoutList">
              <q-list>
                <q-item v-for="item in items" :key="item.id"  clickable v-ripple
                :active="selChart === item.i" active-class="grid-item-select"
                class="overflow-hidden"
                @click="selectChart(item)">
                  <q-item-section avatar>
                    <q-icon :name="getIcon(item)" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>
                      {{ellipsis(item.name,10)}}
                      <q-tooltip>
                        {{item.name}}
                      </q-tooltip>
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-tab-panel>
            <q-tab-panel name="layoutSetting">
              <div clickable v-if="selectItem">
                <q-expansion-item v-model="open" dense dense-toggle expand-separator label="基础信息">
                  <q-card>
                    <q-input
                      dense
                      filled
                      v-model.number="selectItem.name"
                      prefix="名称："
                      class="q-my-sm"
                      input-class="text-left"
                    />
                    <q-input
                      dense
                      filled
                      type="number"
                      v-model.number="selectItem.x"
                      prefix="x："
                      class="q-my-sm"
                      input-class="text-left"
                    />
                    <q-input
                      dense
                      filled
                      type="number"
                      v-model.number="selectItem.y"
                      prefix="y："
                      class="q-my-sm"
                      input-class="text-left"
                    />
                    <q-input
                      dense
                      filled
                      type="number"
                      v-model.number="selectItem.z"
                      prefix="z："
                      class="q-my-sm"
                      input-class="text-left"
                    >
                      <template v-slot:append>
                        <q-btn-group dense flat>
                          <q-btn
                            flat
                            round
                            dense
                            color="secondary"
                            icon="mdi-arrow-up"
                            :disable="selectItem.z === 10000"
                            @click="selectItem.z += 1"
                          />
                          <q-btn
                            flat
                            round
                            dense
                            color="secondary"
                            icon="mdi-arrow-down"
                            :disable="selectItem.z === 0"
                            @click="selectItem.z -= 1"
                          />
                        </q-btn-group>
                      </template>
                    </q-input>
                    <q-input
                      dense
                      filled
                      type="number"
                      v-model.number="selectItem.w"
                      prefix="w："
                      class="q-my-sm"
                      input-class="text-left"
                    />
                    <q-input
                      dense
                      filled
                      type="number"
                      v-model.number="selectItem.h"
                      prefix="h："
                      class="q-my-sm"
                      input-class="text-left"
                    />
                  </q-card>
                </q-expansion-item>
                <q-expansion-item v-model="open" dense dense-toggle expand-separator label="对齐设置">
                  <q-card>
                    <q-btn-group dense flat>
                      <q-btn
                        flat
                        round
                        dense
                        color="secondary"
                        icon="mdi-align-vertical-top"
                        :disable="selChartArray.length<2"
                        @click="align('top')"
                      />
                      <q-btn
                        flat
                        round
                        dense
                        color="secondary"
                        icon="mdi-align-horizontal-right"
                        :disable="selChartArray.length<2"
                        @click="align('right')"
                      />
                      <q-btn
                        flat
                        round
                        dense
                        color="secondary"
                        icon="mdi-align-vertical-bottom"
                        :disable="selChartArray.length<2"
                        @click="align('bottom')"
                      />
                      <q-btn
                        flat
                        round
                        dense
                        color="secondary"
                        icon="mdi-align-horizontal-left"
                        :disable="selChartArray.length<2"
                        @click="align('left')"
                      />
                      <q-btn
                        flat
                        round
                        dense
                        color="secondary"
                        icon="mdi-view-parallel"
                        :disable="selChartArray.length<2"
                        @click="align('horizontal')"
                      />
                      <q-btn
                        flat
                        round
                        dense
                        color="secondary"
                        icon="mdi-view-sequential"
                        :disable="selChartArray.length<2"
                        @click="align('vertical')"
                      />
                    </q-btn-group>
                  </q-card>
                </q-expansion-item>
                <q-expansion-item v-model="open" dense dense-toggle expand-separator label="大小设置">
                  <q-card>
                    <q-btn-group dense flat>
                      <q-btn
                        flat
                        round
                        dense
                        color="secondary"
                        icon="mdi-arrow-expand-all"
                        :disable="selChartArray.length<2"
                        @click="adjust('max')"
                      />
                      <q-btn
                        flat
                        round
                        dense
                        color="secondary"
                        icon="mdi-arrow-collapse-all"
                        :disable="selChartArray.length<2"
                        @click="adjust('min')"
                      />
                      <q-btn
                        flat
                        round
                        dense
                        color="secondary"
                        icon="mdi-pan-horizontal"
                        :disable="selChartArray.length<2"
                        @click="adjust('maxHorizontal')"
                      />
                      <q-btn
                        flat
                        round
                        dense
                        color="secondary"
                        icon="mdi-pan-vertical"
                        :disable="selChartArray.length<2"
                        @click="adjust('maxVertical')"
                      />
                      <q-btn
                        flat
                        round
                        dense
                        color="secondary"
                        icon="mdi-arrow-collapse-horizontal"
                        :disable="selChartArray.length<2"
                        @click="adjust('minHorizontal')"
                      />
                      <q-btn
                        flat
                        round
                        dense
                        color="secondary"
                        icon="mdi-arrow-collapse-vertical"
                        :disable="selChartArray.length<2"
                        @click="adjust('minVertical')"
                      />
                    </q-btn-group>
                  </q-card>
                </q-expansion-item>
                <q-expansion-item v-model="open" dense dense-toggle expand-separator label="组合设置">
                  <q-card>
                    <q-btn-group dense flat>
                      <q-btn
                        flat
                        round
                        dense
                        color="secondary"
                        icon="mdi-select-group"
                        :disable="selChartArray.length<2"
                        @click="groupSet('do')"
                      />
                      <q-btn
                        flat
                        round
                        dense
                        color="secondary"
                        icon="mdi-select-off"
                        :disable="!selChart || selChart.type !== 'group'"
                        @click="groupSet('undo')"
                      />
                    </q-btn-group>
                  </q-card>
                </q-expansion-item>
              </div>
            </q-tab-panel>
          </q-tab-panels>
      </q-scroll-area>
    </q-card>
  </div>
</template>

<script>
import { chartList, ellipsis } from 'boot/datatype';

export default {
  name: 'datasource',
  components: {
  },
  data() {
    return {
      layoutTab: 'layoutSetting',
      open: true,
      loading: false,
      xy: 20,
      chartList,
    };
  },
  props: {
    items: {
      type: Array,
      required: false,
    },
    selChartArray: {
      type: Array,
      required: true,
    },
    selChart: {
      type: Object,
      required: false,
    },
  },
  mounted() {
  },
  methods: {
    ellipsis,
    align(type) {
      let minTop = 10000;
      let maxBottom = 0;
      let minLeft = 20000;
      let maxRight = 0;
      const horizontalArray = [];
      const verticalArray = [];
      this.selChartArray.forEach((item) => {
        minTop = item.y < minTop ? item.y : minTop;
        maxBottom = item.y + item.h > maxBottom ? item.y + item.h : maxBottom;
        minLeft = item.x < minLeft ? item.x : minLeft;
        maxRight = item.x + item.w > maxRight ? item.x + item.w : maxRight;
        horizontalArray.push(item);
        verticalArray.push(item);
      });

      this.selChartArray.forEach((item) => {
        if (type === 'top') {
          item.y = minTop;
        } else if (type === 'bottom') {
          item.y = maxBottom - item.h;
        } else if (type === 'left') {
          item.x = minLeft;
        } else if (type === 'right') {
          item.x = maxRight - item.w;
        }
      });

      if (type === 'horizontal') {
        horizontalArray.sort((a, b) => a.x - b.x);
        let totalSpace = maxRight - minLeft;
        horizontalArray.forEach((item) => {
          totalSpace -= item.w;
        });
        const step = totalSpace / (this.selChartArray.length - 1);
        let pre = 0;
        horizontalArray.forEach((item, idx) => {
          // 只移动中间的
          if (idx !== 0 && idx !== horizontalArray.length - 1) {
            item.x = pre + step;
          }
          pre = item.x + item.w;
        });
      }
      if (type === 'vertical') {
        verticalArray.sort((a, b) => a.y - b.y);
        let totalSpace = maxBottom - minTop;
        verticalArray.forEach((item) => {
          totalSpace -= item.h;
        });
        const step = totalSpace / (this.selChartArray.length - 1);
        let pre = 0;
        verticalArray.forEach((item, idx) => {
          // 只移动中间的
          if (idx !== 0 && idx !== horizontalArray.length - 1) {
            item.y = pre + step;
          }
          pre = item.y + item.h;
        });
      }
    },
    groupSet(type) {
      if (type === 'do') {
        const groupItem = {
          x: 10000,
          y: 10000,
          w: 0,
          h: 0,
          z: 0,
          type: 'group',
          config: { viewId: null, chartArray: [] },
        };
        this.selChartArray.forEach((item) => {
          groupItem.x = item.x < groupItem.x ? item.x : groupItem.x;
          groupItem.y = item.y < groupItem.y ? item.y : groupItem.y;
          groupItem.w = item.x + item.w > groupItem.w ? item.x + item.w : groupItem.w;
          groupItem.h = item.y + item.h > groupItem.h ? item.y + item.h : groupItem.h;
          groupItem.z = item.z > groupItem.z ? item.z + 1 : groupItem.z;
          groupItem.config.chartArray.push(item);
        });
        groupItem.w -= groupItem.x;
        groupItem.h -= groupItem.y;
        this.$emit('addItem', 'group', groupItem);
      } else {
        this.$emit('cutItem');
      }
    },
    adjust(type) {
      let minWidth = 10000;
      let minHeight = 20000;
      let maxWidth = 0;
      let maxHeight = 0;
      this.selChartArray.forEach((item) => {
        minWidth = item.w < maxWidth ? item.w : maxWidth;
        minHeight = item.h < minHeight ? item.h : minHeight;
        maxWidth = item.w > maxWidth ? item.w : maxWidth;
        maxHeight = item.h > maxHeight ? item.h : maxHeight;
      });
      this.selChartArray.forEach((item) => {
        if (type === 'min') {
          item.w = minWidth;
          item.h = minHeight;
        } else if (type === 'max') {
          item.w = maxWidth;
          item.h = maxHeight;
        } else if (type === 'maxHorizontal') {
          item.w = maxWidth;
        } else if (type === 'maxVertical') {
          item.h = maxHeight;
        } else if (type === 'minHorizontal') {
          item.w = minWidth;
        } else if (type === 'minVertical') {
          item.h = minHeight;
        }
      });
    },
    getIcon(item) {
      if (item.type === 'group') {
        return 'mdi-select-group';
      }
      const chart = this.chartList.find((v) => v.type === item.type);
      if (chart) {
        return chart.icon;
      }
      return '';
    },
    selectChart(item) {
      this.$emit('selectItem', item);
    },
  },
  watch: {
    selChartArray() {
    },
  },
  computed: {
    selectItem() {
      return this.items.find((item) => this.selChart === item) || {};
    },
  },
};
</script>

<style lang="stylus"></style>
