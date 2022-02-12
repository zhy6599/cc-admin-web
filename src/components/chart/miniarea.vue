<template>
  <div ref="homeMinAreaChart" :style="{height:'46px'}"></div>
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
        this.chart = echarts.init(this.$refs.homeMinAreaChart);
      }
      const option = this.makeOptions();
      this.chart.clear();
      this.chart.setOption(option);
      this.doResize();
    },
    makeOptions() {
      return {
        color: ['#00DDFF', '#37A2FF', '#FF0087', '#80FFA5', '#FFBF00'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985',
            },
          },
        },
        grid: {
          top: 0,
          bottom: 0,
          left: 10,
          right: 10,
        },
        xAxis: [
          {
            show: false,
            splitLine: {
              show: false,
            },
            type: 'category',
            boundaryGap: false,
            data: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'],
          },
        ],
        yAxis: [
          {
            type: 'value',
            show: false,
            axisLine: { // y轴
              show: false,
            },
            axisTick: { // y轴刻度线
              show: false,
            },
            splitLine: { // 网格线
              show: false,
            },
          },
        ],
        series: [
          {
            name: '销售额',
            type: 'line',
            stack: 'Total',
            smooth: true,
            lineStyle: {
              width: 0,
            },
            showSymbol: false,
            areaStyle: {
              opacity: 0.8,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgb(55, 162, 255)',
                },
                {
                  offset: 1,
                  color: 'rgb(116, 21, 219)',
                },
              ]),
            },
            emphasis: {
              focus: 'series',
            },
            data: [140, 232, 101, 264, 90, 340, 250],
          },
        ],
      };
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
