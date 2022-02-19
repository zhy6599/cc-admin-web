<template>
  <div class="col q-ma-xs column">
    <q-card class="col column q-pa-xs no-wrap">
      <div class="text-subtitle1 text-center q-py-sm">排名设置</div>
      <q-separator class="q-mb-sm" />
      <div class="chart-sel-tabs full-width">
        <q-tabs dense v-model="rankSettingTab" class="text-grey" active-color="primary">
          <q-tab v-for="t in tabs" :key="t.name" :name="t.name" :icon="t.icon">{{t.label}}</q-tab>
        </q-tabs>
      </div>
      <q-separator />
      <q-tab-panels class="chart-dim-set" v-model="rankSettingTab" animated>
        <q-tab-panel name="data">
          <chartdata :config.sync="config" />
        </q-tab-panel>
        <q-tab-panel name="rank">
          <div>
            <div class="text-body2 q-pt-sm">显示设置</div>
            <q-input
              dense
              filled
              type="number"
              v-model="config.rowNum"
              prefix="显示数据："
              suffix="条"
              class="q-my-sm"
              input-class="text-right"
            />
            <q-input
              dense
              filled
              v-model="config.unit"
              prefix="单位："
              class="q-my-sm"
              input-class="text-right"
            />
            <div class="text-body2 q-pt-sm">滚动设置</div>
            <q-toggle label="开启滚动" v-model="config.animation" />
            <q-select
              dense
              filled
              options-dense
              v-model="config.carousel"
              prefix="滚动方式："
              class="q-my-sm"
              :options="carouselOptions"
              emit-value
              map-options
            />
            <q-input
              dense
              filled
              type="number"
              v-model="config.waitTime"
              prefix="滚动间隔："
              suffix="毫秒"
              class="q-my-sm"
              input-class="text-right"
            />
          </div>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </div>
</template>

<script>
import chartdata from './chart/data';

export default {
  name: 'ranksetting',
  components: {
    chartdata,
  },
  data() {
    return {
      rankSettingTab: 'data',
      tabs: [{ label: '数据',name: 'data' },{ label: '排名',name: 'rank' }],
      headers: [{ name: 'Authorization',value: localStorage.Authorization }],
      carouselOptions: [
        { label: '单条',value: 'single' },
        { label: '整页',value: 'page' },
      ]
    };
  },
  props: {
    config: {
      type: Object,
      required: true,
    },
  },
  methods: {
  },
  computed: {},
  watch: {},
  mounted() {
  },
};
</script>

<style lang="stylus" scoped></style>
