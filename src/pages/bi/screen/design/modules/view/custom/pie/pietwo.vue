<template>
  <div ref="chart" :style="chartStyle"></div>
</template>

<script>
import echarts from 'echarts';

export default {
  name: 'pietwo',
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
      placeHolderStyle: {
        normal: {
          label: {
            show: false,
          },
          labelLine: {
            show: false,
          },
          color: 'rgba(0,0,0,0)',
          borderWidth: 0,
        },
        emphasis: {
          color: 'rgba(0,0,0,0)',
          borderWidth: 0,
        },
      },
      dataStyle: {
        normal: {
          formatter: '{c}%',
          position: 'center',
          show: true,
          textStyle: {
            fontSize: '40',
            fontWeight: 'normal',
            color: '#34374E',
          },
        },
      },
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
        // backgroundColor: '#fff',
        title: [{
          text: '正面评论',
          left: '29.8%',
          top: '60%',
          textAlign: 'center',
          textStyle: {
            fontWeight: 'normal',
            fontSize: '16',
            color: '#AAAFC8',
            textAlign: 'center',
          },
        }, {
          text: '负面评论',
          left: '70%',
          top: '60%',
          textAlign: 'center',
          textStyle: {
            color: '#AAAFC8',
            fontWeight: 'normal',
            fontSize: '16',
            textAlign: 'center',
          },
        }],

        // 第一个图表
        series: [{
          type: 'pie',
          hoverAnimation: false, // 鼠标经过的特效
          radius: ['25%', '30%'],
          center: ['30%', '50%'],
          startAngle: 225,
          labelLine: {
            normal: {
              show: false,
            },
          },
          label: {
            normal: {
              position: 'center',
            },
          },
          data: [{
            value: 100,
            itemStyle: {
              normal: {
                color: '#E1E8EE',
              },
            },
          }, {
            value: 35,
            itemStyle: this.placeHolderStyle,
          },

          ],
        },
        // 上层环形配置
        {
          type: 'pie',
          hoverAnimation: false, // 鼠标经过的特效
          radius: ['25%', '30%'],
          center: ['30%', '50%'],
          startAngle: 225,
          labelLine: {
            normal: {
              show: false,
            },
          },
          label: {
            normal: {
              position: 'center',
            },
          },
          data: [{
            value: 75,
            itemStyle: {
              normal: {
                color: '#6F78CC',
              },
            },
            label: this.dataStyle,
          }, {
            value: 35,
            itemStyle: this.placeHolderStyle,
          },

          ],
        },

        // 第二个图表
        {
          type: 'pie',
          hoverAnimation: false,
          radius: ['25%', '30%'],
          center: ['70%', '50%'],
          startAngle: 225,
          labelLine: {
            normal: {
              show: false,
            },
          },
          label: {
            normal: {
              position: 'center',
            },
          },
          data: [{
            value: 100,
            itemStyle: {
              normal: {
                color: '#E1E8EE',

              },
            },

          }, {
            value: 35,
            itemStyle: this.placeHolderStyle,
          },

          ],
        },

        // 上层环形配置
        {
          type: 'pie',
          hoverAnimation: false,
          radius: ['25%', '30%'],
          center: ['70%', '50%'],
          startAngle: 225,
          labelLine: {
            normal: {
              show: false,
            },
          },
          label: {
            normal: {
              position: 'center',
            },
          },
          data: [{
            value: 30,
            itemStyle: {
              normal: {
                color: '#4897f6',
              },
            },
            label: this.dataStyle,
          }, {
            value: 55,
            itemStyle: this.placeHolderStyle,
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

<style scoped lang="stylus"></style>
