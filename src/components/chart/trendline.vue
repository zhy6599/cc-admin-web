<template>
  <div ref="homeTrendLine" :style="{height:'300px'}"></div>
</template>

<script>
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
      height: 100,
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
        this.chart = echarts.init(this.$refs.homeTrendLine);
      }
      const option = this.makeOptions();
      this.chart.clear();
      this.chart.setOption(option);
      this.doResize();
    },
    makeOptions() {
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
            type: 'value',
            name: '销售额',
            min: 0,
            position: 'left',
            axisLine: {
              show: true,
            },
            axisLabel: {
              formatter: '{value}万元',
            },
          },
        ],
        series: [
          {
            name: '销售额',
            type: 'line',
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
