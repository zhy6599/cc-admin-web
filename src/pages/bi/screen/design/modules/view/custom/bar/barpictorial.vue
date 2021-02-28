<template>
  <div ref="chart"  :style="chartStyle">
  </div>
</template>

<script>
import echarts from 'echarts';

export default {
  name: 'barpictorial',
  props: {
    config: {
      required: true,
    },
    chartStyle: {
      require: false,
      type: Object,
      default: () => ({
        height: '100%',
        position: 'absolute',
        width: '100%',
        top: '0px',
        bottom: '0px',
        left: '0px',
      }),
    },
  },
  data() {
    return {
      chart: null,
    };
  },
  created() {

  },
  mounted() {
    this.renderChart();
  },
  methods: {
    handleResize() {
      if (this.chart) {
        this.chart.resize();
      }
    },
    renderChart() {
      if (!this.chart) {
        this.chart = echarts.init(this.$refs.chart, this.config.theme);
      }
      const option = this.makeOptions(this.config, this.chartData);
      this.chart.clear();
      this.chart.setOption(option);
      setTimeout(() => {
        this.chart.resize();
      }, 100);
    },
    makeOptions() {
      const category = ['服务器数（台）', '计算容量（核）', '内存容量（GB）', '存储容量（PB）'];
      // var barData = [0, ~~(Math.random() * 100),
      // ~~(Math.random() * 100), ~~(Math.random() * 100), ~~(Math.random() * 100)];
      const barData = [60, 30, 52, 34, 90];
      const lineData = [63, 63, 63, 63, 100];

      // console.log(barData)
      const option = {
        // backgroundColor: '#0d073d', // 背景色
        grid: [{ // 图形的位置
          left: '10',
          bottom: '20',
          top: 3,
          right: 30,
        }],
        xAxis: {
          show: false, // 是否展示X轴
        },
        yAxis: {
          data: category,
          show: true,
          axisLabel: {
            inside: true,
            verticalAlign: 'middle',
            lineHeight: 150,
            color: '#4488bc',
            fontSize: 8,
          },
          axisLine: {
            show: false, // 不展示刻度
          },
        },
        series: [{ // 外边框
          name: '',
          type: 'pictorialBar', // echarts图的类型
          symbol: 'reat', // 内部类型（方块，圆，svg，base64图片）
          barWidth: '3%',
          barMaxWidth: '10%',
          symbolOffset: [70, 0], // 柱子的位置
          symbolSize: [130, 20], // size,单个symbol的大小
          itemStyle: {
            normal: {
              color: '#3f559c',
            },
          },
          z: -180, // 图层值
          symbolRepeat: null, // 是否重复symbol
          data: [1, 1, 1, 1],
          barGap: 50, // 柱子的“粗细”
          barCategoryGap: 0,
          animationEasing: 'elasticOut',

        },
        { // 内边框
          name: '',
          type: 'pictorialBar',
          symbol: 'reat',
          barWidth: '3%',
          barMaxWidth: '20%',
          symbolOffset: [72, 0],
          symbolSize: [125, 18],
          itemStyle: {
            normal: {

              color: '#0d073d',
            },
          },
          z: -20,
          symbolRepeat: null,
          data: [1, 1, 1, 1],
          barGap: 45,
          barCategoryGap: 0,
          animationEasing: 'elasticOut',

        },

        { // 下层块
          name: '',
          type: 'pictorialBar',
          symbol: 'roundRect',
          barWidth: '3%',
          barMaxWidth: '20%',
          symbolOffset: [75, 0],
          itemStyle: {
            normal: {

              color: '#1F4683',
            },
          },
          z: -11,
          symbolRepeat: true,
          symbolSize: [6, 16],
          data: lineData,
          barGap: 50,
          barCategoryGap: 0,
          animationEasing: 'elasticOut',

        },

        { // 上层块
          name: '', // blue bar
          type: 'pictorialBar',
          symbol: 'roundRect',
          barWidth: '3%',
          barMaxWidth: 100,
          symbolOffset: [75, 0],
          itemStyle: {
            normal: {
              barMaxWidth: '20%',
              barBorderRadius: 100,
              color: '#6DE8FA',

            },
          },
          symbolRepeat: true,
          symbolSize: [6, 16],
          // symbolClip: true,
          data: barData,
        },
        ],

      };
      return option;
    },
  },
  watch: {
    config: {
      deep: true,
      handler() {
        if (this.config.needResize) {
          this.config.needResize = false;
          this.handleResize();
        }
      },
    },
  },
};
</script>

<style scoped lang="stylus">

</style>
