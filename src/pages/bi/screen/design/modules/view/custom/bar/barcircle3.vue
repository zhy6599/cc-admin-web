<template>
  <div ref="chart"  :style="chartStyle">
  </div>
</template>

<script>
import echarts from 'echarts';

export default {
  name: 'barcircle3',
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
      const xData2 = ['容城谷庄', '雄县七间房', '安新三台', '雄县张岗', '安新寨里'];
      const data1 = [200, 100, 200, 200, 100];
      const data2 = [300, 200, 300, 300, 400];
      const option = {
        // backgroundColor: '#021132',
        tooltip: {
          trigger: 'item',
        },
        grid: {
          left: 100,
          bottom: 100,
        },
        xAxis: {
          data: xData2,
          axisTick: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          axisLabel: {
            interval: 0,
            textStyle: {
              color: '#fff',
              fontSize: 20,
            },
            margin: 20, // 刻度标签与轴线之间的距离。
          },

        },
        yAxis: {
          splitLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          axisLabel: {
            textStyle: {
              color: '#fff',
              fontSize: 20,
            },
          },
        },
        series: [
          { // 三个最低下的圆片
            name: '',
            type: 'pictorialBar',
            symbolSize: [45, 25],
            symbolOffset: [0, 10],
            z: 12,
            itemStyle: {
              opacity: 1,
              color(params) {
                const a = params.name.slice(0, 2);
                if (a === '容城') {
                  return new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: '#FF9A22', // 0% 处的颜色
                  }, {
                    offset: 1,
                    color: '#FFD56E', // 100% 处的颜色
                  }], false);
                } if (a === '雄县' || a === '雄州') {
                  return new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: '#00EC28', // 0% 处的颜色
                  }, {
                    offset: 1,
                    color: '#5DF076', // 100% 处的颜色
                  }], false);
                } if (a === '安新') {
                  return new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: '#12B9DB', // 0% 处的颜色
                  }, {
                    offset: 1,
                    color: '#6F8EF2', // 100% 处的颜色
                  }], false);
                }
                return '';
              },
            },
            data: [1, 1, 1, 1, 1],
          },

          // 下半截柱状图
          {
            name: '2020',
            type: 'bar',
            barWidth: 45,
            barGap: '-100%',
            itemStyle: { // lenged文本
              opacity: 0.7,
              color(params) {
                const a = params.name.slice(0, 2);
                if (a === '容城') {
                  return new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: '#FF9A22', // 0% 处的颜色
                  }, {
                    offset: 1,
                    color: '#FFD56E', // 100% 处的颜色
                  }], false);
                } if (a === '雄县' || a === '雄州') {
                  return new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: '#00EC28', // 0% 处的颜色
                  }, {
                    offset: 1,
                    color: '#5DF076', // 100% 处的颜色
                  }], false);
                } if (a === '安新') {
                  return new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: '#12B9DB', // 0% 处的颜色
                  }, {
                    offset: 1,
                    color: '#6F8EF2', // 100% 处的颜色
                  }], false);
                }
                return '';
              },
            },

            data: data1,
          },

          { // 替代柱状图 默认不显示颜色，是最下方柱图（邮件营销）的value值 - 20
            type: 'bar',
            barWidth: 45,
            barGap: '-100%',
            stack: '广告',
            itemStyle: {
              color: 'transparent',
            },
            data: data1,
          },

          {
            name: '', // 头部
            type: 'pictorialBar',
            symbolSize: [45, 25],
            symbolOffset: [0, -10],
            z: 12,
            symbolPosition: 'end',
            itemStyle: {
              color: '#163F7A',
              opacity: 1,
            },
            data: data2,
          },

          {
            name: '',
            type: 'pictorialBar',
            symbolSize: [45, 25],
            symbolOffset: [0, -10],
            z: 12,
            itemStyle: {
              opacity: 1,
              color(params) {
                const a = params.name.slice(0, 2);
                if (a === '容城') {
                  return new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: '#FF9A22', // 0% 处的颜色
                  }, {
                    offset: 1,
                    color: '#FFD56E', // 100% 处的颜色
                  }], false);
                } if (a === '雄县' || a === '雄州') {
                  return new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: '#00EC28', // 0% 处的颜色
                  }, {
                    offset: 1,
                    color: '#5DF076', // 100% 处的颜色
                  }], false);
                } if (a === '安新') {
                  return new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: '#12B9DB', // 0% 处的颜色
                  }, {
                    offset: 1,
                    color: '#6F8EF2', // 100% 处的颜色
                  }], false);
                }
                return '';
              },
            },
            symbolPosition: 'end',
            data: data1,
          },

          {
            name: '2019',
            type: 'bar',
            barWidth: 45,
            barGap: '-100%',
            z: 0,
            itemStyle: {
              color: '#163F7A',
              opacity: 0.7,
            },

            data: data2,
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
