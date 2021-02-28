<template>
  <div ref="chart"  :style="chartStyle">
  </div>
</template>

<script>
import echarts from 'echarts';

export default {
  name: 'customcar',
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
        title: {
          text: '3D立体图分段柱状图',
          x: 'center',
        },
        // backgroundColor: '#fff',
        tooltip: {
          trigger: 'item',
        },
        xAxis: {
          data: ['入职', '离职', '培训'],
          axisTick: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          axisLabel: {
            textStyle: {
              color: '#888',
            },
            margin: 20, // 刻度标签与轴线之间的距离。
          },

        },
        yAxis: {
          splitLine: {
            show: true,
            lineStyle: {
              color: '#eee',
              type: 'solid',
            },
          },
          axisTick: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          axisLabel: {
            textStyle: {
              color: '#888',
            },
          },
        },
        series: [
          { // 三个最低下的圆片
            name: '',
            type: 'pictorialBar',
            symbolSize: [100, 30],
            symbolOffset: [0, 18],
            z: 12,
            data: [{
              name: '',
              value: '100',
              itemStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgba(89,211,255,1)',
                  },
                  {
                    offset: 1,
                    color: 'rgba(23,237,194,1)',
                  },
                  ]),
                },
              },
            }, {
              name: '',
              value: '101',
              itemStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgba(89,211,255,1)',
                  },
                  {
                    offset: 1,
                    color: 'rgba(23,237,194,1)',
                  },
                  ]),
                },
              },
            }, {
              name: '',
              value: '81',
              itemStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgba(89,211,255,1)',
                  },
                  {
                    offset: 1,
                    color: 'rgba(23,237,194,1)',
                  },
                  ]),
                },
              },
            }],
          },

          // 下半截柱状图
          {
            name: '2020',
            type: 'bar',
            barWidth: 100,
            barGap: '-100%',
            itemStyle: { // lenged文本
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'rgba(55,255,249,1)',
              },
              {
                offset: 1,
                color: 'rgba(0,222,215,0.2)',
              },
              ]),
            },

            data: [{
              name: '',
              value: '100',
              itemStyle: {
                normal: {
                  color: {
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    type: 'linear',
                    global: false,
                    colorStops: [{ // 第一节下面
                      offset: 0,
                      color: 'rgba(0,255,245,0.5)',
                    }, {
                      offset: 1,
                      color: '#43bafe',
                    }],
                  },
                },
              },
            }, {
              name: '',
              value: '101',
              itemStyle: {
                normal: {
                  color: {
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    type: 'linear',
                    global: false,
                    colorStops: [{ // 第二个柱状图下面
                      offset: 0,
                      color: 'rgba(0,255,245,0.5)',
                    }, {
                      offset: 1,
                      color: '#43bafe',
                    }],
                  },
                },
              },
            }, {
              name: '',
              value: '81',
              itemStyle: {
                normal: {
                  color: {
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    type: 'linear',
                    global: false,
                    colorStops: [{ // 第三个柱状图下半截
                      offset: 0,
                      color: 'rgba(0,255,245,0.5)',
                    }, {
                      offset: 1,
                      color: '#43bafe',
                    }],
                  },
                },
              },
            }],
          },

          { // 替代柱状图 默认不显示颜色，是最下方柱图（邮件营销）的value值 - 20
            type: 'bar',
            barWidth: 100,
            barGap: '-100%',
            stack: '广告',
            itemStyle: {
              color: 'transparent',
            },
            data: [100, 102, 81],
          },

          {
            name: '', // 头部
            type: 'pictorialBar',
            symbolSize: [100, 45],
            symbolOffset: [0, -20],
            z: 12,
            data: [{
              name: '',
              value: '320',
              symbolPosition: 'end',
              itemStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1,
                    [{
                      offset: 0,
                      color: 'rgba(54,127,223,1)',
                    },
                    {
                      offset: 1,
                      color: 'rgba(94,162,254,1)',
                    },
                    ],
                    false),
                },
              },
            }, {
              name: '',
              value: '283',
              symbolPosition: 'end',
              itemStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1,
                    [{
                      offset: 0,
                      color: 'rgba(54,127,223,1)',
                    },
                    {
                      offset: 1,
                      color: 'rgba(94,162,254,1)',
                    },
                    ],
                    false),
                },
              },
            }, {
              name: '',
              value: '272',
              symbolPosition: 'end',
              itemStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1,
                    [{
                      offset: 0,
                      color: 'rgba(54,127,223,1)',
                    },
                    {
                      offset: 1,
                      color: 'rgba(94,162,254,1)',
                    },
                    ],
                    false),
                },
              },
            }],
          },

          {
            name: '',
            type: 'pictorialBar',
            symbolSize: [100, 45],
            symbolOffset: [0, -20],
            z: 12,
            data: [{
              name: '',
              value: '103',
              symbolPosition: 'end',
              itemStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1,
                    [{
                      offset: 0,
                      color: 'rgba(89,211,255,1)',
                    },
                    {
                      offset: 1,
                      color: 'rgba(23,237,194,1)',
                    },
                    ],
                    false),
                },
              },
            }, {
              name: '',
              value: '105',
              symbolPosition: 'end',
              itemStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1,
                    [{
                      offset: 0,
                      color: 'rgba(89,211,255,1)',
                    },
                    {
                      offset: 1,
                      color: 'rgba(23,237,194,1)',
                    },
                    ],
                    false),
                },
              },
            }, {
              name: '',
              value: '84',
              symbolPosition: 'end',
              itemStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1,
                    [{
                      offset: 0,
                      color: 'rgba(89,211,255,1)',
                    },
                    {
                      offset: 1,
                      color: 'rgba(23,237,194,1)',
                    },
                    ],
                    false),
                },
              },
            }],
          },

          {
            name: '2019',
            type: 'bar',
            barWidth: 100,
            barGap: '-100%',
            stack: '广告',
            itemStyle: {
              // barBorderRadius: 20,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 1,
                color: 'rgba(0,255,100,0.5)',
              },
              {
                offset: 1,
                color: 'rgba(0,255,100,0.5)',
              },
              ]),
            },
            // 上班截开始
            data: [{
              name: '关井数',
              value: '220',
              trueVal: '22',
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
                      color: 'rgba(54,127,223,1)',
                    },
                    {
                      offset: 1,
                      color: 'rgba(94,162,254,1)',
                    }],
                  },
                },
              },
            }, {
              name: '开井数',
              value: '182',
              trueVal: '18',
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
                      color: 'rgba(54,127,223,1)',
                    },
                    {
                      offset: 1,
                      color: 'rgba(94,162,254,1)',
                    }],
                  },
                },
              },
            }, {
              name: '不在线',
              value: '191',
              trueVal: '19',
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
                      color: 'rgba(54,127,223,1)',
                    },
                    {
                      offset: 1,
                      color: 'rgba(94,162,254,1)',
                    }],
                  },
                },
              },
            },

            ],
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
