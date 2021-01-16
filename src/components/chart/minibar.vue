<template>
  <div ref="homeMinBar" :style="{height:'46px'}"></div>
</template>

<script>
import { date } from 'quasar';
import echarts from 'echarts';

export default {
  name: 'MiniBar',
  data() {
    return {
      xData: [],
      yData: [],
      height: 100,
    };
  },
  computed: {
  },
  created() {
  },
  mounted() {
    const homeMinBarChart = echarts.init(this.$refs.homeMinBar);
    const beginDay = new Date().getTime();
    for (let i = 0; i < 10; i += 1) {
      this.xData.push(date.formatDate(new Date(beginDay + 1000 * 60 * 60 * 24 * i), 'YYYY-MM-DD'));
      this.yData.push(Math.round(Math.random() * 100 + 30));
    }
    const option = {
      grid: {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
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

    homeMinBarChart.setOption(option);
  },
};
</script>

<style >
</style>
