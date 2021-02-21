<template>
  <div ref="chart" :style="chartStyle"></div>
</template>

<script>
import echarts from 'echarts';
import 'echarts-gl';

export default {
  name: 'piestar',
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
                0, 1, 0, 0,
                [{
                  offset: 0,
                  color: '#6dfbff',
                },
                {
                  offset: 1,
                  color: '#02aeff',
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
              color: '#464451',
            },

          };
        }
      }

      function Pie() {
        const dataArr = [];
        for (let i = 0; i < 100; i += 1) {
          if (i % 10 === 0) {
            dataArr.push({
              name: (i + 1).toString(),
              value: 30,
              itemStyle: {
                normal: {
                  color: 'rgba(0,255,255,1)',
                  borderWidth: 0,
                  borderColor: 'rgba(0,0,0,0)',
                },
              },
            });
          } else {
            dataArr.push({
              name: (i + 1).toString(),
              value: 100,
              itemStyle: {
                normal: {
                  color: 'rgba(0,0,0,0)',
                  borderWidth: 0,
                  borderColor: 'rgba(0,0,0,0)',
                },
              },
            });
          }
        }
        return dataArr;
      }

      function Pie1() {
        const dataArr = [];
        for (let i = 0; i < 100; i += 1) {
          if (i % 5 === 0) {
            dataArr.push({
              name: (i + 1).toString(),
              value: 20,
              itemStyle: {
                normal: {
                  color: 'rgba(0,255,255,1)',
                  borderWidth: 0,
                  borderColor: 'rgba(0,0,0,0)',
                },
              },
            });
          } else {
            dataArr.push({
              name: (i + 1).toString(),
              value: 100,
              itemStyle: {
                normal: {
                  color: 'rgba(0,0,0,0)',
                  borderWidth: 0,
                  borderColor: 'rgba(0,0,0,0)',
                },
              },
            });
          }
        }
        return dataArr;
      }

      function Pie2() {
        const dataArr = [];
        for (let i = 0; i < 100; i += 1) {
          if (i % 5 === 0) {
            dataArr.push({
              name: (i + 1).toString(),
              value: 20,
              itemStyle: {
                normal: {
                  color: 'rgba(0,255,255,.3)',
                  borderWidth: 0,
                  borderColor: 'rgba(0,0,0,0)',
                },
              },
            });
          } else {
            dataArr.push({
              name: (i + 1).toString(),
              value: 100,
              itemStyle: {
                normal: {
                  color: 'rgba(0,0,0,0)',
                  borderWidth: 0,
                  borderColor: 'rgba(0,0,0,0)',
                },
              },
            });
          }
        }
        return dataArr;
      }

      function Pie3() {
        const dataArr = [];
        for (let i = 0; i < 100; i += 1) {
          if (i % 10 === 0) {
            dataArr.push({
              name: (i + 1).toString(),
              value: 30,
              itemStyle: {
                normal: {
                  color: 'rgba(0,255,255,.5)',
                  borderWidth: 0,
                  borderColor: 'rgba(0,0,0,0)',
                },
              },
            });
          } else {
            dataArr.push({
              name: (i + 1).toString(),
              value: 100,
              itemStyle: {
                normal: {
                  color: 'rgba(0,0,0,0)',
                  borderWidth: 0,
                  borderColor: 'rgba(0,0,0,0)',
                },
              },
            });
          }
        }
        return dataArr;
      }
      const option = {
        // backgroundColor: '#1f1e26',
        title: [{
          text: '75%',
          x: '50%',
          y: '37%',
          textAlign: 'center',
          textStyle: {
            fontSize: '70',
            fontWeight: '100',
            color: '#79ffff',
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
            color: '#5c5a68',
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
            color: '#484556',
            textAlign: 'center',
          },
        }],
        polar: {
          radius: ['51%', '47%'],
          center: ['50%', '50%'],
        },
        angleAxis: {
          max: 100,
          show: false,
          startAngle: 0,
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
            color: '#464451',
          },
          data: [75],
          coordinateSystem: 'polar',
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [{
                offset: 0,
                color: '#0ff',
              }, {
                offset: 1,
                color: '#02aeff',
              }]),
            },
          },
        },
        {
          hoverAnimation: false,
          type: 'pie',
          z: 2,
          data: labelData,
          radius: ['52%', '59%'],
          zlevel: -2,
          itemStyle: {
            normal: {
              borderColor: '#1f1e26',
              borderWidth: 4,
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
          radius: ['52%', '59%'],
          zlevel: -2,
          itemStyle: {
            normal: {
              borderColor: '#1f1e26',
              borderWidth: 4,
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
          type: 'pie',
          radius: ['42%', '43%'],
          center: ['50%', '50%'],
          data: [{
            hoverOffset: 1,
            value: 100,
            name: '',
            itemStyle: {
              color: '#ff6189',
            },
            label: {
              show: false,
            },
            labelLine: {
              normal: {
                smooth: true,
                lineStyle: {
                  width: 0,
                },
              },
            },
            hoverAnimation: false,
          },
          {
            label: {
              show: false,
            },
            labelLine: {
              normal: {
                smooth: true,
                lineStyle: {
                  width: 0,
                },
              },
            },
            value: 100 - 75,
            hoverAnimation: false,
            itemStyle: {
              color: '#3c3a48',
            },
          },
          ],
        },

        {
          type: 'pie',
          zlevel: 0,
          silent: true,
          radius: ['67%', '65.5%'],
          z: 1,
          label: {
            normal: {
              show: false,
            },
          },
          labelLine: {
            normal: {
              show: false,
            },
          },
          data: Pie(),
        },
        {
          type: 'pie',
          zlevel: 0,
          silent: true,
          startAngle: -150,
          radius: ['65%', '63.5%'],
          z: 1,
          label: {
            normal: {
              show: false,
            },
          },
          labelLine: {
            normal: {
              show: false,
            },
          },
          data: Pie3(),
        },
        {
          type: 'pie',
          zlevel: 0,
          silent: true,
          startAngle: -140,
          radius: ['68%', '66.5%'],
          z: 1,
          label: {
            normal: {
              show: false,
            },
          },
          labelLine: {
            normal: {
              show: false,
            },
          },
          data: Pie(),
        },
        {
          type: 'pie',
          zlevel: 0,
          silent: true,
          radius: ['61%', '60%'],
          z: 1,
          label: {
            normal: {
              show: false,
            },
          },
          labelLine: {
            normal: {
              show: false,
            },
          },
          data: Pie1(),
        },
        {
          type: 'pie',
          zlevel: 0,
          silent: true,
          startAngle: -140,
          radius: ['61%', '60%'],
          z: 1,
          label: {
            normal: {
              show: false,
            },
          },
          labelLine: {
            normal: {
              show: false,
            },
          },
          data: Pie2(),
        },
        {
          type: 'pie',
          zlevel: 0,
          silent: true,
          startAngle: -147.5,
          radius: ['61%', '60%'],
          z: 1,
          label: {
            normal: {
              show: false,
            },
          },
          labelLine: {
            normal: {
              show: false,
            },
          },
          data: Pie2(),
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
