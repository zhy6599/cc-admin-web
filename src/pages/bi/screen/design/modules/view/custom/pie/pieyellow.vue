<template>
  <div ref="chart"  :style="chartStyle">
  </div>
</template>

<script>
import echarts from 'echarts';

export default {
  name: 'pieprocess',
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
      return {
        // backgroundColor: '#000',
        xAxis: {
          splitLine: {
            show: false,
          },
          axisLabel: {
            show: false,
          },
          axisLine: {
            show: false,
          },
        },
        yAxis: {
          splitLine: {
            show: false,
          },
          axisLabel: {
            show: false,
          },
          axisLine: {
            show: false,
          },
        },
        series: [
        // 内圆
          {
            type: 'pie',
            radius: ['0', '25%'],
            center: ['50%', '50%'],
            z: 4,
            hoverAnimation: false,
            data: [{
              name: '积分',
              value: 65,
              itemStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                    offset: 0,
                    color: '#FFD3AC',
                  }, {
                    offset: 1,
                    color: '#FCDC6F',
                  }]),
                },

              },
              label: {
                normal: {
                  rich: {
                    a: {
                      color: '#994D01',
                      align: 'center',
                      fontSize: 30,
                      padding: [0, 0, 56, 0],
                      fontWeight: 'bold',
                    },
                    b: {
                      color: '#AF6E2F',
                      align: 'center',
                      fontSize: 16,
                      fontWeight: 'bold',
                    },
                  },
                  formatter(params) {
                    return `{a|${params.value}}\n\n{b|全部领取}`;
                  },
                  position: 'center',
                  show: true,
                },
              },
              labelLine: {
                show: false,
              },
            }],
          },
          // 进度图
          {
            type: 'gauge',
            radius: '55%',
            center: ['50%', '50%'],
            min: 0,
            max: 1000,
            z: 5,
            splitNumber: 1, // 刻度数量
            startAngle: 220,
            endAngle: -40,
            animation: true,
            animationDuration: 10000,
            // 分隔线样式。
            splitLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            title: {
              show: false,
            },
            axisLabel: {
              color: 'rgba(255,255,255,0)',
              fontSize: 12,
            }, // 刻度节点文字颜色
            detail: {
              show: false,
            },
            axisLine: {
              show: true,
              lineStyle: {
                width: 20,
                color: [
                  [
                    0.02, new echarts.graphic.LinearGradient(
                      0, 0, 1, 0, [{
                        offset: 0,
                        color: '#F08E25',
                      }, {
                        offset: 0.5,
                        color: '#F8B840',
                      },
                      {
                        offset: 1,
                        color: '#F6EC4F',
                      },
                      ],
                    ),
                  ],
                  [
                    1, new echarts.graphic.LinearGradient(
                      0, 0, 1, 0, [{
                        offset: 0,
                        color: 'rgba(255,255,255, 0.3)',
                      }, {
                        offset: 0.5,
                        color: 'rgba(255,255,255, 0.2)',
                      },
                      {
                        offset: 1,
                        color: 'rgba(255,255,255, 0.1)',
                      },
                      ],
                    ),
                  ],
                ],
              },
            },
          },
          // 刻度尺
          {
            type: 'gauge',
            radius: '56%',
            startAngle: 220,
            endAngle: -40,
            z: 2,
            axisTick: {
              show: true,
              lineStyle: {
                color: '#fff',
                width: 1,
              },
              length: -8,
            }, // 刻度样式
            splitLine: {
              show: true,
              lineStyle: {
                color: '#fff',
                width: 1,
              },
              length: -8,
            }, // 分隔线样式
            axisLabel: {
              color: 'rgba(255,255,255,0)',
              fontSize: 12,
            }, // 刻度节点文字颜色
            pointer: {
              show: false,
            },
            axisLine: {
              show: false,
            },
            label: {
              show: false,
            },
            // 仪表盘详情，用于显示数据。
            detail: {
              show: true,
              offsetCenter: [15, '95%'],
              color: '#fff',
              formatter() {
                return '- 超过了75%销售顾问 -';
              },
              textStyle: {
                fontSize: 20,
              },
            },
          },
          // 外一层圈
          {
            type: 'pie',
            radius: '30%',
            startAngle: 220,
            endAngle: -40,
            hoverAnimation: false,
            center: ['50%', '50%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
            },
            labelLine: {
              show: false,
            },
            data: [{
              value: 1,
            }],
            itemStyle: {
              normal: {
                color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [{
                    offset: 0,
                    color: '#FDE35A',
                  }, {
                    offset: 1,
                    color: '#F28930',
                  }],
                },
              },
            },
          },
          // 外二层圈
          {
            type: 'pie',
            radius: '35%',
            center: ['50%', '50%'],
            avoidLabelOverlap: false,
            z: 0,
            hoverAnimation: false,
            label: {
              show: false,
            },
            labelLine: {
              show: false,
            },
            data: [{
              value: 1,
            }],
            itemStyle: {
              normal: {
                color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [{
                    offset: 0,
                    color: 'rgba(253, 227, 90, 0.25)',
                  }, {
                    offset: 1,
                    color: 'rgba(253, 227, 90, 0)',
                  }],
                },
              },
            },
          },
          // 最外层圈
          {
            type: 'pie',
            radius: '40%',
            center: ['50%', '50%'],
            avoidLabelOverlap: false,
            z: 0,
            hoverAnimation: false,
            label: {
              show: false,
            },
            labelLine: {
              show: false,
            },
            data: [{
              value: 1,
            }],
            itemStyle: {
              normal: {
                color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [{
                    offset: 0,
                    color: 'rgba(253, 227, 90, 0.2)',
                  },
                  {
                    offset: 1,
                    color: 'rgba(249, 137, 27, 0)',
                  },
                  ],
                },
              },
            },
          },
        ],
      };
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
