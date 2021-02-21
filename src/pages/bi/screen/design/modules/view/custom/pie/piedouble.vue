<template>
  <div ref="chart" :style="chartStyle"></div>
</template>

<script>
import echarts from 'echarts';
import 'echarts-gl';

export default {
  name: 'piedouble',
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
      const labelData = [];
      const labelData1 = [];
      for (let i = 0; i < 150; i += 1) {
        labelData.push({
          value: 1,
          name: i,
          itemStyle: {
            normal: {
              color: 'rgba(0,209,228,0)',
            },
          },
        });
      }
      for (let i = 0; i < labelData.length; i += 1) {
        if (labelData[i].name < 50) {
          labelData[i].itemStyle = {
            normal: {
              color: new echarts.graphic.LinearGradient(
                0, 0, 0, 1,
                [{
                  offset: 0,
                  color: '#0ff',
                },
                {
                  offset: 1,
                  color: '#5467df',
                },
                ],
              ),
            },

          };
        }
      }
      for (let i = 0; i < 150; i += 1) {
        labelData1.push({
          value: 1,
          name: i,
          itemStyle: {
            normal: {
              color: 'rgba(0,209,228,0)',
            },
          },
        });
      }
      for (let i = 0; i < labelData1.length; i += 1) {
        if (labelData1[i].name < 150) {
          labelData1[i].itemStyle = {
            normal: {
              color: new echarts.graphic.LinearGradient(
                0, 0, 0, 1,
                [{
                  offset: 0,
                  color: '#251f45',
                },
                {
                  offset: 1,
                  color: '#251f45',
                },
                ],
              ),
            },

          };
        }
      }
      const option = {
        // backgroundColor: '#180f2a',
        title: [{
          text: '118',
          x: '50%',
          y: '37%',
          textAlign: 'center',
          textStyle: {
            fontSize: '70',
            fontWeight: '100',
            color: '#0FF',
            textAlign: 'center',
          },
        }, {
          text: 'DESIGN ELEMENTS',
          left: '50%',
          top: '52%',
          textAlign: 'center',
          textStyle: {
            fontSize: '18',
            fontWeight: '400',
            color: '#8d8793',
            textAlign: 'center',
          },
        }, {
          text: 'DONUT CHART',
          left: '50%',
          top: '57%',
          textAlign: 'center',
          textStyle: {
            fontSize: '14',
            fontWeight: '400',
            color: 'rgba(65,63,112,1)',
            textAlign: 'center',
          },
        }],
        polar: {
          radius: ['56%', '52%'],
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
        series: [{
          name: '',
          type: 'bar',
          roundCap: true,
          barWidth: 60,
          showBackground: true,
          backgroundStyle: {
            color: '#2e2856',
          },
          data: [80],
          coordinateSystem: 'polar',
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                offset: 0,
                color: '#585fe1',
              }, {
                offset: 1,
                color: '#0ff',
              }]),
            },
          },
        },
        {
          hoverAnimation: false,
          type: 'pie',
          z: 2,
          data: labelData,
          radius: ['43%', '50%'],
          zlevel: -2,
          itemStyle: {
            normal: {
              borderColor: '#180f2a',
              borderWidth: 2,
            },
          },
          label: {
            normal: {
              position: 'inside',
              show: false,
            },
          },
        },
        {
          hoverAnimation: false,
          type: 'pie',
          z: 1,
          data: labelData1,
          radius: ['43%', '50%'],
          zlevel: -2,
          itemStyle: {
            normal: {
              borderColor: '#180f2a',
              borderWidth: 2,
            },
          },
          label: {
            normal: {
              position: 'inside',
              show: false,
            },
          },
        },

        ],
      };
      this.chart.clear();
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

<style scoped lang="stylus"></style>
