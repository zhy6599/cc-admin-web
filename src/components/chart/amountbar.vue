<template>
  <div class="row">
    <div class="col-md-3 col-xs-12 q-px-sm q-mb-md">
      <q-list>
        <q-item-label class="text-body1 q-ma-md">友情链接</q-item-label>
        <q-separator />
        <q-item clickable v-ripple @click="openLink('https://www.56yhz.com')" >
          <q-item-section avatar>
            <q-icon name="img:icons/logo/wms.png" />
          </q-item-section>
          <q-item-section>
            GreaterWMS
          </q-item-section>
          <q-item-section side></q-item-section>
          <q-tooltip>开源仓库管理软件</q-tooltip>
        </q-item>
      </q-list>
    </div>
    <div class="col-md-6 col-xs-12 q-px-sm q-mb-md">
      <div ref="homeAmountBar" :style="{height:'300px'}"></div>
    </div>
    <div class="col-md-3 col-xs-12 q-px-sm q-mb-md">
      <q-list>
        <q-item-label class="text-body1 q-ma-md">门店销售排行榜</q-item-label>
        <q-separator />
        <q-item v-for="shop in shopList" :key="shop.name" clickable v-ripple>
          <q-item-section avatar>
            <q-avatar size="xs" :color="shop.color" text-color="white">{{shop.order}}</q-avatar>
          </q-item-section>
          <q-item-section>
            <q-item-label>{{shop.name}}</q-item-label>
          </q-item-section>
          <q-item-section side>{{shop.amount}}</q-item-section>
        </q-item>
      </q-list>
    </div>
  </div>
</template>

<script>
import { openURL } from 'quasar';
import echarts from 'echarts';

export default {
  name: 'MiniArea',
  props: {
    screenWidth: Number,
  },
  data() {
    return {
      xData: [],
      yData: [],
      shopList: [],
      chart: '',
    };
  },
  computed: {
  },
  created() {
  },
  methods: {
    openLink(url) {
      openURL(url);
    },
    doResize() {
      if (this.chart) {
        this.$nextTick(() => {
          this.chart.resize();
        });
      }
    },
    renderChart() {
      if (!this.chart) {
        this.chart = echarts.init(this.$refs.homeAmountBar);
      }
      const option = this.makeOptions();
      this.chart.clear();
      this.chart.setOption(option);
      this.doResize();
    },
    makeOptions() {
      for (let i = 1; i < 5; i += 1) {
        let color = 'black';
        if (i > 3) {
          color = 'grey-7';
        }
        this.shopList.push({
          order: i,
          name: `肥肥串${i}号店`,
          color,
          amount: (18.6 - i - Math.random() * 1).toFixed(1),
        });
      }
      const colors = ['#5793f3', '#d14a61', '#675bba'];
      const option = {
        color: colors,
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
          },
        },
        legend: {
          data: [],
        },
        grid: {
          left: '40px',
          top: '15%',
          right: '10px',
          bottom: '15%',
        },
        xAxis: [
          {
            type: 'category',
            axisTick: {
              alignWithLabel: true,
            },
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
          },
        ],
        yAxis: [
          {
            axisLine: {
              show: true,
            },
            type: 'value',
            name: '销售额',
            min: 0,
            position: 'left',
            axisLabel: {
              formatter: '{value}万元',
            },
          },
        ],
        series: [
          {
            name: '销售额',
            type: 'bar',
            data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2],
          },
        ],
      };
      return option;
    },
  },
  mounted() {
    this.renderChart();
  },
  watch: {
    screenWidth() {
      this.doResize();
    },
  },
};
</script>

<style >
</style>
