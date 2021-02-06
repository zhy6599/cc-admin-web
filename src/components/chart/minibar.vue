<template>
  <div ref="homeMinBarChart" :style="{height:'46px'}"></div>
</template>

<script>
import { date } from 'quasar';
import echarts from 'echarts';

export default {
  name: 'MiniBar',
  props: {
    screenWidth: Number,
  },
  data() {
    return {
      xData: [],
      yData: [],
      height: 100,
      loading: false,
      chart: '',
    };
  },
  computed: {
  },
  created() {
  },
  methods: {
    doResize() {
      if (this.chart) {
        this.$nextTick(() => {
          this.chart.resize();
        });
      }
    },
    renderChart() {
      if (!this.chart) {
        this.chart = echarts.init(this.$refs.homeMinBarChart);
      }
      const option = this.makeOptions();
      this.chart.clear();
      this.chart.setOption(option);
      this.doResize();
    },
    makeOptions() {
      const beginDay = new Date().getTime();
      for (let i = 0; i < 10; i += 1) {
        this.xData.push(date.formatDate(new Date(beginDay + 1000 * 60 * 60 * 24 * i), 'YYYY-MM-DD'));
        this.yData.push(Math.round(Math.random() * 100 + 30));
      }
      const option = {
        grid: {
          top: 0,
          bottom: 0,
          left: '10px',
          right: '10px',
        },
        xAxis: {
          show: false,
          type: 'category',
          data: this.xData,
        },
        color: ['#1890ff', '#ff7f50', '#87cefa', '#da70d6', '#32cd32', '#6495ed', '#ff69b4', '#ba55d3'],
        tooltip: {
          formatter: '{b}<BR>{c}',
        },
        yAxis: {
          show: false,
          type: 'value',
        },
        series: [{
          data: this.yData,
          type: 'bar',
          areaStyle: {},
        }],
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
