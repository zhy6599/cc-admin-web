<template>
  <div ref="chart"  :style="chartStyle">
  </div>
</template>

<script>
import echarts from 'echarts';

export default {
  name: 'gaugerunning',
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
      let num = 0;
      const option = {
        backgroundColor: '#111',
        title: [{
          text: 'SPEED',
          x: 'center',
          top: '52%',
          textStyle: {
            color: '#fdf914',
            fontSize: 20,
            fontWeight: '100',
          },
        }, {
          text: '60%',
          x: 'center',
          top: '42%',
          textStyle: {
            fontSize: '50',
            color: '#fdf914',
            fontFamily: 'Lato',
            foontWeight: '600',
          },
        }],
        polar: {
          radius: ['44%', '50%'],
          center: ['50%', '50%'],
        },
        angleAxis: {
          max: 100,
          show: false,
        },
        radiusAxis: {
          type: 'category',
          show: true,
          axisLabel: {
            show: false,
          },
          axisLine: {
            show: false,

          },
          axisTick: {
            show: false,
          },
        },
        series: [
          {
            name: '',
            type: 'bar',
            roundCap: true,
            barWidth: 60,
            showBackground: true,
            backgroundStyle: {
              color: 'rgba(66, 66, 66, .3)',
            },
            data: [60],
            coordinateSystem: 'polar',

            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                  offset: 0,
                  color: '#fdf914',
                }, {
                  offset: 1,
                  color: '#38a700',
                }]),
              },
            },

          },
          {
            type: 'gauge',
            name: '',
            radius: '57%',
            startAngle: '0',
            endAngle: '-359.99',
            splitNumber: '200',
            center: ['50%', '50%'],
            pointer: {
              show: false,
            },
            title: {
              show: false,
            },
            detail: {
              show: false,
            },
            data: [{
              value: 95,
              name: '',
            }],
            axisLine: {
              lineStyle: {
                width: 20,
                opacity: 0,
              },
            },
            axisTick: {
              show: false,
            },
            splitLine: {
              show: true,
              length: 13,
              lineStyle: {
                color: {
                  type: 'linear',
                  x: 1,
                  y: 0,
                  x2: 0,
                  y2: 0,
                  colorStops: [{
                    offset: 0,
                    color: '#111',
                  }, {
                    offset: 0.5,
                    color: 'rgba(66, 66, 66, 1)',
                  }, {
                    offset: 1,
                    color: '#111',
                  }],
                  globalCoord: false,
                },
                width: 1,
                type: 'solid',
              },
            },
            axisLabel: {
              show: false,
            },
          },
          {
            name: '',
            type: 'pie',
            startAngle: 90,
            radius: ['60%', '62%'],
            hoverAnimation: false,
            center: ['50%', '50%'],
            itemStyle: {
              normal: {
                labelLine: {
                  show: false,
                },
                color: 'rgba(66, 66, 66, .4)',
                shadowBlur: 10,
                shadowColor: 'rgba(253, 249, 20, .3)',
              },
            },
            data: [{
              value: 100,

            }],
          },
          {
            name: '',
            type: 'pie',
            startAngle: 90,
            radius: ['62.5%', '64%'],
            hoverAnimation: false,
            center: ['50%', '50%'],
            itemStyle: {
              normal: {
                labelLine: {
                  show: false,
                },
                color: 'rgba(66, 66, 66, .3)',
                shadowBlur: 10,
                shadowColor: 'rgba(253, 249, 20, .3)',
              },
            },
            data: [{
              value: 100,

            }],
          },
          {
            name: '',
            type: 'pie',
            startAngle: 90,
            radius: ['64.5%', '65.8%'],
            hoverAnimation: false,
            center: ['50%', '50%'],
            itemStyle: {
              normal: {
                labelLine: {
                  show: false,
                },
                color: 'rgba(66, 66, 66, .2)',
                shadowBlur: 10,
                shadowColor: 'rgba(253, 249, 20, .3)',
              },
            },
            data: [{
              value: 100,

            }],
          },
          {
            name: '',
            type: 'pie',
            startAngle: 90,
            radius: ['66.5%', '67.5%'],
            hoverAnimation: false,
            center: ['50%', '50%'],
            itemStyle: {
              normal: {
                labelLine: {
                  show: false,
                },
                color: 'rgba(66, 66, 66, .1)',
                shadowBlur: 10,
                shadowColor: 'rgba(253, 249, 20, .3)',
              },
            },
            data: [{
              value: 100,

            }],
          },
          {
            name: '',
            type: 'custom',
            coordinateSystem: 'none',
            renderItem(params, api) {
              return {
                type: 'arc',
                shape: {
                  cx: api.getWidth() / 2,
                  cy: api.getHeight() / 2,
                  r: Math.min(api.getWidth(), (api.getHeight()) / 2) * 0.545,
                  startAngle: ((0 + num) * Math.PI) / 180,
                  endAngle: ((1 + num) * Math.PI) / 180,
                },
                style: {
                  stroke: '#fdf914',
                  fill: 'transparent',
                  lineWidth: 5,
                },
                silent: true,
              };
            },
            data: [0],
          },
        ],
      };
      function numb() {
        num += 5;
        this.chart.setOption(option, true);
      }
      setInterval(() => {
        numb();
      }, 100);
      this.chart.setOption(option);
      setTimeout(() => {
        this.chart.resize();
      }, 100);
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
