<template>
  <div ref="chart"  :style="chartStyle">
  </div>
</template>

<script>
import echarts from 'echarts';

export default {
  name: 'barcircle2',
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
      const option = {
        // backgroundColor: '#0e202d',
        title: {
          text: '第三采油厂',
          subtext: '总数: 599',
          textStyle: {
            color: '#fff',
            fontSize: 20,
          },
          subtextStyle: {
            color: '#999',
            fontSize: 16,
          },
          x: 'center',
          top: '0%',
        },
        grid: {
          top: 200,
          bottom: 150,
        },
        tooltip: {},
        xAxis: {
          data: ['关井数', '开井数', '不在线'],
          axisTick: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          axisLabel: {
            interval: 0,
            textStyle: {
              color: '#beceff',
              fontSize: 20,
            },
            margin: 80, // 刻度标签与轴线之间的距离。
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
            show: false,
          },
        },
        series: [{
          name: '',
          type: 'pictorialBar',
          symbolSize: [100, 45],
          symbolOffset: [0, -20],
          z: 12,
          data: [{
            name: '关井数',
            value: '981',
            trueVal: '98',
            symbolPosition: 'end',
            itemStyle: {
              normal: {
                color: '#00fff5', // 圆柱顶部颜色

              },
            },
          }, {
            name: '开井数',
            value: '1000',
            trueVal: '100',
            symbolPosition: 'end',
            itemStyle: {
              normal: {
                color: '#ffcc00', // 圆柱顶部颜色
              },
            },
          }, {
            name: '不在线',
            value: '900',
            trueVal: '90',
            symbolPosition: 'end',
            itemStyle: {
              normal: {
                color: '#b9b7ff', // 圆柱顶部颜色
              },
            },
          }],
        }, {
          name: '',
          type: 'pictorialBar',
          symbolSize: [100, 45],
          symbolOffset: [0, 24],
          z: 12,
          data: [{
            name: '关井数',
            value: '981',
            trueVal: '98',
            itemStyle: {
              normal: {
                color: '#43bafe', // 圆柱底部颜色
              },
            },
          }, {
            name: '开井数',
            value: '1000',
            trueVal: '100',
            itemStyle: {
              normal: {
                color: '#ff7800', // 圆柱底部颜色
              },
            },
          }, {
            name: '不在线',
            value: '900',
            trueVal: '90',
            itemStyle: {
              normal: {
                color: '#e9a5ff', // 圆柱底部颜色
              },
            },
          }],
        }, {
          name: '',
          type: 'pictorialBar',
          symbolSize: [150, 75],
          symbolOffset: [0, 44],
          z: 11,
          data: [{
            name: '关井数',
            value: '981',
            trueVal: '98',
            itemStyle: {
              normal: {
                color: 'transparent',
                borderColor: '#43bafe', // 底部内圆圈颜色
                borderWidth: 5,
              },
            },
          }, {
            name: '开井数',
            value: '1000',
            trueVal: '100',
            itemStyle: {
              normal: {
                color: 'transparent',
                borderColor: '#ff7800', // 底部内圆圈颜色
                borderWidth: 5,
              },
            },
          }, {
            name: '不在线',
            value: '900',
            trueVal: '90',
            itemStyle: {
              normal: {
                color: 'transparent',
                borderColor: '#e9a5ff', // 底部内圆圈颜色
                borderWidth: 5,
              },
            },
          }],
        }, {
          name: '',
          type: 'pictorialBar',
          symbolSize: [200, 100],
          symbolOffset: [0, 62],
          z: 10,
          data: [{
            name: '关井数',
            value: '981',
            trueVal: '98',
            itemStyle: {
              normal: {
                color: 'transparent',
                borderColor: '#43bafe', // 底部外圆圈颜色
                borderType: 'dashed',
                borderWidth: 5,
              },
            },
          }, {
            name: '开井数',
            value: '1000',
            trueVal: '100',
            itemStyle: {
              normal: {
                color: 'transparent',
                borderColor: '#ff7800', // 底部外圆圈颜色
                borderType: 'dashed',
                borderWidth: 5,
              },
            },
          }, {
            name: '不在线',
            value: '900',
            trueVal: '90',
            itemStyle: {
              normal: {
                color: 'transparent',
                borderColor: '#e9a5ff', // 底部外圆圈颜色
                borderType: 'dashed',
                borderWidth: 5,
              },
            },
          }],
        }, {

          type: 'bar',
          silent: true,
          barWidth: 100,
          barGap: '-100%',

          data: [{
            name: '关井数',
            value: '981',
            trueVal: '98',
            label: {
              normal: {
                show: true,
                position: 'top',
                distance: 40,
                textStyle: {
                  color: '#00fff5', // 柱子对应数值颜色
                  fontSize: 40,
                },
              },
            },
            itemStyle: {
              normal: {
                color: {
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  type: 'linear',
                  global: false,
                  colorStops: [{
                    offset: 0,
                    color: 'rgba(0,255,245,0.5)',
                  }, {
                    offset: 1,
                    color: '#43bafe', // 底部渐变颜色
                  }],
                },
              },
            },
          }, {
            name: '开井数',
            value: '1000',
            trueVal: '100',
            label: {
              normal: {
                show: true,
                position: 'top',
                distance: 40,
                textStyle: {
                  color: '#ffcc00', // 柱子对应数值颜色
                  fontSize: 40,
                },
              },
            },
            itemStyle: {
              normal: {
                color: {
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  type: 'linear',
                  global: false,
                  colorStops: [{
                    offset: 0,
                    color: 'rgba(255,204,0,0.5)',
                  }, {
                    offset: 1,
                    color: '#ff7800', // 底部渐变颜色
                  }],
                },
              },
            },
          }, {
            name: '不在线',
            value: '900',
            trueVal: '90',
            label: {
              normal: {
                show: true,
                position: 'top',
                distance: 40,
                textStyle: {
                  color: '#b9b7ff', // 柱子对应数值颜色
                  fontSize: 40,
                },
              },
            },
            itemStyle: {
              normal: {
                color: {
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  type: 'linear',
                  global: false,
                  colorStops: [{
                    offset: 0,
                    color: 'rgba(185,183,255,0.5)',
                  }, {
                    offset: 1,
                    color: '#e9a5ff', // 底部渐变颜色
                  }],
                },
              },
            },
          }],
        }],
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
